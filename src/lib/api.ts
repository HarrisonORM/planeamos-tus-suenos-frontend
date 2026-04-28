const API_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL
    || "http://127.0.0.1:8000";

export async function fetchAPI(
    endpoint: string
) {
    const url = API_URL + endpoint;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(
            "Error al cargar datos: " + res.status
        );
    }

    return res.json();
}

// Catálogo
export async function getProductos(
    categoria?: string
) {
    const filtro = categoria
        ? "?categoria=" + categoria
        : "";
    const data = await fetchAPI(
        "/api/catalogo/productos/" + filtro
    );
    return data.results || data;
}

export async function getServicios(
    categoria?: string
) {
    const filtro = categoria
        ? "?categoria=" + categoria
        : "";
    const data = await fetchAPI(
        "/api/catalogo/servicios/" + filtro
    );
    return data.results || data;
}

// Portafolio
export async function getPortafolio(
    tipoEvento?: string
) {
    const filtro = tipoEvento
        ? "?tipo_evento=" + tipoEvento
        : "";
    const data = await fetchAPI(
        "/api/portafolio/eventos/" + filtro
    );
    return data.results || data;
}

// Contacto
export async function enviarMensaje(
    datos: {
        nombre: string;
        telefono: string;
        correo: string;
        mensaje: string;
    }
) {
    const res = await fetch(
        API_URL + "/api/contacto/mensajes/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        }
    );
    return res.json();
}

export async function enviarCotizacion(
    datos: {
        nombre: string;
        telefono: string;
        correo: string;
        tipo_evento: string;
        fecha_evento: string;
        num_invitados: number;
        municipio: string;
        tiene_locacion: boolean;
        servicios_interes: string[];
        mensaje: string;
    }
) {
    const res = await fetch(
        API_URL + "/api/contacto/cotizaciones/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        }
    );
    return res.json();
}