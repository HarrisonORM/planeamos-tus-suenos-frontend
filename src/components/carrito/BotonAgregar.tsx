"use client";

import { Check } from "lucide-react";
import {
    useCarrito,
    type ItemCarrito,
} from "@/context/CarritoContext";

interface Props {
    item: Omit<ItemCarrito, "cantidad">;
    etiqueta: "Reservar" | "Contratar";
}

export default function BotonAgregar({ item, etiqueta }: Props) {
    const { agregar, enCarrito } = useCarrito();
    const agregado = enCarrito(item.tipo, item.id);

    return (
        <button
            type="button"
            onClick={() => agregar(item)}
            aria-label={`${etiqueta} ${item.nombre}`}
            className={
                "inline-flex items-center gap-1.5 text-sm "
                + "font-cuerpo font-medium transition-colors "
                + "cursor-pointer "
                + (agregado
                    ? "text-verde-oscuro"
                    : "text-verde hover:text-verde-oscuro")
            }
        >
            {agregado ? (
                <>
                    <Check size={15} /> En tu reserva · añadir otro
                </>
            ) : (
                <>{etiqueta} →</>
            )}
        </button>
    );
}
