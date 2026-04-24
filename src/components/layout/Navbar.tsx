"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const enlaces = [
    { nombre: "Inicio", ruta: "/" },
    { nombre: "Nosotros", ruta: "/nosotros" },
    { nombre: "Portafolio", ruta: "/portafolio" },
    { nombre: "Catálogo", ruta: "/catalogo" },
    { nombre: "Servicios", ruta: "/servicios" },
    { nombre: "Paquetes", ruta: "/paquetes" },
    { nombre: "Locaciones", ruta: "/locaciones" },
    { nombre: "Contacto", ruta: "/contacto" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const rutaActual = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        setMenuAbierto(false);
    }, [rutaActual]);

    const estiloHeader = scrolled
        ? "bg-negro-elegante/95 backdrop-blur-md shadow-lg py-3"
        : "bg-transparent py-6";

    return (
        <>
            <header
                className={
                    "fixed top-0 left-0 right-0 z-50 "
                    + "transition-all duration-500 "
                    + estiloHeader
                }
            >
                <div
                    className={
                        "max-w-7xl mx-auto px-4 sm:px-6 "
                        + "lg:px-8 flex items-center justify-between"
                    }
                >
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-durazno"
                    >
                        <span className="text-2xl">✦</span>
                        <div className="flex flex-col leading-none">
                            <span
                                className={
                                    "font-titulo text-xl "
                                    + "font-semibold tracking-wide"
                                }
                            >
                                Planeamos tus Sueños
                            </span>
                            <span
                                className={
                                    "font-cuerpo text-[10px] "
                                    + "tracking-[0.3em] uppercase "
                                    + "text-durazno/70 mt-0.5"
                                }
                            >
                                Oriente Antioqueño
                            </span>
                        </div>
                    </Link>

                    {/* Menú escritorio */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {enlaces.map((enlace) => {
                            const activo = rutaActual === enlace.ruta;
                            const estiloLink = activo
                                ? "text-durazno after:w-full"
                                : "text-[#FFFFFF] hover:text-durazno "
                                + "after:w-0 hover:after:w-full";
                            return (
                                <Link
                                    key={enlace.ruta}
                                    href={enlace.ruta}
                                    className={
                                        "relative font-cuerpo "
                                        + "text-base font-medium "
                                        + "tracking-wide transition-colors "
                                        + "after:absolute after:left-0 "
                                        + "after:-bottom-1 after:h-[2px] "
                                        + "after:bg-durazno "
                                        + "after:transition-all "
                                        + "after:duration-300 "
                                        + estiloLink
                                    }
                                >
                                    {enlace.nombre}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Botón cotizar */}
                    <Link
                        href="/contacto"
                        className={
                            "hidden lg:inline-block "
                            + "bg-verde hover:bg-verde-oscuro "
                            + "text-blanco-calido font-cuerpo "
                            + "text-sm font-semibold "
                            + "px-6 py-2.5 rounded-boton "
                            + "transition-all duration-300 "
                            + "hover:shadow-suave"
                        }
                    >
                        Cotizar Evento
                    </Link>

                    {/* Botón menú móvil */}
                    <button
                        onClick={() => setMenuAbierto(!menuAbierto)}
                        className="lg:hidden text-blanco-calido p-2"
                    >
                        {menuAbierto
                            ? <X size={28} />
                            : <Menu size={28} />
                        }
                    </button>
                </div>
            </header>

            {/* Menú móvil */}
            <div
                className={
                    "fixed inset-0 z-40 bg-negro-elegante "
                    + "transition-all duration-500 lg:hidden "
                    + (menuAbierto
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none")
                }
            >
                <nav
                    className={
                        "flex flex-col items-center "
                        + "justify-center h-full gap-6 pt-16"
                    }
                >
                    {enlaces.map((enlace) => {
                        const colorLink = rutaActual === enlace.ruta
                            ? "text-durazno"
                            : "text-blanco-puro";
                        return (
                            <Link
                                key={enlace.ruta}
                                href={enlace.ruta}
                                className={
                                    "font-titulo text-3xl "
                                    + "transition-colors "
                                    + "hover:text-durazno "
                                    + colorLink
                                }
                            >
                                {enlace.nombre}
                            </Link>
                        );
                    })}
                    <Link
                        href="/contacto"
                        className={
                            "mt-4 bg-verde text-blanco-calido "
                            + "font-cuerpo font-semibold "
                            + "px-8 py-3 rounded-boton "
                            + "hover:bg-verde-oscuro "
                            + "transition-colors"
                        }
                    >
                        Cotizar Evento
                    </Link>
                </nav>
            </div>
        </>
    );
}