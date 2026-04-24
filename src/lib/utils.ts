// Funciones auxiliares reutilizables

// Formatear precio en pesos colombianos
// Ejemplo: formatearPrecio(1500000) → "$1.500.000"
export function formatearPrecio(valor: number): string {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
    }).format(valor);
}

// Formatear fecha en español
// Ejemplo: formatearFecha("2024-11-15") → "15 de noviembre, 2024"
export function formatearFecha(fecha: string): string {
    const d = new Date(fecha);
    return d.toLocaleDateString("es-CO", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

// Etiqueta legible para tipo de evento
// Ejemplo: etiquetaTipoEvento("boda") → "Boda"
export function etiquetaTipoEvento(tipo: string): string {
    const etiquetas: Record<string, string> = {
        boda: "Boda",
        quinceañera: "Quinceañera",
        fiesta: "Fiesta",
        corporativo: "Corporativo",
        otro: "Otro",
    };
    return etiquetas[tipo] ?? tipo;
}

// Etiqueta legible para categorías del catálogo
// Ejemplo: etiquetaCategoria("menaje") → "Menaje y Cristalería"
export function etiquetaCategoria(cat: string): string {
    const etiquetas: Record<string, string> = {
        mobiliario: "Mobiliario",
        menaje: "Menaje y Cristalería",
        sonido: "Sonido",
        iluminacion: "Iluminación",
        decoracion: "Decoración",
        meseros: "Meseros",
        chef: "Chef",
        dj: "DJ",
        reposteria: "Repostería",
        fotografia: "Fotografía",
        floreria: "Florería",
    };
    return etiquetas[cat] ?? cat;
}