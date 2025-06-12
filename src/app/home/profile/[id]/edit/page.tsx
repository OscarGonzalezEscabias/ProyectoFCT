import UserForm from "@/components/forms/UserForm";

export default function EditProfilePage({ params }: { params: { id: number } }) {
    return (
        <div className="flex flex-col items-center mt-10">
            <UserForm />
        </div>
    )
}