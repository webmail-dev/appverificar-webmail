# Changelog

## Pendiente

### Documentacion

- Migracion de la documentacion tecnica a VitePress.
- Nueva estructura navegable por guia, arquitectura, funcionalidades, flujos, modelos y despliegue.
- Configuracion de navbar, sidebar y busqueda local.

### Home de inspecciones

- Vista inicial limitada a las 10 inspecciones mas recientes.
- Orden inicial por `created` descendente.
- Carga completa mediante **Ver todas**.
- Modo completo sin paginacion por defecto.
- Modo alternativo con paginacion usando `currentPage`, `pageSize`, `totalPages`, `pagesArray`, `goToPage()` y `pagedInspections`.
- Identificacion visual de inspecciones reemplazadas con linea roja.
- Checkbox **Ocultar tachadas** solo en escritorio.
- Ordenamiento de **Problemas de vigencia** por tiempo transcurrido desde `fecha_vigencia`.
- Documentacion del flujo de nueva inspeccion heredada y del criterio de vigente por placa.

