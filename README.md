## 1. Introducción

### 1.1 Resumen del proyecto

Nuestro proyecto consiste en desarrollar una plataforma tipo **agencia** donde cualquier usuario pueda hacer **reservas de hoteles, vuelos y restaurantes** desde una sola aplicación. Para organizar bien el sistema, hemos creado tres tipos de roles: **usuarios normales**, **recepcionistas** y **administradores**, cada uno con diferentes permisos según lo que necesiten hacer.

### 1.2 Descripción de la aplicación

La app está dividida en tres partes principales:

- **Reservas de hoteles**: los usuarios pueden buscar y reservar habitaciones. Si hace falta, el recepcionista puede gestionarlo por ellos, y el admin tiene acceso total para ver o modificar cualquier cosa.
  
- **Reservas de vuelos**: el funcionamiento es parecido al de los hoteles. Los usuarios pueden reservar sus vuelos directamente, y los recepcionistas también pueden hacerlo por si las reservas se hacen en persona o por teléfono.

- **Reservas de restaurantes**: mismo concepto, pero con mesas de restaurantes. Todos los roles tienen acceso, pero cada uno con distintos niveles de permiso.

En resumen:
- El **usuario** puede hacer sus propias reservas.
- El **recepcionista** ayuda a gestionar las reservas de los clientes.
- El **administrador** lo ve y controla todo.

### 1.3 Tecnologías utilizadas

Al principio empezamos el proyecto usando **React** para el frontend y **Spring Boot** como backend. Pero más adelante decidimos **rehacerlo todo con Next.js**, porque queríamos hacer algo diferente al resto y, además, **Next.js nos simplifica el desarrollo** al juntar frontend y backend en una misma tecnología. También influyó que en nuestras **prácticas de empresa estamos utilizando Next.js**, así que ya estamos familiarizados con él y nos sentimos cómodos trabajando así.

Las tecnologías que usamos actualmente son:

- **Frontend y Backend**: Next.js
- **Lenguaje principal**: TypeScript
- **Base de datos**: MySQL
- **Control de versiones**: GitHub

## 2. Especificación de Requisitos

### 2.1 Requisitos funcionales

A continuación se detallan las funciones principales que tiene la aplicación:

- **Inicio de sesión (login)**:
  - Nada más entrar en la aplicación, se muestra un formulario de login.
  - El inicio de sesión se hace mediante **JWT**.
  - Se comprueban las credenciales del usuario con los datos guardados en una base de datos **MySQL**.
  - Según el rol del usuario, se muestran diferentes funcionalidades.

- **Gestión de reservas**:
  - Hay tres tipos de reservas: **hoteles**, **vuelos** y **restaurantes**.
  - Cada tipo de usuario tiene distintos permisos:

    - **Usuario normal**:
      - Puede crear, ver, editar y eliminar **sus propias reservas**.
      - Esto aplica tanto a hoteles, como a vuelos y restaurantes.

    - **Recepcionista**:
      - Tiene acceso a **todas las reservas de todos los usuarios**.
      - Puede **verlas, modificarlas, eliminarlas y crear nuevas**.
      - Solo puede gestionar **reservas**, no usuarios.

    - **Administrador**:
      - Tiene acceso completo a la aplicación.
      - Puede hacer todo lo que hace el recepcionista.
      - Además, puede **gestionar los usuarios** del sistema (crear, eliminar, editar...).
      - Tiene una **visión más amplia** y control total.

- **Paneles diferenciados por rol**:
  - Cada tipo de usuario accede a un panel distinto, adaptado a sus permisos.

### 2.2 Requisitos no funcionales

Aunque no forman parte directa de las funciones visibles, también tenemos en cuenta lo siguiente:

- **Seguridad**:
  - El sistema usa JWT para mantener las sesiones seguras.
  - Solo los usuarios con credenciales válidas pueden acceder.
  
- **Organización por roles**:
  - El contenido se adapta automáticamente según el tipo de usuario que ha iniciado sesión.

- **Base de datos bien estructurada**:
  - Toda la información (usuarios, reservas, etc.) se guarda y gestiona desde una base de datos **MySQL**.

- **Accesibilidad y facilidad de uso**:
  - La interfaz está pensada para ser intuitiva y fácil de manejar para cualquier usuario.

- **Desempeño**:
  - Al estar hecho en Next.js, todo está optimizado para que la aplicación cargue rápido y tenga buen rendimiento.