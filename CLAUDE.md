# CLAUDE.md — Contexto del Proyecto

## Proyecto
Sitio web para "Planeamos tus Sueños", empresa de organización de eventos
ubicada en el Oriente Antioqueño, Colombia (Rionegro, Guarne, Llanogrande).
Es un proyecto de portafolio para un desarrollador en búsqueda de empleo.

## Arquitectura
El proyecto está dividido en DOS repositorios independientes:
- **Frontend:** planeamos-tus-suenos-frontend (Next.js)
- **Backend:** planeamos-tus-suenos-backend (Django)

Se comunican via API REST. El frontend consume endpoints del backend.

## Stack Tecnológico

### Frontend
- **Framework:** Next.js 16.2 con App Router
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4 (usa @theme en globals.css, NO tailwind.config)
- **Íconos:** lucide-react (NO tiene íconos de marcas, usar SVG inline)
- **Imágenes:** URLs de Unsplash (demo)

### Backend
- **Framework:** Django 5 + Django REST Framework
- **Lenguaje:** Python 3
- **Base de datos:** SQLite (desarrollo) / PostgreSQL Supabase (producción)
- **CORS:** django-cors-headers
- **Variables de entorno:** python-decouple

### Despliegue (pendiente)
- Frontend → Vercel (gratis)
- Backend → Railway (gratis)

## Paleta de Colores (definida en globals.css @theme)
- Verde salvia: #748068 (primario, botones)
- Verde oscuro: #5C6852 (hover de botones)
- Verde claro: #E8EDDF (fondos suaves)
- Durazno: #E2C8B4 (acentos, títulos elegantes)
- Durazno claro: #F5EDE5 (fondos cálidos)
- Durazno oscuro: #C4A48E (hover de acentos)
- Negro elegante: #1A1A1A (fondos oscuros)
- Negro suave: #2C2C2C (fondos secundarios)
- Blanco cálido: #FAF7F2 (fondo general)
- Gris texto: #6B6B6B (texto secundario)

## Tipografías
- Títulos: "Cormorant Garamond" (elegante, serif)
- Cuerpo: "Jost" (moderna, sans-serif)
- Importadas desde Google Fonts en globals.css

## Estructura Frontend
```
src/
├── app/
│   ├── globals.css          ✅ @theme + estilos base + .contenedor-principal
│   ├── layout.tsx           ✅ Layout con Navbar, Footer, WhatsApp
│   ├── page.tsx             ✅ Inicio (Hero + servicios + portafolio + paquetes + CTA)
│   ├── nosotros/page.tsx    ✅ Historia, valores, cifras, cobertura
│   ├── portafolio/page.tsx  ✅ Galería con filtros — CONECTADO AL BACKEND
│   ├── catalogo/page.tsx    ✅ Productos alquiler con filtros — CONECTADO AL BACKEND
│   ├── servicios/page.tsx   ✅ Servicios personal con filtros — CONECTADO AL BACKEND
│   ├── paquetes/page.tsx    ✅ Paquetes prediseñados (usa mock.ts)
│   ├── locaciones/page.tsx  ✅ Locaciones reales del Oriente (usa mock.ts)
│   └── contacto/page.tsx    ✅ Formulario contacto + cotización (alert por ahora)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       ✅ Menú con modo escritorio + móvil + efecto scroll
│   │   ├── Footer.tsx       ✅ Pie de página 4 columnas + SVG redes sociales
│   │   └── WhatsAppFlotante.tsx ✅ Botón flotante con animación pulse
│   └── ui/
│       └── EncabezadoPagina.tsx ✅ Header reutilizable para páginas internas
├── data/
│   └── mock.ts              ✅ Datos demo (paquetes, locaciones — los que no tienen backend)
└── lib/
    ├── utils.ts             ✅ formatearPrecio, formatearFecha, etiquetas
    └── api.ts               ✅ Conector con el backend (getProductos, getServicios, etc.)
```

## Estructura Backend
```
planeamos-tus-suenos-backend/
├── config/
│   ├── settings.py          ✅ Configuración Django + DRF + CORS
│   ├── urls.py              ✅ Rutas principales con API endpoints
│   ├── wsgi.py
│   └── asgi.py
├── apps/
│   ├── catalogo/
│   │   ├── models.py        ✅ ProductoAlquiler, ServicioPersonal
│   │   ├── serializers.py   ✅ Serializers para la API
│   │   ├── views.py         ✅ ViewSets con filtros por categoría
│   │   ├── urls.py          ✅ Rutas: /productos/ y /servicios/
│   │   ├── admin.py         ✅ Panel admin configurado
│   │   └── management/commands/cargar_datos.py ✅ Script carga masiva
│   ├── portafolio/
│   │   ├── models.py        ✅ EventoPortafolio
│   │   ├── serializers.py   ✅
│   │   ├── views.py         ✅ ViewSet con filtro por tipo_evento
│   │   ├── urls.py          ✅ Ruta: /eventos/
│   │   └── admin.py         ✅
│   ├── contacto/
│   │   ├── models.py        ✅ MensajeContacto, Cotizacion
│   │   ├── serializers.py   ✅
│   │   ├── views.py         ✅ CreateModelMixin (solo crear)
│   │   ├── urls.py          ✅ Rutas: /mensajes/ y /cotizaciones/
│   │   └── admin.py         ✅
│   └── reservas/
│       ├── models.py        ✅ Reserva con estados
│       ├── serializers.py   ✅
│       ├── views.py         ✅ ViewSet con filtro por estado
│       ├── urls.py          ✅ Ruta: /reservas/
│       └── admin.py         ✅
├── manage.py
├── requirements.txt         ✅
├── .env                     (no se sube a GitHub)
├── .env.example             ✅
├── .gitignore               ✅
└── README.md                ✅
```

