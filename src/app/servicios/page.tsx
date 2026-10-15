"use client";

import { useState, useEffect } from "react";
import { ZoomIn } from "lucide-react";
import VisorImagen, {
    type ImagenVisor,
} from "@/components/ui/VisorImagen";
import Animado from "@/components/ui/Animado";
import EncabezadoPagina
    from "@/components/ui/EncabezadoPagina";
import { getServicios } from "@/lib/api";
import BotonAgregar from "@/components/carrito/BotonAgregar";
import { imagenesServicios } from "@/data/imagenesServicios";
import {
    formatearPrecio,
    etiquetaCategoria,
} from "@/lib/utils";
import type { ServicioPersonal } from "@/types";

const filtros = [
    { valor: "todos", etiqueta: "Todos" },
    { valor: "meseros", etiqueta: "Meseros" },
    { valor: "chef", etiqueta: "Chef" },
    { valor: "dj", etiqueta: "DJ" },
    { valor: "reposteria", etiqueta: "Repostería" },
    { valor: "fotografia", etiqueta: "Fotografía" },
    { valor: "floreria", etiqueta: "Florería" },
];

export default function PaginaServicios() {
    const [filtroActivo, setFiltroActivo] = useState(
        "todos"
    );
    const [servicios, setServicios] = useState<
        ServicioPersonal[]
    >([]);
    const [visor, setVisor] = useState<
        ImagenVisor | null
    >(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setCargando(true);
        setError("");

        const categoria =
            filtroActivo === "todos"
                ? undefined
                : filtroActivo;

        getServicios(categoria)
            .then((data) => {
                setServicios(data);
                setCargando(false);
            })
            .catch(() => {
                setError(
                    "No se pudieron cargar los servicios. "
                    + "Verifica que el backend esté activo."
                );
                setCargando(false);
            });
    }, [filtroActivo]);

    const estiloFiltroBase =
        "px-6 py-2.5 rounded-full font-cuerpo "
        + "text-sm transition-all duration-300 border";

    const estiloActivo =
        "bg-negro-elegante text-durazno "
        + "border-durazno shadow-elegante";

    const estiloInactivo =
        "bg-blanco-puro text-negro-elegante "
        + "border-gris-borde hover:border-verde "
        + "hover:text-verde";

    return (
        <div>
            <EncabezadoPagina
                etiqueta="Personal especializado"
                titulo="Servicios"
                subtitulo={
                    "Contrata al equipo perfecto para "
                    + "tu evento. Profesionales con "
                    + "experiencia y dedicación."
                }
            />

            {/* Filtros */}
            <section className="py-10 bg-blanco-calido">
                <div className="contenedor-principal">
                    <p
                        className={
                            "text-center font-cuerpo text-xs "
                            + "tracking-[0.3em] uppercase "
                            + "text-gris-texto mb-6"
                        }
                    >
                        Filtrar por especialidad
                    </p>
                    <div
                        className={
                            "flex flex-wrap items-center "
                            + "justify-center gap-3"
                        }
                    >
                        {filtros.map((filtro) => (
                            <button
                                key={filtro.valor}
                                onClick={() =>
                                    setFiltroActivo(filtro.valor)
                                }
                                className={
                                    estiloFiltroBase + " "
                                    + (filtroActivo === filtro.valor
                                        ? estiloActivo
                                        : estiloInactivo)
                                }
                            >
                                {filtro.etiqueta}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Servicios */}
            <section className="pb-24 bg-blanco-calido">
                <div className="contenedor-principal">
                    {cargando && (
                        <p
                            className={
                                "text-center font-cuerpo "
                                + "text-gris-texto py-20"
                            }
                        >
                            Cargando servicios...
                        </p>
                    )}

                    {error && (
                        <p
                            className={
                                "text-center font-cuerpo "
                                + "text-red-500 py-20"
                            }
                        >
                            {error}
                        </p>
                    )}

                    {!cargando && !error && (
                        <div
                            className={
                                "grid grid-cols-1 "
                                + "md:grid-cols-2 "
                                + "lg:grid-cols-3 gap-6"
                            }
                        >
                            {servicios.map(
                                (servicio, index) => (
                                <Animado
                                    key={servicio.id}
                                    delay={index * 0.1}
                                    className="h-full"
                                >
                                    <div
                                        className={
                                            "bg-blanco-puro "
                                            + "rounded-tarjeta "
                                            + "overflow-hidden "
                                            + "border border-durazno/20 "
                                            + "shadow-suave "
                                            + "hover:shadow-elegante "
                                            + "hover:-translate-y-1 "
                                            + "transition-all "
                                            + "duration-300 "
                                            + "h-full flex flex-col"
                                        }
                                    >
                                    <div
                                        className={
                                            "h-52 overflow-hidden "
                                            + "relative group"
                                        }
                                    >
                                        <button
                                            type="button"
                                            aria-label={
                                                "Ampliar imagen de "
                                                + servicio.nombre
                                            }
                                            onClick={() =>
                                                setVisor({
                                                    src:
                                                        imagenesServicios[servicio.nombre]
                                                        ?? servicio.imagen,
                                                    alt: servicio.nombre,
                                                })
                                            }
                                            className={
                                                "block w-full h-full "
                                                + "cursor-zoom-in "
                                                + "focus-visible:outline-2 "
                                                + "focus-visible:outline-verde "
                                                + "focus-visible:-outline-offset-2"
                                            }
                                        >
                                        <img
                                            src={
                                                imagenesServicios[servicio.nombre]
                                                ?? servicio.imagen
                                            }
                                            alt={servicio.nombre}
                                            className={
                                                "w-full h-full "
                                                + "object-cover "
                                                + "object-center "
                                                + "transition-transform "
                                                + "duration-500 "
                                                + "group-hover:scale-105"
                                            }
                                        />
                                        </button>
                                        <span
                                            aria-hidden="true"
                                            className={
                                                "pointer-events-none "
                                                + "absolute bottom-3 "
                                                + "right-3 w-9 h-9 "
                                                + "rounded-full "
                                                + "bg-blanco-calido/90 "
                                                + "text-negro-elegante "
                                                + "flex items-center "
                                                + "justify-center "
                                                + "opacity-0 "
                                                + "group-hover:opacity-100 "
                                                + "transition-opacity "
                                                + "duration-300"
                                            }
                                        >
                                            <ZoomIn size={16} />
                                        </span>
                                        <div
                                            className={
                                                "absolute top-4 left-4"
                                            }
                                        >
                                            <span
                                                className={
                                                    "inline-block "
                                                    + "bg-verde "
                                                    + "text-blanco-calido "
                                                    + "font-cuerpo text-xs "
                                                    + "tracking-wider "
                                                    + "uppercase px-3 py-1 "
                                                    + "rounded-full"
                                                }
                                            >
                                                {etiquetaCategoria(
                                                    servicio.categoria
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        className={
                                            "p-5 flex flex-col flex-1"
                                        }
                                    >
                                        <h3
                                            className={
                                                "font-titulo text-xl "
                                                + "text-negro-elegante "
                                                + "mb-2"
                                            }
                                        >
                                            {servicio.nombre}
                                        </h3>
                                        <p
                                            className={
                                                "font-cuerpo text-sm "
                                                + "text-gris-texto "
                                                + "leading-relaxed "
                                                + "mb-4 flex-1"
                                            }
                                        >
                                            {servicio.descripcion}
                                        </p>

                                        <div
                                            className={
                                                "flex flex-wrap "
                                                + "gap-1.5 mb-4"
                                            }
                                        >
                                            {servicio.tipos_evento.map(
                                                (tipo: string) => (
                                                    <span
                                                        key={tipo}
                                                        className={
                                                            "font-cuerpo "
                                                            + "text-[10px] "
                                                            + "tracking-wider "
                                                            + "uppercase "
                                                            + "bg-verde-claro "
                                                            + "text-verde-oscuro "
                                                            + "px-2 py-0.5 "
                                                            + "rounded-full"
                                                        }
                                                    >
                                                        {tipo}
                                                    </span>
                                                )
                                            )}
                                        </div>

                                        <div
                                            className={
                                                "flex items-end "
                                                + "justify-between "
                                                + "pt-4 border-t "
                                                + "border-durazno/20"
                                            }
                                        >
                                            <div>
                                                <p
                                                    className={
                                                        "text-[10px] "
                                                        + "text-gris-texto "
                                                        + "uppercase "
                                                        + "tracking-wider "
                                                        + "mb-1"
                                                    }
                                                >
                                                    Desde
                                                </p>
                                                <p
                                                    className={
                                                        "font-titulo "
                                                        + "text-xl "
                                                        + "text-negro-elegante"
                                                    }
                                                >
                                                    {formatearPrecio(
                                                        servicio.precio
                                                    )}
                                                    <span
                                                        className={
                                                            "font-cuerpo "
                                                            + "text-xs "
                                                            + "text-gris-texto "
                                                            + "ml-1"
                                                        }
                                                    >
                                                        {servicio.unidad}
                                                    </span>
                                                </p>
                                            </div>
                                            <BotonAgregar
                                                etiqueta="Contratar"
                                                item={{
                                                    id: servicio.id,
                                                    tipo: "servicio",
                                                    nombre: servicio.nombre,
                                                    precio: servicio.precio,
                                                    unidad: servicio.unidad,
                                                    imagen:
                                                        imagenesServicios[servicio.nombre]
                                                        ?? servicio.imagen,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    </div>
                                </Animado>
                                )
                            )}
                        </div>
                    )}
                </div>
            </section>
            <VisorImagen
                imagen={visor}
                onCerrar={() => setVisor(null)}
            />
        </div>
    );
}