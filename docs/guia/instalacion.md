# Instalacion y ejecucion

## Requisitos

- Node.js `>=20.19` o `>=22.12`.
- npm `>=10`.
- PocketBase accesible por HTTPS.
- Gotenberg o un proxy de conversion PDF accesible por HTTPS.

> El proyecto usa Angular 21 y VitePress. Ambos requieren Node moderno; Node 18 no es suficiente para construir la aplicacion ni la documentacion.

## Instalacion

```bash
npm install
```

## Configuracion runtime

La app lee configuracion runtime desde `public/config/app-config.js` y usa `src/environments/*` como fallback.

```js
window.__APP_CONFIG__ = {
  pocketbaseUrl: 'https://db.example.com',
  gotenbergBaseUrl: 'https://pdf.example.com',
  imagesCollectionId: 'collection_id'
};
```

No incluir secretos en el bundle Angular. Si Gotenberg requiere autenticacion, debe resolverse desde un proxy/backend o desde la infraestructura de despliegue.

## Comandos de aplicacion

```bash
npm start
npx tsc -p tsconfig.app.json --noEmit
npm run build
```

El servidor de desarrollo Angular se levanta en:

```text
http://localhost:4200
```

El build productivo queda en:

```text
dist/verificar-app/browser
```

## Validacion Docker local

El despliegue actual usa Nginx Alpine y requiere que el build ya exista antes de construir la imagen.

```bash
npm run build
ls dist/verificar-app/browser
docker compose config
docker compose build
docker compose up -d
docker compose logs
```

Ver [Despliegue](../deployment.md), [Dokploy](../dokploy.md) y [Docker](../docker.md).

## Comandos de documentacion

```bash
npm run docs:dev
npm run docs:build
npm run docs:preview
```

VitePress usa `docs/` como raiz de documentacion y genera su salida en `docs/.vitepress/dist`.
