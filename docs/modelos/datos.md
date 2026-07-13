# Modelo de datos

El schema de PocketBase esta versionado en [`docs/pb_schema.json`](../pb_schema.json).

## Colecciones principales

| Coleccion | Uso |
|---|---|
| `users` | Autenticacion y perfil de usuario. |
| `inspections` | Registro principal de inspecciones vehiculares. |
| `images` | Evidencias fotograficas asociadas a inspecciones. |
| `secuencias` | Consecutivos por tipo y prefijo. |
| `files` | Archivos auxiliares. |
| `firmas` | Evidencias de firma por certificado. |

## Campos relevantes de `inspections`

- Identificacion: `id`, `numero_certificado`, `created`, `updated`.
- Conductor y propietario: nombres, identificacion, telefono, WhatsApp, licencia, propietario y documento.
- Vehiculo: placa, marca, modelo, color, clase, codigo, capacidad y kilometraje.
- Documentos: SOAT, licencia de transito, revision tecnomecanica y tarjeta de operacion.
- Checklist: electrico, motor, carroceria, cabina, seguridad, kit, parte baja, frenos, direccion y llantas.
- Evidencias y verificacion: firmas base64, imagenes asociadas, `publicUrl`, `verificationCode` y `qrImage`.

## Valores controlados

| Campo | Valores |
|---|---|
| Checklist tecnico | `ok`, `negativo`, `na` |
| `estado` | `borrador`, `aprobada`, `rechazada` |
| `status` | `approved`, `rejected` |
| `tipo_propietario` | `empresa`, `persona` |
| `users.role` | `client`, `admin` |

## Registro fotografico

El campo `inspections.images` guarda un arreglo de IDs de registros de la coleccion `images`:

```json
[
  "9ls9qrjwf1g3bpn",
  "vxq99ciwv8tsbqy"
]
```

Para presentar las imagenes en la vista de detalle no se debe usar el ID directamente. Por cada ID se consulta el registro correspondiente en `images`, se toma el nombre del archivo desde el campo file `image` y se construye la URL publica de PocketBase:

```text
{pocketbaseUrl}/api/files/{imagesCollectionId}/{imageRecordId}/{filename}?token=
```

