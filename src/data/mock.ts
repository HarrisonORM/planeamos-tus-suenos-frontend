// Datos de ejemplo para demostración
// Se reemplazarán por datos reales del backend en la Fase 3

// Imágenes de Unsplash (banco de fotos gratuitas)
const IMG = {
    boda1: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    boda2: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
    boda3: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800",
    boda4: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
    quince1: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
    quince2: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800",
    fiesta1: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
    fiesta2: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800",
    corporativo1: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
    silla: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
    mesa: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600",
    copas: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600",
    cubiertos: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600",
    sonido: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600",
    candelabros: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=600",
    meseros: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
    chef: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600",
    dj: "https://images.unsplash.com/photo-1571266028243-d220c6a1b0e4?w=600",
    reposteria: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600",
    fotografia: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600",
    flores: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600",
    hacienda1: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    hacienda2: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
    hacienda3: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
    salon1: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
};


// ═══════════════════════════════════════════════════
// PRODUCTOS DE ALQUILER
// ═══════════════════════════════════════════════════

export const productosAlquiler = [
    {
        id: 1,
        nombre: "Silla Tiffany Dorada",
        descripcion: "Silla elegante en color dorado, ideal para bodas y eventos formales. Asiento acolchado incluido.",
        categoria: "mobiliario",
        precio: 5500,
        unidad: "por día",
        imagen: IMG.silla,
        tiposEvento: ["boda", "quinceañera", "corporativo"],
    },
    {
        id: 2,
        nombre: "Mesa Redonda para 8",
        descripcion: "Mesa redonda de 1.50m con mantelería blanca incluida.",
        categoria: "mobiliario",
        precio: 28000,
        unidad: "por día",
        imagen: IMG.mesa,
        tiposEvento: ["boda", "quinceañera", "corporativo", "fiesta"],
    },
    {
        id: 3,
        nombre: "Silla Crossback Madera",
        descripcion: "Silla rústica en madera natural, perfecta para eventos al aire libre.",
        categoria: "mobiliario",
        precio: 6500,
        unidad: "por día",
        imagen: IMG.silla,
        tiposEvento: ["boda", "fiesta"],
    },
    {
        id: 4,
        nombre: "Copa de Vino Cristal",
        descripcion: "Copa de cristal para vino tinto. Capacidad 300ml.",
        categoria: "menaje",
        precio: 1800,
        unidad: "por día",
        imagen: IMG.copas,
        tiposEvento: ["boda", "quinceañera", "corporativo"],
    },
    {
        id: 5,
        nombre: "Copa de Champaña Flauta",
        descripcion: "Copa alargada de cristal para champaña y vino espumoso.",
        categoria: "menaje",
        precio: 2000,
        unidad: "por día",
        imagen: IMG.copas,
        tiposEvento: ["boda", "quinceañera", "corporativo"],
    },
    {
        id: 6,
        nombre: "Set de Cubertería Dorada",
        descripcion: "Juego completo por persona: tenedor, cuchillo, cuchara. Acabado dorado.",
        categoria: "menaje",
        precio: 3500,
        unidad: "por día",
        imagen: IMG.cubiertos,
        tiposEvento: ["boda", "quinceañera"],
    },
    {
        id: 7,
        nombre: "Vajilla de Porcelana Blanca",
        descripcion: "Set de tres piezas: plato base, plato principal, plato postre.",
        categoria: "menaje",
        precio: 4200,
        unidad: "por día",
        imagen: IMG.cubiertos,
        tiposEvento: ["boda", "quinceañera", "corporativo"],
    },
    {
        id: 8,
        nombre: "Equipo de Sonido Profesional",
        descripcion: "Sistema completo: 2 bafles 1000W, mesa de mezcla, 2 micrófonos inalámbricos.",
        categoria: "sonido",
        precio: 350000,
        unidad: "por día",
        imagen: IMG.sonido,
        tiposEvento: ["boda", "quinceañera", "corporativo", "fiesta"],
    },
    {
        id: 9,
        nombre: "Candelabro Dorado de Mesa",
        descripcion: "Candelabro elegante de 5 velas. Altura 45cm. Incluye velas.",
        categoria: "iluminacion",
        precio: 22000,
        unidad: "por día",
        imagen: IMG.candelabros,
        tiposEvento: ["boda", "quinceañera"],
    },
    {
        id: 10,
        nombre: "Candelabro de Piso Clásico",
        descripcion: "Candelabro alto de piso, 1.20m de altura. Aspecto señorial.",
        categoria: "iluminacion",
        precio: 45000,
        unidad: "por día",
        imagen: IMG.candelabros,
        tiposEvento: ["boda"],
    },
    {
        id: 11,
        nombre: "Luces LED de Colores",
        descripcion: "Set de 10 luces LED ambientales con control remoto y múltiples colores.",
        categoria: "iluminacion",
        precio: 85000,
        unidad: "por día",
        imagen: IMG.sonido,
        tiposEvento: ["quinceañera", "fiesta", "corporativo"],
    },
    {
        id: 12,
        nombre: "Arco Floral para Ceremonia",
        descripcion: "Estructura metálica dorada de 2.5m con adorno floral personalizable.",
        categoria: "decoracion",
        precio: 180000,
        unidad: "por día",
        imagen: IMG.flores,
        tiposEvento: ["boda"],
    },
];


