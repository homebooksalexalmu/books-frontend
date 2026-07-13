# Tests

Suite de tests unitarios del backend con [Vitest](https://vitest.dev/).

## Ejecutar

```bash
yarn test           # una pasada
yarn test:watch     # modo watch
yarn test:coverage  # con reporte de cobertura (./coverage)
```

## Estructura

`test/backend/**` replica `src/backend/**`. Cada fichero de test espeja el módulo bajo prueba:

```
src/backend/Categories/domain/CategorySlug.ts
test/backend/Categories/domain/CategorySlug.test.ts
```

Capas cubiertas:

- **domain** — value objects, entidades y factories (lógica pura, sin infraestructura).
- **application** — servicios probados contra **dobles de los puertos** (interfaces de repositorio con `vi.fn()`),
  sin conexión real a Mongo, Cloudinary ni red.
- **infrastructure**
  - **controllers** — se instancian con servicios mockeados; se comprueba el `NextResponse` (status + body) y el
    mapeo de errores (`Exception` → su status; genérico → 500).
  - **repositorios** — tests de **integración** (`*.integration.test.ts`) contra un MongoDB **en memoria**
    (`mongodb-memory-server`). Ver `helpers/mongo.ts` (`useInMemoryMongo()`).
  - `CloudinaryService` — con `cloudinary` y `axios` mockeados (`vi.mock`).

`test/backend/shared/**` cubre el kernel compartido (`ValueObject`, el `Criteria` y su `MongoCriteriaConverter`).

> Los tests de integración descargan un binario de `mongod` la primera vez (cacheado después) y añaden unos segundos
> a la suite. Se ejecutan con `yarn test` como el resto.

## ObjectMother

Cada agregado de dominio tiene un `XMother` junto a su capa `domain` en tests. Construyen datos válidos por defecto
y aceptan `overrides` parciales:

```ts
const category = CategoryMother.create({ slug: "sci-fi" });
const rating = RatingMother.create({ rate: 5 });
```

Los datos aleatorios (ObjectIds, ISBN-13, emails...) se generan con [`helpers/Random.ts`](helpers/Random.ts),
sin dependencias externas.

## Bugs conocidos

Los bugs aún sin corregir se documentan con un test que refleja el comportamiento **actual** (a veces con
`it.fails(...)`) y una referencia a su issue, de modo que la suite queda en verde y sirve de red de seguridad:

- `RatingRate` acepta cualquier nota — `it.fails` en `RatingRateVO.test.ts` (#29).
- Los controllers `Category`/`Rating`/`User` filtran el error crudo al cliente (#39).
- `UserCreatorController` no hace `await req.json()` (#28).
- `save`/`findOne*` de repositorios revientan (o no persisten) en varios casos (#28, #33, #34).
