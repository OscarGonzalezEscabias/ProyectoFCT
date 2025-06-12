import UserProfil from "@/components/UserProfil";

export default function ProfilePage({ params }: { params: { id: number } }) {
    return (
        <div className="flex flex-col items-center mt-10">
            <UserProfil params={{ id: params.id }} />
        </div>
    )
}