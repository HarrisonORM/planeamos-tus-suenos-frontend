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
