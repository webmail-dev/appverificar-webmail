# Introduccion

VerificarIT es un frontend Angular/PWA para la gestion de inspecciones vehiculares. Permite autenticar usuarios, crear inspecciones, consultar historial por placa, registrar firmas y fotografias, controlar vencimientos documentales y generar reportes PDF desde una plantilla Excel.

La aplicacion se ejecuta como frontend estatico y consume servicios externos:

- PocketBase para autenticacion, datos, archivos y realtime.
- Gotenberg, o un proxy propio, para conversion de reportes XLSX/HTML a PDF.
- Configuracion runtime mediante `public/config/app-config.js`.

## Funcionalidades principales

- Login con PocketBase.
- Home con metricas, busqueda por placa, alertas, 10 inspecciones recientes y carga completa bajo demanda.
- Creacion de inspecciones nuevas o heredadas desde una inspeccion base.
- Identificacion visual de inspecciones reemplazadas por otra inspeccion mas reciente de la misma placa.
- Edicion, detalle y eliminacion de inspecciones.
- Captura de firmas de conductor e inspector.
- Carga y consulta de fotografias de evidencia.
- Estados de inspeccion: `borrador`, `aprobada`, `rechazada`.
- Alertas de vencimiento para SOAT, tecnomecanica, licencia, tarjeta de operacion y vigencia.
- Generacion de PDF con datos, firmas e imagenes.
- Soporte PWA con manifest y service worker de Angular.

## Stack

| Capa | Tecnologia |
|---|---|
| Frontend | Angular 21, standalone components |
| Lenguaje | TypeScript 5.9 |
| PWA | `@angular/service-worker`, `ngsw-config.json`, `public/manifest.json` |
| Datos/Auth | PocketBase |
| Realtime | PocketBase realtime subscriptions |
| Formularios | Angular Forms / Reactive Forms |
| Firmas | `@almothafar/angular-signature-pad` |
| Reportes | ExcelJS, xlsx, file-saver, Gotenberg |
| UI | Assets locales en `public/assets` |

## Rutas principales

| Ruta | Proposito |
|---|---|
| `/login` | Autenticacion de usuario. |
| `/home` | Home operativo, metricas, busqueda, alertas, recientes e historial completo bajo demanda. |
| `/nueva` | Creacion de inspeccion. |
| `/heredada` | Creacion de inspeccion desde una base existente. |
| `/inspections` | Listado general con busqueda y eliminacion. |
| `/detail/:id` | Detalle, edicion, evidencias, firmas y PDF. |

