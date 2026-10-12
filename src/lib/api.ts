import type {
    DatosCotizacion,
    DatosMensajeContacto,
    EventoPortafolio,
    ProductoAlquiler,
    ServicioPersonal,
} from "@/types";

const API_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL
    || "http://127.0.0.1:8000";

export async function fetchAPI<T>(
    endpoint: string
): Promise<T> {
    const url = API_URL + endpoint;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(
            "Error al cargar datos: " + res.status
        );
    }

    return res.json() as Promise<T>;
}

// Catálogo
export async function getProductos(
    categoria?: string
): Promise<ProductoAlquiler[]> {
    const filtro = categoria
        ? "?categoria=" + categoria
        : "";
    const data = await fetchAPI<
        ProductoAlquiler[] | {
            results: ProductoAlquiler[];
        }
    >(
        "/api/catalogo/productos/" + filtro
    );
    return Array.isArray(data)
        ? data
        : data.results;
}

export async function getServicios(
    categoria?: string
): Promise<ServicioPersonal[]> {
    const filtro = categoria
        ? "?categoria=" + categoria
        : "";
    const data = await fetchAPI<
        ServicioPersonal[] | {
            results: ServicioPersonal[];
        }
    >(
        "/api/catalogo/servicios/" + filtro
    );
    return Array.isArray(data)
        ? data
        : data.results;
}

// Portafolio
export async function getPortafolio(
    tipoEvento?: string
): Promise<EventoPortafolio[]> {
    const filtro = tipoEvento
        ? "?tipo_evento=" + tipoEvento
        : "";
    const data = await fetchAPI<
        EventoPortafolio[] | {
            results: EventoPortafolio[];
        }
    >(
        "/api/portafolio/eventos/" + filtro
    );
    return Array.isArray(data)
        ? data
        : data.results;
}

// Contacto
export async function enviarMensaje(
    datos: DatosMensajeContacto
): Promise<unknown> {
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
    datos: DatosCotizacion
): Promise<unknown> {
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