# AGENTS.md — HomeBooks (books-frontend)

Guía de contexto para agentes de IA que trabajen en este repositorio. Léela entera antes de tocar código.

## Qué es esto

**HomeBooks** es una biblioteca digital personal que usan el propietario del repo y su mujer para llevar el registro de sus libros: una representación digital de sus estanterías de casa y su lista de deseos. Permite añadir libros leídos, en curso y pendientes (de leer o de comprar), y dejar una valoración de 1 a 5 estrellas una vez leídos.

Reglas de negocio clave (confirmadas por el dueño):

- **Cada usuario tiene su PROPIA biblioteca**. Los `Read` (lecturas) y `Rating` (valoraciones) van atados a un `user`. **No existe** un modelo de biblioteca compartida / hogar / pareja.
- **Lo ÚNICO compartido es la ficha del libro/producto** (metadatos + portada). En la ficha de un libro sí se ven todos los usuarios que lo tienen y su estado (componente `ReadsUserTabs`), pero cada uno gestiona su lista por separado.
- La **valoración es solo un número de 1 a 5** (sin reseña de texto), por usuario.

## Stack

- **Next.js 14.2** (App Router) + React 18 + TypeScript (`strict: true`)
- **NextUI v2** + **Tailwind CSS** + Framer Motion (UI)
- **Auth0** (`@auth0/nextjs-auth0`) para autenticación
- **MongoDB / Mongoose 8** como base de datos
- **Cloudinary** para almacenar imágenes (portadas)
- Escaneo de ISBN por cámara: `html5-qrcode`, `jsqr`, `react-qr-barcode-scanner`
- Desplegado en **Vercel**. Gestor de paquetes: **yarn** (hay `yarn.lock`).

## Comandos

```bash
yarn dev            # servidor de desarrollo en el puerto 3001 (next dev -p 3001)
yarn build          # next build
yarn start          # next start
yarn lint           # next lint
npx tsc --noEmit    # typecheck
yarn test           # tests unitarios (Vitest, una pasada)
yarn test:watch     # Vitest en modo watch
yarn test:coverage  # tests + reporte de cobertura en ./coverage
```

## Testing

- **Vitest** (`vitest.config.ts`), entorno `node`, alias `@` → `src` (igual que `tsconfig`).
- Los tests viven en **`test/`** (al nivel de `src/`) replicando la estructura del backend:
  `test/backend/<Módulo>/<capa>/<Sujeto>.test.ts` espeja `src/backend/<Módulo>/<capa>/<Sujeto>.ts`.
- **ObjectMother pattern**: cada entidad de dominio tiene su `XMother` (p.ej. `CategoryMother`, `RatingMother`,
  `BookMother`, `ReadMother`, `UserMother`) con `primitives(overrides)` y `create(overrides)`. Los datos aleatorios
  válidos (ObjectIds, ISBN-13...) se generan con `test/helpers/Random.ts` — sin dependencias externas (no faker).
- Los tests de **domain** y **application** están **desacoplados**: no tocan Mongo/Cloudinary/red. Los servicios de
  aplicación se prueban contra **dobles de los puertos** (`vi.fn()` implementando las interfaces de repositorio).
- **infrastructure**: los **controllers** se prueban con servicios mockeados (status + mapeo de errores del `NextResponse`);
  los **repositorios** con tests de integración (`*.integration.test.ts`) sobre MongoDB en memoria
  (`mongodb-memory-server`, ver `test/helpers/mongo.ts`); `CloudinaryService` con `cloudinary`/`axios` mockeados.
