"use client";

import { useState } from "react";
import EncabezadoPagina
    from "@/components/ui/EncabezadoPagina";
import {
    Phone,
    Mail,
    MapPin,
    Send,
    Calendar,
    Users,
} from "lucide-react";

export default function PaginaContacto() {
    const [tab, setTab] = useState<
        "contacto" | "cotizacion"
    >("contacto");

    const estiloInput =
        "w-full px-4 py-3 rounded-boton "
        + "border border-gris-borde "
        + "font-cuerpo text-sm "
        + "text-negro-elegante "
        + "bg-blanco-puro "
        + "focus:outline-none "
        + "focus:border-verde "
        + "focus:ring-1 focus:ring-verde "
        + "transition-colors";

    const estiloLabel =
        "block font-cuerpo text-sm "
        + "font-medium text-negro-elegante mb-1.5";

    const handleSubmit = (
        e: React.FormEvent
    ) => {
        e.preventDefault();
        alert(
            "Formulario enviado. En la Fase 4 "
            + "se conectará con el backend."
        );
    };

    const estiloTab = (activo: boolean) =>
        "px-6 py-3 font-cuerpo text-sm "
        + "font-medium tracking-wider uppercase "
        + "transition-all duration-300 "
        + "border-b-2 "
        + (activo
            ? "text-verde border-verde"
            : "text-gris-texto border-transparent "
            + "hover:text-negro-elegante");

    return (
        <div>
            <EncabezadoPagina
                etiqueta="Hablemos"
                titulo="Contacto"
                subtitulo={
                    "Cuéntanos tu idea y juntos "
                    + "crearemos el evento perfecto."
                }
            />

            <section className="py-24 bg-blanco-calido">
                <div className="contenedor-principal">
                    <div
                        className={
                            "grid grid-cols-1 "
                            + "lg:grid-cols-3 gap-12"
                        }
                    >
                        {/* Info de contacto */}
                        <div className="lg:col-span-1">
                            <h2
                                className={
                                    "font-titulo text-3xl "
                                    + "text-negro-elegante mb-6"
                                }
                            >
                                Información{" "}
                                <span
                                    className={
                                        "text-durazno-oscuro italic"
                                    }
                                >
                                    de contacto
                                </span>
                            </h2>
                            <p
                                className={
                                    "font-cuerpo text-sm "
                                    + "text-gris-texto "
                                    + "leading-relaxed mb-8"
                                }
                            >
                                Estamos listos para ayudarte
                                a crear un evento inolvidable.
                                Escríbenos o llámanos.
                            </p>

                            <div className="space-y-6">
                                <div
                                    className={
                                        "flex items-start gap-4"
                                    }
                                >
                                    <div
                                        className={
                                            "w-10 h-10 bg-verde/10 "
                                            + "rounded-full flex "
                                            + "items-center "
                                            + "justify-center "
                                            + "flex-shrink-0"
                                        }
                                    >
                                        <Phone
                                            size={18}
                                            className="text-verde"
                                        />
                                    </div>
                                    <div>
                                        <p
                                            className={
                                                "font-cuerpo "
                                                + "font-medium "
                                                + "text-negro-elegante "
                                                + "text-sm"
                                            }
                                        >
                                            Teléfono
                                        </p>
                                        <p
                                            className={
                                                "font-cuerpo text-sm "
                                                + "text-gris-texto"
                                            }
                                        >
                                            +57 300 000 0000
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className={
                                        "flex items-start gap-4"
                                    }
                                >
                                    <div
                                        className={
                                            "w-10 h-10 bg-verde/10 "
                                            + "rounded-full flex "
                                            + "items-center "
                                            + "justify-center "
                                            + "flex-shrink-0"
                                        }
                                    >
                                        <Mail
                                            size={18}
                                            className="text-verde"
                                        />
                                    </div>
                                    <div>
                                        <p
                                            className={
                                                "font-cuerpo "
                                                + "font-medium "
                                                + "text-negro-elegante "
                                                + "text-sm"
                                            }
                                        >
                                            Correo
                                        </p>
                                        <p
                                            className={
                                                "font-cuerpo text-sm "
                                                + "text-gris-texto"
                                            }
                                        >
                                            eventos@planeamostussuenos.com
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className={
                                        "flex items-start gap-4"
                                    }
                                >
                                    <div
                                        className={
                                            "w-10 h-10 bg-verde/10 "
                                            + "rounded-full flex "
                                            + "items-center "
                                            + "justify-center "
                                            + "flex-shrink-0"
                                        }
                                    >
                                        <MapPin
                                            size={18}
                                            className="text-verde"
                                        />
                                    </div>
                                    <div>
                                        <p
                                            className={
                                                "font-cuerpo "
                                                + "font-medium "
                                                + "text-negro-elegante "
                                                + "text-sm"
                                            }
                                        >
                                            Ubicación
                                        </p>
                                        <p
                                            className={
                                                "font-cuerpo text-sm "
                                                + "text-gris-texto"
                                            }
                                        >
                                            Rionegro, Guarne,
                                            Llanogrande
                                            <br />
                                            Oriente Antioqueño,
                                            Colombia
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Horario */}
                            <div
                                className={
                                    "mt-10 p-6 bg-verde-claro "
                                    + "rounded-tarjeta "
                                    + "border border-verde/20"
                                }
                            >
                                <h3
                                    className={
                                        "font-titulo text-lg "
                                        + "text-negro-elegante mb-3"
                                    }
                                >
                                    Horario de atención
                                </h3>
                                <div
                                    className={
                                        "space-y-2 font-cuerpo "
                                        + "text-sm text-gris-texto"
                                    }
                                >
                                    <div
                                        className={
                                            "flex justify-between"
                                        }
                                    >
                                        <span>Lunes a Viernes</span>
                                        <span
                                            className={
                                                "text-negro-elegante "
                                                + "font-medium"
                                            }
                                        >
                                            8:00 AM - 6:00 PM
                                        </span>
                                    </div>
                                    <div
                                        className={
                                            "flex justify-between"
                                        }
                                    >
                                        <span>Sábados</span>
                                        <span
                                            className={
                                                "text-negro-elegante "
                                                + "font-medium"
                                            }
                                        >
                                            9:00 AM - 2:00 PM
                                        </span>
                                    </div>
                                    <div
                                        className={
                                            "flex justify-between"
                                        }
                                    >
                                        <span>Domingos</span>
                                        <span
                                            className={
                                                "text-negro-elegante "
                                                + "font-medium"
                                            }
                                        >
                                            Solo con cita previa
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Formularios */}
                        <div className="lg:col-span-2">
                            {/* Tabs */}
                            <div
                                className={
                                    "flex gap-2 mb-8 "
                                    + "border-b border-gris-borde"
                                }
                            >
                                <button
                                    onClick={() =>
                                        setTab("contacto")
                                    }
                                    className={estiloTab(
                                        tab === "contacto"
                                    )}
                                >
                                    Contacto General
                                </button>
                                <button
                                    onClick={() =>
                                        setTab("cotizacion")
                                    }
                                    className={estiloTab(
                                        tab === "cotizacion"
                                    )}
                                >
                                    Cotizar Evento
                                </button>
                            </div>

                            {/* Form Contacto */}
                            {tab === "contacto" && (
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-5"
                                >
                                    <div
                                        className={
                                            "grid grid-cols-1 "
                                            + "md:grid-cols-2 gap-5"
                                        }
                                    >
                                        <div>
                                            <label
                                                className={estiloLabel}
                                            >
                                                Nombre completo
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                className={estiloInput}
                                                placeholder="Tu nombre"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                className={estiloLabel}
                                            >
                                                Teléfono
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                className={estiloInput}
                                                placeholder="+57 300 000 0000"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            className={estiloLabel}
                                        >
                                            Correo electrónico
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            className={estiloInput}
                                            placeholder="tu@correo.com"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className={estiloLabel}
                                        >
                                            Mensaje
                                        </label>
                                        <textarea
                                            required
                                            rows={5}
                                            className={
                                                estiloInput
                                                + " resize-none"
                                            }
                                            placeholder={
                                                "Cuéntanos en qué "
                                                + "podemos ayudarte..."
                                            }
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className={
                                            "flex items-center "
                                            + "justify-center gap-2 "
                                            + "w-full md:w-auto "
                                            + "bg-verde "
                                            + "hover:bg-verde-oscuro "
                                            + "text-blanco-calido "
                                            + "font-cuerpo "
                                            + "font-semibold "
                                            + "px-10 py-4 "
                                            + "rounded-boton "
                                            + "transition-all "
                                            + "duration-300 text-sm "
                                            + "tracking-wider "
                                            + "uppercase"
                                        }
                                    >
                                        <Send size={16} />
                                        Enviar mensaje
                                    </button>
                                </form>
                            )}

                            {/* Form Cotización */}
                            {tab === "cotizacion" && (
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-5"
                                >
                                    <div
                                        className={
                                            "grid grid-cols-1 "
                                            + "md:grid-cols-2 gap-5"
                                        }
                                    >
                                        <div>
                                            <label
                                                className={estiloLabel}
                                            >
                                                Nombre completo
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                className={estiloInput}
                                                placeholder="Tu nombre"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                className={estiloLabel}
                                            >
                                                Teléfono
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                className={estiloInput}
                                                placeholder="+57 300 000 0000"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            className={estiloLabel}
                                        >
                                            Correo electrónico
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            className={estiloInput}
                                            placeholder="tu@correo.com"
                                        />
                                    </div>
                                    <div
                                        className={
                                            "grid grid-cols-1 "
                                            + "md:grid-cols-2 gap-5"
                                        }
                                    >
                                        <div>
                                            <label
                                                className={estiloLabel}
                                            >
                                                Tipo de evento
                                            </label>
                                            <select
                                                required
                                                className={estiloInput}
                                            >
                                                <option value="">
                                                    Selecciona...
                                                </option>
                                                <option value="boda">
                                                    Boda
                                                </option>
                                                <option value="quinceañera">
                                                    Quinceañera
                                                </option>
                                                <option value="fiesta">
                                                    Fiesta / Cumpleaños
                                                </option>
                                                <option value="corporativo">
                                                    Evento Corporativo
                                                </option>
                                                <option value="otro">
                                                    Otro
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                className={estiloLabel}
                                            >
                                                Fecha del evento
                                            </label>
                                            <input
                                                type="date"
                                                required
                                                className={estiloInput}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            "grid grid-cols-1 "
                                            + "md:grid-cols-2 gap-5"
                                        }
                                    >
                                        <div>
                                            <label
                                                className={estiloLabel}
                                            >
                                                Número de invitados
                                            </label>
                                            <input
                                                type="number"
                                                required
                                                min="10"
                                                className={estiloInput}
                                                placeholder="Ej: 150"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                className={estiloLabel}
                                            >
                                                Municipio del evento
                                            </label>
                                            <select
                                                required
                                                className={estiloInput}
                                            >
                                                <option value="">
                                                    Selecciona...
                                                </option>
                                                <option value="rionegro">
                                                    Rionegro
                                                </option>
                                                <option value="guarne">
                                                    Guarne
                                                </option>
                                                <option value="llanogrande">
                                                    Llanogrande
                                                </option>
                                                <option value="la-ceja">
                                                    La Ceja
                                                </option>
                                                <option value="marinilla">
                                                    Marinilla
                                                </option>
                                                <option value="el-retiro">
                                                    El Retiro
                                                </option>
                                                <option value="otro">
                                                    Otro
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            className={estiloLabel}
                                        >
                                            ¿Ya tienes locación?
                                        </label>
                                        <select
                                            className={estiloInput}
                                        >
                                            <option value="no">
                                                No, necesito recomendación
                                            </option>
                                            <option value="si">
                                                Sí, ya tengo lugar
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label
                                            className={estiloLabel}
                                        >
                                            Servicios de interés
                                        </label>
                                        <div
                                            className={
                                                "grid grid-cols-2 "
                                                + "md:grid-cols-3 gap-3 "
                                                + "mt-2"
                                            }
                                        >
                                            {[
                                                "Mobiliario",
                                                "Menaje y Cristalería",
                                                "Sonido e Iluminación",
                                                "Decoración Floral",
                                                "Chef / Catering",
                                                "Meseros",
                                                "DJ",
                                                "Fotografía",
                                                "Repostería",
                                            ].map((servicio) => (
                                                <label
                                                    key={servicio}
                                                    className={
                                                        "flex items-center "
                                                        + "gap-2 font-cuerpo "
                                                        + "text-sm "
                                                        + "text-gris-texto "
                                                        + "cursor-pointer "
                                                        + "hover:text-verde "
                                                        + "transition-colors"
                                                    }
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className={
                                                            "accent-verde"
                                                        }
                                                    />
                                                    {servicio}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            className={estiloLabel}
                                        >
                                            Información adicional
                                        </label>
                                        <textarea
                                            rows={4}
                                            className={
                                                estiloInput
                                                + " resize-none"
                                            }
                                            placeholder={
                                                "Cuéntanos más sobre "
                                                + "tu evento, temática, "
                                                + "presupuesto estimado, "
                                                + "o cualquier detalle "
                                                + "que nos ayude a "
                                                + "entender tu visión..."
                                            }
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className={
                                            "flex items-center "
                                            + "justify-center gap-2 "
                                            + "w-full md:w-auto "
                                            + "bg-verde "
                                            + "hover:bg-verde-oscuro "
                                            + "text-blanco-calido "
                                            + "font-cuerpo "
                                            + "font-semibold "
                                            + "px-10 py-4 "
                                            + "rounded-boton "
                                            + "transition-all "
                                            + "duration-300 text-sm "
                                            + "tracking-wider "
                                            + "uppercase"
                                        }
                                    >
                                        <Calendar size={16} />
                                        Solicitar cotización
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}