import axios from "axios"
import ProfileTravelReservationDetailCard from "@/components/cards/ProfileTravelReservationDetailCard"
import Buttons from "./Buttons"

async function LoadTravel(id: string) {
    const { data: travel } = await axios.get(`http://localhost:3000/api/travels/${id}`);

    const [outboundRes, returnRes, hotelRes, activitiesRes] = await Promise.all([
        travel.outbound_flight_reservation_id
            ? axios.get(`http://localhost:3000/api/flights/${travel.outbound_flight_reservation_id}`)
            : Promise.resolve({ data: null }),

        travel.return_flight_reservation_id
            ? axios.get(`http://localhost:3000/api/flights/${travel.return_flight_reservation_id}`)
            : Promise.resolve({ data: null }),

        travel.hotel_reservation_id
            ? axios.get(`http://localhost:3000/api/reservation/${travel.hotel_reservation_id}`)
            : Promise.resolve({ data: null }),

        axios.get(`http://localhost:3000/api/travels/${id}/activities`)
    ]);

    return {
        ...travel,
        outboundFlight: outboundRes.data,
        returnFlight: returnRes.data,
        hotelReservation: hotelRes.data,
        activities: activitiesRes.data,
    };
}

async function TravelreservationPage({params}: {params: {id: string, travelId: string}}) {
    const travelId = params.travelId
    const travel = await LoadTravel(travelId)
    console.log(travel)
    return (
        <section className="flex items-center justify-center h-full">
            <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col gap-4 items-center justify-center">
                <ProfileTravelReservationDetailCard travel={travel}/>
                <Buttons id={params.id} travelId={travelId}/>
            </div>
        </section>
    )
}

export default TravelreservationPage