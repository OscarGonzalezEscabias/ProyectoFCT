export function Home() {
    return (
        <section className="h-[calc(100vh-7rem)] flex justify-center items-center text-white px-6 text-center">
            <div className="max-w-2xl">
                <h1 className="text-5xl font-bold mb-6">Bienvenido a TusViajes+</h1>
                <p className="text-xl mb-6">
                    Somos tu agencia de confianza para organizar el viaje completo de tus sueños.
                    Desde vuelos hasta hoteles y restaurantes, lo gestionamos todo para que tú solo te preocupes por disfrutar.
                </p>
                <p className="text-lg italic text-gray-300">✈️ Reserva fácil, viaja sin límites. 🌍</p>
            </div>
        </section>
    );
}

export default Home;
