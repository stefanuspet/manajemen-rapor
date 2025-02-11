import CardCount from "@/Components/CardCount";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ countSiswa }) {
    
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <h1 className="text-2xl font-bold">Wali Kelas</h1>
            <div className="flex justify-between">
                <CardCount
                    title="Jumlah Siswa"
                    count={countSiswa}
                    color="bg-purple-700"
                />
            </div>
        </AuthenticatedLayout>
    );
}
