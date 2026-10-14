"use client";

import { useEffect, useRef, useState } from "react";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from "framer-motion";
import { X, ZoomIn, ZoomOut } from "lucide-react";

export interface ImagenVisor {
    src: string;
    alt: string;
}

interface Props {
    imagen: ImagenVisor | null;
    onCerrar: () => void;
}

const ESCALA_MAX = 4;
const ESCALA_CLIC = 2.5;

const estiloBoton =
    "w-11 h-11 rounded-full flex items-center "
    + "justify-center bg-blanco-calido/10 "
    + "border border-durazno/30 "
    + "text-blanco-calido backdrop-blur-sm "
    + "transition-colors duration-300 "
    + "hover:bg-durazno hover:text-negro-elegante "
    + "disabled:opacity-30 "
    + "disabled:pointer-events-none "
    + "focus-visible:outline-2 "
    + "focus-visible:outline-durazno "
    + "focus-visible:outline-offset-2";

interface Punto {
    x: number;
    y: number;
}

interface Arrastre {
    inicio: Punto;
    origen: Punto;
    movido: boolean;
}

function Visor({
    imagen,
    onCerrar,
}: {
    imagen: ImagenVisor;
    onCerrar: () => void;
}) {
    const [escala, setEscala] = useState(1);
    const [pos, setPos] = useState<Punto>({ x: 0, y: 0 });
    const [arrastrando, setArrastrando] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const cajaRef = useRef<HTMLDivElement>(null);
    const cerrarRef = useRef<HTMLButtonElement>(null);
    const arrastre = useRef<Arrastre | null>(null);

    // Limites del desplazamiento
    const limitar = (p: Punto, e: number): Punto => {
        const img = imgRef.current;
        if (!img) return p;
        const mx = (img.clientWidth * (e - 1)) / 2;
        const my = (img.clientHeight * (e - 1)) / 2;
        return {
            x: Math.min(mx, Math.max(-mx, p.x)),
            y: Math.min(my, Math.max(-my, p.y)),
        };
    };

    const cambiarEscala = (nueva: number) => {
        const e = Math.min(ESCALA_MAX, Math.max(1, nueva));
        setEscala(e);
        setPos(e === 1 ? { x: 0, y: 0 } : limitar(pos, e));
    };

    // Bloqueo de scroll y foco
    useEffect(() => {
        const previo = document.activeElement as
            HTMLElement | null;
        const overflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        cerrarRef.current?.focus();
        return () => {
            document.body.style.overflow = overflow;
            previo?.focus();
        };
    }, []);

    // Teclado
    useEffect(() => {
        const alTeclear = (ev: KeyboardEvent) => {
            if (ev.key === "Escape") {
                onCerrar();
            } else if (ev.key === "+" || ev.key === "=") {
                cambiarEscala(escala * 1.5);
            } else if (ev.key === "-") {
                cambiarEscala(escala / 1.5);
            } else if (ev.key === "Tab") {
                const lista = cajaRef.current
                    ?.querySelectorAll<HTMLButtonElement>(
                        "button:not(:disabled)"
                    );
                if (!lista || lista.length === 0) return;
                const primero = lista[0];
                const ultimo = lista[lista.length - 1];
                const activo = document.activeElement;
                if (ev.shiftKey && activo === primero) {
                    ev.preventDefault();
                    ultimo.focus();
                } else if (!ev.shiftKey && activo === ultimo) {
                    ev.preventDefault();
                    primero.focus();
                }
            }
        };
        document.addEventListener("keydown", alTeclear);
        return () =>
            document.removeEventListener("keydown", alTeclear);
    });

    const alPresionar = (ev: React.PointerEvent) => {
        arrastre.current = {
            inicio: { x: ev.clientX, y: ev.clientY },
            origen: pos,
            movido: false,
        };
        if (escala > 1) {
            ev.currentTarget.setPointerCapture(ev.pointerId);
        }
    };

    const alMover = (ev: React.PointerEvent) => {
        const a = arrastre.current;
        if (!a || escala === 1) return;
        const dx = ev.clientX - a.inicio.x;
        const dy = ev.clientY - a.inicio.y;
        if (!a.movido && Math.hypot(dx, dy) < 4) return;
        a.movido = true;
        setArrastrando(true);
        setPos(
            limitar(
                { x: a.origen.x + dx, y: a.origen.y + dy },
                escala
            )
        );
    };

    const alClicImagen = () => {
        setArrastrando(false);
        if (arrastre.current?.movido) {
            arrastre.current = null;
            return;
        }
        arrastre.current = null;
        cambiarEscala(escala > 1 ? 1 : ESCALA_CLIC);
    };

    const alRodar = (ev: React.WheelEvent) => {
        cambiarEscala(
            ev.deltaY < 0 ? escala * 1.2 : escala / 1.2
        );
    };

    const estiloImagen =
        "max-w-[92vw] max-h-[80vh] object-contain "
        + "select-none touch-none rounded-sm "
        + "shadow-elegante "
        + (arrastrando
            ? "cursor-grabbing"
            : "transition-transform duration-200 "
              + (escala > 1
                  ? "cursor-grab"
                  : "cursor-zoom-in"));

    return (
        <div
            ref={cajaRef}
            role="dialog"
            aria-modal="true"
            aria-label={"Imagen ampliada: " + imagen.alt}
            onWheel={alRodar}
            onClick={(ev) => {
                if (ev.target === ev.currentTarget) {
                    onCerrar();
                }
            }}
            className={
                "fixed inset-0 z-[70] flex flex-col "
                + "items-center justify-center "
                + "overflow-hidden bg-negro-elegante/95"
            }
        >
            <div
                className={
                    "absolute top-4 right-4 flex "
                    + "items-center gap-2 z-10"
                }
            >
                <button
                    type="button"
                    aria-label="Alejar"
                    onClick={() => cambiarEscala(escala / 1.5)}
                    disabled={escala === 1}
                    className={estiloBoton}
                >
                    <ZoomOut size={18} />
                </button>
                <button
                    type="button"
                    aria-label="Acercar"
                    onClick={() => cambiarEscala(escala * 1.5)}
                    disabled={escala === ESCALA_MAX}
                    className={estiloBoton}
                >
                    <ZoomIn size={18} />
                </button>
                <button
                    ref={cerrarRef}
                    type="button"
                    aria-label="Cerrar imagen"
                    onClick={onCerrar}
                    className={estiloBoton}
                >
                    <X size={20} />
                </button>
            </div>

            <img
                ref={imgRef}
                src={imagen.src}
                alt={imagen.alt}
                draggable={false}
                onPointerDown={alPresionar}
                onPointerMove={alMover}
                onClick={alClicImagen}
                style={{
                    transform:
                        "translate(" + pos.x + "px, "
                        + pos.y + "px) scale(" + escala + ")",
                }}
                className={estiloImagen}
            />

            <p
                className={
                    "absolute bottom-6 inset-x-6 "
                    + "text-center font-cuerpo text-sm "
                    + "text-durazno-claro pointer-events-none"
                }
            >
                <span className="font-titulo text-lg">
                    {imagen.alt}
                </span>
                <span
                    className={
                        "block text-xs text-blanco-calido/60 "
                        + "mt-1"
                    }
                >
                    Clic para acercar · Arrastra para mover
                    · Esc para cerrar
                </span>
            </p>
        </div>
    );
}

export default function VisorImagen({
    imagen,
    onCerrar,
}: Props) {
    const reducir = useReducedMotion();

    return (
        <AnimatePresence>
            {imagen && (
                <motion.div
                    key={imagen.src}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: reducir ? 0 : 0.25,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative z-[70]"
                >
                    <Visor imagen={imagen} onCerrar={onCerrar} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
