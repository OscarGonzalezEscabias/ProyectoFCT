import UserForm from "@/components/UserForm";

export default function EditProfilePage({ params }: { params: { id: number } }) {
    return (
        <div className="flex flex-col items-center mt-10">
            <UserForm />
        </div>
    )
}