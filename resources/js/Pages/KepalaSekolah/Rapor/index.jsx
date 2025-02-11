import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

const Index = ({ siswa }) => {
    const handleCetakRapor = (id) => {
        window.open(`/wali/rapor/cetak/${id}`, "_blank");
    };

    return (
        <AuthenticatedLayout>
            <Head title="Data Siswa" />
            <div className="flex items-center justify-between pb-5">
                <h1 className="text-2xl font-bold">Data Siswa</h1>
            </div>
            <div className="relative over flow-x-auto">
                <table className="w-full text-sm text-left bg-gray-50 border border-gray-300">
                    <thead className="text-md bg-gray-200">
                        <tr>
                            <th className="px-6 py-3 border border-gray-300">
                                NISN
                            </th>
                            <th className="px-6 py-3 border border-gray-300">
                                Nama
                            </th>
                            <th className="px-6 py-3 border border-gray-300 text-center">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {siswa.map((s) => (
                            <tr
                                key={s.id}
                                className="bg-white border-b border-gray-300"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border border-gray-300">
                                    {s.nisn}
                                </td>
                                <td className="px-6 py-4 border border-gray-300">
                                    {s.nama}
                                </td>
                                <td className="px-6 py-4 border border-gray-300 text-center">
                                    <button
                                        onClick={() => handleCetakRapor(s.id)}
                                        className="bg-blue-600 text-white px-3 py-1 rounded-sm"
                                    >
                                        Cetak Rapor
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
