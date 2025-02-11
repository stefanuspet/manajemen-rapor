import CardCount from "@/Components/CardCount";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ countMapel, id }) {
    const handleCetakRapor = (id) => {
        window.open(`/wali/rapor/cetak/${id}`, "_blank");
    };
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <h1 className="text-2xl font-bold">Dasboard Siswa</h1>
            <div className="flex gap-4 items-center">
                <CardCount
                    title="Jumlah Mapel"
                    count={countMapel}
                    color="bg-purple-700"
                />
                <button
                    onClick={() => handleCetakRapor(id)}
                    className="bg-blue-600 text-white px-3 py-10 h-fit rounded-lg"
                >
                    Cetak Rapor
                </button>
            </div>
        </AuthenticatedLayout>
    );
}
