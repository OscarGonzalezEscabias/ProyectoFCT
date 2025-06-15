import MyReservationsPage from '@/components/MyReservationPage';

export default function ProfilePage({ params }: { params: { id: string } }) {
  return <MyReservationsPage params={{ id: Number(params.id) }} />;
}
