import Link from "next/link";
import {
  serviciosPersonales,
  portafolio,
  paquetes,
} from "@/data/mock";
import {
  formatearPrecio,
  etiquetaTipoEvento,
  etiquetaCategoria,
} from "@/lib/utils";

export default function PaginaInicio() {
  const serviciosDestacados = serviciosPersonales.slice(0, 6);
  const portafolioPreview = portafolio.slice(0, 3);
  const noDestacados = paquetes.filter((p) => !p.destacado);
  const paquetesDestacados = [
    noDestacados[0],
    ...paquetes.filter((p) => p.destacado),
    noDestacados[1],
  ];

  // Estilos reutilizables
  const contenedor = "contenedor-principal";

  const botonVerde =
    "inline-block bg-verde hover:bg-verde-oscuro "
    + "text-blanco-calido font-cuerpo font-semibold "
    + "px-10 py-4 rounded-boton transition-all "
    + "duration-300 text-sm tracking-wider uppercase";

  const botonDurazno =
    "inline-block border border-durazno text-durazno "
    + "hover:bg-durazno hover:text-negro-elegante "
    + "font-cuerpo font-semibold px-10 py-4 "
    + "rounded-boton transition-all duration-300 "
    + "text-sm tracking-wider uppercase";

  const ornamento = (color: string) => (
    <div className="flex items-center justify-center gap-4 mt-6">
      <div className={"w-12 h-px bg-" + color + "/40"} />
      <span className={"text-" + color + " text-xl"}>✦</span>
      <div className={"w-12 h-px bg-" + color + "/40"} />
    </div>
  );

  return (
    <div>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className={
        "relative min-h-screen flex items-center "
        + "justify-center text-center px-6 "
        + "bg-negro-elegante overflow-hidden"
      }>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient("
              + "circle at 1px 1px, "
              + "#748068 1px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className={
          "absolute bottom-0 left-0 right-0 h-40 "
          + "bg-gradient-to-t from-negro-elegante to-transparent"
        } />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-durazno/40" />
            <span className="text-durazno text-3xl">✦</span>
            <div className="w-16 h-px bg-durazno/40" />
          </div>

          <p className={
            "font-cuerpo text-xs tracking-[0.4em] "
            + "uppercase text-verde mb-6"
          }>
            Oriente Antioqueño, Colombia
          </p>

          <h1 className={
            "font-titulo text-5xl md:text-7xl lg:text-8xl "
            + "font-light text-blanco-calido mb-6 leading-tight"
          }>
            Planeamos{" "}
            <span className="text-durazno italic">
              tus Sueños
            </span>
          </h1>

          <p className={
            "font-cuerpo text-lg md:text-xl "
            + "text-blanco-calido/70 max-w-2xl "
            + "mx-auto mb-12 leading-relaxed"
          }>
            Hacemos realidad bodas, quinceañeras y
            celebraciones inolvidables. Cada detalle
            pensado para que solo te preocupes por disfrutar.
          </p>

          <div className={
            "flex flex-col sm:flex-row "
            + "items-center justify-center gap-4"
          }>
            <Link href="/portafolio" className={botonVerde}>
              Ver nuestro trabajo
            </Link>
            <Link href="/contacto" className={botonDurazno}>
              Cotizar evento
            </Link>
          </div>
        </div>
      </section>

      {/* ── Servicios ────────────────────────────────────── */}
      <section className="py-24 bg-verde-claro">
        <div className={contenedor}>
          <div className="text-center mb-16">
            <p className={
              "font-cuerpo text-xs tracking-[0.4em] "
              + "uppercase text-verde-oscuro mb-4"
            }>
              Lo que ofrecemos
            </p>
            <h2 className={
              "font-titulo text-5xl md:text-6xl "
              + "text-negro-elegante font-light"
            }>
              Servicios para tu{" "}
              <span className="text-durazno-oscuro italic">
                evento
              </span>
            </h2>
            {ornamento("verde-oscuro")}
          </div>

          <div className={
            "grid grid-cols-1 md:grid-cols-2 "
            + "lg:grid-cols-3 gap-6"
          }>
            {serviciosDestacados.map((servicio) => (
              <div
                key={servicio.id}
                className={
                  "bg-blanco-calido rounded-tarjeta "
                  + "overflow-hidden border border-durazno/20 "
                  + "shadow-suave hover:shadow-elegante "
                  + "hover:-translate-y-1 "
                  + "transition-all duration-300"
                }
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={servicio.imagen}
                    alt={servicio.nombre}
                    className={
                      "w-full h-full object-cover "
                      + "transition-transform duration-500 "
                      + "hover:scale-105"
                    }
                  />
                </div>
                <div className="p-5">
                  <span className={
                    "font-cuerpo text-xs tracking-wider "
                    + "uppercase text-verde font-medium"
                  }>
                    {etiquetaCategoria(servicio.categoria)}
                  </span>
                  <h3 className={
                    "font-titulo text-2xl "
                    + "text-negro-elegante mt-1 mb-2"
                  }>
                    {servicio.nombre}
                  </h3>
                  <p className={
                    "font-cuerpo text-sm text-gris-texto "
                    + "leading-relaxed mb-4 line-clamp-2"
                  }>
                    {servicio.descripcion}
                  </p>
                  <div className={
                    "flex items-center justify-between "
                    + "pt-4 border-t border-durazno/20"
                  }>
                    <p className="font-cuerpo font-semibold text-verde">
                      Desde {formatearPrecio(servicio.precio)}
                    </p>
                    <span className={
                      "text-verde text-sm font-cuerpo "
                      + "hover:text-verde-oscuro "
                      + "transition-colors cursor-pointer"
                    }>
                      Ver más →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link href="/servicios" className={botonVerde}>
              Ver todos los servicios
            </Link>
          </div>
        </div>
      </section>

      {/* ── Portafolio Preview ────────────────────────────── */}
      <section className="py-24 bg-negro-elegante">
        <div className={contenedor}>
          <div className="text-center mb-16">
            <p className={
              "font-cuerpo text-xs tracking-[0.4em] "
              + "uppercase text-verde mb-4"
            }>
              Nuestro trabajo
            </p>
            <h2 className={
              "font-titulo text-5xl md:text-6xl "
              + "text-blanco-calido font-light"
            }>
              Eventos que{" "}
              <span className="text-durazno italic">
                hemos creado
              </span>
            </h2>
            {ornamento("durazno")}
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            style={{ gridAutoRows: "300px" }}
          >
            {portafolioPreview.map((evento, i) => (
              <div
                key={evento.id}
                className={
                  "relative overflow-hidden rounded-tarjeta "
                  + "group cursor-pointer "
                  + (i === 0
                    ? "md:row-span-2 h-[300px] md:h-auto"
                    : "h-[300px]")
                }
              >
                <img
                  src={evento.imagen}
                  alt={evento.titulo}
                  className={
                    "w-full h-full object-cover "
                    + "transition-transform duration-700 "
                    + "group-hover:scale-110"
                  }
                />
                <div className={
                  "absolute inset-0 bg-gradient-to-t "
                  + "from-negro-elegante/70 "
                  + "via-transparent to-transparent"
                } />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className={
                    "inline-block bg-verde text-blanco-calido "
                    + "font-cuerpo text-xs tracking-wider "
                    + "uppercase px-3 py-1 rounded-full mb-2"
                  }>
                    {etiquetaTipoEvento(evento.tipoEvento)}
                  </span>
                  <h3 className={
                    "font-titulo text-xl md:text-2xl "
                    + "text-blanco-calido"
                  }>
                    {evento.titulo}
                  </h3>
                  <p className={
                    "font-cuerpo text-xs "
                    + "text-blanco-calido/70 mt-1"
                  }>
                    {evento.lugar}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/portafolio" className={botonDurazno}>
              Ver portafolio completo
            </Link>
          </div>
        </div>
      </section>

      {/* ── Paquetes ─────────────────────────────────────── */}
      <section className="py-24 bg-durazno-claro">
        <div className={contenedor}>
          <div className="text-center mb-16">
            <p className={
              "font-cuerpo text-xs tracking-[0.4em] "
              + "uppercase text-verde mb-4"
            }>
              Todo incluido
            </p>
            <h2 className={
              "font-titulo text-5xl md:text-6xl "
              + "text-negro-elegante font-light"
            }>
              Paquetes{" "}
              <span className="text-verde italic">
                prediseñados
              </span>
            </h2>
            {ornamento("verde")}
            <p className={
              "font-cuerpo text-gris-texto mt-6 "
              + "max-w-xl mx-auto text-sm"
            }>
              Soluciones completas pensadas para cada tipo
              de celebración. Sin complicaciones.
            </p>
          </div>

          <div className={
            "grid grid-cols-1 md:grid-cols-2 "
            + "lg:grid-cols-3 gap-6 items-stretch"
          }>
            {paquetesDestacados.map((paquete) => {
              const esDest = paquete.destacado;
              const fondoCard = esDest
                ? "bg-negro-elegante shadow-elegante ring-2 ring-durazno"
                : "bg-blanco-calido border border-durazno/20 shadow-suave hover:shadow-elegante";
              const colorTitulo = esDest
                ? "text-blanco-calido"
                : "text-negro-elegante";
              const colorTexto = esDest
                ? "text-blanco-calido/70"
                : "text-gris-texto";
              const colorPrecio = esDest
                ? "text-durazno"
                : "text-negro-elegante";
              const colorLabel = esDest
                ? "text-durazno"
                : "text-verde";
              const colorCheck = esDest
                ? "text-durazno"
                : "text-verde";
              const colorExtra = esDest
                ? "text-blanco-calido/40"
                : "text-gris-texto/60";
              const borderColor = esDest
                ? "border-blanco-calido/10"
                : "border-durazno/20";
              const estiloBoton = esDest
                ? "bg-durazno text-negro-elegante hover:bg-durazno-oscuro"
                : "border border-verde text-verde hover:bg-verde hover:text-blanco-calido";

              return (
                <div
                  key={paquete.id}
                  className={
                    "w-full rounded-tarjeta overflow-hidden "
                    + "flex flex-col transition-all duration-300 "
                    + fondoCard
                  }
                >
                  {esDest && (
                    <div className={
                      "bg-durazno text-negro-elegante "
                      + "text-center py-2 font-cuerpo "
                      + "text-xs tracking-[0.3em] "
                      + "uppercase font-semibold"
                    }>
                      ✦ Más popular
                    </div>
                  )}

                  <div className="relative h-44 flex-shrink-0">
                    <img
                      src={paquete.imagen}
                      alt={paquete.nombre}
                      className="w-full h-full object-cover"
                    />
                    <div className={
                      "absolute inset-0 bg-gradient-to-t "
                      + "from-negro-elegante/50 to-transparent"
                    } />
                    <span className={
                      "absolute bottom-3 left-4 "
                      + "bg-blanco-calido/90 backdrop-blur-sm "
                      + "text-negro-elegante font-cuerpo "
                      + "text-xs tracking-wider uppercase "
                      + "px-3 py-1 rounded-full"
                    }>
                      {etiquetaTipoEvento(paquete.tipoEvento)}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-1 text-center">
                    <h3 className={"font-titulo text-2xl mb-2 " + colorTitulo}>
                      {paquete.nombre}
                    </h3>
                    <p className={
                      "font-cuerpo text-sm leading-relaxed mb-5 " + colorTexto
                    }>
                      {paquete.descripcion}
                    </p>

                    <div className={"mb-5 pb-5 border-b " + borderColor}>
                      <p className={
                        "font-cuerpo text-xs uppercase "
                        + "tracking-wider mb-1 " + colorLabel
                      }>
                        Inversión desde
                      </p>
                      <p className={"font-titulo text-3xl " + colorPrecio}>
                        {formatearPrecio(paquete.precioDesde)}
                      </p>
                    </div>

                    <ul className="space-y-2 mb-6 flex-1 text-left">
                      {paquete.incluye.slice(0, 4).map((item, idx) => (
                        <li
                          key={idx}
                          className={
                            "flex items-start gap-2 "
                            + "font-cuerpo text-sm "
                            + (esDest
                              ? "text-blanco-calido/80"
                              : "text-gris-texto")
                          }
                        >
                          <span className={
                            "mt-0.5 flex-shrink-0 font-semibold "
                            + colorCheck
                          }>
                            ✓
                          </span>
                          {item}
                        </li>
                      ))}
                      {paquete.incluye.length > 4 && (
                        <li className={
                          "font-cuerpo text-xs italic pl-5 "
                          + colorExtra
                        }>
                          +{paquete.incluye.length - 4} elementos más
                        </li>
                      )}
                    </ul>

                    <Link
                      href="/paquetes"
                      className={
                        "block text-center font-cuerpo "
                        + "font-semibold text-sm tracking-wider "
                        + "uppercase px-6 py-3 rounded-boton "
                        + "transition-all duration-300 "
                        + estiloBoton
                      }
                    >
                      Ver detalles
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/paquetes"
              className={
                "inline-block border border-negro-elegante "
                + "text-negro-elegante hover:bg-negro-elegante "
                + "hover:text-blanco-calido font-cuerpo "
                + "font-semibold px-10 py-4 rounded-boton "
                + "transition-all duration-300 "
                + "text-sm tracking-wider uppercase"
              }
            >
              Explorar todos los paquetes
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Final ────────────────────────────────────── */}
      <section className={
        "relative py-32 bg-negro-elegante overflow-hidden"
      }>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient("
              + "circle at 1px 1px, "
              + "#E2C8B4 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className={
          "relative z-10 " + contenedor
        }>
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-durazno/40" />
              <span className="text-durazno text-2xl">✦</span>
              <div className="w-16 h-px bg-durazno/40" />
            </div>

            <h2 className={
              "font-titulo text-5xl md:text-6xl "
              + "text-blanco-calido font-light "
              + "mb-6 leading-tight"
            }>
              ¿Listo para hacer realidad{" "}
              <span className="text-durazno italic">
                tu evento?
              </span>
            </h2>

            <p className={
              "font-cuerpo text-lg text-blanco-calido/70 "
              + "mb-12 max-w-xl mx-auto leading-relaxed"
            }>
              Cuéntanos tu idea y te ayudamos a crear una
              celebración que nadie olvidará. Atendemos en
              todo el Oriente Antioqueño.
            </p>

            <div className={
              "flex flex-col sm:flex-row "
              + "items-center justify-center gap-4"
            }>
              <Link href="/contacto" className={botonVerde}>
                Cotizar mi evento
              </Link>
              <a
                href="https://wa.me/573000000000"
                target="_blank"
                rel="noopener noreferrer"
                className={
                  "flex items-center gap-3 "
                  + botonDurazno
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current flex-shrink-0"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Escríbenos
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
