# PWA

## Indice

- [Estado actual](#estado-actual)
- [Manifest](#manifest)
- [Service worker](#service-worker)
- [Cache](#cache)
- [Offline](#offline)
- [Actualizaciones](#actualizaciones)
- [Instalacion](#instalacion)
- [Iconos](#iconos)
- [Nginx y PWA](#nginx-y-pwa)

## Estado actual

La aplicacion tiene soporte PWA en builds de produccion.

Piezas reales:

- `public/manifest.json`
- `ngsw-config.json`
- `src/app/app.config.ts`
- `src/index.html`
- `public/assets/icons`
- `public/assets/screenshots`
- `nginx.conf`

## Manifest

`src/index.html` enlaza:

```html
<link rel="manifest" href="manifest.json">
```

El manifest actual define:

- `name`: `VerificarIT`
- `short_name`: `VerificarIT`
- `display`: `fullscreen`
- `start_url`: `/`
- `scope`: `/`
- `lang`: `es`
- categorias de negocio, utilidades y productividad
- screenshots mobile y desktop
- iconos Android e iOS

## Service worker

`angular.json` habilita service worker solo para produccion:

```json
"serviceWorker": "ngsw-config.json"
```

`src/app/app.config.ts` registra:

```ts
provideServiceWorker('ngsw-worker.js', {
  enabled: !isDevMode(),
  registrationStrategy: 'registerWhenStable:30000'
})
```

En desarrollo con `npm start`, el service worker no queda activo.

## Cache

`ngsw-config.json` define dos grupos:

- `app`: prefetch de `index.html`, `manifest.json`, CSS y JS.
- `assets`: carga lazy con actualizacion prefetch para imagenes, fuentes y recursos estaticos.

Nginx complementa esto:

- No cachea `index.html`.
- No cachea `manifest.json`.
- No cachea `ngsw.json`.
- No cachea workers Angular.
- Cachea bundles y assets con hash como inmutables.

## Offline

El soporte offline depende de lo que Angular Service Worker haya cacheado. La app puede abrir recursos estaticos cacheados, pero las operaciones contra PocketBase y Gotenberg requieren red.

No documentar como soportadas operaciones offline de escritura, sincronizacion diferida o colas locales: no existen en el estado actual del codigo.

## Actualizaciones

Cuando se despliega una nueva version:

1. Angular genera nuevos hashes para bundles.
2. `ngsw.json` cambia.
3. Nginx sirve `ngsw.json` sin cache.
4. El service worker detecta la nueva version.
5. El navegador actualiza caches.

Si un usuario queda en una version vieja:

- Cerrar y abrir la PWA.
- Recargar la pagina.
- Borrar datos del sitio si el problema persiste.
- Verificar que `ngsw.json` no este cacheado por proxy externo.

## Instalacion

`PwaInstallService` escucha:

- `beforeinstallprompt`
- `appinstalled`

El servicio guarda el prompt diferido y expone estado para que la interfaz pueda lanzar instalacion cuando el navegador la permite.

## Iconos

El manifest apunta a:

- `assets/icons/android/launchericon-*.png`
- `assets/icons/ios/*.png`

Esas rutas existen bajo `public/assets/icons`. Tambien hay iconos duplicados directamente en `public/assets/icons`; no son los usados por las rutas principales del manifest.

## Nginx y PWA

Las reglas de `nginx.conf` son parte del comportamiento PWA. No cambiar cache de estos archivos sin validar actualizaciones:

- `/manifest.json`
- `/ngsw.json`
- `/ngsw-worker.js`
- `/safety-worker.js`
- `/worker-basic.min.js`