// ═══════════════════════════════════════════════════
// SERVICIOS DE PERSONAL
// ═══════════════════════════════════════════════════

export const serviciosPersonales = [
    {
        id: 1,
        nombre: "Mesero Profesional",
        descripcion: "Personal uniformado con experiencia en eventos formales.",
        categoria: "meseros",
        precio: 180000,
        unidad: "por evento",
        imagen: IMG.meseros,
        tiposEvento: ["boda", "quinceañera", "corporativo", "fiesta"],
    },
    {
        id: 2,
        nombre: "Chef Especializado en Bodas",
        descripcion: "Chef con 10+ años de experiencia. Menú personalizado hasta 300 invitados.",
        categoria: "chef",
        precio: 1800000,
        unidad: "por evento",
        imagen: IMG.chef,
        tiposEvento: ["boda", "quinceañera", "corporativo"],
    },
    {
        id: 3,
        nombre: "Chef Parrilla & Estaciones",
        descripcion: "Especialista en asado en vivo y parrilla argentina.",
        categoria: "chef",
        precio: 1200000,
        unidad: "por evento",
        imagen: IMG.chef,
        tiposEvento: ["fiesta", "corporativo"],
    },
    {
        id: 4,
        nombre: "DJ Profesional + Equipo",
        descripcion: "DJ con equipo completo, luces y animación. Música personalizada.",
        categoria: "dj",
        precio: 850000,
        unidad: "por evento",
        imagen: IMG.dj,
        tiposEvento: ["boda", "quinceañera", "fiesta"],
    },
    {
        id: 5,
        nombre: "Mesa de Postres Gourmet",
        descripcion: "Mesa decorada con variedad de postres artesanales para hasta 100 personas.",
        categoria: "reposteria",
        precio: 650000,
        unidad: "por evento",
        imagen: IMG.reposteria,
        tiposEvento: ["boda", "quinceañera", "corporativo"],
    },
    {
        id: 6,
        nombre: "Torta Personalizada",
        descripcion: "Torta de 3 a 5 pisos, sabores a elección, decoración personalizada.",
        categoria: "reposteria",
        precio: 480000,
        unidad: "por evento",
        imagen: IMG.reposteria,
        tiposEvento: ["boda", "quinceañera"],
    },
    {
        id: 7,
        nombre: "Fotografía Profesional",
        descripcion: "Cobertura completa: 8 horas, 500+ fotos editadas entregadas en 15 días.",
        categoria: "fotografia",
        precio: 1600000,
        unidad: "por evento",
        imagen: IMG.fotografia,
        tiposEvento: ["boda", "quinceañera", "corporativo", "fiesta"],
    },
    {
        id: 8,
        nombre: "Decoración Floral Completa",
        descripcion: "Ambientación floral integral: mesa principal, centros de mesa y entrada.",
        categoria: "floreria",
        precio: 2200000,
        unidad: "por evento",
        imagen: IMG.flores,
        tiposEvento: ["boda", "quinceañera"],
    },
];


// ═══════════════════════════════════════════════════
// PORTAFOLIO — Eventos realizados
// ═══════════════════════════════════════════════════

