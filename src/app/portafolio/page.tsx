"use client";

import { useState, useEffect } from "react";
import EncabezadoPagina
    from "@/components/ui/EncabezadoPagina";
import { getPortafolio } from "@/lib/api";
import {
    etiquetaTipoEvento,
    formatearFecha,
} from "@/lib/utils";

const filtros = [
    { valor: "todos", etiqueta: "Todos" },
    { valor: "boda", etiqueta: "Bodas" },
    { valor: "quinceañera", etiqueta: "Quinceañeras" },
    { valor: "fiesta", etiqueta: "Fiestas" },
    { valor: "corporativo", etiqueta: "Corporativos" },
];

export default function PaginaPortafolio() {
    const [filtroActivo, setFiltroActivo] = useState(
        "todos"
    );
    const [eventos, setEventos] = useState<any[]>(
        []
    );
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setCargando(true);
        setError("");

        const tipo =
            filtroActivo === "todos"
                ? undefined
                : filtroActivo;

        getPortafolio(tipo)
            .then((data) => {
                setEventos(data);
                setCargando(false);
            })
            .catch(() => {
                setError(
                    "No se pudieron cargar los eventos. "
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
                etiqueta="Nuestro trabajo"
                titulo="Portafolio"
                subtitulo={
                    "Cada evento es una historia única. "
                    + "Aquí te mostramos algunas de las "
                    + "celebraciones que hemos creado."
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
                        Filtrar por tipo de evento
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

            {/* Galería */}
            <section className="pb-24 bg-blanco-calido">
                <div className="contenedor-principal">
                    {cargando && (
                        <p
                            className={
                                "text-center font-cuerpo "
                                + "text-gris-texto py-20"
                            }
                        >
                            Cargando eventos...
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
                            {eventos.map((evento: any) => (
                                <div
                                    key={evento.id}
                                    className={
                                        "group relative "
                                        + "overflow-hidden "
                                        + "rounded-tarjeta "
                                        + "cursor-pointer "
                                        + "h-[400px]"
                                    }
                                >
                                    <img
                                        src={evento.imagen}
                                        alt={evento.titulo}
                                        className={
                                            "w-full h-full "
                                            + "object-cover "
                                            + "transition-transform "
                                            + "duration-700 "
                                            + "group-hover:scale-110"
                                        }
                                    />
                                    <div
                                        className={
                                            "absolute inset-0 "
                                            + "bg-gradient-to-t "
                                            + "from-negro-elegante/80 "
                                            + "via-negro-elegante/20 "
                                            + "to-transparent"
                                        }
                                    />
                                    <div
                                        className={
                                            "absolute top-4 left-4"
                                        }
                                    >
                                        <span
                                            className={
                                                "inline-block bg-verde "
                                                + "text-blanco-calido "
                                                + "font-cuerpo text-xs "
                                                + "tracking-wider "
                                                + "uppercase px-3 py-1 "
                                                + "rounded-full"
                                            }
                                        >
                                            {etiquetaTipoEvento(
                                                evento.tipo_evento
                                            )}
                                        </span>
                                    </div>
                                    <div
                                        className={
                                            "absolute bottom-0 "
                                            + "left-0 right-0 p-6"
                                        }
                                    >
                                        <h3
                                            className={
                                                "font-titulo text-2xl "
                                                + "text-blanco-calido mb-1"
                                            }
                                        >
                                            {evento.titulo}
                                        </h3>
                                        <p
                                            className={
                                                "font-cuerpo text-sm "
                                                + "text-blanco-calido/80 "
                                                + "mb-2"
                                            }
                                        >
                                            {evento.descripcion}
                                        </p>
                                        <div
                                            className={
                                                "flex items-center "
                                                + "justify-between "
                                                + "text-xs "
                                                + "text-blanco-calido/60 "
                                                + "font-cuerpo"
                                            }
                                        >
                                            <span>{evento.lugar}</span>
                                            <span>
                                                {formatearFecha(
                                                    evento.fecha
                                                )}
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