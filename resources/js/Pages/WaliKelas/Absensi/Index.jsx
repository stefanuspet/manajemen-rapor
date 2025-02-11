import ModalForm from "@/Components/ModalForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Index = ({ siswa }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAbsen, setSelectedAbsen] = useState(null);

    const { delete: destroy } = useForm();

    const openAddModal = (data) => {
        setSelectedAbsen(data); // Reset data agar modal digunakan untuk tambah
        setIsModalOpen(true);
    };

    console.log(siswa);

    const { flash } = usePage().props;
    useEffect(() => {
        if (flash.success || flash.error) {
            toast[flash.success ? "success" : "error"](
                flash.success || flash.error
            );
        }
    }, [flash]);

    const handleDeleteAbsensi = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            destroy(route("wali.absensi.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Absensi" />
            <div className="flex items-center justify-between pb-5">
                <h1 className="text-2xl font-bold">Data Absensi</h1>
            </div>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right bg-gray-50">
                    <thead className="text-md   ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nisn
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nama
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Absensi
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {siswa.map((s) => (
                            <tr
                                key={s.id}
                                className="bg-white border-b border-gray-200"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {s.nisn}
                                </td>
                                <td className="px-6 py-4">{s.nama}</td>
                                <td className="px-6 py-4">
                                    {s.absensi.map((ab) => (
                                        <div
                                            key={ab.id}
                                            className="flex justify-between py-2"
                                        >
                                            {ab.status} - {ab.tanggal_absensi}
                                            <button
                                                onClick={() =>
                                                    handleDeleteAbsensi(ab.id)
                                                }
                                                className="bg-red-700 px-3 py-1 text-white rounded-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ))}
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => openAddModal(s)}
                                        className="bg-sky-700 px-3 py-1 text-white rounded-sm"
                                    >
                                        Add Absensi
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
                submitRoute={"wali.absensi.store"}
                method="POST"
                id={selectedAbsen ? selectedAbsen.id : null}
                initialData={{
                    siswa_id: selectedAbsen ? selectedAbsen.id : "",
                    semester_id: selectedAbsen ? selectedAbsen.semester_id : "",
                    tanggal_absensi: "",
                    status: "",
                }}
                fields={[
                    {
                        name: "siswa_id",
                        // label: "Siswa",
                        type: "hidden",
                    },
                    {
                        name: "semester_id",
                        // label: "Semester",
                        type: "hidden",
                    },
                    {
                        name: "tanggal_absensi",
                        label: "Tanggal Absensi",
                        type: "date",
                    },
                    {
                        name: "status",
                        label: "Status",
                        type: "select",
                        options: [
                            { value: "izin", label: "Izin" },
                            { value: "sakit", label: "Sakit" },
                            { value: "alfa", label: "Alfa" },
                        ],
                    },
                ]}
            />
        </AuthenticatedLayout>
    );
};

export default Index;
