# CLAUDE.md — Contexto del Proyecto

## Proyecto
Sitio web para "Planeamos tus Sueños", empresa de organización de eventos
ubicada en el Oriente Antioqueño, Colombia (Rionegro, Guarne, Llanogrande).
Es un proyecto de portafolio para un desarrollador en búsqueda de empleo.

## Stack Tecnológico
- **Framework:** Next.js 16.2 con App Router
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS v4 (usa @theme en globals.css, NO tailwind.config)
- **Íconos:** lucide-react (NO tiene íconos de marcas como Facebook/Instagram, usar SVG inline)
- **Imágenes:** Cloudinary + Unsplash (demo)
- **Pagos:** Wompi sandbox (Fase 4)
- **Backend:** Python + Django (repositorio separado, aún no creado)
- **Base de datos:** PostgreSQL en Supabase
- **Despliegue:** Vercel (frontend) + Railway (backend) — todo gratuito

## Repositorios
- Frontend: planeamos-tus-suenos-frontend (este repo)
- Backend: planeamos-tus-suenos-backend (por crear)
- Los repos están separados por decisión de arquitectura

## Paleta de Colores (definida en globals.css @theme)
- Verde salvia: #748068 (primario, botones, acciones)
- Verde oscuro: #5C6852 (hover de botones)
- Verde claro: #E8EDDF (fondos suaves)
- Durazno: #E2C8B4 (acentos, títulos elegantes, decoración)
- Durazno claro: #F5EDE5 (fondos cálidos)
- Durazno oscuro: #C4A48E (hover de acentos)
- Negro elegante: #1A1A1A (fondos oscuros, texto principal)
- Negro suave: #2C2C2C (fondos secundarios)
- Blanco cálido: #FAF7F2 (fondo general del sitio)
- Gris texto: #6B6B6B (texto secundario)

## Tipografías
- Títulos: "Cormorant Garamond" (elegante, serif)
- Cuerpo: "Jost" (moderna, sans-serif)
- Se importan desde Google Fonts en globals.css

## Estructura de Archivos Actual
```
src/
├── app/
│   ├── globals.css          ✅ Estilos globales + @theme con colores
│   ├── layout.tsx           ✅ Layout con Navbar, Footer, WhatsApp
│   └── page.tsx             ✅ Página inicio (solo Hero por ahora)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       ✅ Menú superior con modo móvil
│   │   ├── Footer.tsx       ✅ Pie de página 4 columnas
│   │   └── WhatsAppFlotante.tsx ✅ Botón flotante WhatsApp
│   └── ui/                  (vacía, para componentes reutilizables)
├── data/
│   └── mock.ts              ✅ Datos de ejemplo (productos, servicios, portafolio, locaciones, paquetes)
└── lib/
    └── utils.ts             ✅ formatearPrecio, formatearFecha, etiquetaTipoEvento, etiquetaCategoria
```

## Lo que ya está COMPLETADO

### Fase 1 — Configuración del entorno
- [x] Proyecto Next.js 16 con TypeScript y Tailwind CSS v4
- [x] Paleta de colores personalizada (verde salvia + durazno)
- [x] Fuentes Google Fonts configuradas
- [x] .gitignore configurado
- [x] .env.local.example creado
- [x] README.md profesional
- [x] Repositorio en GitHub funcionando
- [x] next.config.ts con dominios de Cloudinary y Unsplash

### Fase 2 — Interfaz visual (EN PROGRESO)
- [x] Navbar con menú escritorio + menú móvil + efecto scroll
- [x] Footer con 4 columnas + íconos SVG de redes sociales
- [x] WhatsApp flotante con animación pulse
- [x] Layout principal conectando Navbar + Footer + WhatsApp
- [x] Página de inicio — sección Hero
- [x] Datos mock completos (12 productos, 8 servicios, 8 portafolio, 6 locaciones, 5 paquetes)
- [x] Funciones auxiliares (formatearPrecio, formatearFecha, etc.)

## Lo que FALTA por hacer

