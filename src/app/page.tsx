export default function PaginaInicio() {
  return (
    <div className="min-h-screen bg-negro-elegante flex flex-col items-center justify-center text-center px-6 gap-6">

      <span className="text-6xl">✦</span>

      <h1 className="font-titulo text-5xl md:text-7xl font-semibold text-dorado">
        Planeamos tus Sueños
      </h1>

      <p className="font-cuerpo text-blanco-calido/70 text-lg max-w-md">
        Empresa de eventos del Oriente Antioqueño
        <br />
        <em>Rionegro · Guarne · Llanogrande</em>
      </p>

      <div className="mt-4 px-8 py-3 border border-dorado rounded-boton text-dorado text-sm tracking-widest">
        ✅ FASE 1 COMPLETADA
      </div>

      <p className="text-gris-texto text-xs mt-8">
        Next.js · Tailwind CSS · TypeScript
      </p>
    </div>
  );
}