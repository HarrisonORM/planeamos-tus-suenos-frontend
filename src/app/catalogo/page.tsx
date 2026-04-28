"use client";

import { useState, useEffect } from "react";
import EncabezadoPagina
    from "@/components/ui/EncabezadoPagina";
import { getProductos } from "@/lib/api";
import {
    formatearPrecio,
    etiquetaCategoria,
} from "@/lib/utils";

const filtros = [
    { valor: "todos", etiqueta: "Todos" },
    { valor: "mobiliario", etiqueta: "Mobiliario" },
    {
        valor: "menaje",
        etiqueta: "Menaje y Cristalería",
    },
    { valor: "sonido", etiqueta: "Sonido" },
    {
        valor: "iluminacion",
        etiqueta: "Iluminación",
    },
    { valor: "decoracion", etiqueta: "Decoración" },
];

export default function PaginaCatalogo() {
    const [filtroActivo, setFiltroActivo] = useState(
        "todos"
    );
    const [productos, setProductos] = useState<any[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setCargando(true);
        setError("");

        const categoria =
            filtroActivo === "todos"
                ? undefined
                : filtroActivo;

        getProductos(categoria)
            .then((data) => {
                setProductos(data);
                setCargando(false);
            })
            .catch(() => {
                setError(
                    "No se pudieron cargar los productos. "
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
                etiqueta="Alquiler"
                titulo="Catálogo"
                subtitulo={
                    "Mobiliario, menaje, cristalería, "
                    + "sonido e iluminación para tu evento."
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
                        Filtrar por categoría
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

            {/* Productos */}
            <section className="pb-24 bg-blanco-calido">
                <div className="contenedor-principal">

                    {/* Estado de carga */}
                    {cargando && (
                        <p
                            className={
                                "text-center font-cuerpo "
                                + "text-gris-texto py-20"
                            }
                        >
                            Cargando productos...
                        </p>
                    )}

                    {/* Error */}
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

                    {/* Lista de productos */}
                    {!cargando && !error && (
                        <div
                            className={
                                "grid grid-cols-1 "
                                + "md:grid-cols-2 "
                                + "lg:grid-cols-3 gap-6"
                            }
                        >
                            {productos.map((producto: any) => (
                                <div
                                    key={producto.id}
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
                                            src={producto.imagen}
                                            alt={producto.nombre}
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
                                                    + "bg-blanco-calido/90 "
                                                    + "backdrop-blur-sm "
                                                    + "text-negro-elegante "
                                                    + "font-cuerpo text-xs "
                                                    + "tracking-wider "
                                                    + "uppercase px-3 py-1 "
                                                    + "rounded-full"
                                                }
                                            >
                                                {etiquetaCategoria(
                                                    producto.categoria
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
                                            {producto.nombre}
                                        </h3>
                                        <p
                                            className={
                                                "font-cuerpo text-sm "
                                                + "text-gris-texto "
                                                + "leading-relaxed "
                                                + "mb-4 flex-1"
                                            }
                                        >
                                            {producto.descripcion}
                                        </p>

                                        <div
                                            className={
                                                "flex flex-wrap "
                                                + "gap-1.5 mb-4"
                                            }
                                        >
                                            {producto.tipos_evento.map(
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
                                                        producto.precio
                                                    )}
                                                    <span
                                                        className={
                                                            "font-cuerpo "
                                                            + "text-xs "
                                                            + "text-gris-texto "
                                                            + "ml-1"
                                                        }
                                                    >
                                                        {producto.unidad}
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
                                                Reservar →
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