# Tests

Suite de tests unitarios del backend con [Vitest](https://vitest.dev/).

## Ejecutar

```bash
yarn test           # una pasada
yarn test:watch     # modo watch
yarn test:coverage  # con reporte de cobertura (./coverage)
```

## Estructura

`test/Backend/**` replica `src/backend/**`. Cada fichero de test espeja el módulo bajo prueba:

```
src/backend/Categories/domain/CategorySlug.ts
test/Backend/Categories/domain/CategorySlug.test.ts
```

Capas cubiertas:

- **domain** — value objects, entidades y factories (lógica pura, sin infraestructura).
- **application** — servicios probados contra **dobles de los puertos** (interfaces de repositorio con `vi.fn()`),
  sin conexión real a Mongo, Cloudinary ni red.

`test/Backend/shared/**` cubre el kernel compartido (`ValueObject`, el `Criteria` y su `MongoCriteriaConverter`).

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

Los bugs de dominio aún sin corregir se documentan con `it.fails(...)` y una referencia a su issue
(p.ej. la validación no-op de `RatingRate`, issue #29). Así la suite se mantiene en verde y el test pasará a ser
una aserción normal en cuanto se arregle el bug.
