# Arquitectura

La aplicacion es un frontend estatico. Angular consume PocketBase y un endpoint de PDF definidos por configuracion runtime; no existe backend Node dentro del repositorio.

```text
Navegador/PWA
  |
  |-- Angular 21 standalone
  |   |-- pages: login, home, nueva, heredada, inspections, detail
  |   |-- services: auth, inspection, realtime, excel, gotenberg, pwa
  |   `-- public/assets/templates/inspection.xlsx
  |
  |-- PocketBase
  |   |-- users
  |   |-- files
  |   |-- inspections
  |   |-- images
  |   |-- firmas
  |   `-- secuencias
  |
  `-- Gotenberg o proxy PDF
      |-- /forms/libreoffice/convert
      `-- /forms/chromium/convert/html
```

## Estructura del repositorio

| Ruta | Rol | Observacion |
|---|---|---|
| `src/app/components` | Layout | Header, sidebar y footer. |
| `src/app/pages/login` | Acceso | Autenticacion con PocketBase. |
| `src/app/pages/home` | Home operativo | Metricas, busqueda, recientes, carga completa, reemplazadas y alertas. |
| `src/app/pages/nueva` | Alta | Formulario multipaso con firmas e imagenes. |
| `src/app/pages/heredada` | Reuso | Crea inspeccion a partir de una base. |
| `src/app/pages/detail` | Detalle | Edicion, evidencias y PDF. |
| `src/app/pages/inspections` | Listado | Busqueda y eliminacion. |
| `src/app/services` | Integracion | PocketBase, realtime, Excel, Gotenberg y PWA. |
| `public/config/app-config.js` | Configuracion | Endpoints runtime para ambiente desplegado. |
| `public/assets/templates` | Plantillas | `inspection.xlsx` y `resultado.pdf`. |
| `docs/` | Documentacion | Sitio VitePress y schema PocketBase. |

## Servicios principales

| Servicio | Responsabilidad |
|---|---|
| `AuthService` | Login, logout, usuario actual y recuperacion de contrasena. |
| `InspectionService` | CRUD de inspecciones, imagenes, secuencias y URLs de archivos. |
| `RealtimeInspectionsService` | Suscripciones realtime, cache local y carga progresiva. |
| `ExcelExportService` | Generacion de XLSX y PDF desde plantilla. |
| `GotenbergService` | Conversion XLSX/HTML a PDF y descarga de blobs. |
| `PwaInstallService` | Instalacion PWA desde `beforeinstallprompt`. |

## Endpoints consumidos

| Servicio | Operacion | Ruta |
|---|---|---|
| PocketBase | Login | `POST /api/collections/users/auth-with-password` |
| PocketBase | Usuarios | `/api/collections/users/records` |
| PocketBase | Inspecciones | `/api/collections/inspections/records` |
| PocketBase | Imagenes | `/api/collections/images/records` |
| PocketBase | Archivos | `/api/files/{collectionId}/{recordId}/{filename}` |
| PocketBase | Realtime | `/api/realtime` |
| PocketBase | Secuencias | `/api/collections/secuencias/records` |
| Gotenberg | XLSX a PDF | `/forms/libreoffice/convert` |
| Gotenberg | HTML a PDF | `/forms/chromium/convert/html` |
| WhatsApp | Abrir chat | `https://wa.me/{telefono}` |

