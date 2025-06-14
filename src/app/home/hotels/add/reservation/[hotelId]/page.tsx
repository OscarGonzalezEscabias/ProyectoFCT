import ReservationForm from "@/components/forms/ReservationForm";

function AddPage({ params }: { params: { hotelId: string } }) {
    
    return (
        <div className="flex items-center justify-center h-full">
            <ReservationForm/>
        </div>
    )
}

export default AddPage