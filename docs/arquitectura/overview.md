# Arquitectura

La aplicacion es un frontend Angular compilado y servido por Nginx Alpine. Angular consume PocketBase y un endpoint de PDF definidos por configuracion runtime; no existe backend Node dentro del repositorio.

```text
Usuario/PWA
  |
  |-- Traefik gestionado por Dokploy
      |
      |-- Nginx Alpine
          |
          |-- dist/verificar-app/browser
              |-- Angular 21 standalone
              |-- manifest.json
              `-- ngsw-worker.js
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

- `src/app/components`: layout con header, sidebar y footer.
- `src/app/pages/login`: autenticacion con PocketBase.
- `src/app/pages/home`: metricas, busqueda, recientes, carga completa, reemplazadas y alertas.
- `src/app/pages/nueva`: formulario multipaso con firmas e imagenes.
- `src/app/pages/heredada`: crea una inspeccion a partir de una base.
- `src/app/pages/detail`: detalle, edicion, evidencias y PDF.
- `src/app/pages/inspections`: listado, busqueda y eliminacion.
- `src/app/services`: PocketBase, realtime, Excel, Gotenberg y PWA.
- `public/config/app-config.js`: endpoints runtime.
- `public/assets/templates`: `inspection.xlsx` y `resultado.pdf`.
- `dist/verificar-app/browser`: salida compilada que Docker copia a Nginx.
- `Dockerfile`: imagen `nginx:alpine`.
- `docker-compose.yml`: servicio `web` y puerto interno `80`.
- `nginx.conf`: SPA fallback, gzip y cache PWA.
- `docs/`: documentacion VitePress y schema PocketBase.

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

- PocketBase login: `POST /api/collections/users/auth-with-password`.
- PocketBase usuarios: `/api/collections/users/records`.
- PocketBase inspecciones: `/api/collections/inspections/records`.
- PocketBase imagenes: `/api/collections/images/records`.
- PocketBase archivos: `/api/files/{collectionId}/{recordId}/{filename}`.
- PocketBase realtime: `/api/realtime`.
- PocketBase secuencias: `/api/collections/secuencias/records`.
- Gotenberg XLSX a PDF: `/forms/libreoffice/convert`.
- Gotenberg HTML a PDF: `/forms/chromium/convert/html`.
- WhatsApp: `https://wa.me/{telefono}`.
