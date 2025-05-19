import Link from "next/link"


function HotelsCard( {hotels}: {hotels: any}) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg mb-3 hover:bg-gray-100 margin-2 items-center">
            <h2 className="font-bold text-2xl">{hotels.namehotel}</h2>
            <p className="text-gray-500">{hotels.description}</p>   
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600">
                <Link href={`/home/reservation/add`}>Reservar</Link>
            </button>
        </div>
    )
}

export default HotelsCard