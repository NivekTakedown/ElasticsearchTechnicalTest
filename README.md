# Prueba Técnica de Aplicación Node.js con Elasticsearch

## Descripción

En esta prueba técnica, se desarrolló una aplicación Node.js que interactúa con Elasticsearch. La aplicación permite **indexar usuarios** y realizar **búsquedas exactas** y **difusas** sobre los datos de los usuarios. Se implementó siguiendo buenas prácticas de desarrollo, incluyendo una **arquitectura en capas** (controladores, servicios, repositorios), manejo de configuraciones, y pruebas unitarias e de integración.

## Componentes Principales

1. **Servidor Express**
2. **Integración con Elasticsearch**
3. **API RESTful** para operaciones CRUD de usuarios
4. **Búsquedas exactas y difusas**
5. **Tests unitarios** y de integración

## Requisitos Previos

Antes de empezar, asegúrate de tener instalados:
- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Pasos para Desplegar y Ejecutar

### 1. Clonar el Repositorio

```bash
git clone git@github.com:NivekTakedown/ElasticsearchTechnicalTest.git
cd ElasticsearchTechnicalTest
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
ELASTICSEARCH_NODE=https://localhost:9200
ELASTICSEARCH_USERNAME=elastic
ELASTICSEARCH_PASSWORD=tu_contraseña_aquí
PORT=3000
NODE_ENV=development
```

### 4. Iniciar Elasticsearch con Docker

```bash
docker-compose up -d
```

### 5. Copiar el Certificado CA de Elasticsearch

```bash
docker cp elasticsearch:/usr/share/elasticsearch/config/certs/http_ca.crt .
```

### 6. Generar Contraseña para el Usuario 'elastic' de Elasticsearch

```bash
docker exec -it elasticsearch /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic
```

Anota la contraseña generada y actualízala en tu archivo `.env`.

### 7. Iniciar la Aplicación

```bash
node server.js
```

### 8. Ejecutar los Tests

```bash
npm test
```

## Peticiones cURL para Probar la Aplicación

### 1. Indexar un Nuevo Usuario

```bash
curl -X POST http://localhost:3000/api/users \
     -H "Content-Type: application/json" \
     -d '{"document": {"name": "John Doe", "email": "john@example.com", "age": 30, "address": "123 Main St"}}'
```

### 2. Búsqueda Exacta

```bash
curl "http://localhost:3000/api/users/exact-search?field=name&value=John%20Doe"
```

### 3. Búsqueda Difusa

```bash
curl "http://localhost:3000/api/users/fuzzy-search?field=name&value=Jon&fuzziness=AUTO"
```

### 4. Verificar el Estado del Servidor

```bash
curl http://localhost:3000/health
```

## Notas Importantes

- Asegúrate de que **Elasticsearch** esté en funcionamiento antes de iniciar la aplicación.
- El certificado `http_ca.crt` debe estar en la raíz del proyecto para las conexiones seguras a Elasticsearch.
- Si encuentras problemas de conexión, verifica que las credenciales y la URL de Elasticsearch en el archivo `.env` sean correctas.
- Para un despliegue en producción, asegúrate de configurar adecuadamente la seguridad, incluyendo el manejo seguro de certificados y contraseñas.

## Consideraciones para Producción

Esta configuración está diseñada para un entorno de desarrollo. Para un despliegue en producción, considera:
- Implementar medidas de seguridad adecuadas.
- Optimizar el rendimiento de la aplicación.
- Monitoreo y gestión de logs.
