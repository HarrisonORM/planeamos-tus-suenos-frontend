"use client";

import { useEffect, useState } from "react";
import Animado from "@/components/ui/Animado";
import EncabezadoPagina
    from "@/components/ui/EncabezadoPagina";
import { getLocaciones } from "@/lib/api";
import { imagenesLocaciones }
    from "@/data/imagenesLocaciones";
import { etiquetaTipoEvento } from "@/lib/utils";
import { MapPin, Users } from "lucide-react";
import type { LocacionEvento } from "@/types";

const filtrosMunicipio = [
    { valor: "todos", etiqueta: "Todos" },
    { valor: "Llanogrande", etiqueta: "Llanogrande" },
    { valor: "Rionegro", etiqueta: "Rionegro" },
];

export default function PaginaLocaciones() {
    const [filtroActivo, setFiltroActivo] = useState(
        "todos"
    );
    const [locaciones, setLocaciones] = useState<
        LocacionEvento[]
    >([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let activo = true;

        getLocaciones(
            filtroActivo === "todos"
                ? undefined
                : filtroActivo
        )
            .then((data) => {
                if (!activo) return;
                setLocaciones(data);
                setCargando(false);
            })
            .catch(() => {
                if (!activo) return;
                setError(
                    "No se pudieron cargar las locaciones. "
                    + "Verifica que el backend esté activo."
                );
                setCargando(false);
            });

        return () => {
            activo = false;
        };
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
                etiqueta="Espacios recomendados"
                titulo="Locaciones"
                subtitulo={
                    "Los mejores espacios del Oriente "
                    + "Antioqueño para hacer realidad "
                    + "tu evento soñado."
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
                        Filtrar por zona
                    </p>
                    <div
                        className={
                            "flex flex-wrap items-center "
                            + "justify-center gap-3"
                        }
                    >
                        {filtrosMunicipio.map((filtro) => (
                            <button
                                key={filtro.valor}
                                onClick={() => {
                                    if (filtroActivo === filtro.valor) {
                                        return;
                                    }
                                    setCargando(true);
                                    setError("");
                                    setFiltroActivo(filtro.valor);
                                }}
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

            {/* Locaciones */}
            <section className="pb-24 bg-blanco-calido">
                <div className="contenedor-principal">
                    {cargando && (
                        <p className={
                            "text-center font-cuerpo "
                            + "text-gris-texto py-20"
                        }>
                            Cargando locaciones...
                        </p>
                    )}

                    {error && (
                        <p
                            role="alert"
                            className={
                                "text-center font-cuerpo "
                                + "text-red-500 py-20"
                            }
                        >
                            {error}
                        </p>
                    )}

                    {!cargando && !error && locaciones.length === 0 && (
                        <p className={
                            "text-center font-cuerpo "
                            + "text-gris-texto py-20"
                        }>
                            No hay locaciones disponibles para esta zona.
                        </p>
                    )}

                    {!cargando && !error && locaciones.length > 0 && (
                        <div
                            className={
                                "grid grid-cols-1 "
                                + "md:grid-cols-2 "
                                + "lg:grid-cols-3 gap-6"
                            }
                        >
                            {locaciones.map((loc, index) => (
                            <Animado key={loc.id} delay={index * 0.1}>
                                <div
                                    className={
                                        "bg-blanco-puro "
                                        + "rounded-tarjeta "
                                        + "overflow-hidden "
                                        + "border border-durazno/20 "
                                        + "shadow-suave "
                                        + "hover:shadow-elegante "
                                        + "hover:-translate-y-1 "
                                        + "transition-all duration-300 "
                                        + "flex flex-col"
                                    }
                                >
                                {/* Imagen */}
                                <div
                                    className={
                                        "h-52 overflow-hidden "
                                        + "relative group"
                                    }
                                >
                                    <img
                                        src={
                                            imagenesLocaciones[
                                                loc.nombre
                                            ] ?? loc.imagen
                                        }
                                        alt={loc.nombre}
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
                                            "absolute inset-0 "
                                            + "bg-gradient-to-t "
                                            + "from-negro-elegante/40 "
                                            + "to-transparent"
                                        }
                                    />
                                    {/* Municipio */}
                                    <div
                                        className={
                                            "absolute top-4 left-4 "
                                            + "flex items-center gap-1.5 "
                                            + "bg-blanco-calido/90 "
                                            + "backdrop-blur-sm "
                                            + "text-negro-elegante "
                                            + "font-cuerpo text-xs "
                                            + "tracking-wider uppercase "
                                            + "px-3 py-1 rounded-full"
                                        }
                                    >
                                        <MapPin size={12} />
                                        {loc.municipio}
                                    </div>
                                    {/* Capacidad */}
                                    <div
                                        className={
                                            "absolute top-4 right-4 "
                                            + "flex items-center gap-1.5 "
                                            + "bg-verde "
                                            + "text-blanco-calido "
                                            + "font-cuerpo text-xs "
                                            + "tracking-wider "
                                            + "px-3 py-1 rounded-full"
                                        }
                                    >
                                        <Users size={12} />
                                        {loc.capacidad} personas
                                    </div>
                                </div>

                                {/* Info */}
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
                                        {loc.nombre}
                                    </h3>
                                    <p
                                        className={
                                            "font-cuerpo text-sm "
                                            + "text-gris-texto "
                                            + "leading-relaxed "
                                            + "mb-4 flex-1"
                                        }
                                    >
                                        {loc.descripcion}
                                    </p>

                                    {/* Tipos de evento */}
                                    <div
                                        className={
                                            "flex flex-wrap "
                                            + "gap-1.5 mb-4"
                                        }
                                    >
                                        {loc.tipos_evento.map(
                                            (tipo) => (
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
                                                    {etiquetaTipoEvento(tipo)}
                                                </span>
                                            )
                                        )}
                                    </div>

                                    {/* Precio */}
                                    <div
                                        className={
                                            "pt-4 border-t "
                                            + "border-durazno/20 "
                                            + "flex items-center "
                                            + "justify-between"
                                        }
                                    >
                                        <p
                                            className={
                                                "font-cuerpo "
                                                + "font-semibold "
                                                + "text-verde text-sm"
                                            }
                                        >
                                            {loc.precio}
                                        </p>
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
                                            Más info →
                                        </span>
                                    </div>
                                </div>
                            </div>
                            </Animado>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}