# Despliegue

## Frontend estatico

Publicar el contenido generado por Angular:

```text
dist/verificar-app/browser
```

El hosting debe servir assets estaticos y redirigir rutas SPA a `index.html`.

```text
/<*> -> /index.html -> 200
```

## Build de aplicacion

```bash
npm ci
npm run build
```

## Build de documentacion

```bash
npm run docs:build
```

La salida de VitePress queda en:

```text
docs/.vitepress/dist
```

## PocketBase

- Servir detras de HTTPS.
- Persistir y respaldar `pb_data`.
- Importar o validar `docs/pb_schema.json` antes de liberar.
- Versionar schema y reglas despues de cada cambio operativo.
- Restringir CORS al dominio de la aplicacion.

## Gotenberg

- Imagen recomendada: `gotenberg/gotenberg:8`.
- Dominio HTTPS.
- Basic Auth, red privada o proteccion equivalente.
- Limite de request suficiente para XLSX con imagenes.
- Preferible exponerlo mediante backend/proxy para ocultar credenciales al navegador.

## Seguridad

- Mantener credenciales y tokens fuera del bundle Angular.
- Usar HTTPS en frontend, PocketBase y conversion PDF.
- Aplicar reglas de lectura/escritura por coleccion en PocketBase.
- Aplicar CORS estricto.
- Agregar control server-side para permisos criticos.
- Auditar assets en `public/assets` antes de publicar.

