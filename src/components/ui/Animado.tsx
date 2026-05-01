"use client";

import { useRef } from "react";
import {
    motion,
    useInView,
} from "framer-motion";

interface Props {
    children: React.ReactNode;
    delay?: number;
    direccion?: "arriba" | "abajo"
    | "izquierda" | "derecha";
    duracion?: number;
    className?: string;
}

export default function Animado({
    children,
    delay = 0,
    direccion = "arriba",
    duracion = 0.6,
    className = "",
}: Props) {
    const ref = useRef(null);
    const enVista = useInView(ref, {
        once: true,
        margin: "-80px",
    });

    const desplazamientos = {
        arriba: { x: 0, y: 40 },
        abajo: { x: 0, y: -40 },
        izquierda: { x: 40, y: 0 },
        derecha: { x: -40, y: 0 },
    };

    const d = desplazamientos[direccion];

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                x: d.x,
                y: d.y,
            }}
            animate={
                enVista
                    ? { opacity: 1, x: 0, y: 0 }
                    : { opacity: 0, x: d.x, y: d.y }
            }
            transition={{
                duration: duracion,
                delay: delay,
                ease: "easeOut",
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}