export const portafolio = [
    {
        id: 1,
        titulo: "Boda María & Juan",
        descripcion: "Ceremonia al aire libre en hacienda tradicional",
        tipoEvento: "boda",
        imagen: IMG.boda1,
        fecha: "2024-11-15",
        lugar: "Hacienda El Paraíso, Guarne",
    },
    {
        id: 2,
        titulo: "Quinceañera Isabella",
        descripcion: "Celebración estilo princesa con ambientación dorada",
        tipoEvento: "quinceañera",
        imagen: IMG.quince1,
        fecha: "2024-10-20",
        lugar: "Salón Los Rosales, Rionegro",
    },
    {
        id: 3,
        titulo: "Boda Sofía & Andrés",
        descripcion: "Boda íntima con 80 invitados en jardín privado",
        tipoEvento: "boda",
        imagen: IMG.boda2,
        fecha: "2024-09-07",
        lugar: "Llanogrande, Rionegro",
    },
    {
        id: 4,
        titulo: "Quinceañera Valentina",
        descripcion: "Fiesta temática con show de luces y coreografía",
        tipoEvento: "quinceañera",
        imagen: IMG.quince2,
        fecha: "2024-08-12",
        lugar: "Hacienda La Pradera, La Ceja",
    },
    {
        id: 5,
        titulo: "Evento Corporativo GrupoX",
        descripcion: "Evento de fin de año con 200 asistentes",
        tipoEvento: "corporativo",
        imagen: IMG.corporativo1,
        fecha: "2024-12-18",
        lugar: "Rionegro",
    },
    {
        id: 6,
        titulo: "Boda Laura & Carlos",
        descripcion: "Boda campestre con detalles rústicos y florales",
        tipoEvento: "boda",
        imagen: IMG.boda3,
        fecha: "2024-07-22",
        lugar: "Finca Los Olivos, Marinilla",
    },
    {
        id: 7,
        titulo: "Cumpleaños 40 — Patricia",
        descripcion: "Fiesta temática años 80 con show en vivo",
        tipoEvento: "fiesta",
        imagen: IMG.fiesta1,
        fecha: "2024-06-15",
        lugar: "Llanogrande",
    },
    {
        id: 8,
        titulo: "Boda Camila & David",
        descripcion: "Ceremonia religiosa + recepción de gala para 250 personas",
        tipoEvento: "boda",
        imagen: IMG.boda4,
        fecha: "2024-05-11",
        lugar: "Rionegro",
    },
];


// ═══════════════════════════════════════════════════
// LOCACIONES RECOMENDADAS
// ═══════════════════════════════════════════════════

export const locaciones = [
    {
        id: 1,
        nombre: "Zona E — El Establo",
        descripcion:
            "Espíritu rústico y cálido estilo granero. "
            + "Lago y bosque de eucaliptos para "
            + "ceremonias al aire libre. "
            + "287.000 m² de entretenimiento.",
        municipio: "Llanogrande",
        capacidad: 250,
        precio: "Consultar",
        imagen: IMG.hacienda1,
        tiposEvento: ["boda", "quinceañera", "corporativo"],
    },
    {
        id: 2,
        nombre: "Zona E — Bali",
        descripcion:
            "Espejo de agua, detalles en madera y "
            + "vegetación exuberante que transporta "
            + "al ambiente exótico de Bali.",
        municipio: "Llanogrande",
        capacidad: 200,
        precio: "Consultar",
        imagen: IMG.hacienda2,
        tiposEvento: ["boda", "corporativo"],
    },
    {
        id: 3,
        nombre: "Zona E — Marrakech",
        descripcion:
            "Evoca la esencia del desierto marroquí "
            + "en un ambiente exclusivo. Detalles "
            + "arquitectónicos contemporáneos "
            + "con vista al lago.",
        municipio: "Llanogrande",
        capacidad: 200,
        precio: "Consultar",
        imagen: IMG.salon1,
        tiposEvento: ["boda", "corporativo", "fiesta"],
    },
    {
        id: 4,
        nombre: "Villa Celeste",
        descripcion:
            "Imponente salón rodeado de naturaleza. "
            + "Se adapta a todos los estilos: boho, "
            + "moderno, elegante, campestre. "
            + "Mobiliario incluido hasta 200 personas.",
        municipio: "Llanogrande",
        capacidad: 600,
        precio: "Consultar",
        imagen: IMG.hacienda3,
        tiposEvento: [
            "boda", "quinceañera",
            "corporativo", "fiesta",
        ],
    },
    {
        id: 5,
        nombre: "Montana",
        descripcion:
            "Espacio campestre con vistas "
            + "panorámicas al valle del Oriente "
            + "Antioqueño. Ambiente natural y "
            + "exclusivo para eventos.",
        municipio: "Llanogrande",
        capacidad: 200,
        precio: "Consultar",
        imagen: IMG.hacienda1,
        tiposEvento: ["boda", "fiesta"],
    },
    {
        id: 6,
        nombre: "Zelavi",
        descripcion:
            "Restaurante de alta cocina con fusión "
            + "peruana, italiana y mexicana. "
            + "Salón privado disponible para "
            + "eventos íntimos y celebraciones.",
        municipio: "Rionegro",
        capacidad: 80,
        precio: "Consultar",
        imagen: IMG.hacienda2,
        tiposEvento: ["fiesta", "corporativo"],
    },
    {
        id: 7,
        nombre: "Granate Eventos",
        descripcion:
            "Espacio campestre con estilo propio, "
            + "hermosos jardines y parqueadero. "
            + "Ubicado sobre la glorieta principal "
            + "del aeropuerto José María Córdova.",
        municipio: "Rionegro",
        capacidad: 300,
        precio: "Consultar",
        imagen: IMG.salon1,
        tiposEvento: [
            "boda", "quinceañera",
            "corporativo", "fiesta",
        ],
    },
    {
        id: 8,
        nombre: "Hotel Lagoon Llanogrande",
        descripcion:
            "Hotel 5 estrellas con entorno romántico "
            + "frente al lago. Restaurante gourmet, "
            + "piscina climatizada y espacios "
            + "para bodas y eventos corporativos.",
        municipio: "Rionegro",
        capacidad: 250,
        precio: "Consultar",
        imagen: IMG.hacienda3,
        tiposEvento: ["boda", "corporativo"],
    },
    {
        id: 9,
        nombre: "Imperial Eventos Campestre",
        descripcion:
            "Jardines al aire libre y salón que "
            + "combina estilo rústico con lo moderno. "
            + "Incluye capilla, pista de baile, "
            + "banquete, fotografía y decoración.",
        municipio: "Llanogrande",
        capacidad: 500,
        precio: "Consultar",
        imagen: IMG.hacienda1,
        tiposEvento: ["boda", "quinceañera"],
    },
];


