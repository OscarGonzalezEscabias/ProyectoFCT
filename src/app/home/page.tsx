export function Home() {
  return (
    <section
      className="flex-grow flex justify-center items-center
                 text-white px-6 text-center
                 from-indigo-900 via-blue-900 to-purple-900
                 bg-[length:400%_400%] animate-[gradientShift_12s_ease_infinite]"
      style={{ minHeight: 0 }}
    >
      <div className="max-w-3xl animate-fade-in duration-700">
        <h1 className="text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg text-blue-300">
          Bienvenido a <span className="text-white">TusViajes+</span>
        </h1>
        <p className="text-xl mb-6 leading-relaxed text-gray-200">
          Somos tu agencia de confianza para organizar el viaje completo de tus sueños.
          <br className="hidden md:block" />
          Desde vuelos hasta hoteles y restaurantes, lo gestionamos todo para que tú solo te preocupes por disfrutar.
        </p>
        <p className="text-lg italic text-indigo-300 mb-8">
          ✈️ Reserva fácil, viaja sin límites. <span className="text-blue-400">🌍</span>
        </p>
      </div>
    </section>
  );
}

export default Home;
