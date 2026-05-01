"use client";

import EncabezadoPagina from "@/components/ui/EncabezadoPagina";
import Animado from "@/components/ui/Animado";
import {
    Heart,
    Star,
    Users,
    MapPin,
    Calendar,
    Award,
} from "lucide-react";

const valores = [
    {
        icono: Heart,
        titulo: "Pasión",
        texto:
            "Cada evento lo vivimos como propio. "
            + "Tu felicidad es nuestra motivación.",
    },
    {
        icono: Star,
        titulo: "Excelencia",
        texto:
            "Cuidamos cada detalle para que "
            + "todo salga perfecto.",
    },
    {
        icono: Users,
        titulo: "Cercanía",
        texto:
            "Te acompañamos de principio a fin. "
            + "Somos tu equipo, no un proveedor más.",
    },
];

const cifras = [
    { numero: "150+", texto: "Eventos realizados" },
    { numero: "5", texto: "Años de experiencia" },
    { numero: "98%", texto: "Clientes satisfechos" },
    { numero: "6", texto: "Municipios de cobertura" },
];

const municipios = [
    "Rionegro",
    "Guarne",
    "Llanogrande",
    "La Ceja",
    "Marinilla",
    "El Retiro",
];

export default function PaginaNosotros() {
    return (
        <div>
            <EncabezadoPagina
                etiqueta="Conócenos"
                titulo="Nuestra Historia"
                subtitulo={
                    "Somos un equipo apasionado por crear "
                    + "momentos inolvidables en el "
                    + "Oriente Antioqueño."
                }
            />

            {/* Historia */}
            <section className="py-24 bg-blanco-calido">
                <div className="contenedor-principal">
                    <div
                        className={
                            "grid grid-cols-1 "
                            + "lg:grid-cols-2 gap-16 "
                            + "items-center"
                        }
                    >
                        <Animado direccion="izquierda">
                            <p
                                className={
                                    "font-cuerpo text-xs "
                                    + "tracking-[0.4em] uppercase "
                                    + "text-verde mb-4"
                                }
                            >
                                Nuestra esencia
                            </p>
                            <h2
                                className={
                                    "font-titulo text-4xl "
                                    + "md:text-5xl font-light "
                                    + "text-negro-elegante mb-6"
                                }
                            >
                                Hacemos realidad{" "}
                                <span
                                    className="text-durazno-oscuro italic"
                                >
                                    tus sueños
                                </span>
                            </h2>
                            <div
                                className={
                                    "space-y-4 font-cuerpo "
                                    + "text-gris-texto leading-relaxed"
                                }
                            >
                                <p>
                                    Nacimos en el corazón del Oriente
                                    Antioqueño con una misión clara:
                                    transformar cada celebración en una
                                    experiencia única e irrepetible.
                                </p>
                                <p>
                                    Desde bodas íntimas en haciendas
                                    tradicionales hasta quinceañeras
                                    de ensueño y eventos corporativos
                                    de primer nivel, nuestro equipo se
                                    encarga de cada detalle para que
                                    tú solo te preocupes por disfrutar.
                                </p>
                                <p>
                                    Conocemos cada rincón de Rionegro,
                                    Guarne, Llanogrande, La Ceja,
                                    Marinilla y El Retiro. Esa cercanía
                                    nos permite ofrecerte las mejores
                                    locaciones y proveedores de la región.
                                </p>
                            </div>
                        </Animado>

                        <Animado
                            direccion="derecha"
                            className={
                                "relative h-[500px] "
                                + "rounded-tarjeta overflow-hidden"
                            }
                        >
                            <img
                                src={
                                    "https://images.unsplash.com/"
                                    + "photo-1519741497674-611481863552"
                                    + "?w=800"
                                }
                                alt="Evento en el Oriente Antioqueño"
                                className={
                                    "w-full h-full object-cover"
                                }
                            />
                            <div
                                className={
                                    "absolute inset-0 "
                                    + "bg-gradient-to-t "
                                    + "from-negro-elegante/30 "
                                    + "to-transparent"
                                }
                            />
                        </Animado>
                    </div>
                </div>
            </section>

            {/* Valores */}
            <section className="py-24 bg-verde-claro">
                <div className="contenedor-principal">
                    <Animado className="text-center mb-16">
                        <p
                            className={
                                "font-cuerpo text-xs "
                                + "tracking-[0.4em] uppercase "
                                + "text-verde-oscuro mb-4"
                            }
                        >
                            Lo que nos define
                        </p>
                        <h2
                            className={
                                "font-titulo text-4xl "
                                + "md:text-5xl font-light "
                                + "text-negro-elegante"
                            }
                        >
                            Nuestros{" "}
                            <span
                                className="text-durazno-oscuro italic"
                            >
                                valores
                            </span>
                        </h2>
                    </Animado>

                    <div
                        className={
                            "grid grid-cols-1 "
                            + "md:grid-cols-3 gap-8"
                        }
                    >
                        {valores.map((valor, indice) => {
                            const Icono = valor.icono;
                            return (
                                <Animado
                                    key={valor.titulo}
                                    delay={indice * 0.1}
                                    className={
                                        "text-center p-8 "
                                        + "bg-blanco-calido "
                                        + "rounded-tarjeta "
                                        + "border border-durazno/20 "
                                        + "shadow-suave "
                                        + "hover:shadow-elegante "
                                        + "transition-all duration-300"
                                    }
                                >
                                    <div
                                        className={
                                            "w-14 h-14 mx-auto mb-6 "
                                            + "bg-verde/10 rounded-full "
                                            + "flex items-center "
                                            + "justify-center"
                                        }
                                    >
                                        <Icono
                                            size={24}
                                            className="text-verde"
                                        />
                                    </div>
                                    <h3
                                        className={
                                            "font-titulo text-2xl "
                                            + "text-negro-elegante mb-3"
                                        }
                                    >
                                        {valor.titulo}
                                    </h3>
                                    <p
                                        className={
                                            "font-cuerpo text-sm "
                                            + "text-gris-texto "
                                            + "leading-relaxed"
                                        }
                                    >
                                        {valor.texto}
                                    </p>
                                </Animado>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Cifras */}
            <section className="py-20 bg-negro-elegante">
                <div className="contenedor-principal">
                    <div
                        className={
                            "grid grid-cols-2 "
                            + "md:grid-cols-4 gap-8"
                        }
                    >
                        {cifras.map((cifra, indice) => (
                            <Animado
                                key={cifra.texto}
                                delay={indice * 0.1}
                                className="text-center"
                            >
                                <p
                                    className={
                                        "font-titulo text-5xl "
                                        + "text-durazno mb-2"
                                    }
                                >
                                    {cifra.numero}
                                </p>
                                <p
                                    className={
                                        "font-cuerpo text-sm "
                                        + "text-blanco-calido/70 "
                                        + "tracking-wider uppercase"
                                    }
                                >
                                    {cifra.texto}
                                </p>
                            </Animado>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cobertura */}
            <section className="py-24 bg-blanco-calido">
                <div className="contenedor-principal">
                    <Animado className="text-center mb-16">
                        <p
                            className={
                                "font-cuerpo text-xs "
                                + "tracking-[0.4em] uppercase "
                                + "text-verde mb-4"
                            }
                        >
                            Dónde estamos
                        </p>
                        <h2
                            className={
                                "font-titulo text-4xl "
                                + "md:text-5xl font-light "
                                + "text-negro-elegante"
                            }
                        >
                            Nuestra{" "}
                            <span
                                className="text-durazno-oscuro italic"
                            >
                                cobertura
                            </span>
                        </h2>
                    </Animado>

                    <div
                        className={
                            "grid grid-cols-2 "
                            + "md:grid-cols-3 "
                            + "lg:grid-cols-6 gap-4"
                        }
                    >
                        {municipios.map((municipio, indice) => (
                            <Animado
                                key={municipio}
                                delay={indice * 0.1}
                                className={
                                    "text-center p-6 "
                                    + "bg-verde-claro "
                                    + "rounded-tarjeta "
                                    + "border border-verde/20 "
                                    + "hover:border-verde "
                                    + "hover:shadow-suave "
                                    + "transition-all duration-300"
                                }
                            >
                                <MapPin
                                    size={20}
                                    className={
                                        "text-verde mx-auto mb-3"
                                    }
                                />
                                <p
                                    className={
                                        "font-cuerpo font-medium "
                                        + "text-negro-elegante text-sm"
                                    }
                                >
                                    {municipio}
                                </p>
                            </Animado>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}