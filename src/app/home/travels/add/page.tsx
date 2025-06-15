import TravelForm from "@/components/forms/TravelForm";

export default function TravelAddPage() {    
    return (
        <div className="flex flex-col items-center mt-10 bg-white p-4 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-black">Personaliza tu viaje</h1>
            <TravelForm />
        </div>
    )
}