// ═══════════════════════════════════════════════════
// PAQUETES PREDISEÑADOS
// ═══════════════════════════════════════════════════

export const paquetes = [
    {
        id: 1,
        nombre: "Paquete Boda Esencial",
        descripcion: "Todo lo necesario para una boda elegante de hasta 100 invitados.",
        tipoEvento: "boda",
        precioDesde: 8500000,
        precioHasta: 12000000,
        incluye: [
            "Mobiliario completo (sillas + mesas para 100)",
            "Menaje básico (vajilla, cubertería, cristalería)",
            "Mantelería y decoración estándar",
            "Equipo de sonido profesional",
            "8 meseros por 6 horas",
            "Coordinación del día del evento",
        ],
        imagen: IMG.boda1,
        destacado: false,
    },
    {
        id: 2,
        nombre: "Paquete Boda Premium",
        descripcion: "Experiencia de boda completa con detalles de lujo hasta 200 invitados.",
        tipoEvento: "boda",
        precioDesde: 18000000,
        precioHasta: 28000000,
        incluye: [
            "Mobiliario premium con sillas Crossback",
            "Menaje dorado y cristalería de alta gama",
            "Decoración floral integral",
            "Chef + estaciones gastronómicas",
            "DJ + equipo de sonido + luces",
            "15 meseros profesionales",
            "Fotografía y video profesional",
            "Torta de novios de 4 pisos",
            "Mesa de postres gourmet",
            "Planeación completa pre-evento",
        ],
        imagen: IMG.boda2,
        destacado: true,
    },
    {
        id: 3,
        nombre: "Paquete Quinceañera Clásica",
        descripcion: "La celebración tradicional con el encanto de una princesa, hasta 150 invitados.",
        tipoEvento: "quinceañera",
        precioDesde: 6500000,
        precioHasta: 10000000,
        incluye: [
            "Mobiliario y decoración temática",
            "Arco de ceremonia para coreografía",
            "DJ + iluminación ambiental",
            "10 meseros",
            "Chef y servicio de alimentación",
            "Torta de quince y mesa de postres",
            "Coordinación general",
        ],
        imagen: IMG.quince1,
        destacado: false,
    },
    {
        id: 4,
        nombre: "Paquete Fiesta de Celebración",
        descripcion: "Ideal para cumpleaños especiales, grados y celebraciones hasta 100 personas.",
        tipoEvento: "fiesta",
        precioDesde: 3500000,
        precioHasta: 6500000,
        incluye: [
            "Mobiliario para 100 invitados",
            "Menaje completo",
            "DJ + luces de fiesta",
            "Estación de parrilla en vivo",
            "6 meseros",
            "Decoración personalizada al tema",
        ],
        imagen: IMG.fiesta1,
        destacado: false,
    },
    {
        id: 5,
        nombre: "Paquete Evento Corporativo",
        descripcion: "Soluciones profesionales para empresas: lanzamientos, fin de año, reuniones.",
        tipoEvento: "corporativo",
        precioDesde: 5000000,
        precioHasta: 12000000,
        incluye: [
            "Mobiliario profesional",
            "Equipo audiovisual y proyección",
            "Servicio de catering ejecutivo",
            "Personal de logística",
            "Ambientación corporativa",
            "Fotografía profesional",
        ],
        imagen: IMG.corporativo1,
        destacado: false,
    },
];