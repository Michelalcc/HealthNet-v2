<<<<<<< HEAD
# 🏥 HealthNet v2

> Sistema de diagnóstico clínico con Inteligencia Artificial para detección de riesgo de fibromas.

=======
<<<<<<< HEAD
HealthNet v2 🏥
=======
# 🏥 HealthNet v2
>>>>>>> 2c8ad66 (Actualización del proyecto)

> Sistema de diagnóstico clínico con Inteligencia Artificial para detección de riesgo de fibromas.

<<<<<<< HEAD
⚡ Inicio rápido con Docker
🔧 Requisitos
Docker Desktop instalado y en ejecución
(Opcional) Git instalado
🚀 Opción 1: Usando Git (recomendado)
1. Clonar el repositorio
=======
>>>>>>> cd539b1 (Actualización del proyecto)
---

## ⚡ Inicio rápido

Tienes dos formas de instalar el proyecto. **Elige la que mejor se adapte a ti:**

| | Opción | Cuándo usarla |
|---|---|---|
| 🔵 | **Opción 1 — Con Git** | Si ya tienes Git instalado o quieres la forma más rápida. Un solo comando descarga todo. |
| 🟢 | **Opción 2 — Sin Git** | Si no tienes Git. Descargas el proyecto como un archivo ZIP desde el navegador, sin instalar nada extra. |

---

## 🔧 Requisito previo (ambas opciones)

Necesitas tener instalado **Docker Desktop** — es el programa que permite ejecutar HealthNet sin instalar nada más.

