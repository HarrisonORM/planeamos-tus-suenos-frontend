"use client";

import { useState, useEffect } from "react";
import EncabezadoPagina
    from "@/components/ui/EncabezadoPagina";
import Animado from "@/components/ui/Animado";
import { imagenesCatalogo } from "@/data/imagenesCatalogo";
import { imagenesServicios } from "@/data/imagenesServicios";
import {
    crearReserva,
    getFechasOcupadas,
    getProductos,
    getServicios,
} from "@/lib/api";
import {
    formatearPrecio,
    etiquetaCategoria,
} from "@/lib/utils";
import { whatsappReservaUrl } from "@/lib/contacto";
import type {
    RespuestaReserva,
    ProductoAlquiler,
    ServicioPersonal,
} from "@/types";
import {
    ShoppingCart,
    Plus,
    Minus,
    Trash2,
    Send,
    CalendarDays,
    LoaderCircle,
} from "lucide-react";
import type { FormEvent } from "react";

// Tipo para items seleccionados
interface ItemSeleccionado {
    id: number;
    nombre: string;
    precio: number;
    unidad: string;
    cantidad: number;
    tipo: "producto" | "servicio";
}

export default function PaginaCotizador() {
    const [productos, setProductos] = useState<
        ProductoAlquiler[]
    >([]);
    const [servicios, setServicios] = useState<
        ServicioPersonal[]
    >([]);
    const [cargando, setCargando] = useState(true);
    const [seleccionados, setSeleccionados] =
        useState<ItemSeleccionado[]>([]);
    const [tabActivo, setTabActivo] = useState<"productos" | "servicios">("productos");
    const [fechasOcupadas, setFechasOcupadas] = useState<string[]>([]);
    const [cargandoFechas, setCargandoFechas] = useState(true);
    const [errorFechas, setErrorFechas] = useState("");
    const [mostrarFormularioReserva, setMostrarFormularioReserva] =
        useState(false);
    const [datosReserva, setDatosReserva] = useState({
        nombre_cliente: "",
        telefono: "",
        correo: "",
        direccion: "",
        fecha_evento: "",
        descripcion: "",
    });
    const [enviandoReserva, setEnviandoReserva] = useState(false);
    const [errorReserva, setErrorReserva] = useState("");
    const [reservaCreada, setReservaCreada] =
        useState<RespuestaReserva | null>(null);
    const [enlaceWhatsapp, setEnlaceWhatsapp] = useState("");

    // Cargar datos del backend
    useEffect(() => {
        let activo = true;
        Promise.all([
            getProductos(),
            getServicios(),
        ])
            .then(([prods, servs]) => {
                if (!activo) return;
                setProductos(prods);
                setServicios(servs);
                setCargando(false);
            })
            .catch(() => {
                if (!activo) return;
                setCargando(false);
            });

        return () => {
            activo = false;
        };
    }, []);

    useEffect(() => {
        let activo = true;
        getFechasOcupadas()
            .then((fechas) => {
                if (!activo) return;
                setFechasOcupadas(fechas);
                setCargandoFechas(false);
            })
            .catch(() => {
                if (!activo) return;
                setErrorFechas(
                    "No se pudo consultar la disponibilidad. "
                    + "Intenta de nuevo más tarde."
                );
                setCargandoFechas(false);
            });

        return () => {
            activo = false;
        };
    }, []);

    useEffect(() => {
        if (!mostrarFormularioReserva) return;
        document.getElementById("reserva-form")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [mostrarFormularioReserva, cargandoFechas]);

    const fechaMinima = (() => {
        const hoy = new Date();
        const año = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, "0");
        const dia = String(hoy.getDate()).padStart(2, "0");
        return `${año}-${mes}-${dia}`;
    })();

    const enviarSolicitudReserva = async (
        evento: FormEvent<HTMLFormElement>
    ) => {
        evento.preventDefault();
        setErrorReserva("");

        if (seleccionados.length === 0) {
            setErrorReserva(
                "Agrega al menos un producto o servicio."
            );
            return;
        }
        if (fechasOcupadas.includes(datosReserva.fecha_evento)) {
            setErrorReserva(
                "La fecha seleccionada ya está ocupada. "
                + "Elige otra fecha."
            );
            return;
        }

        setEnviandoReserva(true);
        try {
            const respuesta = await crearReserva({
                ...datosReserva,
                items: seleccionados.map((item) => ({
                    id: item.id,
                    tipo: item.tipo,
                    cantidad: item.cantidad,
                })),
            });
            setReservaCreada(respuesta);
            setEnlaceWhatsapp(whatsappReservaUrl([
                "Hola, acabo de solicitar una reserva "
                + `(#${respuesta.id}) en Planeamos Tus Sueños.`,
                `Nombre: ${datosReserva.nombre_cliente}`,
                `Fecha del evento: ${datosReserva.fecha_evento}`,
                ...seleccionados.map(
                    (item) => `- ${item.nombre} x${item.cantidad}`
                ),
                `Total estimado: ${formatearPrecio(respuesta.valor_total)}`,
            ].join("\n")));
            setMostrarFormularioReserva(false);
        } catch (error) {
            setErrorReserva(
                error instanceof Error
                    ? error.message
                    : "No se pudo enviar la solicitud de reserva."
            );
        } finally {
            setEnviandoReserva(false);
        }
    };

    // Agregar item
    const agregar = (
        item: ProductoAlquiler | ServicioPersonal,
        tipo: "producto" | "servicio"
    ) => {
        const existe = seleccionados.find(
            (s) => s.id === item.id && s.tipo === tipo
        );
        if (existe) return;

        setSeleccionados([
            ...seleccionados,
            {
                id: item.id,
                nombre: item.nombre,
                precio: item.precio,
                unidad: item.unidad,
                cantidad: 1,
                tipo,
            },
        ]);
    };

    // Cambiar cantidad
    const cambiarCantidad = (
        id: number,
        tipo: string,
        delta: number
    ) => {
        setSeleccionados(
            seleccionados
                .map((item) => {
                    if (
                        item.id === id
                        && item.tipo === tipo
                    ) {
                        const nueva =
                            item.cantidad + delta;
                        return {
                            ...item,
                            cantidad: Math.max(0, nueva),
                        };
                    }
                    return item;
                })
                .filter((item) => item.cantidad > 0)
        );
    };

    // Eliminar item
    const eliminar = (
        id: number,
        tipo: string
    ) => {
        setSeleccionados(
            seleccionados.filter(
                (s) =>
                    !(s.id === id && s.tipo === tipo)
            )
        );
    };

    // Limpiar todo
    const limpiarTodo = () => {
        setSeleccionados([]);
    };

    // Verificar si ya está seleccionado
    const estaSeleccionado = (
        id: number,
        tipo: string
    ) => {
        return seleccionados.some(
            (s) => s.id === id && s.tipo === tipo
        );
    };

    // Calcular total
    const total = seleccionados.reduce(
        (sum, item) =>
            sum + item.precio * item.cantidad,
        0
    );

    const estiloTab = (activo: boolean) =>
        "px-6 py-3 font-cuerpo text-sm "
        + "font-medium tracking-wider uppercase "
        + "transition-all duration-300 border-b-2 "
        + (activo
            ? "text-verde border-verde"
            : "text-gris-texto "
            + "border-transparent "
            + "hover:text-negro-elegante");

    const estiloBotonAgregar =
        "flex items-center gap-1 "
        + "bg-verde hover:bg-verde-oscuro "
        + "text-blanco-calido font-cuerpo "
        + "text-xs font-semibold px-3 py-1.5 "
        + "rounded-boton transition-all "
        + "duration-300 tracking-wider uppercase";

    const estiloAgregado =
        "flex items-center gap-1 "
        + "bg-gris-suave text-gris-texto "
        + "font-cuerpo text-xs font-semibold "
        + "px-3 py-1.5 rounded-boton "
        + "tracking-wider uppercase "
        + "cursor-not-allowed";

    if (cargando) {
        return (
            <div>
                <EncabezadoPagina
                    etiqueta="Arma tu evento"
                    titulo="Cotizador"
                    subtitulo={
                        "Selecciona productos y servicios "
                        + "para calcular el costo estimado."
                    }
                />
                <div
                    className={
                        "py-20 text-center font-cuerpo "
                        + "text-gris-texto"
                    }
                >
                    Cargando catálogo...
                </div>
            </div>
        );
    }

    return (
        <div>
            <EncabezadoPagina
                etiqueta="Arma tu evento"
                titulo="Cotizador"
                subtitulo={
                    "Selecciona los productos y servicios "
                    + "que necesitas. El precio se calcula "
                    + "en tiempo real."
                }
            />

            <section className="py-12 bg-blanco-calido">
                <div className="contenedor-principal">
                    <div
                        className={
                            "grid grid-cols-1 "
                            + "lg:grid-cols-3 gap-8"
                        }
                    >
                        {/* Catálogo (2 columnas) */}
                        <div className="lg:col-span-2">
                            {/* Tabs */}
                            <div
                                className={
                                    "flex gap-2 mb-8 border-b "
                                    + "border-gris-borde"
                                }
                            >
                                <button
                                    onClick={() =>
                                        setTabActivo("productos")
                                    }
                                    className={estiloTab(
                                        tabActivo === "productos"
                                    )}
                                >
                                    Productos de Alquiler
                                </button>
                                <button
                                    onClick={() =>
                                        setTabActivo("servicios")
                                    }
                                    className={estiloTab(
                                        tabActivo === "servicios"
                                    )}
                                >
                                    Servicios de Personal
                                </button>
                            </div>

                            {/* Lista de productos */}
                            {tabActivo === "productos" && (
                                <div
                                    className={
                                        "grid grid-cols-1 "
                                        + "md:grid-cols-2 gap-4"
                                    }
                                >
                                    {productos.map(
                                        (producto, index) => (
                                            <Animado
                                                key={producto.id}
                                                delay={index * 0.1}
                                                className={
                                                    "flex gap-4 p-4 "
                                                    + "bg-blanco-puro "
                                                    + "rounded-tarjeta "
                                                    + "border "
                                                    + "border-durazno/20 "
                                                    + "shadow-suave "
                                                    + "hover:shadow-elegante "
                                                    + "transition-all "
                                                    + "duration-300"
                                                }
                                            >
                                                <img
                                                    src={
                                                        imagenesCatalogo[producto.nombre]
                                                        ?? producto.imagen
                                                    }
                                                    alt={producto.nombre}
                                                    className={
                                                        "w-20 h-20 "
                                                        + "object-cover "
                                                        + "rounded-boton "
                                                        + "flex-shrink-0"
                                                    }
                                                />
                                                <div
                                                    className="flex-1 min-w-0"
                                                >
                                                    <p
                                                        className={
                                                            "font-cuerpo "
                                                            + "text-[10px] "
                                                            + "tracking-wider "
                                                            + "uppercase "
                                                            + "text-verde "
                                                            + "font-medium"
                                                        }
                                                    >
                                                        {etiquetaCategoria(
                                                            producto.categoria
                                                        )}
                                                    </p>
                                                    <h3
                                                        className={
                                                            "font-titulo "
                                                            + "text-lg "
                                                            + "text-negro-elegante "
                                                            + "truncate"
                                                        }
                                                    >
                                                        {producto.nombre}
                                                    </h3>
                                                    <p
                                                        className={
                                                            "font-cuerpo "
                                                            + "text-sm "
                                                            + "font-semibold "
                                                            + "text-verde mt-1"
                                                        }
                                                    >
                                                        {formatearPrecio(
                                                            producto.precio
                                                        )}
                                                        <span
                                                            className={
                                                                "text-gris-texto "
                                                                + "font-normal "
                                                                + "text-xs ml-1"
                                                            }
                                                        >
                                                            {producto.unidad}
                                                        </span>
                                                    </p>
                                                    <button
                                                        onClick={() =>
                                                            agregar(
                                                                producto,
                                                                "producto"
                                                            )
                                                        }
                                                        disabled={
                                                            estaSeleccionado(
                                                                producto.id,
                                                                "producto"
                                                            )
                                                        }
                                                        className={
                                                            estaSeleccionado(
                                                                producto.id,
                                                                "producto"
                                                            )
                                                                ? estiloAgregado
                                                                : estiloBotonAgregar
                                                        }
                                                    >
                                                        {estaSeleccionado(
                                                            producto.id,
                                                            "producto"
                                                        ) ? (
                                                            "✓ Agregado"
                                                        ) : (
                                                            <>
                                                                <Plus size={12} />
                                                                Agregar
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </Animado>
                                        )
                                    )}
                                </div>
                            )}

                            {/* Lista de servicios */}
                            {tabActivo === "servicios" && (
                                <div
                                    className={
                                        "grid grid-cols-1 "
                                        + "md:grid-cols-2 gap-4"
                                    }
                                >
                                    {servicios.map(
                                        (servicio, index) => (
                                            <Animado
                                                key={servicio.id}
                                                delay={index * 0.1}
                                                className={
                                                    "flex gap-4 p-4 "
                                                    + "bg-blanco-puro "
                                                    + "rounded-tarjeta "
                                                    + "border "
                                                    + "border-durazno/20 "
                                                    + "shadow-suave "
                                                    + "hover:shadow-elegante "
                                                    + "transition-all "
                                                    + "duration-300"
                                                }
                                            >
                                                <img
                                                    src={
                                                        imagenesServicios[servicio.nombre]
                                                        ?? servicio.imagen
                                                    }
                                                    alt={servicio.nombre}
                                                    className={
                                                        "w-20 h-20 "
                                                        + "object-cover "
                                                        + "rounded-boton "
                                                        + "flex-shrink-0"
                                                    }
                                                />
                                                <div
                                                    className="flex-1 min-w-0"
                                                >
                                                    <p
                                                        className={
                                                            "font-cuerpo "
                                                            + "text-[10px] "
                                                            + "tracking-wider "
                                                            + "uppercase "
                                                            + "text-verde "
                                                            + "font-medium"
                                                        }
                                                    >
                                                        {etiquetaCategoria(
                                                            servicio.categoria
                                                        )}
                                                    </p>
                                                    <h3
                                                        className={
                                                            "font-titulo "
                                                            + "text-lg "
                                                            + "text-negro-elegante "
                                                            + "truncate"
                                                        }
                                                    >
                                                        {servicio.nombre}
                                                    </h3>
                                                    <p
                                                        className={
                                                            "font-cuerpo "
                                                            + "text-sm "
                                                            + "font-semibold "
                                                            + "text-verde mt-1"
                                                        }
                                                    >
                                                        {formatearPrecio(
                                                            servicio.precio
                                                        )}
                                                        <span
                                                            className={
                                                                "text-gris-texto "
                                                                + "font-normal "
                                                                + "text-xs ml-1"
                                                            }
                                                        >
                                                            {servicio.unidad}
                                                        </span>
                                                    </p>
                                                    <button
                                                        onClick={() =>
                                                            agregar(
                                                                servicio,
                                                                "servicio"
                                                            )
                                                        }
                                                        disabled={
                                                            estaSeleccionado(
                                                                servicio.id,
                                                                "servicio"
                                                            )
                                                        }
                                                        className={
                                                            estaSeleccionado(
                                                                servicio.id,
                                                                "servicio"
                                                            )
                                                                ? estiloAgregado
                                                                : estiloBotonAgregar
                                                        }
                                                    >
                                                        {estaSeleccionado(
                                                            servicio.id,
                                                            "servicio"
                                                        ) ? (
                                                            "✓ Agregado"
                                                        ) : (
                                                            <>
                                                                <Plus size={12} />
                                                                Agregar
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </Animado>
                                        )
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Resumen (1 columna, sticky) */}
                        <div className="lg:col-span-1">
                            <div
                                className={
                                    "sticky top-28 "
                                    + "bg-negro-elegante "
                                    + "rounded-tarjeta p-6 "
                                    + "shadow-elegante"
                                }
                            >
                                <div
                                    className={
                                        "flex items-center "
                                        + "justify-between mb-6"
                                    }
                                >
                                    <h2
                                        className={
                                            "font-titulo text-2xl "
                                            + "text-blanco-calido"
                                        }
                                    >
                                        Tu cotización
                                    </h2>
                                    <ShoppingCart
                                        size={20}
                                        className="text-durazno"
                                    />
                                </div>

                                {seleccionados.length === 0 ? (
                                    <p
                                        className={
                                            "font-cuerpo text-sm "
                                            + "text-blanco-calido/50 "
                                            + "text-center py-8"
                                        }
                                    >
                                        Agrega productos o servicios
                                        para ver el precio estimado
                                    </p>
                                ) : (
                                    <>
                                        <div
                                            className={
                                                "space-y-4 mb-6 "
                                                + "max-h-[400px] "
                                                + "overflow-y-auto "
                                                + "pr-2"
                                            }
                                        >
                                            {seleccionados.map(
                                                (item) => (
                                                    <div
                                                        key={
                                                            item.tipo
                                                            + "-"
                                                            + item.id
                                                        }
                                                        className={
                                                            "border-b "
                                                            + "border-blanco-calido/10 "
                                                            + "pb-4"
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                "flex "
                                                                + "justify-between "
                                                                + "items-start "
                                                                + "mb-2"
                                                            }
                                                        >
                                                            <p
                                                                className={
                                                                    "font-cuerpo "
                                                                    + "text-sm "
                                                                    + "text-blanco-calido "
                                                                    + "flex-1 pr-2"
                                                                }
                                                            >
                                                                {item.nombre}
                                                            </p>
                                                            <button
                                                                onClick={() =>
                                                                    eliminar(
                                                                        item.id,
                                                                        item.tipo
                                                                    )
                                                                }
                                                                className={
                                                                    "text-blanco-calido/30 "
                                                                    + "hover:text-red-400 "
                                                                    + "transition-colors"
                                                                }
                                                            >
                                                                <Trash2
                                                                    size={14}
                                                                />
                                                            </button>
                                                        </div>
                                                        <div
                                                            className={
                                                                "flex "
                                                                + "items-center "
                                                                + "justify-between"
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    "flex "
                                                                    + "items-center "
                                                                    + "gap-3"
                                                                }
                                                            >
                                                                <button
                                                                    onClick={() =>
                                                                        cambiarCantidad(
                                                                            item.id,
                                                                            item.tipo,
                                                                            -1
                                                                        )
                                                                    }
                                                                    className={
                                                                        "w-7 h-7 "
                                                                        + "rounded-full "
                                                                        + "border "
                                                                        + "border-blanco-calido/20 "
                                                                        + "flex "
                                                                        + "items-center "
                                                                        + "justify-center "
                                                                        + "text-blanco-calido/60 "
                                                                        + "hover:border-durazno "
                                                                        + "hover:text-durazno "
                                                                        + "transition-colors"
                                                                    }
                                                                >
                                                                    <Minus
                                                                        size={12}
                                                                    />
                                                                </button>
                                                                <span
                                                                    className={
                                                                        "font-cuerpo "
                                                                        + "text-sm "
                                                                        + "text-blanco-calido "
                                                                        + "font-semibold "
                                                                        + "w-6 "
                                                                        + "text-center"
                                                                    }
                                                                >
                                                                    {item.cantidad}
                                                                </span>
                                                                <button
                                                                    onClick={() =>
                                                                        cambiarCantidad(
                                                                            item.id,
                                                                            item.tipo,
                                                                            1
                                                                        )
                                                                    }
                                                                    className={
                                                                        "w-7 h-7 "
                                                                        + "rounded-full "
                                                                        + "border "
                                                                        + "border-blanco-calido/20 "
                                                                        + "flex "
                                                                        + "items-center "
                                                                        + "justify-center "
                                                                        + "text-blanco-calido/60 "
                                                                        + "hover:border-durazno "
                                                                        + "hover:text-durazno "
                                                                        + "transition-colors"
                                                                    }
                                                                >
                                                                    <Plus
                                                                        size={12}
                                                                    />
                                                                </button>
                                                            </div>
                                                            <p
                                                                className={
                                                                    "font-cuerpo "
                                                                    + "text-sm "
                                                                    + "text-durazno "
                                                                    + "font-semibold"
                                                                }
                                                            >
                                                                {formatearPrecio(
                                                                    item.precio
                                                                    * item.cantidad
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        {/* Total */}
                                        <div
                                            className={
                                                "border-t "
                                                + "border-durazno/30 "
                                                + "pt-4 mb-6"
                                            }
                                        >
                                            <div
                                                className={
                                                    "flex justify-between "
                                                    + "items-center"
                                                }
                                            >
                                                <p
                                                    className={
                                                        "font-cuerpo "
                                                        + "text-xs "
                                                        + "uppercase "
                                                        + "tracking-wider "
                                                        + "text-blanco-calido/60"
                                                    }
                                                >
                                                    Total estimado
                                                </p>
                                                <p
                                                    className={
                                                        "font-titulo "
                                                        + "text-3xl "
                                                        + "text-durazno"
                                                    }
                                                >
                                                    {formatearPrecio(total)}
                                                </p>
                                            </div>
                                            <p
                                                className={
                                                    "font-cuerpo "
                                                    + "text-[10px] "
                                                    + "text-blanco-calido/40 "
                                                    + "mt-1 text-right"
                                                }
                                            >
                                                * Precio de referencia,
                                                sujeto a confirmación
                                            </p>
                                        </div>

                                        {/* Botones */}
                                        <div className="space-y-3">
                                            <button
                                                type="button"
                                                disabled={
                                                    seleccionados.length === 0
                                                    || cargandoFechas
                                                    || Boolean(errorFechas)
                                                }
                                                onClick={() => {
                                                    setErrorReserva("");
                                                    setMostrarFormularioReserva(true);
                                                }}
                                                className={
                                                    "flex items-center "
                                                    + "justify-center gap-2 "
                                                    + "w-full bg-durazno "
                                                    + "hover:bg-durazno-oscuro "
                                                    + "disabled:opacity-50 "
                                                    + "disabled:cursor-not-allowed "
                                                    + "text-negro-elegante "
                                                    + "font-cuerpo "
                                                    + "font-semibold py-3 "
                                                    + "rounded-boton "
                                                    + "transition-all "
                                                    + "duration-300 text-sm "
                                                    + "tracking-wider "
                                                    + "uppercase"
                                                }
                                            >
                                                <Send size={14} />
                                                Solicitar reserva
                                            </button>
                                            <button
                                                onClick={limpiarTodo}
                                                className={
                                                    "w-full font-cuerpo "
                                                    + "text-xs "
                                                    + "text-blanco-calido/40 "
                                                    + "hover:text-red-400 "
                                                    + "transition-colors "
                                                    + "py-2"
                                                }
                                            >
                                                Limpiar todo
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {reservaCreada ? (
                        <section
                            className={
                                "mt-10 max-w-3xl mx-auto "
                                + "bg-blanco-puro border "
                                + "border-durazno/30 "
                                + "rounded-tarjeta p-6 md:p-8 "
                                + "shadow-suave"
                            }
                        >
                            <div className="flex items-start gap-4">
                                <div className={
                                    "p-3 rounded-full "
                                    + "bg-verde-claro text-verde"
                                }>
                                    <CalendarDays size={24} />
                                </div>
                                <div className="flex-1">
                                    <h2 className={
                                        "font-titulo text-2xl "
                                        + "text-negro-elegante"
                                    }>
                                        Solicitud recibida
                                    </h2>
                                    <p className={
                                        "font-cuerpo text-sm "
                                        + "text-gris-texto mt-2"
                                    }>
                                        El total estimado validado por
                                        el servidor es{" "}
                                        <strong className="text-verde">
                                            {formatearPrecio(
                                                reservaCreada.valor_total
                                            )}
                                        </strong>
                                        . Nos comunicaremos contigo al
                                        teléfono o correo registrado para
                                        confirmar disponibilidad y coordinar
                                        el anticipo. Por ahora no se
                                        realizan pagos en línea.
                                    </p>
                                    <a
                                        href={enlaceWhatsapp}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={
                                            "inline-flex items-center "
                                            + "gap-2 mt-4 px-5 py-3 "
                                            + "rounded-full bg-verde "
                                            + "text-blanco-puro "
                                            + "font-cuerpo text-sm "
                                            + "font-medium"
                                        }
                                    >
                                        <Send size={16} />
                                        Enviar mi solicitud por WhatsApp
                                    </a>
                                    <p className={
                                        "font-cuerpo text-xs "
                                        + "text-gris-texto mt-2"
                                    }>
                                        Ya recibimos tu solicitud; este
                                        mensaje nos ayuda a responderte
                                        más rápido.
                                    </p>
                                </div>
                            </div>
                        </section>
                    ) : mostrarFormularioReserva && (
                        <section
                            id="reserva-form"
                            className={
                                "mt-10 max-w-3xl mx-auto "
                                + "bg-blanco-puro border "
                                + "border-durazno/30 "
                                + "rounded-tarjeta p-6 md:p-8 "
                                + "shadow-suave"
                            }
                        >
                            <h2 className={
                                "font-titulo text-3xl "
                                + "text-negro-elegante mb-2"
                            }>
                                Solicita tu reserva
                            </h2>
                            <p className={
                                "font-cuerpo text-sm "
                                + "text-gris-texto mb-6"
                            }>
                                Revisaremos disponibilidad y
                                confirmaremos el anticipo. El total
                                definitivo se calcula con los precios
                                vigentes del catálogo.
                            </p>

                            {errorFechas ? (
                                <p role="alert" className={
                                    "font-cuerpo text-sm "
                                    + "text-red-600"
                                }>
                                    {errorFechas}
                                </p>
                            ) : cargandoFechas ? (
                                <p className={
                                    "font-cuerpo text-sm "
                                    + "text-gris-texto"
                                }>
                                    Consultando disponibilidad...
                                </p>
                            ) : (
                                <>
                                    <p className={
                                        "font-cuerpo text-xs "
                                        + "text-gris-texto mb-5"
                                    }>
                                        Fechas ocupadas:{" "}
                                        {fechasOcupadas.length
                                            ? fechasOcupadas.join(", ")
                                            : "aún no hay fechas reportadas"}
                                    </p>
                                    <form
                                        onSubmit={enviarSolicitudReserva}
                                        className="space-y-5"
                                    >
                                        <div className={
                                            "grid grid-cols-1 "
                                            + "md:grid-cols-2 gap-4"
                                        }>
                                            <label className={
                                                "font-cuerpo text-sm "
                                                + "text-negro-suave"
                                            }>
                                                Nombre completo
                                                <input
                                                    required
                                                    maxLength={200}
                                                    autoComplete="name"
                                                    value={datosReserva.nombre_cliente}
                                                    onChange={(evento) =>
                                                        setDatosReserva({
                                                            ...datosReserva,
                                                            nombre_cliente:
                                                                evento.target.value,
                                                        })
                                                    }
                                                    className={
                                                        "mt-1 w-full "
                                                        + "border border-gris-borde "
                                                        + "rounded-boton px-3 py-2 "
                                                        + "bg-blanco-calido "
                                                        + "focus:outline-verde"
                                                    }
                                                />
                                            </label>
                                            <label className={
                                                "font-cuerpo text-sm "
                                                + "text-negro-suave"
                                            }>
                                                Teléfono
                                                <input
                                                    required
                                                    type="tel"
                                                    maxLength={20}
                                                    autoComplete="tel"
                                                    value={datosReserva.telefono}
                                                    onChange={(evento) =>
                                                        setDatosReserva({
                                                            ...datosReserva,
                                                            telefono:
                                                                evento.target.value,
                                                        })
                                                    }
                                                    className={
                                                        "mt-1 w-full "
                                                        + "border border-gris-borde "
                                                        + "rounded-boton px-3 py-2 "
                                                        + "bg-blanco-calido "
                                                        + "focus:outline-verde"
                                                    }
                                                />
                                            </label>
                                            <label className={
                                                "font-cuerpo text-sm "
                                                + "text-negro-suave"
                                            }>
                                                Correo electrónico
                                                <input
                                                    required
                                                    type="email"
                                                    maxLength={254}
                                                    autoComplete="email"
                                                    value={datosReserva.correo}
                                                    onChange={(evento) =>
                                                        setDatosReserva({
                                                            ...datosReserva,
                                                            correo:
                                                                evento.target.value,
                                                        })
                                                    }
                                                    className={
                                                        "mt-1 w-full "
                                                        + "border border-gris-borde "
                                                        + "rounded-boton px-3 py-2 "
                                                        + "bg-blanco-calido "
                                                        + "focus:outline-verde"
                                                    }
                                                />
                                            </label>
                                            <label className={
                                                "font-cuerpo text-sm "
                                                + "text-negro-suave"
                                            }>
                                                Fecha del evento
                                                <input
                                                    required
                                                    type="date"
                                                    min={fechaMinima}
                                                    value={datosReserva.fecha_evento}
                                                    onChange={(evento) =>
                                                        setDatosReserva({
                                                            ...datosReserva,
                                                            fecha_evento:
                                                                evento.target.value,
                                                        })
                                                    }
                                                    className={
                                                        "mt-1 w-full "
                                                        + "border border-gris-borde "
                                                        + "rounded-boton px-3 py-2 "
                                                        + "bg-blanco-calido "
                                                        + "focus:outline-verde"
                                                    }
                                                />
                                            </label>
                                        </div>
                                        <label className={
                                            "block font-cuerpo text-sm "
                                            + "text-negro-suave"
                                        }>
                                            Dirección del evento
                                            <input
                                                maxLength={1000}
                                                value={datosReserva.direccion}
                                                onChange={(evento) =>
                                                    setDatosReserva({
                                                        ...datosReserva,
                                                        direccion:
                                                            evento.target.value,
                                                    })
                                                }
                                                className={
                                                    "mt-1 w-full "
                                                    + "border border-gris-borde "
                                                    + "rounded-boton px-3 py-2 "
                                                    + "bg-blanco-calido "
                                                    + "focus:outline-verde"
                                                }
                                            />
                                        </label>
                                        <label className={
                                            "block font-cuerpo text-sm "
                                            + "text-negro-suave"
                                        }>
                                            Detalles adicionales
                                            <textarea
                                                rows={3}
                                                maxLength={2000}
                                                value={datosReserva.descripcion}
                                                onChange={(evento) =>
                                                    setDatosReserva({
                                                        ...datosReserva,
                                                        descripcion:
                                                            evento.target.value,
                                                    })
                                                }
                                                className={
                                                    "mt-1 w-full resize-y "
                                                    + "border border-gris-borde "
                                                    + "rounded-boton px-3 py-2 "
                                                    + "bg-blanco-calido "
                                                    + "focus:outline-verde"
                                                }
                                            />
                                        </label>
                                        {errorReserva && (
                                            <p
                                                role="alert"
                                                className={
                                                    "font-cuerpo text-sm "
                                                    + "text-red-600"
                                                }
                                            >
                                                {errorReserva}
                                            </p>
                                        )}
                                        <div className={
                                            "flex flex-col-reverse "
                                            + "sm:flex-row sm:justify-end "
                                            + "gap-3"
                                        }>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setMostrarFormularioReserva(false);
                                                    setErrorReserva("");
                                                }}
                                                className={
                                                    "font-cuerpo text-sm "
                                                    + "text-gris-texto "
                                                    + "hover:text-negro-elegante "
                                                    + "px-5 py-3"
                                                }
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={enviandoReserva}
                                                className={
                                                    "inline-flex items-center "
                                                    + "justify-center gap-2 "
                                                    + "bg-verde "
                                                    + "hover:bg-verde-oscuro "
                                                    + "disabled:opacity-60 "
                                                    + "text-blanco-calido "
                                                    + "font-cuerpo font-semibold "
                                                    + "px-6 py-3 rounded-boton "
                                                    + "transition-colors"
                                                }
                                            >
                                                {enviandoReserva
                                                    ? <LoaderCircle
                                                        size={16}
                                                        className="animate-spin"
                                                    />
                                                    : <Send size={16} />}
                                                Enviar solicitud
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </section>
                    )}
                </div>
            </section>
        </div>
    );
}