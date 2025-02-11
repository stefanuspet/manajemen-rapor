import CardCount from "@/Components/CardCount";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({
    countGuru,
    countSiswa,
    countKelas,
    countMapel,
}) {
    console.log(countGuru, countSiswa, countKelas, countMapel);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <h1 className="text-2xl font-bold">Dasboard Admin</h1>
            <div className="flex justify-between">
                <CardCount
                    title="Jumlah Guru"
                    count={countGuru}
                    color="bg-purple-700"
                />
                <CardCount
                    title="Jumlah Siswa"
                    count={countSiswa}
                    color="bg-yellow-500"
                />
                <CardCount
                    title="Jumlah Kelas"
                    count={countKelas}
                    color="bg-blue-700"
                />
                <CardCount
                    title="Jumlah Mapel"
                    count={countMapel}
                    color="bg-green-700"
                />
            </div>
        </AuthenticatedLayout>
    );
}