📥 Descárgalo aquí: [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

> ⚠️ Una vez instalado, **abre Docker Desktop** y espera a que el ícono de la ballena esté en verde antes de continuar.

---

## 🔵 Opción 1 — Con Git *(recomendada)*

### Paso 1 — Abrir la terminal

La terminal es la ventana donde escribirás los comandos:
- **Windows:** Busca `PowerShell` o `CMD` en el menú Inicio y ábrelo.
- **Mac:** Busca `Terminal` con Spotlight (`Cmd + Espacio`) y ábrela.
- **Linux:** Abre la Terminal desde el menú de aplicaciones.

### Paso 2 — Descargar el proyecto

> "Clonar" es simplemente **descargar una copia del proyecto** a tu computadora.

Copia este comando, pégalo en la terminal y presiona **Enter**:

```bash
<<<<<<< HEAD
=======
>>>>>>> 2c8ad66 (Actualización del proyecto)
>>>>>>> cd539b1 (Actualización del proyecto)
git clone https://github.com/Michelalcc/HealthNet-v2.git
```

### Paso 3 — Entrar a la carpeta del proyecto

```bash
cd HealthNet-v2
<<<<<<< HEAD
```

> `cd` significa "cambiar de carpeta". Es como hacer doble clic en una carpeta, pero desde la terminal.

### Paso 4 — Encender el sistema

> "Levantar" el proyecto significa simplemente **encender todos los componentes del sistema**.

```bash
=======
<<<<<<< HEAD
2. Levantar el proyecto
>>>>>>> cd539b1 (Actualización del proyecto)
docker-compose up --build
```

> ⏱️ **La primera vez puede tardar ~2 minutos.** Docker está descargando e instalando todo lo necesario. Las veces siguientes tardará solo ~10 segundos.

Cuando veas este mensaje en la terminal, el sistema ya está listo:

```
healthnet_db       | database system is ready to accept connections
healthnet_backend  | Servidor corriendo en el puerto 3000
```

### Paso 5 — Abrir en el navegador

Abre tu navegador y copia esta dirección en la barra de arriba:

```
http://localhost:3000/pages/index.html
```

---

## 🟢 Opción 2 — Sin Git

### Paso 1 — Ir al repositorio en GitHub

> GitHub es el sitio web donde está guardado el proyecto.

Abre una nueva pestaña en tu navegador (`Ctrl+T` o `Cmd+T`) y entra a:

```
https://github.com/Michelalcc/HealthNet-v2
```

### Paso 2 — Descargar el archivo ZIP

1. Busca el botón verde que dice **`Code`** en la parte superior derecha de la página.
2. Haz clic en ese botón verde.
3. En el menú que aparece, haz clic en **`Download ZIP`**.
4. El archivo ZIP se descargará automáticamente a tu carpeta de **Descargas**.

### Paso 3 — Extraer (descomprimir) el archivo

El ZIP es como un sobre cerrado — necesitas abrirlo:

- **Windows:** Clic derecho sobre el archivo ZIP → `Extraer aquí` o `Extraer todo`.
- **Mac:** Doble clic sobre el archivo ZIP. Se extrae automáticamente.

### Paso 4 — Renombrar la carpeta

Al extraer, se crea una carpeta llamada `HealthNet-v2-main`. Debes **quitarle el `-main` del final**:

```
HealthNet-v2-main  →  HealthNet-v2
```

> **¿Cómo renombrar?**
> - **Windows:** Clic derecho sobre la carpeta → `Cambiar nombre`.
> - **Mac:** Clic lento (no doble clic) sobre la carpeta y escribe el nuevo nombre.

### Paso 5 — Abrir la terminal en la carpeta del proyecto

- **Windows** — Abre `PowerShell` y escribe (reemplaza `TuNombre` con tu usuario):

```bash
cd C:\Users\TuNombre\HealthNet-v2
```

> 💡 **Atajo en Windows:** Abre la carpeta `HealthNet-v2` en el Explorador de archivos, haz clic en la barra de dirección (arriba), escribe `cmd` y presiona **Enter**. Se abre la terminal directo en esa carpeta.

- **Mac / Linux** — Abre la Terminal y escribe:

```bash
cd ~/Documents/HealthNet-v2
```

### Paso 6 — Encender el sistema

Con la terminal abierta en la carpeta del proyecto, copia y pega este comando y presiona **Enter**:

```bash
docker-compose up --build
```

> ⏱️ **La primera vez puede tardar ~2 minutos.** Las veces siguientes tardarán solo ~10 segundos.

Cuando veas este mensaje, el sistema ya está listo:

```
healthnet_db       | database system is ready to accept connections
healthnet_backend  | Servidor corriendo en el puerto 3000
```

### Paso 7 — Abrir en el navegador

Abre tu navegador y copia esta dirección en la barra de arriba:

```
http://localhost:3000/pages/index.html
```

<<<<<<< HEAD
---
=======
⚠️ Este comando elimina completamente la base de datos y la reconstruye desde schema.sql.
=======
```

> `cd` significa "cambiar de carpeta". Es como hacer doble clic en una carpeta, pero desde la terminal.

### Paso 4 — Encender el sistema

> "Levantar" el proyecto significa simplemente **encender todos los componentes del sistema**.

```bash
docker-compose up --build
```

> ⏱️ **La primera vez puede tardar ~2 minutos.** Docker está descargando e instalando todo lo necesario. Las veces siguientes tardará solo ~10 segundos.

Cuando veas este mensaje en la terminal, el sistema ya está listo:

```
healthnet_db       | database system is ready to accept connections
healthnet_backend  | Servidor corriendo en el puerto 3000
```

### Paso 5 — Abrir en el navegador

Abre tu navegador y copia esta dirección en la barra de arriba:

```
http://localhost:3000/pages/index.html
```

---

## 🟢 Opción 2 — Sin Git

### Paso 1 — Ir al repositorio en GitHub

> GitHub es el sitio web donde está guardado el proyecto.

Abre una nueva pestaña en tu navegador (`Ctrl+T` o `Cmd+T`) y entra a:

```
https://github.com/Michelalcc/HealthNet-v2
```

### Paso 2 — Descargar el archivo ZIP

1. Busca el botón verde que dice **`Code`** en la parte superior derecha de la página.
2. Haz clic en ese botón verde.
3. En el menú que aparece, haz clic en **`Download ZIP`**.
4. El archivo ZIP se descargará automáticamente a tu carpeta de **Descargas**.

### Paso 3 — Extraer (descomprimir) el archivo

El ZIP es como un sobre cerrado — necesitas abrirlo:

- **Windows:** Clic derecho sobre el archivo ZIP → `Extraer aquí` o `Extraer todo`.
- **Mac:** Doble clic sobre el archivo ZIP. Se extrae automáticamente.

### Paso 4 — Renombrar la carpeta

Al extraer, se crea una carpeta llamada `HealthNet-v2-main`. Debes **quitarle el `-main` del final**:

```
HealthNet-v2-main  →  HealthNet-v2
```

> **¿Cómo renombrar?**
> - **Windows:** Clic derecho sobre la carpeta → `Cambiar nombre`.
> - **Mac:** Clic lento (no doble clic) sobre la carpeta y escribe el nuevo nombre.

### Paso 5 — Abrir la terminal en la carpeta del proyecto

- **Windows** — Abre `PowerShell` y escribe (reemplaza `TuNombre` con tu usuario):

```bash
cd C:\Users\TuNombre\HealthNet-v2
```

> 💡 **Atajo en Windows:** Abre la carpeta `HealthNet-v2` en el Explorador de archivos, haz clic en la barra de dirección (arriba), escribe `cmd` y presiona **Enter**. Se abre la terminal directo en esa carpeta.

- **Mac / Linux** — Abre la Terminal y escribe:

```bash
cd ~/Documents/HealthNet-v2
```

### Paso 6 — Encender el sistema

Con la terminal abierta en la carpeta del proyecto, copia y pega este comando y presiona **Enter**:

```bash
docker-compose up --build
```

> ⏱️ **La primera vez puede tardar ~2 minutos.** Las veces siguientes tardarán solo ~10 segundos.

Cuando veas este mensaje, el sistema ya está listo:

```
healthnet_db       | database system is ready to accept connections
healthnet_backend  | Servidor corriendo en el puerto 3000
```

### Paso 7 — Abrir en el navegador

Abre tu navegador y copia esta dirección en la barra de arriba:

```
http://localhost:3000/pages/index.html
```

---
>>>>>>> 2c8ad66 (Actualización del proyecto)
>>>>>>> cd539b1 (Actualización del proyecto)

## 👤 Credenciales de acceso

<<<<<<< HEAD
> 🔑 La contraseña de **todos** los usuarios es: `hn1234`
=======
<<<<<<< HEAD
Contraseña de todos los usuarios: hn1234
>>>>>>> cd539b1 (Actualización del proyecto)

| ID | Email | Rol | Hospital |
|----|-------|-----|----------|
| 1 | `admin@healthnet.com` | Admin | — |
| 2 | `hnch@healthnet.com` | Doctor | Cayetano Heredia |
| 3 | `hnal@healthnet.com` | Doctor | Arzobispo Loayza |
| 4 | `hndm@healthnet.com` | Doctor | Dos de Mayo |
| 5 | `cardio1_hnch@healthnet.com` | Especialista | Cayetano Heredia |
| 6 | `cardio2_hnch@healthnet.com` | Especialista | Cayetano Heredia |
| 7 | `cardio3_hnch@healthnet.com` | Especialista | Cayetano Heredia |
| 8 | `cardio1_hnal@healthnet.com` | Especialista | Arzobispo Loayza |
| 9 | `cardio2_hnal@healthnet.com` | Especialista | Arzobispo Loayza |
| 10 | `cardio3_hnal@healthnet.com` | Especialista | Arzobispo Loayza |
| 11 | `cardio1_hndm@healthnet.com` | Especialista | Dos de Mayo |
| 12 | `cardio2_hndm@healthnet.com` | Especialista | Dos de Mayo |
| 13 | `cardio3_hndm@healthnet.com` | Especialista | Dos de Mayo |

<<<<<<< HEAD
---
=======
=======
> 🔑 La contraseña de **todos** los usuarios es: `hn1234`

| ID | Email | Rol | Hospital |
|----|-------|-----|----------|
| 1 | `admin@healthnet.com` | Admin | — |
| 2 | `hnch@healthnet.com` | Doctor | Cayetano Heredia |
| 3 | `hnal@healthnet.com` | Doctor | Arzobispo Loayza |
| 4 | `hndm@healthnet.com` | Doctor | Dos de Mayo |
| 5 | `cardio1_hnch@healthnet.com` | Especialista | Cayetano Heredia |
| 6 | `cardio2_hnch@healthnet.com` | Especialista | Cayetano Heredia |
| 7 | `cardio3_hnch@healthnet.com` | Especialista | Cayetano Heredia |
| 8 | `cardio1_hnal@healthnet.com` | Especialista | Arzobispo Loayza |
| 9 | `cardio2_hnal@healthnet.com` | Especialista | Arzobispo Loayza |
| 10 | `cardio3_hnal@healthnet.com` | Especialista | Arzobispo Loayza |
| 11 | `cardio1_hndm@healthnet.com` | Especialista | Dos de Mayo |
| 12 | `cardio2_hndm@healthnet.com` | Especialista | Dos de Mayo |
| 13 | `cardio3_hndm@healthnet.com` | Especialista | Dos de Mayo |

---
>>>>>>> 2c8ad66 (Actualización del proyecto)
>>>>>>> cd539b1 (Actualización del proyecto)

## 🔐 Permisos por rol

<<<<<<< HEAD
| Función | Admin | Doctor | Especialista |
|---------|:-----:|:------:|:------------:|
| Dashboard y estadísticas | ✅ | ✅ | ❌ |
| Ver lista de pacientes | ✅ | ✅ | ❌ |
| Registrar nuevos pacientes | ✅ | ✅ | ❌ |
| Diagnóstico con IA | ❌ | ❌ | ✅ |
| Ver historial de diagnósticos | ✅ | ✅ | ✅ |
| Gestionar usuarios del sistema | ✅ | ❌ | ❌ |
| Ver hospitales registrados | ✅ | ❌ | ❌ |

---
=======
<<<<<<< HEAD

=======
| Función | Admin | Doctor | Especialista |
|---------|:-----:|:------:|:------------:|
| Dashboard y estadísticas | ✅ | ✅ | ❌ |
| Ver lista de pacientes | ✅ | ✅ | ❌ |
| Registrar nuevos pacientes | ✅ | ✅ | ❌ |
| Diagnóstico con IA | ❌ | ❌ | ✅ |
| Ver historial de diagnósticos | ✅ | ✅ | ✅ |
| Gestionar usuarios del sistema | ✅ | ❌ | ❌ |
| Ver hospitales registrados | ✅ | ❌ | ❌ |

---

## 🛑 Comandos del día a día

| Qué quieres hacer | Comando |
|---|---|
| Encender (primera vez o con cambios) | `docker-compose up --build` |
| Encender (veces siguientes) | `docker-compose up` |
| Encender en segundo plano | `docker-compose up -d` |
| Apagar el sistema | `docker-compose down` |
| Ver mensajes del sistema en vivo | `docker-compose logs -f` |
| Borrar datos y empezar de cero | `docker-compose down -v` |

> ⚠️ **`docker-compose down -v`** elimina **completamente** la base de datos y la reconstruye desde `schema.sql`. Úsalo solo si quieres empezar desde cero — perderás todos los datos guardados.

---
>>>>>>> 2c8ad66 (Actualización del proyecto)
>>>>>>> cd539b1 (Actualización del proyecto)

## 🛑 Comandos del día a día

| Qué quieres hacer | Comando |
|---|---|
| Encender (primera vez o con cambios) | `docker-compose up --build` |
| Encender (veces siguientes) | `docker-compose up` |
| Encender en segundo plano | `docker-compose up -d` |
| Apagar el sistema | `docker-compose down` |
| Ver mensajes del sistema en vivo | `docker-compose logs -f` |
| Borrar datos y empezar de cero | `docker-compose down -v` |

> ⚠️ **`docker-compose down -v`** elimina **completamente** la base de datos y la reconstruye desde `schema.sql`. Úsalo solo si quieres empezar desde cero — perderás todos los datos guardados.

---

## 🗂️ Estructura del proyecto

```
HealthNet-v2/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── pages/
│   ├── scripts/
│   ├── styles/
│   └── assets/
├── schema.sql
├── Dockerfile
├── docker-compose.yml
└── README.md
<<<<<<< HEAD
=======
<<<<<<< HEAD
🛠️ Instalación manual (sin Docker)
Requisitos
Node.js 18+
PostgreSQL 14+
1. Crear base de datos
=======
>>>>>>> cd539b1 (Actualización del proyecto)
```

---

## 🛠️ Instalación manual (sin Docker)

Solo si prefieres no usar Docker. Necesitas tener instalado: **Node.js 18+** y **PostgreSQL 14+**

**1. Crear la base de datos:**

```bash
<<<<<<< HEAD
=======
>>>>>>> 2c8ad66 (Actualización del proyecto)
>>>>>>> cd539b1 (Actualización del proyecto)
psql -U postgres -c "CREATE DATABASE healthnetv2;"
psql -U postgres -c "CREATE USER michelalfonzoc WITH PASSWORD 'hn1234';"
psql -U postgres -c "GRANT ALL ON DATABASE healthnetv2 TO michelalfonzoc;"
psql -U michelalfonzoc -d healthnetv2 -f schema.sql
<<<<<<< HEAD
```

**2. Instalar dependencias:**

```bash
=======
<<<<<<< HEAD
2. Instalar dependencias
>>>>>>> cd539b1 (Actualización del proyecto)
cd backend
npm install
```

**3. Ejecutar el servidor:**

```bash
npm run dev
```

**4. Abrir en el navegador:**

```
http://localhost:3000/pages/index.html
```

---

<<<<<<< HEAD
=======
Fin
=======
```

**2. Instalar dependencias:**

```bash
cd backend
npm install
```

**3. Ejecutar el servidor:**

```bash
npm run dev
```

**4. Abrir en el navegador:**

```
http://localhost:3000/pages/index.html
```

---

>>>>>>> cd539b1 (Actualización del proyecto)
## 🌐 API Endpoints

| Método | Ruta | Descripción | Roles |
|--------|------|-------------|-------|
| POST | `/api/auth/login` | Iniciar sesión | Todos |
| GET | `/api/dashboard` | Estadísticas generales | Admin, Doctor |
| GET | `/api/patients` | Listar pacientes | Admin, Doctor |
| POST | `/api/patients` | Registrar paciente | Admin, Doctor |
| GET | `/api/patients/:id` | Ver paciente | Admin, Doctor |
| GET | `/api/diagnosis/paciente/:id` | Historial de diagnósticos | Todos |
| POST | `/api/diagnosis` | Crear diagnóstico con IA | Especialista |
| GET | `/api/hospitals` | Listar hospitales | Todos |
| POST | `/api/hospitals` | Crear hospital | Admin |
| GET | `/api/users` | Listar usuarios | Admin |
| POST | `/api/users` | Crear usuario | Admin |
| DELETE | `/api/users/:id` | Eliminar usuario | Admin |
| GET | `/api/alerts` | Feed de actividad | Admin, Doctor |

---

## 🏥 Hospitales del sistema

| ID | Nombre | Código |
|----|--------|--------|
| 1 | Hospital Nacional Cayetano Heredia | HNCH |
| 2 | Hospital Nacional Arzobispo Loayza | HNAL |
| 3 | Hospital Nacional Dos de Mayo | HNDM |

---

## ✅ Estado del proyecto

- ✔ Backend funcional
- ✔ Frontend funcional  
- ✔ Docker operativo
<<<<<<< HEAD
- ✔ Base de datos inicializada correctamente
=======
- ✔ Base de datos inicializada correctamente
>>>>>>> 2c8ad66 (Actualización del proyecto)
>>>>>>> cd539b1 (Actualización del proyecto)
