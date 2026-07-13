# Busqueda por placa

El Home incluye una busqueda por placa con modal. La busqueda usa la fuente disponible:

- `allInspections` cuando la carga completa ya esta disponible.
- La lista observable actual cuando todavia solo hay datos recientes.

## Comportamiento

- Normaliza el termino de busqueda a minusculas para comparar.
- Agrupa resultados por placa normalizada.
- Ordena los grupos por la inspeccion mas reciente del grupo.
- Muestra historial de inspecciones por placa.
- Marca la inspeccion mas reciente del grupo.

## Acciones desde resultados

- Ver detalle.
- Crear nueva inspeccion heredada.
- Abrir WhatsApp si existe telefono.
- Copiar placa.

La busqueda no depende del checkbox **Ocultar tachadas**. Ese checkbox solo modifica el renderizado de tablas en escritorio.

