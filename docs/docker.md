# Docker

## Indice

- [Archivos](#archivos)
- [Dockerfile](#dockerfile)
- [Compose](#compose)
- [Dockerignore](#dockerignore)
- [Nginx](#nginx)
- [Reconstruir imagen](#reconstruir-imagen)

## Archivos

El despliegue Docker actual usa:

- `Dockerfile`
- `docker-compose.yml`
- `nginx.conf`
- `.dockerignore`
- `dist/verificar-app/browser`

## Dockerfile

```dockerfile
FROM nginx:alpine

RUN rm -f /etc/nginx/conf.d/default.conf

COPY dist/verificar-app/browser/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

La imagen es deliberadamente simple:

- No instala Node.
- No ejecuta `npm install`.
- No ejecuta `npm run build`.
- Solo sirve el build compilado.

## Compose

`docker-compose.yml` define el servicio `web`:

```yaml
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    restart: unless-stopped
    expose:
      - "80"
    networks:
      - web
```

`expose` hace visible el puerto dentro de la red Docker. En Dokploy, Traefik usa el puerto interno `80` configurado en la UI.

## Dockerignore

`.dockerignore` excluye codigo fuente y dependencias:

- `node_modules`
- `docs`
- `src`
- `public`
- `package.json`
- `package-lock.json`
- `angular.json`
- `ngsw-config.json`
- `tsconfig*.json`

Esto evita subir contexto innecesario a Docker, pero obliga a compilar Angular antes de construir la imagen.

## Nginx

`nginx.conf` sirve desde:

```text
/usr/share/nginx/html
```

Reglas relevantes:

- `location /` usa fallback SPA hacia `/index.html`.
- `index.html` no se cachea.
- `manifest.json`, `ngsw.json` y workers PWA no se cachean.
- JS, CSS, fuentes e imagenes se cachean por un ano con `immutable`.
- Gzip esta activado para CSS, JavaScript, JSON, manifest y SVG.

## Reconstruir imagen

```bash
npm run build
docker compose config
docker compose build
docker compose up -d
docker compose logs
```

Si el build no existe, Docker fallara al copiar:

```text
dist/verificar-app/browser/
```
