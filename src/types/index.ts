export interface ProductoAlquiler {
    id: number;
    nombre: string;
    descripcion: string;
    categoria: string;
    precio: number;
    unidad: string;
    imagen: string;
    tipos_evento: string[];
}

export interface ServicioPersonal {
    id: number;
    nombre: string;
    descripcion: string;
    categoria: string;
    precio: number;
    unidad: string;
    imagen: string;
    tipos_evento: string[];
}

export interface EventoPortafolio {
    id: number;
    titulo: string;
    descripcion: string;
    tipo_evento: string;
    imagen: string;
    fecha: string;
    lugar: string;
}

export interface PaqueteEvento {
    id: number;
    nombre: string;
    descripcion: string;
    tipo_evento: string;
    precio_desde: number;
    precio_hasta: number;
    incluye: string[];
    imagen: string;
    destacado: boolean;
}

export interface LocacionEvento {
    id: number;
    nombre: string;
    descripcion: string;
    municipio: string;
    capacidad: number;
    precio: string;
    imagen: string;
    tipos_evento: string[];
}

export interface ItemReserva {
    id: number;
    tipo: "producto" | "servicio";
    cantidad: number;
}

export interface DatosReserva {
    nombre_cliente: string;
    telefono: string;
    correo: string;
    direccion: string;
    fecha_evento: string;
    descripcion: string;
    items: ItemReserva[];
}

export interface RespuestaReserva {
    id: number;
    fecha_evento: string;
    valor_total: number;
    valor_anticipo: number;
    token_pago: string;
    estado: string;
}

export interface RespuestaCheckout {
    checkout_url: string;
    referencia: string;
}

export interface EstadoPagoReserva {
    referencia: string;
    estado_pago:
        | "pendiente"
        | "aprobado"
        | "rechazado"
        | "anulado"
        | "error";
    estado_reserva: string;
    valor_anticipo: number;
}

export interface DatosMensajeContacto {
    nombre: string;
    telefono: string;
    correo: string;
    mensaje: string;
}

export interface DatosCotizacion {
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
