<h3 align="center">ZapTest Platform</h3>

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> ZapTest es una plataforma desarrollada utilizando la API de ZapSign, Django como backend, y Angular como frontend.
    <br>
</p>

## 📝 Tabla de Contenidos

- [Acerca del Proyecto](#about)
- [Primeros Pasos](#getting_started)
- [Pruebas](#testing)
- [Ejecución con Docker Compose](#docker)
- [Notas Adicionales](#notes)

## 🧐 Acerca del Proyecto <a name = "about"></a>

ZapTest permite gestionar documentos y firmantes mediante una interfaz web intuitiva. El backend utiliza Django y proporciona APIs RESTful, mientras que el frontend está construido con Angular para una experiencia de usuario fluida.

## 🏁 Primeros Pasos <a name = "getting_started"></a>

### 1. Configurar el Frontend en Angular

1. Navegar a la carpeta del frontend:
   ```bash
   cd frontend
   ```
2. Ejecutar el servidor de desarrollo de Angular:
   ```bash
   ng serve
   ```
3. Acceder al frontend en el navegador en la URL:
   [http://localhost:4200](http://localhost:4200)

### 2. Configurar el Backend en Django

1. Navegar a la carpeta del backend:
   ```bash
   cd backend
   ```
2. Crear las migraciones para la base de datos:
   ```bash
   python manage.py makemigrations
   ```
3. Aplicar las migraciones:
   ```bash
   python manage.py migrate
   ```
4. Iniciar el servidor de desarrollo de Django:
   ```bash
   python manage.py runserver
   ```

## 🔧 Pruebas <a name = "testing"></a>

Para ejecutar las pruebas automáticas del backend:

```bash
python manage.py test
```

## 🐳 Ejecución con Docker Compose <a name = "docker"></a>

1. Asegurarse de tener Docker y Docker Compose instalados.
2. En el directorio raíz del proyecto, ejecutar el siguiente comando:
   ```bash
   docker compose up
   ```
3. La aplicación estará disponible en la URL:
   [http://0.0.0.0:4200](http://0.0.0.0:4200)

## 📝 Notas Adicionales <a name = "notes"></a>

- Verificar que todos los puertos necesarios estén disponibles.
- Asegurarse de que los servicios de Docker estén activos antes de ejecutar los comandos.
- Se recomienda usar Firefox para la ejecución del Docker Compose. En ciertas ocasiones, el se necesita ingresar nuevamente al login para poder obtener las credenciales correctas de la empresa una vez haya sido creada.
