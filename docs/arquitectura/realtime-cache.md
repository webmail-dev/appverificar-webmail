# Realtime y cache

`RealtimeInspectionsService` centraliza la lista observable de inspecciones, la suscripcion realtime y la cache local.

## Responsabilidades

- Suscribirse a `inspections` mediante `subscribe('*')`.
- Exponer `inspections$`, `events$`, `errors$` y estado de carga.
- Cargar las 10 inspecciones recientes con `loadRecentInspections(10, '-created')`.
- Cargar el historial completo con `loadAllInspectionsBackground('-created')`.
- Guardar cache local en `localStorage`.
- Invalidar o actualizar cache ante eventos de creacion, actualizacion o eliminacion.

## Cache

| Elemento | Valor |
|---|---|
| Clave | `inspections_cache` |
| TTL | 5 minutos |
| Datos omitidos | Firmas base64 en listados |
| Cache completa | Solo se reutiliza cuando el registro indica `complete !== false` |

## Flujo de carga en Home

1. El Home se suscribe a `inspections$`.
2. Si hay cache completa vigente, la usa como fuente de `allInspections`.
3. Si no hay cache completa, solicita las 10 recientes ordenadas por `-created`.
4. La carga completa puede ejecutarse en segundo plano o al pulsar **Ver todas**.
5. Los eventos realtime mantienen la lista y la cache sincronizadas.

