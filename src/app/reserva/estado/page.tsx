"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import EncabezadoPagina
    from "@/components/ui/EncabezadoPagina";
import { getEstadoPago } from "@/lib/api";
import { formatearPrecio } from "@/lib/utils";
import type { EstadoPagoReserva } from "@/types";
import {
    CheckCircle2,
    CircleAlert,
    Clock3,
    LoaderCircle,
    RefreshCw,
} from "lucide-react";

const intentosMaximos = 12;
const intervaloConsultaMs = 5000;

export default function EstadoReservaPage() {
    return (
        <Suspense
            fallback={
                <div className="py-20 text-center font-cuerpo text-gris-texto">
                    Cargando estado de reserva...
                </div>
            }
        >
            <ContenidoEstadoReserva />
        </Suspense>
    );
}

function ContenidoEstadoReserva() {
    const searchParams = useSearchParams();
    const referencia = searchParams.get("referencia") ?? "";
    const [estado, setEstado] =
        useState<EstadoPagoReserva | null>(null);
    const [cargando, setCargando] =
        useState(Boolean(referencia));
    const [error, setError] = useState("");
    const [intento, setIntento] = useState(0);

    useEffect(() => {
        if (!referencia) return;
        let activo = true;

        getEstadoPago(referencia)
            .then((respuesta) => {
                if (!activo) return;
                setEstado(respuesta);
                setError("");
                setCargando(false);

                if (
                    respuesta.estado_pago === "pendiente"
                    && intento < intentosMaximos
                ) {
                    window.setTimeout(() => {
                        if (activo) {
                            setCargando(true);
                            setIntento((actual) => actual + 1);
                        }
                    }, intervaloConsultaMs);
                }
            })
            .catch((errorConsulta: unknown) => {
                if (!activo) return;
                setError(
                    errorConsulta instanceof Error
                        ? errorConsulta.message
                        : "No se pudo consultar el estado del pago."
                );
                setCargando(false);
            });

        return () => {
            activo = false;
        };
    }, [referencia, intento]);

    const consultarDeNuevo = () => {
        setError("");
        setCargando(true);
        setIntento((actual) => actual + 1);
    };

    const aprobado = estado?.estado_pago === "aprobado";
    const pendiente = estado?.estado_pago === "pendiente";
    const tituloEstado = aprobado
        ? "Anticipo aprobado"
        : pendiente
            ? "Pago en verificación"
            : estado?.estado_pago
                ? "Pago no aprobado"
                : "Estado del pago";
    const descripcionEstado = aprobado
        ? "Wompi confirmó el pago del anticipo. Tu solicitud ya registra este pago."
        : pendiente
            ? "Estamos esperando la confirmación segura de Wompi. Esta página se actualizará automáticamente."
            : estado
                ? "El pago no fue aprobado. Puedes verificarlo de nuevo o comunicarte con nuestro equipo."
                : "Consulta el resultado de tu pago de anticipo.";

    return (
        <div>
            <EncabezadoPagina
                etiqueta="Tu evento"
                titulo="Estado de reserva"
                subtitulo={
                    "Consulta la confirmación de tu "
                    + "anticipo y el estado de tu solicitud."
                }
            />
            <section className="py-16 bg-blanco-calido">
                <div className="contenedor-principal">
                    <div className={
                        "max-w-2xl mx-auto bg-blanco-puro "
                        + "rounded-tarjeta border "
                        + "border-durazno/30 p-6 md:p-10 "
                        + "shadow-suave"
                    }>
                        <div className={
                            "w-14 h-14 rounded-full "
                            + "flex items-center justify-center "
                            + (aprobado
                                ? "bg-verde-claro text-verde"
                                : pendiente || cargando
                                    ? "bg-durazno-claro text-durazno-oscuro"
                                    : "bg-red-50 text-red-600")
                        }>
                            {cargando
                                ? <LoaderCircle
                                    size={28}
                                    className="animate-spin"
                                />
                                : aprobado
                                    ? <CheckCircle2 size={28} />
                                    : pendiente
                                        ? <Clock3 size={28} />
                                        : <CircleAlert size={28} />}
                        </div>

                        <h2 className={
                            "font-titulo text-3xl "
                            + "text-negro-elegante mt-5"
                        }>
                            {cargando
                                ? "Consultando pago..."
                                : referencia
                                    ? tituloEstado
                                    : "No encontramos la referencia"}
                        </h2>
                        <p className={
                            "font-cuerpo text-gris-texto "
                            + "mt-3 leading-relaxed"
                        }>
                            {error
                                ? error
                                : referencia
                                    ? descripcionEstado
                                    : (
                                        "Vuelve al cotizador o contacta "
                                        + "a nuestro equipo para recibir "
                                        + "ayuda con tu solicitud."
                                    )}
                        </p>

                        {estado && (
                            <dl className={
                                "mt-6 border-t "
                                + "border-durazno/20 pt-5 "
                                + "space-y-3 font-cuerpo text-sm"
                            }>
                                <div className={
                                    "flex justify-between gap-4"
                                }>
                                    <dt className="text-gris-texto">
                                        Referencia
                                    </dt>
                                    <dd className={
                                        "text-negro-elegante "
                                        + "font-medium text-right "
                                        + "break-all"
                                    }>
                                        {estado.referencia}
                                    </dd>
                                </div>
                                <div className={
                                    "flex justify-between gap-4"
                                }>
                                    <dt className="text-gris-texto">
                                        Anticipo
                                    </dt>
                                    <dd className={
                                        "text-negro-elegante "
                                        + "font-semibold"
                                    }>
                                        {formatearPrecio(
                                            estado.valor_anticipo
                                        )}
                                    </dd>
                                </div>
                                <div className={
                                    "flex justify-between gap-4"
                                }>
                                    <dt className="text-gris-texto">
                                        Estado de reserva
                                    </dt>
                                    <dd className={
                                        "text-negro-elegante "
                                        + "font-medium capitalize"
                                    }>
                                        {estado.estado_reserva.replace(
                                            "_",
                                            " "
                                        )}
                                    </dd>
                                </div>
                            </dl>
                        )}

                        {pendiente && !cargando && intento >= intentosMaximos && (
                            <p className={
                                "font-cuerpo text-xs "
                                + "text-gris-texto mt-4"
                            }>
                                La confirmación puede tardar unos minutos.
                                Puedes volver a consultar más tarde.
                            </p>
                        )}

                        <div className={
                            "flex flex-col sm:flex-row "
                            + "gap-3 mt-8"
                        }>
                            {(error || (pendiente && !cargando)) && (
                                <button
                                    type="button"
                                    onClick={consultarDeNuevo}
                                    disabled={!referencia || cargando}
                                    className={
                                        "inline-flex items-center "
                                        + "justify-center gap-2 "
                                        + "bg-verde "
                                        + "hover:bg-verde-oscuro "
                                        + "disabled:opacity-60 "
                                        + "text-blanco-calido "
                                        + "font-cuerpo font-semibold "
                                        + "px-5 py-3 rounded-boton"
                                    }
                                >
                                    <RefreshCw size={16} />
                                    Consultar de nuevo
                                </button>
                            )}
                            <Link
                                href="/"
                                className={
                                    "inline-flex items-center "
                                    + "justify-center border "
                                    + "border-verde text-verde "
                                    + "hover:bg-verde-claro "
                                    + "font-cuerpo font-semibold "
                                    + "px-5 py-3 rounded-boton"
                                }
                            >
                                Volver al inicio
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
