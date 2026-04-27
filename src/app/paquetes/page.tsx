"use client";

import { useState } from "react";
import Link from "next/link";
import EncabezadoPagina
    from "@/components/ui/EncabezadoPagina";
import { paquetes } from "@/data/mock";
import {
    formatearPrecio,
    etiquetaTipoEvento,
} from "@/lib/utils";

const filtros = [
    { valor: "todos", etiqueta: "Todos" },
    { valor: "boda", etiqueta: "Bodas" },
    { valor: "quinceañera", etiqueta: "Quinceañeras" },
    { valor: "fiesta", etiqueta: "Fiestas" },
    { valor: "corporativo", etiqueta: "Corporativos" },
];

export default function PaginaPaquetes() {
    const [filtroActivo, setFiltroActivo] = useState(
        "todos"
    );

    const paquetesFiltrados =
        filtroActivo === "todos"
            ? paquetes
            : paquetes.filter(
                (p) => p.tipoEvento === filtroActivo
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
                etiqueta="Todo incluido"
                titulo="Paquetes"
                subtitulo={
                    "Soluciones completas para cada tipo "
                    + "de celebración. Elige el que más "
                    + "se adapte a tu evento."
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

            {/* Paquetes */}
            <section className="pb-24 bg-blanco-calido">
                <div className="contenedor-principal">
                    <div
                        className={
                            "grid grid-cols-1 "
                            + "md:grid-cols-2 "
                            + "lg:grid-cols-3 gap-8"
                        }
                    >
                        {paquetesFiltrados.map((paquete) => {
                            const dest = paquete.destacado;

                            const fondoCard = dest
                                ? "bg-negro-elegante "
                                + "shadow-elegante "
                                + "ring-2 ring-durazno"
                                : "bg-blanco-puro "
                                + "border border-durazno/20 "
                                + "shadow-suave "
                                + "hover:shadow-elegante";

                            const colorTitulo = dest
                                ? "text-blanco-calido"
                                : "text-negro-elegante";

                            const colorTexto = dest
                                ? "text-blanco-calido/70"
                                : "text-gris-texto";

                            const colorPrecio = dest
                                ? "text-durazno"
                                : "text-negro-elegante";

                            const colorLabel = dest
                                ? "text-durazno"
                                : "text-verde";

                            const colorCheck = dest
                                ? "text-durazno"
                                : "text-verde";

                            const borderDiv = dest
                                ? "border-blanco-calido/10"
                                : "border-durazno/20";

                            const estiloBoton = dest
                                ? "bg-durazno "
                                + "text-negro-elegante "
                                + "hover:bg-durazno-oscuro"
                                : "border border-verde "
                                + "text-verde "
                                + "hover:bg-verde "
                                + "hover:text-blanco-calido";

                            return (
                                <div
                                    key={paquete.id}
                                    className={
                                        "rounded-tarjeta "
                                        + "overflow-hidden "
                                        + "flex flex-col "
                                        + "transition-all "
                                        + "duration-300 "
                                        + fondoCard
                                    }
                                >
                                    {/* Badge destacado */}
                                    {dest && (
                                        <div
                                            className={
                                                "bg-durazno "
                                                + "text-negro-elegante "
                                                + "text-center py-2 "
                                                + "font-cuerpo text-xs "
                                                + "tracking-[0.3em] "
                                                + "uppercase font-semibold"
                                            }
                                        >
                                            ✦ Más popular
                                        </div>
                                    )}

                                    {/* Imagen */}
                                    <div
                                        className={
                                            "relative h-48 "
                                            + "flex-shrink-0"
                                        }
                                    >
                                        <img
                                            src={paquete.imagen}
                                            alt={paquete.nombre}
                                            className={
                                                "w-full h-full "
                                                + "object-cover"
                                            }
                                        />
                                        <div
                                            className={
                                                "absolute inset-0 "
                                                + "bg-gradient-to-t "
                                                + "from-negro-elegante/50 "
                                                + "to-transparent"
                                            }
                                        />
                                        <span
                                            className={
                                                "absolute bottom-3 "
                                                + "left-4 "
                                                + "bg-blanco-calido/90 "
                                                + "backdrop-blur-sm "
                                                + "text-negro-elegante "
                                                + "font-cuerpo text-xs "
                                                + "tracking-wider "
                                                + "uppercase px-3 py-1 "
                                                + "rounded-full"
                                            }
                                        >
                                            {etiquetaTipoEvento(
                                                paquete.tipoEvento
                                            )}
                                        </span>
                                    </div>

                                    {/* Contenido */}
                                    <div
                                        className={
                                            "p-6 flex flex-col "
                                            + "flex-1 text-center"
                                        }
                                    >
                                        <h3
                                            className={
                                                "font-titulo text-2xl "
                                                + "mb-2 " + colorTitulo
                                            }
                                        >
                                            {paquete.nombre}
                                        </h3>
                                        <p
                                            className={
                                                "font-cuerpo text-sm "
                                                + "leading-relaxed "
                                                + "mb-5 " + colorTexto
                                            }
                                        >
                                            {paquete.descripcion}
                                        </p>

                                        {/* Rango de precios */}
                                        <div
                                            className={
                                                "mb-5 pb-5 border-b "
                                                + borderDiv
                                            }
                                        >
                                            <p
                                                className={
                                                    "font-cuerpo text-xs "
                                                    + "uppercase "
                                                    + "tracking-wider "
                                                    + "mb-1 " + colorLabel
                                                }
                                            >
                                                Inversión desde
                                            </p>
                                            <p
                                                className={
                                                    "font-titulo text-3xl "
                                                    + colorPrecio
                                                }
                                            >
                                                {formatearPrecio(
                                                    paquete.precioDesde
                                                )}
                                            </p>
                                            <p
                                                className={
                                                    "font-cuerpo text-xs "
                                                    + "mt-1 " + colorTexto
                                                }
                                            >
                                                hasta{" "}
                                                {formatearPrecio(
                                                    paquete.precioHasta
                                                )}
                                            </p>
                                        </div>

                                        {/* Incluye */}
                                        <ul
                                            className={
                                                "space-y-2 mb-6 "
                                                + "flex-1 text-left"
                                            }
                                        >
                                            {paquete.incluye.map(
                                                (item, idx) => (
                                                    <li
                                                        key={idx}
                                                        className={
                                                            "flex items-start "
                                                            + "gap-2 font-cuerpo "
                                                            + "text-sm "
                                                            + (dest
                                                                ? "text-blanco-calido/80"
                                                                : "text-gris-texto")
                                                        }
                                                    >
                                                        <span
                                                            className={
                                                                "mt-0.5 "
                                                                + "flex-shrink-0 "
                                                                + "font-semibold "
                                                                + colorCheck
                                                            }
                                                        >
                                                            ✓
                                                        </span>
                                                        {item}
                                                    </li>
                                                )
                                            )}
                                        </ul>

                                        {/* Botón */}
                                        <Link
                                            href="/contacto"
                                            className={
                                                "block text-center "
                                                + "font-cuerpo "
                                                + "font-semibold text-sm "
                                                + "tracking-wider "
                                                + "uppercase px-6 py-3 "
                                                + "rounded-boton "
                                                + "transition-all "
                                                + "duration-300 "
                                                + estiloBoton
                                            }
                                        >
                                            Cotizar este paquete
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}