## API Endpoints del Backend
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/catalogo/productos/ | Lista productos (filtro: ?categoria=) |
| GET | /api/catalogo/servicios/ | Lista servicios (filtro: ?categoria=) |
| GET | /api/portafolio/eventos/ | Lista eventos (filtro: ?tipo_evento=) |
| POST | /api/contacto/mensajes/ | Crear mensaje de contacto |
| POST | /api/contacto/cotizaciones/ | Crear cotización |
| GET/POST | /api/reservas/reservas/ | CRUD de reservas (filtro: ?estado=) |

## Estado de Conexión Frontend ↔ Backend
| Página | Fuente de datos | Estado |
|--------|----------------|--------|
| Inicio (page.tsx) | mock.ts | Pendiente de conectar |
| Portafolio | API backend | ✅ Conectado |
| Catálogo | API backend | ✅ Conectado |
| Servicios | API backend | ✅ Conectado |
| Paquetes | mock.ts | Sin modelo en backend |
| Locaciones | mock.ts | Sin modelo en backend |
| Nosotros | Contenido estático | No necesita backend |
| Contacto | alert() | Pendiente de conectar POST |

## Lo que FALTA por hacer

### Fase 4 — Formularios funcionales y pagos
- [ ] Conectar formulario de contacto con POST /api/contacto/mensajes/
- [ ] Conectar formulario de cotización con POST /api/contacto/cotizaciones/
- [ ] Crear modelos de Paquete y Locacion en el backend (opcional)
- [ ] Conectar página de inicio con el backend
- [ ] Sistema de reservas con calendario
- [ ] Integración Wompi sandbox (pagos con anticipo)
- [ ] Notificaciones por correo electrónico

### Fase 5 — Pulido y despliegue
- [ ] Animaciones con Framer Motion
- [ ] SEO final (meta tags, Open Graph)
- [ ] Responsividad completa revisada
- [ ] Despliegue frontend en Vercel
- [ ] Despliegue backend en Railway con PostgreSQL
- [ ] README final con capturas de pantalla

## Convenciones de Código
- Comentarios: solo identificadores cortos, NO explicaciones largas
- Líneas cortas: evitar líneas de más de 60 caracteres en className
- Para clases largas de Tailwind: usar concatenación con + o variables
- Nombres en español para componentes y variables del negocio
- Frontend: archivos componentes en PascalCase, datos/utils en camelCase
- Backend: nombres de campos con guiones_bajos (Django convention)

## Problemas Conocidos y Soluciones
1. **Tailwind CSS v4 no usa tailwind.config.ts** → colores en globals.css con @theme
2. **lucide-react no tiene íconos de marcas** → SVG inline para Instagram, Facebook, WhatsApp
3. **`color: inherit` en CSS pisa colores de Tailwind** → no usar color: inherit en etiqueta `a`
4. **Google Fonts @import debe ir ANTES de @import "tailwindcss"** → error de parsing si no
5. **Líneas largas se cortan al copiar** → partir className en variables o concatenar con +
6. **max-w-7xl no funciona en Tailwind v4** → usar clase CSS custom `.contenedor-principal`
7. **Nombres de campos difieren** → mock usa camelCase (tipoEvento), backend usa snake_case (tipo_evento)

## Datos en la Base de Datos
- 12 productos de alquiler (mobiliario, menaje, sonido, iluminación, decoración)
- 8 servicios de personal (meseros, chef, DJ, repostería, fotografía, florería)
- 8 eventos del portafolio (bodas, quinceañeras, fiestas, corporativos)
- Cargados con: python manage.py cargar_datos

## Locaciones Reales (en mock.ts)
- Zona E: El Establo, Bali, Marrakech (Llanogrande)
- Villa Celeste (Llanogrande)
- Montana (Llanogrande)
- Zelavi (Rionegro)
- Granate Eventos (Rionegro)
- Hotel Lagoon Llanogrande (Rionegro)
- Imperial Eventos Campestre (Llanogrande)

## Cómo Ejecutar el Proyecto

### Frontend
```bash
cd planeamos-tus-suenos-frontend
npm install
npm run dev
# Abre http://localhost:3000
```

### Backend
```bash
cd planeamos-tus-suenos-backend
python -m venv entorno
entorno\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py cargar_datos
python manage.py runserver
# Abre http://127.0.0.1:8000
```

Ambos servidores deben estar activos para que las páginas conectadas funcionen.
