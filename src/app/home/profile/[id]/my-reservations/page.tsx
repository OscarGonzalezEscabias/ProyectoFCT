'use client';

import { useEffect, useState } from 'react';
import ProfileHotelsReservationCard from '@/components/ProfileHotelsReservationCard';
import ProfileFlightsReservationCard from '@/components/ProfileFlightsReservationCard';
import ProfileActivitiesReservationCard from '@/components/ProfileActivitiesReservationCard';

type ReservationType = 'all' | 'hotels' | 'flights' | 'activities';

export default function MyReservationsPage({ params }: { params: { id: number } }) {
  const [reservationType, setReservationType] = useState<ReservationType>('all');
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReservations = async (type: ReservationType) => {
    setLoading(true);
    try {
      let allData: any[] = [];

      if (type === 'all' || type === 'hotels') {
        const res = await fetch(`/api/profile/${params.id}/hotels-reservation`);
        if (res.ok) {
          const data = await res.json();
          allData = [...allData, ...data.map((item: any) => ({ ...item, type: 'hotel' }))];
        }
      }

      if (type === 'all' || type === 'flights') {
        const res = await fetch(`/api/profile/${params.id}/flights-reservation`);
        if (res.ok) {
          const data = await res.json();
          allData = [...allData, ...data.map((item: any) => ({ ...item, type: 'flight' }))];
        }
      }

      if (type === 'all' || type === 'activities') {
        const res = await fetch(`/api/profile/${params.id}/activities-reservation`);
        if (res.ok) {
          const data = await res.json();
          allData = [...allData, ...data.map((item: any) => ({ ...item, type: 'activity' }))];
        }
      }

      setReservations(allData);
    } catch (error) {
      console.error('Error al cargar reservas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations(reservationType);
  }, [reservationType]);

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-white text-3xl font-bold">Mis reservas</h1>

      <select
        name="reservationType"
        id="reservationType"
        className="bg-gray-200 p-2 rounded w-fit"
        value={reservationType}
        onChange={(e) => setReservationType(e.target.value as ReservationType)}
      >
        <option value="all">Todas</option>
        <option value="hotels">Hoteles</option>
        <option value="flights">Vuelos</option>
        <option value="activities">Actividades</option>
      </select>

      {loading ? (
        <p className="text-white">Cargando reservas...</p>
      ) : reservations.length === 0 ? (
        <p className="text-white">No se encontraron reservas.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reservations.map((reservation, index) => {
            switch (reservation.type) {
              case 'hotel':
                return <ProfileHotelsReservationCard key={index} reservation={reservation} />;
              case 'flight':
                return <ProfileFlightsReservationCard key={index} reservation={reservation} />;
              case 'activity':
                return <ProfileActivitiesReservationCard key={index} reservation={reservation} />;
              default:
                return null;
            }
          })}
        </div>
      )}
    </div>
  );
}
