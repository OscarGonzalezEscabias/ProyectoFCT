export function Home() {
  return (
    <section
      className="flex-grow flex justify-center items-center px-6 text-center overflow-hidden bg-transparent"
      style={{ minHeight: 0 }}
    >
      {/* Contenedor con fondo, bordes y redondeado */}
      <div className="relative w-full max-w-6xl rounded-3xl shadow-lg overflow-hidden">
        {/* Imagen de fondo ampliada */}
        <div
          className="absolute inset-0 bg-[url('https://lagavetavoladora.com/wp-content/uploads/2016/10/Guia-de-viaje-a-Filipinas.jpg')] 
                     bg-cover bg-center opacity-40 scale-110 transform will-change-transform"
          aria-hidden="true"
        />

        {/* Capa de gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 opacity-50" />

        {/* Contenido */}
        <div className="relative p-12 sm:p-20 text-white">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg text-blue-300">
            Bienvenido a <span className="text-white">TusViajes+</span>
          </h1>
          <p className="text-lg sm:text-xl mb-6 leading-relaxed text-gray-200">
            Somos tu agencia de confianza para organizar el viaje completo de tus sueños.
            <br className="hidden md:block" />
            Desde vuelos hasta hoteles y actividades, lo gestionamos todo para que tú solo te preocupes por disfrutar.
          </p>
          <p className="text-base sm:text-lg italic text-indigo-300">
            Reserva fácil, viaja sin límites. <span className="text-blue-400"> </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Home;
