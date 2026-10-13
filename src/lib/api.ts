import type {
    DatosCotizacion,
    DatosMensajeContacto,
    DatosReserva,
    EstadoPagoReserva,
    EventoPortafolio,
    LocacionEvento,
    PaqueteEvento,
    ProductoAlquiler,
    RespuestaCheckout,
    RespuestaReserva,
    ServicioPersonal,
} from "@/types";

const API_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL
    || "http://127.0.0.1:8000";

function buscarMensajeError(valor: unknown): string | undefined {
    if (typeof valor === "string") {
        return valor;
    }
    if (Array.isArray(valor)) {
        for (const elemento of valor) {
            const mensaje = buscarMensajeError(elemento);
            if (mensaje) return mensaje;
        }
    }
    if (valor && typeof valor === "object") {
        for (const mensaje of Object.values(valor)) {
            const encontrado = buscarMensajeError(mensaje);
            if (encontrado) return encontrado;
        }
    }
    return undefined;
}

export async function fetchAPI<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const url = API_URL + endpoint;
    const res = await fetch(url, options);

    if (!res.ok) {
        const cuerpo = await res.json().catch(() => null);
        const mensaje = buscarMensajeError(cuerpo);
        throw new Error(
            mensaje
            || "Error en la solicitud a la API: " + res.status
        );
    }

    return res.json() as Promise<T>;
}

function queryString(
    params: Record<string, string | undefined>
): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value) {
            searchParams.set(key, value);
        }
    });

    const query = searchParams.toString();
    return query ? "?" + query : "";
}

// Catálogo
export async function getProductos(
    categoria?: string
): Promise<ProductoAlquiler[]> {
    const filtro = queryString({ categoria });
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
    const filtro = queryString({ categoria });
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

export async function getPaquetes(
    tipoEvento?: string
): Promise<PaqueteEvento[]> {
    const data = await fetchAPI<
        PaqueteEvento[] | { results: PaqueteEvento[] }
    >(
        "/api/catalogo/paquetes/"
        + queryString({ tipo_evento: tipoEvento })
    );
    return Array.isArray(data)
        ? data
        : data.results;
}

export async function getLocaciones(
    municipio?: string
): Promise<LocacionEvento[]> {
    const data = await fetchAPI<
        LocacionEvento[] | { results: LocacionEvento[] }
    >(
        "/api/catalogo/locaciones/"
        + queryString({ municipio })
    );
    return Array.isArray(data)
        ? data
        : data.results;
}

export async function getFechasOcupadas(): Promise<string[]> {
    const data = await fetchAPI<{
        fechas_ocupadas: string[];
    }>("/api/reservas/reservas/fechas-ocupadas/");
    return data.fechas_ocupadas;
}

export async function crearReserva(
    datos: DatosReserva
): Promise<RespuestaReserva> {
    return fetchAPI(
        "/api/reservas/reservas/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        }
    );
}

export async function iniciarPagoAnticipo(
    tokenPago: string
): Promise<RespuestaCheckout> {
    return fetchAPI(
        "/api/reservas/reservas/pago-anticipo/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token_pago: tokenPago,
            }),
        }
    );
}

export async function getEstadoPago(
    referencia: string
): Promise<EstadoPagoReserva> {
    return fetchAPI(
        "/api/reservas/reservas/estado-pago/"
        + queryString({ referencia })
    );
}

// Portafolio
export async function getPortafolio(
    tipoEvento?: string
): Promise<EventoPortafolio[]> {
    const filtro = queryString({ tipo_evento: tipoEvento });
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
    return fetchAPI(
        "/api/contacto/mensajes/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        }
    );
}

export async function enviarCotizacion(
    datos: DatosCotizacion
): Promise<unknown> {
    return fetchAPI(
        "/api/contacto/cotizaciones/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        }
    );
}