### Fase 2 — Continuar interfaz visual
- [ ] Página inicio — sección servicios destacados (cards)
- [ ] Página inicio — sección portafolio preview
- [ ] Página inicio — sección paquetes destacados
- [ ] Página inicio — sección CTA final (llamado a cotizar)
- [ ] Componente reutilizable: EncabezadoPagina (header de páginas internas)
- [ ] Componente reutilizable: FiltroBarra (filtros para catálogo/portafolio)
- [ ] Componente reutilizable: TarjetaProducto (card de producto/servicio)
- [ ] Página /nosotros
- [ ] Página /portafolio (galería con filtros por tipo de evento)
- [ ] Página /catalogo (productos de alquiler con filtros por categoría)
- [ ] Página /servicios (servicios de personal con filtros)
- [ ] Página /paquetes (paquetes prediseñados + cotizador interactivo)
- [ ] Página /locaciones (locaciones recomendadas del Oriente Antioqueño)
- [ ] Página /contacto (formulario de contacto + formulario de cotización)

### Fase 3 — Backend y API (repositorio separado)
- [ ] Crear repositorio planeamos-tus-suenos-backend
- [ ] Proyecto Django con Django REST Framework
- [ ] Modelos: Productos, Servicios, Eventos, Reservas, Clientes, Paquetes
- [ ] API REST con filtros por categoría, tipo de evento, precio
- [ ] Panel de administración Django personalizado
- [ ] Conexión con Supabase (PostgreSQL)
- [ ] Subida de imágenes a Cloudinary

### Fase 4 — Reservas, formularios y pagos
- [ ] Formulario de cotización de evento completo
- [ ] Formulario de reserva de alquiler
- [ ] Formulario de contratación de personal
- [ ] Calendario de disponibilidad
- [ ] Integración Wompi sandbox (pagos con anticipo)
- [ ] Notificaciones por correo electrónico

### Fase 5 — Pulido y despliegue
- [ ] Responsividad completa (mobile first)
- [ ] SEO optimizado
- [ ] Animaciones con Framer Motion
- [ ] Despliegue frontend en Vercel
- [ ] Despliegue backend en Railway
- [ ] README final con capturas de pantalla

## Convenciones de Código
- Comentarios: solo identificadores cortos, NO explicaciones largas
- Líneas cortas: evitar líneas de más de 60 caracteres en className
- Para clases largas de Tailwind: usar concatenación con + o variables
- Nombres en español para componentes y variables del negocio
- Archivos de componentes en PascalCase: Navbar.tsx, Footer.tsx
- Archivos de datos y utilidades en camelCase: mock.ts, utils.ts

## Problemas Conocidos y Soluciones
1. **Tailwind CSS v4 no usa tailwind.config.ts** — los colores se definen en globals.css con @theme
2. **lucide-react no tiene íconos de marcas** — usar SVG inline para Instagram, Facebook, WhatsApp
3. **`color: inherit` en CSS base pisa colores de Tailwind** — no usar `color: inherit` en la etiqueta `a` de globals.css
4. **Google Fonts @import debe ir ANTES de @import "tailwindcss"** — si no, da error de parsing
5. **Líneas largas se cortan al copiar** — partir className en variables o usar concatenación con +

## Secciones del Sitio Web
| Sección | Ruta | Contenido |
|---------|------|-----------|
| Inicio | / | Hero + servicios + portafolio + paquetes + CTA |
| Nosotros | /nosotros | Historia, valores, cobertura |
| Portafolio | /portafolio | Galería filtrable por tipo de evento |
| Catálogo | /catalogo | Alquiler: mobiliario, menaje, sonido, iluminación, decoración |
| Servicios | /servicios | Personal: meseros, chef, DJ, repostería, fotografía, florería |
| Paquetes | /paquetes | Paquetes prediseñados + cotizador interactivo |
| Locaciones | /locaciones | Haciendas y salones del Oriente Antioqueño |
| Contacto | /contacto | Formulario contacto + formulario cotización evento |

## Categorías del Catálogo de Alquiler
- Mobiliario (sillas, mesas, lounge)
- Menaje y Cristalería (cubiertos, vajilla, copas de vino/champaña/margarita)
- Sonido (equipos de sonido, micrófonos)
- Iluminación (candelabros de mesa, candelabros de piso, luces LED)
- Decoración (arcos florales, centros de mesa)

## Servicios de Personal
- Meseros profesionales
- Chef (bodas, parrilla)
- DJ + equipo
- Repostería (mesa de postres, tortas)
- Fotografía profesional
- Decoración floral

## Tipos de Evento
- Boda
- Quinceañera
- Fiesta (cumpleaños, grados)
- Corporativo (empresarial)