- Bugs conocidos aún sin corregir se documentan con `it.fails(...)` referenciando su issue (p.ej. `RatingRate` → #29),
  de modo que la suite queda en verde y el test se convertirá en real al arreglar el bug.
- `test/` está excluido del `tsconfig` de la app, así que `next build` no compila los tests.

## Arquitectura

Es un **monolito**: frontend y backend conviven en el mismo proyecto Next.js.

- **`src/app/`** — Frontend (App Router) + rutas API en `src/app/api/`.
- **`src/backend/`** — Backend con **DDD / arquitectura hexagonal** por dominios.

### Dominios del backend

`Books`, `Categories`, `Ratings`, `Reads`, `Users` y `shared`. Cada uno con capas:

- `domain/` — Entidades, Value Objects (VO), interfaces de repositorio (`IXRepository`), factories, excepciones.
- `application/` — Servicios de caso de uso (`XService`).
- `infrastructure/` — `controllers/` (adaptadores HTTP), `repository/` (impl. Mongoose, `IXRepositoryImpl`), `database/` (schemas Mongoose), `dependencies.ts`.

### Flujo de una petición

```
src/app/api/<x>/route.ts
  → MongoClientFactory.createAndConnectClient()   (conecta Mongo)
  → controller (importado de <dominio>/infrastructure/dependencies.ts)
  → XService (application)
  → IXRepositoryImpl (Mongoose) / entidades de domain
```

`dependencies.ts` de cada dominio actúa como **contenedor de inyección de dependencias manual**: instancia repos, servicios y controllers y exporta los controllers ya construidos.

### Convención de nombres

- Value Objects terminan en `VO` (p.ej. `BookIdVO`, `RatingRateVO`, `BookPortraitVO`).
- Interfaces de repositorio: `IXRepository` (domain) e impl `IXRepositoryImpl` (infra).
- Entidades con `toPrimitives()` / `static fromPrimitives()` para (de)serializar.
- Alias de imports: **`@/*` → `./src/*`** (definido en `tsconfig.json`).

## Estándares de código (seguir al programar)

1. **Backend nuevo siempre in-repo.** Todo código nuevo usa `src/backend/` (controller → service → repository). **No añadir nuevos proxys** al backend antiguo `books-back-alpha.vercel.app`; el objetivo es retirarlo (ver issue #20). Si tocas una ruta que aún proxea, valora migrarla a in-repo.
2. **Arquitectura hexagonal pragmática.** Respeta la estructura por dominios y capas (domain / application / infrastructure) y el flujo `route → controller → service → repository`. No hace falta ser dogmático con cada import si complica de más, pero mantén el acceso a datos vía repository y la lógica de negocio en `domain`/`application`, no en las rutas.
3. **Errores con Exceptions de dominio.** Lanza siempre las clases `Exception` del dominio (`src/backend/shared/domain/Errors/`), con su `status` y `name`; nunca `throw` genéricos. Las rutas API son las que traducen la excepción a la respuesta HTTP usando su `status`. No tragues errores devolviendo un JSON genérico sin status.
4. **Comentarios en inglés y mínimos.** Comenta solo cuando aporte (el *por qué*, no el *qué*). Prioriza código autoexplicativo con buenos nombres. Los comentarios existentes/nuevos van en inglés (los mensajes de commit y PR siguen en español).
5. **Alias de imports.** Usa siempre `@/...`, no rutas relativas largas (`../../..`).
6. **UI.** Prefiere componentes de **NextUI** y utilidades de **Tailwind** antes que CSS a mano.
7. **Tipado.** `strict` está activo; evita `any` salvo en factories que mapean respuestas externas (donde ya se usa y el lint lo permite).

## Modelo de dominio (resumen)

- **Book** — `_id` es el **ISBN** (string, PK). Campos: `title`, `description`, `portrait` (URL Cloudinary), `publisher`, `authors[]`, `categories[]`, `pages`, `format`. Los libros se traen de la API de Hamelyn (ver abajo).
- **Read** — `user` (ObjectId), `status` (`BookReadsStatus`), `book` (ISBN string), timestamps.
  - `BookReadsStatus`: `COMPLETE`, `INCOMPLETE`, `IN_PROGRESS`, `PENDING_TO_READ`, `PENDING_TO_BUY`, `INACTIVE`. Etiquetas/colores en `src/app/utils/index.ts`.
- **Rating** — `user`, `rate` (1–5), `isbn`. Sin reseña de texto.
- **User** — Vinculado a Auth0 (`auth0Id`). Campos: `name`, `nick?`, `phone?`, `email`, `picture`, `verified`.
- **Category** — `name`, `slug`.

## Integración con Hamelyn (IMPORTANTE)

Los datos de los libros vienen de la API de **Hamelyn** (`serverless.hamelyn.com`). Punto de entrada: `src/backend/Books/application/BookHamelynFinder.ts`.

Gotchas críticos (aprendidos a base de romperse):

1. **La API `v4` de producto redirige (`301`) a `v5`.** Axios sigue la redirección automáticamente. La respuesta de **v5 solo devuelve** `_id`, `productType`, `title`, `description`, `priceBuy` y `attributes.authors`.
2. **v5 ya NO devuelve `image`, `pages`, `publisher` ni `format`.** Por eso `pages` cae al default (250), `publisher` a "Sin editorial" y `format` queda vacío. Solo `authors` sobrevive. (Pendiente de resolver de dónde sacar esos campos en v5.)
3. **La portada NO viene en el payload.** Se construye la URL en el CDN de Hamelyn (Bunny), que es público (sin token) y descargable server-side:
   ```
   https://image-hamelyn.b-cdn.net/products/{isbn}/1.webp
   ```
4. **Flujo de portada:** se descarga esa imagen de Bunny → se convierte a base64 → se **resube a NUESTRO Cloudinary** (`CloudinaryService`, carpeta `books`, `public_id = {isbn}`, `overwrite: true`, formato webp). Lo que se guarda en BD (`portrait`) es la URL de Cloudinary, no la de Bunny. Bunny es solo el origen de la copia.
5. `CloudinaryService.transformAndUploadAsset` es **resiliente**: si la descarga/transformación falla (p.ej. libro sin portada en el CDN → 404), devuelve `DEFAULT_COVER_IMAGE` en vez de lanzar excepción (que rompía el alta completa del libro).

## Variables de entorno (`.env`)

Solo nombres (nunca commitear valores). El `.env` está gitignored.

- Auth0: `AUTH0_SECRET`, `AUTH0_BASE_URL`, `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`, `AUTH0_ISSUER_BASE_URL`, `AUTH0_DOMAIN`
- Cloudinary: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- BD: **`MONGODB_URI`** (⚠️ NO `MONGO_URL` — ojo si vienes del monorepo de Hamelyn, allí es distinto)
- Otros: `JWT_SECRET`, `BACKEND_BASE_URL`, `CRON_SECRET`

## Gotchas / cosas que saber

- **Algunas rutas proxean a un backend antiguo desplegado** (`https://books-back-alpha.vercel.app/api/...`) en vez de usar el backend in-repo. Ejemplo: `POST /api/reads` reenvía a ese backend, pero `GET /api/reads` usa el controller local. Ten cuidado al asumir que todo pasa por `src/backend/`. Se está migrando todo a in-repo para retirar ese backend — ver issue #20 y el estándar #1.
- **Cron**: `vercel.json` define un cron diario (`0 0 * * *`) que golpea `/api/cron`. Protegido con `CRON_SECRET`.
- **Imágenes remotas permitidas** (`next.config.mjs` → `images.remotePatterns`): `res.cloudinary.com`, `lh3.googleusercontent.com`, `*.public.blob.vercel-storage.com`, `nextui.org`. Nota: `image-hamelyn.b-cdn.net` NO está aquí, y no hace falta porque las portadas se sirven desde Cloudinary.
- **ESLint**: `@typescript-eslint/no-explicit-any` está desactivado (se usa `any` en factories).
- **Vistas a medias**: la Home (`/`) y el perfil (`/profile`) muestran **estadísticas hardcodeadas / vacías** (no conectadas a datos reales). `/search` es un stub vacío.
- **Bug conocido**: `src/backend/Ratings/domain/RatingRateVO.ts` valida con `if (rate <= 0 && rate >= 6)` (siempre falso → no valida nada). Debería ser `||`.

## Flujo de trabajo Git / PRs

- Rama por defecto: **`master`**. Repo: `github.com/homebooksalexalmu/books-frontend` (público).
- No trabajar directamente sobre `master`: crear rama desde `master`, commit, push y abrir PR contra `master`.
- Convención de ramas vista en el repo: `feature/<nombre>`, `fix/<nombre>`, `hotfix/<nombre>`.
- Mensajes de commit en español con prefijo tipo `feat:` / `fix:`.
