# Troubleshooting

## Indice

- [Docker no encuentra dist](#docker-no-encuentra-dist)
- [Rutas SPA devuelven 404](#rutas-spa-devuelven-404)
- [Dominio no abre](#dominio-no-abre)
- [HTTPS falla](#https-falla)
- [PWA no actualiza](#pwa-no-actualiza)
- [PDF falla](#pdf-falla)
- [PocketBase falla](#pocketbase-falla)

## Docker no encuentra dist

Error tipico:

```text
COPY dist/verificar-app/browser/ failed
```

Causa: no existe el build Angular en la ruta esperada.

Solucion:

```bash
npm install
npm run build
ls dist/verificar-app/browser
docker compose build
```

## Rutas SPA devuelven 404

Si `/home`, `/inspections` o `/detail/:id` fallan al recargar, revisar `nginx.conf`:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

Sin ese fallback, Nginx busca archivos fisicos para rutas manejadas por Angular.

## Dominio no abre

Revisar:

- DNS apunta al servidor Dokploy.
- Servicio Compose esta desplegado.
- Dominio esta asignado al servicio correcto.
- Puerto interno configurado en Dokploy es `80`.
- Contenedor `web` esta saludable o al menos en ejecucion.

## HTTPS falla

HTTPS lo gestiona Traefik/Dokploy, no Nginx dentro del contenedor.

Revisar:

- HTTPS activado en la UI de Dokploy.
- DNS correcto.
- Puertos publicos 80 y 443 disponibles.
- Logs de Traefik o eventos de Dokploy.

No agregar certificados al repositorio.

## PWA no actualiza

Revisar:

- `ngsw.json` existe en `dist/verificar-app/browser`.
- `ngsw-worker.js` existe en `dist/verificar-app/browser`.
- Nginx no cachea `ngsw.json`.
- El navegador no esta reteniendo datos antiguos.

Comandos utiles:

```bash
ls dist/verificar-app/browser/ngsw.json
ls dist/verificar-app/browser/ngsw-worker.js
```

## PDF falla

Revisar `public/config/app-config.js`:

```js
gotenbergBaseUrl: 'https://gotenberg.appverificar.online/'
```

Tambien validar:

- Gotenberg o proxy PDF responde por HTTPS.
- CORS permite el dominio de la app.
- El endpoint soporta el tamano del XLSX con imagenes.
- No se requieren secretos desde el navegador.

## PocketBase falla

Revisar:

- `pocketbaseUrl` configurado.
- HTTPS valido.
- CORS restringido pero permitiendo el dominio de la app.
- Colecciones del schema en `docs/pb_schema.json`.
- Reglas de lectura/escritura para usuarios reales.
