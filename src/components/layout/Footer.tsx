import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
    const año = new Date().getFullYear();

    const enlacesExplorar = [
        { nombre: "Nosotros", ruta: "/nosotros" },
        { nombre: "Portafolio", ruta: "/portafolio" },
        { nombre: "Paquetes", ruta: "/paquetes" },
        { nombre: "Locaciones", ruta: "/locaciones" },
    ];

    const enlacesServicios = [
        { nombre: "Alquiler de Mobiliario", ruta: "/catalogo" },
        { nombre: "Menaje y Cristalería", ruta: "/catalogo" },
        { nombre: "Sonido e Iluminación", ruta: "/catalogo" },
        { nombre: "Personal Especializado", ruta: "/servicios" },
    ];

    const estiloIconoRed =
        "w-9 h-9 rounded-full border " +
        "border-durazno/40 flex items-center " +
        "justify-center text-durazno " +
        "hover:bg-verde hover:border-verde " +
        "hover:text-blanco-calido " +
        "transition-all duration-300";

    return (
        <footer
            className={"bg-negro-elegante text-blanco-calido " + "pt-20 pb-8 mt-20"}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className={
                        "grid grid-cols-1 md:grid-cols-2 " +
                        "lg:grid-cols-4 gap-12 pb-16 " +
                        "border-b border-verde/20"
                    }
                >
                    {/* Marca */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="text-durazno text-2xl">✦</span>
                            <h3 className="font-titulo text-xl text-durazno">
                                Planeamos tus Sueños
                            </h3>
                        </div>
                        <p className={"text-sm text-blanco-calido/70 " + "leading-relaxed"}>
                            Hacemos realidad eventos inolvidables en el Oriente Antioqueño.
                            Bodas, quinceañeras y celebraciones con alma.
                        </p>
                        <div className="flex gap-3 pt-2">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={estiloIconoRed}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="w-4 h-4"
                                >
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </a>

                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={estiloIconoRed}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="w-4 h-4"
                                >
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Explorar */}
                    <div>
                        <h4 className="font-titulo text-lg text-durazno mb-6">Explorar</h4>
                        <ul className="space-y-3 text-sm">
                            {enlacesExplorar.map((e) => (
                                <li key={e.ruta}>
                                    <Link
                                        href={e.ruta}
                                        className={
                                            "text-blanco-calido/70 " +
                                            "hover:text-durazno " +
                                            "transition-colors"
                                        }
                                    >
                                        {e.nombre}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Servicios */}
                    <div>
                        <h4 className="font-titulo text-lg text-durazno mb-6">Servicios</h4>
                        <ul className="space-y-3 text-sm">
                            {enlacesServicios.map((e, i) => (
                                <li key={i}>
                                    <Link
                                        href={e.ruta}
                                        className={
                                            "text-blanco-calido/70 " +
                                            "hover:text-durazno " +
                                            "transition-colors"
                                        }
                                    >
                                        {e.nombre}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div>
                        <h4 className="font-titulo text-lg text-durazno mb-6">
                            Contáctanos
                        </h4>
                        <ul className="space-y-4 text-sm">
                            <li
                                className={"flex items-start gap-3 " + "text-blanco-calido/70"}
                            >
                                <Phone size={16} className="text-verde mt-0.5 flex-shrink-0" />
                                <span>+57 300 000 0000</span>
                            </li>
                            <li
                                className={"flex items-start gap-3 " + "text-blanco-calido/70"}
                            >
                                <Mail size={16} className="text-verde mt-0.5 flex-shrink-0" />
                                <span>eventos@planeamostussuenos.com</span>
                            </li>
                            <li
                                className={"flex items-start gap-3 " + "text-blanco-calido/70"}
                            >
                                <MapPin size={16} className="text-verde mt-0.5 flex-shrink-0" />
                                <span>
                                    Rionegro · Guarne · Llanogrande
                                    <br />
                                    Oriente Antioqueño, Colombia
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Créditos */}
                <div
                    className={
                        "pt-8 flex flex-col md:flex-row " +
                        "items-center justify-between gap-4"
                    }
                >
                    <p className="text-xs text-blanco-calido/50">
                        © {año} Planeamos tus Sueños. Todos los derechos reservados.
                    </p>
                    <p className="text-xs text-blanco-calido/50 italic">
                        Hecho con dedicación en el Oriente Antioqueño
                    </p>
                </div>
            </div>
        </footer>
    );
}
