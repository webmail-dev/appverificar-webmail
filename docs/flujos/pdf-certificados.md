# PDF y certificados

La generacion de certificados combina datos de inspeccion, firmas, evidencias fotograficas y una plantilla XLSX.

## Flujo

1. Validar que la inspeccion no este en `borrador` cuando el flujo lo requiere.
2. Recolectar datos de conductor, propietario, vehiculo, documentos y checklist.
3. Cargar `public/assets/templates/inspection.xlsx`.
4. Completar hojas de la plantilla con ExcelJS.
5. Insertar firmas e imagenes descargadas desde PocketBase.
6. Enviar el XLSX a Gotenberg o al proxy PDF configurado.
7. Descargar el PDF generado en el navegador.

## Servicios

| Servicio | Responsabilidad |
|---|---|
| `ExcelExportService` | Construye XLSX desde plantilla e inserta datos, firmas e imagenes. |
| `GotenbergService` | Convierte XLSX/HTML a PDF y maneja blobs de descarga. |

## Seguridad

Las credenciales de Gotenberg no deben vivir en Angular. Para produccion, usar un backend o proxy que agregue autenticacion fuera del navegador.

Ver [Seguridad Gotenberg](/despliegue/seguridad-gotenberg).

