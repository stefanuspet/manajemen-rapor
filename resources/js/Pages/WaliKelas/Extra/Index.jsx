import ModalForm from "@/Components/ModalForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";

const Index = ({ extra }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedExtra, setSelectedExtra] = useState(null);
    const { delete: destroy } = useForm();

    const openAddModal = (data) => {
        setSelectedExtra(data);
        setIsModalOpen(true);
    };

    const { flash } = usePage().props;
    useEffect(() => {
        if (flash.success || flash.error) {
            toast[flash.success ? "success" : "error"](
                flash.success || flash.error
            );
        }
    }, [flash]);

    return (
        <AuthenticatedLayout>
            <Head title="Absensi" />
            <div className="flex items-center justify-between pb-5">
                <h1 className="text-2xl font-bold">Data Nilai Extra</h1>
            </div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left bg-gray-50 border border-gray-300">
                    <thead className="text-md bg-gray-200">
                        <tr>
                            <th className="px-6 py-3 border border-gray-300">
                                NISN
                            </th>
                            <th className="px-6 py-3 border border-gray-300">
                                Nama
                            </th>
                            <th className="px-6 py-3 border border-gray-300">
                                Nama Extra
                            </th>
                            <th className="px-6 py-3 border border-gray-300">
                                Keterangan nilai
                            </th>
                            <th className="px-6 py-3 border border-gray-300 text-center">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {extra.map((item) => (
                            <tr key={item.id} className="bg-white border-b">
                                <td className="px-6 py-4">{item.siswa.nisn}</td>
                                <td className="px-6 py-4">{item.siswa.nama}</td>
                                <td className="px-6 py-4">
                                    {item.extra.nama_extra}
                                </td>
                                <td className="px-6 py-4">
                                    {item.Keterangan || "Belum dinilai"}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => openAddModal(item)} // Membuka modal untuk penilaian
                                        className="bg-sky-500 px-3 py-1 text-white rounded-sm"
                                    >
                                        Update Nilai
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                submitRoute={"wali.extra.update"}
                method={"PUT"}
                id={selectedExtra?.id || null} // Pass selectedExtra.id
                initialData={{
                    keterangan: selectedExtra?.Keterangan || "", // Pastikan keterangan bisa diakses
                }}
                fields={[{ name: "keterangan", type: "text" }]}
            />
        </AuthenticatedLayout>
    );
};

export default Index;
