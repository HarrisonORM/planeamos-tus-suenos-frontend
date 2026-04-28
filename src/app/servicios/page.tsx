"use client";

import { useState, useEffect } from "react";
import EncabezadoPagina
    from "@/components/ui/EncabezadoPagina";
import { getServicios } from "@/lib/api";
import {
    formatearPrecio,
    etiquetaCategoria,
} from "@/lib/utils";

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
    const [servicios, setServicios] = useState<any[]>([]);
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
                            {servicios.map((servicio: any) => (
                                <div
                                    key={servicio.id}
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
                                        + "flex flex-col"
                                    }
                                >
                                    <div
                                        className={
                                            "h-52 overflow-hidden "
                                            + "relative group"
                                        }
                                    >
                                        <img
                                            src={servicio.imagen}
                                            alt={servicio.nombre}
                                            className={
                                                "w-full h-full "
                                                + "object-cover "
                                                + "transition-transform "
                                                + "duration-500 "
                                                + "group-hover:scale-105"
                                            }
                                        />
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
                                            <span
                                                className={
                                                    "text-verde text-sm "
                                                    + "font-cuerpo "
                                                    + "font-medium "
                                                    + "hover:text-verde-oscuro "
                                                    + "transition-colors "
                                                    + "cursor-pointer"
                                                }
                                            >
                                                Contratar →
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}