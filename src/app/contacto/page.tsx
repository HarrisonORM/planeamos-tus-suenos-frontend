"use client";

import { useState } from "react";
import EncabezadoPagina
    from "@/components/ui/EncabezadoPagina";
import Animado from "@/components/ui/Animado";
import {
    enviarMensaje,
    enviarCotizacion,
} from "@/lib/api";
import {
    Phone,
    Mail,
    MapPin,
    Send,
    Calendar,
    CheckCircle,
} from "lucide-react";

export default function PaginaContacto() {
    const [tab, setTab] = useState<"contacto" | "cotizacion">("contacto");

    // Estado del formulario de contacto
    const [contacto, setContacto] = useState({
        nombre: "",
        telefono: "",
        correo: "",
        mensaje: "",
    });

    // Estado del formulario de cotización
    const [cotizacion, setCotizacion] = useState({
        nombre: "",
        telefono: "",
        correo: "",
        tipo_evento: "",
        fecha_evento: "",
        num_invitados: "",
        municipio: "",
        tiene_locacion: false,
        servicios_interes: [] as string[],
        mensaje: "",
    });

    const [enviando, setEnviando] = useState(false);
    const [exito, setExito] = useState(false);
    const [error, setError] = useState("");

    // Enviar formulario de contacto
    const handleContacto = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();
        setEnviando(true);
        setError("");

        try {
            await enviarMensaje(contacto);
            setExito(true);
            setContacto({
                nombre: "",
                telefono: "",
                correo: "",
                mensaje: "",
            });
        } catch {
            setError(
                "No se pudo enviar el mensaje. "
                + "Verifica que el servidor esté activo."
            );
        }

        setEnviando(false);
    };

    // Enviar formulario de cotización
    const handleCotizacion = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();
        setEnviando(true);
        setError("");

        try {
            await enviarCotizacion({
                ...cotizacion,
                num_invitados: Number(
                    cotizacion.num_invitados
                ),
            });
            setExito(true);
            setCotizacion({
                nombre: "",
                telefono: "",
                correo: "",
                tipo_evento: "",
                fecha_evento: "",
                num_invitados: "",
                municipio: "",
                tiene_locacion: false,
                servicios_interes: [],
                mensaje: "",
            });
        } catch {
            setError(
                "No se pudo enviar la cotización. "
                + "Verifica que el servidor esté activo."
            );
        }

        setEnviando(false);
    };

    // Toggle de servicios de interés
    const toggleServicio = (servicio: string) => {
        setCotizacion((prev) => {
            const lista = prev.servicios_interes;
            const nueva = lista.includes(servicio)
                ? lista.filter((s) => s !== servicio)
                : [...lista, servicio];
            return {
                ...prev,
                servicios_interes: nueva,
            };
        });
    };

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

    const estiloTab = (activo: boolean) =>
        "px-6 py-3 font-cuerpo text-sm "
        + "font-medium tracking-wider uppercase "
        + "transition-all duration-300 "
        + "border-b-2 "
        + (activo
            ? "text-verde border-verde"
            : "text-gris-texto border-transparent "
            + "hover:text-negro-elegante");

    const estiloBoton =
        "flex items-center justify-center gap-2 "
        + "w-full md:w-auto bg-verde "
        + "hover:bg-verde-oscuro "
        + "text-blanco-calido font-cuerpo "
        + "font-semibold px-10 py-4 rounded-boton "
        + "transition-all duration-300 text-sm "
        + "tracking-wider uppercase "
        + "disabled:opacity-50 "
        + "disabled:cursor-not-allowed";

    // Mensaje de éxito
    if (exito) {
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
                <section
                    className={
                        "py-24 bg-blanco-calido "
                        + "text-center"
                    }
                >
                    <div className="contenedor-principal">
                        <div
                            className={
                                "max-w-md mx-auto "
                                + "bg-blanco-puro p-10 "
                                + "rounded-tarjeta "
                                + "shadow-suave "
                                + "border border-verde/20"
                            }
                        >
                            <CheckCircle
                                size={48}
                                className={
                                    "text-verde mx-auto mb-4"
                                }
                            />
                            <h2
                                className={
                                    "font-titulo text-3xl "
                                    + "text-negro-elegante mb-3"
                                }
                            >
                                ¡Mensaje enviado!
                            </h2>
                            <p
                                className={
                                    "font-cuerpo text-sm "
                                    + "text-gris-texto mb-6"
                                }
                            >
                                Recibimos tu información.
                                Nos pondremos en contacto
                                contigo pronto.
                            </p>
                            <button
                                onClick={() => setExito(false)}
                                className={
                                    "bg-verde "
                                    + "hover:bg-verde-oscuro "
                                    + "text-blanco-calido "
                                    + "font-cuerpo font-semibold "
                                    + "px-8 py-3 rounded-boton "
                                    + "transition-all duration-300 "
                                    + "text-sm tracking-wider "
                                    + "uppercase"
                                }
                            >
                                Enviar otro mensaje
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

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
                            <Animado direccion="izquierda">
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
                                </p>

                                <div className="space-y-6">
                                    <div
                                        className="flex items-start gap-4"
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
                                                    "font-cuerpo font-medium "
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
                                        className="flex items-start gap-4"
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
                                                    "font-cuerpo font-medium "
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
                                        className="flex items-start gap-4"
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
                                                    "font-cuerpo font-medium "
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
                                                Oriente Antioqueño
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
                                            className="flex justify-between"
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
                                            className="flex justify-between"
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
                                            className="flex justify-between"
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
                            </Animado>
                        </div>

                        {/* Formularios */}
                        <div className="lg:col-span-2">
                            <Animado direccion="derecha">
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

                            {/* Error */}
                            {error && (
                                <div
                                    className={
                                        "mb-6 p-4 bg-red-50 "
                                        + "border border-red-200 "
                                        + "rounded-boton "
                                        + "font-cuerpo text-sm "
                                        + "text-red-600"
                                    }
                                >
                                    {error}
                                </div>
                            )}

                            {/* Form Contacto */}
                            {tab === "contacto" && (
                                <form
                                    onSubmit={handleContacto}
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
                                                value={contacto.nombre}
                                                onChange={(e) =>
                                                    setContacto({
                                                        ...contacto,
                                                        nombre: e.target.value,
                                                    })
                                                }
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
                                                value={contacto.telefono}
                                                onChange={(e) =>
                                                    setContacto({
                                                        ...contacto,
                                                        telefono:
                                                            e.target.value,
                                                    })
                                                }
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
                                            value={contacto.correo}
                                            onChange={(e) =>
                                                setContacto({
                                                    ...contacto,
                                                    correo: e.target.value,
                                                })
                                            }
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
                                            value={contacto.mensaje}
                                            onChange={(e) =>
                                                setContacto({
                                                    ...contacto,
                                                    mensaje: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={enviando}
                                        className={estiloBoton}
                                    >
                                        <Send size={16} />
                                        {enviando
                                            ? "Enviando..."
                                            : "Enviar mensaje"}
                                    </button>
                                </form>
                            )}

                            {/* Form Cotización */}
                            {tab === "cotizacion" && (
                                <form
                                    onSubmit={handleCotizacion}
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
                                                value={cotizacion.nombre}
                                                onChange={(e) =>
                                                    setCotizacion({
                                                        ...cotizacion,
                                                        nombre: e.target.value,
                                                    })
                                                }
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
                                                value={
                                                    cotizacion.telefono
                                                }
                                                onChange={(e) =>
                                                    setCotizacion({
                                                        ...cotizacion,
                                                        telefono:
                                                            e.target.value,
                                                    })
                                                }
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
                                            value={cotizacion.correo}
                                            onChange={(e) =>
                                                setCotizacion({
                                                    ...cotizacion,
                                                    correo: e.target.value,
                                                })
                                            }
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
                                                value={
                                                    cotizacion.tipo_evento
                                                }
                                                onChange={(e) =>
                                                    setCotizacion({
                                                        ...cotizacion,
                                                        tipo_evento:
                                                            e.target.value,
                                                    })
                                                }
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
                                                value={
                                                    cotizacion.fecha_evento
                                                }
                                                onChange={(e) =>
                                                    setCotizacion({
                                                        ...cotizacion,
                                                        fecha_evento:
                                                            e.target.value,
                                                    })
                                                }
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
                                                value={
                                                    cotizacion.num_invitados
                                                }
                                                onChange={(e) =>
                                                    setCotizacion({
                                                        ...cotizacion,
                                                        num_invitados:
                                                            e.target.value,
                                                    })
                                                }
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
                                                value={
                                                    cotizacion.municipio
                                                }
                                                onChange={(e) =>
                                                    setCotizacion({
                                                        ...cotizacion,
                                                        municipio:
                                                            e.target.value,
                                                    })
                                                }
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
                                            value={
                                                cotizacion.tiene_locacion
                                                    ? "si"
                                                    : "no"
                                            }
                                            onChange={(e) =>
                                                setCotizacion({
                                                    ...cotizacion,
                                                    tiene_locacion:
                                                        e.target.value === "si",
                                                })
                                            }
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
                                                + "md:grid-cols-3 "
                                                + "gap-3 mt-2"
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
                                                        className="accent-verde"
                                                        checked={
                                                            cotizacion
                                                                .servicios_interes
                                                                .includes(servicio)
                                                        }
                                                        onChange={() =>
                                                            toggleServicio(
                                                                servicio
                                                            )
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
                                                + "tu evento..."
                                            }
                                            value={cotizacion.mensaje}
                                            onChange={(e) =>
                                                setCotizacion({
                                                    ...cotizacion,
                                                    mensaje: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={enviando}
                                        className={estiloBoton}
                                    >
                                        <Calendar size={16} />
                                        {enviando
                                            ? "Enviando..."
                                            : "Solicitar cotización"}
                                    </button>
                                </form>
                            )}
                            </Animado>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}