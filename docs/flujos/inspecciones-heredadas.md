# Inspecciones heredadas

Una inspeccion heredada permite crear un nuevo registro a partir de una inspeccion base. El flujo conserva el historial y evita sobrescribir inspecciones anteriores.

## Flujo funcional

1. El usuario identifica una inspeccion existente desde el detalle o desde la busqueda por placa.
2. La app navega a `/heredada` con la inspeccion base en el estado de navegacion.
3. El formulario precarga datos relevantes del conductor, propietario, vehiculo y documentos.
4. Al guardar, se crea un nuevo registro en `inspections`.
5. La inspeccion anterior permanece en PocketBase como historica.

## Criterio de vigente por placa

En el Home, la placa se normaliza con:

```text
trim + uppercase
```

Si una placa tiene varias inspecciones:

- La vigente visualmente es la mas reciente por `created`.
- Las anteriores se consideran reemplazadas.
- Las reemplazadas se muestran con linea roja mediante `inspection-superseded`.
- En escritorio se pueden ocultar temporalmente con **Ocultar tachadas**.

## Relacion con documentos criticos

`getLatestInspectionsByPlate()` se mantiene para estadisticas y documentos criticos. Su objetivo es evaluar solo la inspeccion mas reciente por placa para no duplicar alertas con historicos reemplazados.

Este criterio no elimina registros ni cambia la busqueda por placa, que sigue mostrando historiales.

