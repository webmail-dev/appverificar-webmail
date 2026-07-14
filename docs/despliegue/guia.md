# Despliegue

La guia operativa vigente esta en:

- [Despliegue con Dokploy Compose](../deployment.md)
- [Dokploy, dominios, HTTPS y Traefik](../dokploy.md)
- [Docker y Nginx](../docker.md)
- [Troubleshooting](../troubleshooting.md)

## Resumen vigente

El proyecto se despliega con Docker Compose en Dokploy. La imagen usa `nginx:alpine` y sirve el build Angular ya compilado desde:

```text
dist/verificar-app/browser
```

Docker no ejecuta `npm install` ni `npm run build`. Antes de construir la imagen se debe generar el build:

```bash
npm install
npm run build
docker compose config
docker compose build
```

En Dokploy el servicio se configura como Compose, usando `docker-compose.yml`, dominio publico, HTTPS y puerto interno `80`.
