"use client";

import { useState } from "react";
import EncabezadoPagina
    from "@/components/ui/EncabezadoPagina";
import { locaciones } from "@/data/mock";
import { etiquetaTipoEvento } from "@/lib/utils";
import { MapPin, Users } from "lucide-react";

const filtrosMunicipio = [
    { valor: "todos", etiqueta: "Todos" },
    { valor: "Llanogrande", etiqueta: "Llanogrande" },
    { valor: "Rionegro", etiqueta: "Rionegro" },
];

export default function PaginaLocaciones() {
    const [filtroActivo, setFiltroActivo] = useState(
        "todos"
    );

    const locacionesFiltradas =
        filtroActivo === "todos"
            ? locaciones
            : locaciones.filter(
                (l) => l.municipio === filtroActivo
            );

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

            {/* Locaciones */}
            <section className="pb-24 bg-blanco-calido">
                <div className="contenedor-principal">
                    <div
                        className={
                            "grid grid-cols-1 "
                            + "md:grid-cols-2 "
                            + "lg:grid-cols-3 gap-6"
                        }
                    >
                        {locacionesFiltradas.map((loc) => (
                            <div
                                key={loc.id}
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
                                        src={loc.imagen}
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
                                        {loc.tiposEvento.map(
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
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}