# Documentos criticos y vencimientos

El Home calcula alertas para inspecciones y documentos criticos:

- Vigencia de inspeccion: `fecha_vigencia`.
- SOAT: `fecha_vencimiento_soat`.
- Revision tecnomecanica: `fecha_vencimiento_revision_tecnomecanica`.
- Tarjeta de operacion: `fecha_vencimiento_tarjeta_operacion`.
- Licencia de conduccion: `licencia_vencimiento`.

## Estados visuales

| Estado | Criterio |
|---|---|
| Vencido | Fecha menor que hoy |
| Urgente | Vence en 7 dias o menos |
| Proximo | Vence entre 8 y 30 dias |
| Vigente | Vence en mas de 30 dias |

## Problemas de vigencia

La vista **Problemas de vigencia** usa `getLatestInspectionsByPlate()` para evaluar la inspeccion vigente de cada placa y evitar contar historicas reemplazadas en estadisticas de documentos.

Despues de filtrar inspecciones afectadas, ordena por la diferencia entre `fecha_vigencia` y hoy:

```ts
new Date(fecha_vigencia).getTime() - hoy.getTime()
```

El orden es ascendente:

1. Inspecciones mas vencidas.
2. Inspecciones vencidas recientemente.
3. Inspecciones que vencen pronto.

Ejemplo esperado:

```text
vencio hace 52 dias
vencio hace 45 dias
vencio hace 10 dias
vence en 1 dia
vence en 5 dias
```

Este orden especial solo aplica a `viewMode === 'expiry-issues'`; no cambia el orden por `created` de Recientes ni de Todas.

