# 📦 Plataforma de Renta y Administración de Bodegas

## 📌 Descripción
Esta plataforma digital permite la gestión de bodegas en diversas sedes, facilitando el alquiler, la administración de precios y la disponibilidad. Los administradores pueden gestionar la ocupación y tarifas, mientras que los clientes pueden registrar cuentas, alquilar bodegas y realizar pagos. La integración con Stripe permite pagos recurrentes y se cuenta con un sistema de notificaciones automáticas para recordar vencimientos y pagos pendientes.

## 🚀 Características principales
- Gestión de ocupación, precios y disponibilidad de bodegas.
- Registro y administración de clientes.
- Alquiler y pago en línea con integración de **Stripe**.
- Notificaciones automáticas de vencimientos y pagos pendientes.
- Dashboards personalizados según el rol del usuario (administrador, cliente, etc.).

## 🏗️ Estructura del Proyecto
```
/tu-proyecto
│── /backend              # API y lógica del servidor
│   ├── /config           # Configuración global (DB, Stripe, env variables)
│   ├── /controllers      # Controladores de solicitudes
│   ├── /models           # Modelos de la base de datos
│   ├── /routes           # Rutas del backend
│   ├── /services         # Lógica de negocio
│   ├── /middlewares      # Seguridad y validaciones
│   ├── /utils            # Funciones auxiliares
│   ├── /tests            # Pruebas unitarias e integración
│   └── server.js         # Punto de entrada del backend
│
│── /frontend             # Aplicación React
│   ├── /public           # Archivos estáticos
│   ├── /src              # Código fuente
│   │   ├── /components   # Componentes reutilizables
│   │   ├── /hooks        # Hooks personalizados
│   │   ├── /layouts      # Diseños generales
│   │   ├── /pages        # Páginas principales
│   │   ├── /routes       # Rutas de la app
│   │   ├── /services     # Conexión con el backend
│   │   ├── /store        # Estado global
│   │   ├── /styles       # Estilos CSS/SASS
│   │   └── main.jsx      # Entrada de React
│
│── .env                  # Variables de entorno
│── package.json          # Configuración del proyecto
│── README.md             # Documentación
```

## 🛠️ Tecnologías Utilizadas
- **Backend:** Node.js (Express) / Spring Boot
- **Base de datos:** PostgreSQL / MySQL
- **Frontend:** React.js + Vite
- **Autenticación:** JSON Web Tokens (JWT)
- **Pagos:** Stripe
- **Notificaciones:** Twilio / Email (Nodemailer)

## 📦 Instalación y Configuración
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
   ```
2. Configurar variables de entorno en `.env`:
   ```sh
   STRIPE_SECRET_KEY=your_stripe_secret_key
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```
3. Instalar dependencias en el backend y frontend:
   ```sh
   cd backend && npm install
   cd ../frontend && npm install
   ```
4. Iniciar el backend:
   ```sh
   npm run dev
   ```
5. Iniciar el frontend:
   ```sh
   npm run dev
   ```

## 📌 Contribución
1. Crea un **fork** del repositorio.
2. Crea una nueva rama (`git checkout -b feature-nueva`).
3. Realiza los cambios y haz commit (`git commit -m "Añadir nueva funcionalidad"`).
4. Envía un **pull request**.

## 📜 Licencia
Este proyecto está bajo la licencia **MIT**.

