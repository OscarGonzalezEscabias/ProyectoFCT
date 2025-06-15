export default function TravelsCard({ travel }: { travel: any }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">{travel.name}</h2>
            <p className="text-gray-600">{travel.description}</p>
        </div>
    );
}