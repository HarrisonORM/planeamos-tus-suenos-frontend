interface Props {
    titulo: string;
    subtitulo?: string;
    etiqueta?: string;
}

export default function EncabezadoPagina({
    titulo,
    subtitulo,
    etiqueta,
}: Props) {
    return (
        <section
            className={
                "relative bg-negro-elegante "
                + "pt-40 pb-20 overflow-hidden"
            }
        >
            {/* Patrón de fondo */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage:
                        "radial-gradient("
                        + "circle at 1px 1px, "
                        + "#748068 1px, transparent 0)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div
                className={
                    "contenedor-principal "
                    + "relative text-center"
                }
            >
                {etiqueta && (
                    <p
                        className={
                            "font-cuerpo text-xs "
                            + "tracking-[0.4em] uppercase "
                            + "text-verde mb-4"
                        }
                    >
                        — {etiqueta} —
                    </p>
                )}

                <h1
                    className={
                        "font-titulo text-5xl md:text-6xl "
                        + "lg:text-7xl font-light "
                        + "text-blanco-calido mb-6"
                    }
                >
                    {titulo}
                </h1>

                {subtitulo && (
                    <p
                        className={
                            "font-cuerpo text-base md:text-lg "
                            + "text-blanco-calido/70 "
                            + "max-w-2xl mx-auto leading-relaxed"
                        }
                    >
                        {subtitulo}
                    </p>
                )}

                <div
                    className={
                        "flex items-center "
                        + "justify-center gap-3 mt-8"
                    }
                >
                    <div className="w-12 h-px bg-durazno/40" />
                    <span className="text-durazno">✦</span>
                    <div className="w-12 h-px bg-durazno/40" />
                </div>
            </div>
        </section>
    );
}