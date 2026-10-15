"use client";

import {
    useEffect,
    useState,
    type FormEvent,
} from "react";
import {
    CheckCircle2,
    Minus,
    Plus,
    ShoppingBag,
    Trash2,
    X,
} from "lucide-react";
import { useCarrito } from "@/context/CarritoContext";
import { crearReserva, getFechasOcupadas } from "@/lib/api";
import { whatsappReservaUrl } from "@/lib/contacto";
import { formatearPrecio } from "@/lib/utils";

const AVISO_PRECIOS =
    "Los precios son referenciales y pueden variar según la "
    + "ubicación, el tipo de evento y el tiempo requerido. "
    + "Te confirmaremos el valor final antes de cualquier pago.";

const datosIniciales = {
    nombre_cliente: "",
    telefono: "",
    correo: "",
    direccion: "",
    fecha_evento: "",
    descripcion: "",
};

function fechaHoy(): string {
    const d = new Date();
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const dia = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${mes}-${dia}`;
}

interface Confirmacion {
    id: number;
    enlaceWhatsapp: string;
}

const campo =
    "w-full rounded-lg border border-gris-borde bg-blanco-puro "
    + "px-3 py-2.5 font-cuerpo text-sm text-negro-elegante "
    + "focus:outline-none focus:border-verde";

export default function CarritoFlotante() {
    const {
        items,
        totalItems,
        subtotal,
        abierto,
        abrir,
        cerrar,
        cambiarCantidad,
        quitar,
        vaciar,
    } = useCarrito();

    const [paso, setPaso] = useState<"lista" | "datos">("lista");
    const [datos, setDatos] = useState(datosIniciales);
    const [fechasOcupadas, setFechasOcupadas] = useState<string[]>([]);
    const [enviando, setEnviando] = useState(false);
    const [error, setError] = useState("");
    const [confirmacion, setConfirmacion] =
        useState<Confirmacion | null>(null);

    useEffect(() => {
        if (paso !== "datos") return;
        getFechasOcupadas()
            .then(setFechasOcupadas)
            .catch(() => setFechasOcupadas([]));
    }, [paso]);

    useEffect(() => {
        if (!abierto) return;
        const alTeclear = (e: KeyboardEvent) => {
            if (e.key === "Escape") cerrar();
        };
        document.addEventListener("keydown", alTeclear);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", alTeclear);
            document.body.style.overflow = "";
        };
    }, [abierto, cerrar]);

    useEffect(() => {
        if (items.length === 0 && paso === "datos") setPaso("lista");
    }, [items.length, paso]);

    const cerrarPanel = () => {
        cerrar();
        if (confirmacion) {
            setConfirmacion(null);
            setPaso("lista");
        }
    };

    const enviar = async (evento: FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        setError("");

        if (fechasOcupadas.includes(datos.fecha_evento)) {
            setError(
                "La fecha seleccionada ya está ocupada. Elige otra."
            );
            return;
        }

        setEnviando(true);
        try {
            const respuesta = await crearReserva({
                ...datos,
                items: items.map((i) => ({
                    id: i.id,
                    tipo: i.tipo,
                    cantidad: i.cantidad,
                })),
            });
            const enlaceWhatsapp = whatsappReservaUrl([
                "Hola, acabo de solicitar una reserva "
                + `(#${respuesta.id}) en Planeamos tus Sueños.`,
                `Nombre: ${datos.nombre_cliente}`,
                `Fecha del evento: ${datos.fecha_evento}`,
                ...items.map(
                    (i) => `- ${i.nombre} x${i.cantidad}`
                ),
                "Subtotal estimado: "
                + formatearPrecio(respuesta.valor_total),
            ].join("\n"));
            setConfirmacion({ id: respuesta.id, enlaceWhatsapp });
            setDatos(datosIniciales);
            vaciar();
        } catch (e) {
            setError(
                e instanceof Error
                    ? e.message
                    : "No se pudo enviar la solicitud. "
                    + "Intenta de nuevo."
            );
        } finally {
            setEnviando(false);
        }
    };

    const mostrarBoton = totalItems > 0 && !abierto;

    return (
        <>
            {mostrarBoton && (
                <button
                    type="button"
                    onClick={abrir}
                    aria-label="Ver mi reserva"
                    className={
                        "fixed bottom-24 right-6 z-40 flex "
                        + "items-center gap-3 rounded-full "
                        + "bg-negro-elegante text-durazno "
                        + "pl-4 pr-5 py-3 shadow-elegante "
                        + "border border-durazno/40 "
                        + "hover:-translate-y-0.5 transition-all "
                        + "duration-300"
                    }
                >
                    <span className="relative">
                        <ShoppingBag size={22} />
                        <span
                            className={
                                "absolute -top-2 -right-2 min-w-5 "
                                + "h-5 px-1 rounded-full bg-durazno "
                                + "text-negro-elegante text-[11px] "
                                + "font-cuerpo font-semibold "
                                + "flex items-center justify-center"
                            }
                        >
                            {totalItems}
                        </span>
                    </span>
                    <span className="text-left leading-tight">
                        <span
                            className={
                                "block text-[10px] uppercase "
                                + "tracking-wider opacity-70 "
                                + "font-cuerpo"
                            }
                        >
                            Mi reserva
                        </span>
                        <span className="block font-cuerpo text-sm">
                            {formatearPrecio(subtotal)}
                        </span>
                    </span>
                </button>
            )}

            {abierto && (
                <div
                    className="fixed inset-0 z-50"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Mi reserva"
                >
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={cerrarPanel}
                    />
                    <aside
                        className={
                            "absolute right-0 top-0 h-full w-full "
                            + "max-w-md bg-blanco-calido shadow-2xl "
                            + "flex flex-col"
                        }
                    >
                        <header
                            className={
                                "flex items-center justify-between "
                                + "px-6 py-5 border-b "
                                + "border-durazno/30"
                            }
                        >
                            <h2 className="font-titulo text-2xl text-negro-elegante">
                                {confirmacion
                                    ? "Solicitud enviada"
                                    : paso === "datos"
                                        ? "Tus datos"
                                        : "Mi reserva"}
                            </h2>
                            <button
                                type="button"
                                onClick={cerrarPanel}
                                aria-label="Cerrar"
                                className="text-gris-texto hover:text-negro-elegante"
                            >
                                <X size={22} />
                            </button>
                        </header>

                        {confirmacion ? (
                            <div className="flex-1 overflow-y-auto px-6 py-10 text-center">
                                <CheckCircle2
                                    size={56}
                                    className="mx-auto text-verde mb-4"
                                />
                                <h3 className="font-titulo text-2xl mb-2">
                                    ¡Solicitud #{confirmacion.id} recibida!
                                </h3>
                                <p className="font-cuerpo text-sm text-gris-texto mb-6">
                                    Ya tenemos tus datos y nos pondremos en
                                    contacto contigo muy pronto para
                                    confirmar disponibilidad y el valor
                                    final.
                                </p>
                                <a
                                    href={confirmacion.enlaceWhatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={
                                        "inline-flex items-center "
                                        + "justify-center w-full "
                                        + "rounded-full bg-[#25D366] "
                                        + "text-white font-cuerpo "
                                        + "font-medium py-3 "
                                        + "hover:opacity-90"
                                    }
                                >
                                    Escribirnos por WhatsApp
                                </a>
                                <button
                                    type="button"
                                    onClick={cerrarPanel}
                                    className="mt-4 font-cuerpo text-sm text-gris-texto hover:text-negro-elegante"
                                >
                                    Cerrar
                                </button>
                            </div>
                        ) : paso === "lista" ? (
                            <>
                                <ul className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-durazno/20">
                                    {items.length === 0 && (
                                        <li className="py-16 text-center font-cuerpo text-sm text-gris-texto">
                                            Aún no has agregado nada.
                                            Explora el catálogo y los
                                            servicios.
                                        </li>
                                    )}
                                    {items.map((item) => (
                                        <li
                                            key={item.tipo + item.id}
                                            className="py-4 flex gap-3"
                                        >
                                            {item.imagen && (
                                                <img
                                                    src={item.imagen}
                                                    alt={item.nombre}
                                                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                                                />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-titulo text-base text-negro-elegante leading-snug">
                                                    {item.nombre}
                                                </p>
                                                <p className="font-cuerpo text-xs text-gris-texto">
                                                    {formatearPrecio(item.precio)}{" "}
                                                    {item.unidad}
                                                </p>
                                                <div className="mt-2 flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            aria-label="Disminuir"
                                                            onClick={() =>
                                                                cambiarCantidad(
                                                                    item.tipo,
                                                                    item.id,
                                                                    item.cantidad - 1
                                                                )
                                                            }
                                                            className="w-7 h-7 rounded-full border border-gris-borde flex items-center justify-center hover:border-verde"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="font-cuerpo text-sm w-8 text-center">
                                                            {item.cantidad}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            aria-label="Aumentar"
                                                            onClick={() =>
                                                                cambiarCantidad(
                                                                    item.tipo,
                                                                    item.id,
                                                                    item.cantidad + 1
                                                                )
                                                            }
                                                            className="w-7 h-7 rounded-full border border-gris-borde flex items-center justify-center hover:border-verde"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                    <span className="font-cuerpo text-sm font-medium">
                                                        {formatearPrecio(
                                                            item.precio * item.cantidad
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                aria-label={"Quitar " + item.nombre}
                                                onClick={() =>
                                                    quitar(item.tipo, item.id)
                                                }
                                                className="text-gris-texto hover:text-red-500 self-start"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                <footer className="px-6 py-5 border-t border-durazno/30 bg-blanco-puro">
                                    <div className="flex items-baseline justify-between mb-3">
                                        <span className="font-cuerpo text-sm text-gris-texto uppercase tracking-wider">
                                            Subtotal estimado
                                        </span>
                                        <span className="font-titulo text-2xl">
                                            {formatearPrecio(subtotal)}
                                        </span>
                                    </div>
                                    <p className="font-cuerpo text-xs text-gris-texto leading-relaxed mb-4">
                                        {AVISO_PRECIOS}
                                    </p>
                                    <button
                                        type="button"
                                        disabled={items.length === 0}
                                        onClick={() => setPaso("datos")}
                                        className={
                                            "w-full rounded-full "
                                            + "bg-negro-elegante "
                                            + "text-durazno py-3 "
                                            + "font-cuerpo font-medium "
                                            + "disabled:opacity-40 "
                                            + "hover:bg-verde-oscuro "
                                            + "transition-colors"
                                        }
                                    >
                                        Finalizar reserva
                                    </button>
                                </footer>
                            </>
                        ) : (
                            <form
                                onSubmit={enviar}
                                className="flex-1 flex flex-col min-h-0"
                            >
                                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                                    <p className="font-cuerpo text-sm text-gris-texto">
                                        Déjanos tus datos y te contactamos
                                        para confirmar tu reserva.
                                    </p>
                                    <input
                                        required
                                        placeholder="Nombre completo"
                                        value={datos.nombre_cliente}
                                        onChange={(e) =>
                                            setDatos({ ...datos, nombre_cliente: e.target.value })
                                        }
                                        className={campo}
                                    />
                                    <input
                                        required
                                        type="tel"
                                        placeholder="Teléfono / WhatsApp"
                                        maxLength={20}
                                        value={datos.telefono}
                                        onChange={(e) =>
                                            setDatos({ ...datos, telefono: e.target.value })
                                        }
                                        className={campo}
                                    />
                                    <input
                                        required
                                        type="email"
                                        placeholder="Correo electrónico"
                                        value={datos.correo}
                                        onChange={(e) =>
                                            setDatos({ ...datos, correo: e.target.value })
                                        }
                                        className={campo}
                                    />
                                    <div>
                                        <label className="block font-cuerpo text-xs text-gris-texto mb-1">
                                            Fecha del evento
                                        </label>
                                        <input
                                            required
                                            type="date"
                                            min={fechaHoy()}
                                            value={datos.fecha_evento}
                                            onChange={(e) =>
                                                setDatos({ ...datos, fecha_evento: e.target.value })
                                            }
                                            className={campo}
                                        />
                                    </div>
                                    <input
                                        placeholder="Lugar del evento (municipio o dirección)"
                                        value={datos.direccion}
                                        onChange={(e) =>
                                            setDatos({ ...datos, direccion: e.target.value })
                                        }
                                        className={campo}
                                    />
                                    <textarea
                                        rows={3}
                                        placeholder="Tipo de evento, número de invitados, horas requeridas..."
                                        value={datos.descripcion}
                                        onChange={(e) =>
                                            setDatos({ ...datos, descripcion: e.target.value })
                                        }
                                        className={campo}
                                    />
                                    <p className="font-cuerpo text-xs text-gris-texto leading-relaxed">
                                        {AVISO_PRECIOS}
                                    </p>
                                    {error && (
                                        <p className="font-cuerpo text-sm text-red-500">
                                            {error}
                                        </p>
                                    )}
                                </div>
                                <footer className="px-6 py-5 border-t border-durazno/30 bg-blanco-puro">
                                    <div className="flex items-baseline justify-between mb-3">
                                        <span className="font-cuerpo text-sm text-gris-texto uppercase tracking-wider">
                                            Subtotal estimado
                                        </span>
                                        <span className="font-titulo text-xl">
                                            {formatearPrecio(subtotal)}
                                        </span>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setPaso("lista")}
                                            className="px-5 rounded-full border border-gris-borde font-cuerpo text-sm hover:border-verde"
                                        >
                                            Atrás
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={enviando}
                                            className="flex-1 rounded-full bg-negro-elegante text-durazno py-3 font-cuerpo font-medium disabled:opacity-50 hover:bg-verde-oscuro transition-colors"
                                        >
                                            {enviando
                                                ? "Enviando..."
                                                : "Enviar solicitud"}
                                        </button>
                                    </div>
                                </footer>
                            </form>
                        )}
                    </aside>
                </div>
            )}
        </>
    );
}
