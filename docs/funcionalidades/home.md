# Home de inspecciones

El Home esta optimizado para abrir rapido con datos recientes y cargar el historial completo solo cuando el usuario lo solicita. La estrategia combina carga progresiva, cache local y filtros visuales sin modificar registros en PocketBase.

## Vista inicial

- Al cargar `/home`, se muestran solo las 10 inspecciones mas recientes.
- La consulta usa `loadRecentInspections(10, '-created')`.
- El orden inicial es `created` descendente.
- No se usa `fecha_vigencia` para ordenar la vista inicial.
- El renderizado usa `sortedRecentInspections`.

## Ver todas

El boton **Ver todas** cambia a modo completo:

```ts
viewMode = 'all';
sortField = 'created';
sortDirection = 'desc';
showAllWithoutPagination = true;
```

Si la lista completa no esta disponible, el Home llama a `loadAllInspectionsBackground('-created')`. Una vez cargada, muestra todas las inspecciones ordenadas por `created` descendente y sin paginacion por defecto.

## Paginacion opcional

La paginacion no se elimina; queda como modo alternativo del listado completo.

- **Ver con paginacion** activa `showAllWithoutPagination = false`.
- **Ver sin paginacion** vuelve a `showAllWithoutPagination = true`.
- El modo paginado usa `currentPage`, `pageSize`, `totalPages`, `pagesArray`, `goToPage()` y `pagedInspections`.
- Al cambiar el filtro de ocultar tachadas se reinicia `currentPage = 1`.

## Renderizado por modo

| Modo | Condicion | Lista renderizada |
|---|---|---|
| Recientes | `viewMode === 'recent'` | `sortedRecentInspections` |
| Todas sin paginacion | `viewMode === 'all' && showAllWithoutPagination` | `sortedAllInspections` |
| Todas con paginacion | `viewMode === 'all' && !showAllWithoutPagination` | `pagedInspections` |
| Problemas de vigencia | `viewMode === 'expiry-issues'` | `sortedExpiryIssues` |

## Inspecciones reemplazadas

Las inspecciones reemplazadas se detectan por placa normalizada:

```text
trim + uppercase
```

Reglas:

- No se marca una placa unica.
- Si una placa tiene mas de una inspeccion, la vigente visualmente es la mas reciente segun `created`.
- Las inspecciones anteriores se marcan con `inspection-superseded`.
- La clase visual agrega menor opacidad y linea roja sobre los datos principales.
- La columna de acciones mantiene botones visibles, sin tachado y funcionales.

## Ocultar tachadas

En escritorio se muestra el checkbox **Ocultar tachadas** junto a los controles del Home.

- Solo aparece en `viewMode === 'all'` o `viewMode === 'expiry-issues'`.
- Usa clases Bootstrap tipo `d-none d-lg-flex`, por lo que no se muestra en moviles.
- Activa la bandera `hideSuperseded`.
- Filtra temporalmente las inspecciones reemplazadas usando `isSupersededByNewerInspection(inspection)`.
- Aplica a **Todas** con y sin paginacion, y a **Problemas de vigencia**.
- No aplica a **Recientes**.

El filtro es visual: no modifica PocketBase, no elimina registros, no afecta busqueda, estadisticas ni creacion de heredadas.

