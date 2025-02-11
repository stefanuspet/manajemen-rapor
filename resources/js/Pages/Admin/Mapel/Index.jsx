import ModalForm from "@/Components/ModalForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Index = ({ mapels, guru }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMapel, setSelectedMapel] = useState(null);

    const { delete: destroy } = useForm();

    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success || flash.error) {
            toast[flash.success ? "success" : "error"](
                flash.success || flash.error
            );
        }
    }, [flash]);

    const handleDelete = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            destroy(route("admin.mapel.destroy", id));
        }
    };

    const openAddModal = () => {
        setSelectedMapel(null); // Reset data agar modal digunakan untuk tambah
        setIsModalOpen(true);
    };

    // Fungsi untuk membuka modal edit data
    const openEditModal = (mapel) => {
        console.log("Editing:", mapel);
        setSelectedMapel(mapel); // Set data yang akan diedit
        setIsModalOpen(true);
    };

    // Fungsi untuk menutup modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMapel(null); // Reset setelah modal ditutup
    };

    console.log(mapels);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="flex items-center justify-between pb-5">
                <h1 className="text-2xl font-bold">Data Mapel</h1>
                <button
                    onClick={openAddModal}
                    className="bg-green-700 text-white py-1 px-2 rounded-sm"
                >
                    Add Data
                </button>
            </div>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right bg-gray-50">
                    <thead className="text-md   ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nama Mapel
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Pengampu Mapel
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {mapels.map((mapel) => (
                            <tr
                                key={mapel.id}
                                className="bg-white border-b border-gray-200"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {mapel.nama_mapel}
                                </td>
                                <td className="px-6 py-4">{mapel.guru.nama}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => openEditModal(mapel)}
                                            className="bg-yellow-500 px-3 py-1 text-white rounded-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(mapel.id)
                                            }
                                            className="bg-red-700 px-3 py-1 text-white rounded-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalForm
                isOpen={isModalOpen}
                onClose={closeModal}
                submitRoute={
                    selectedMapel ? "admin.mapel.update" : "admin.mapel.store"
                }
                method={selectedMapel ? "PUT" : "POST"}
                id={selectedMapel ? selectedMapel.id : null} // Kirim ID hanya jika Edit
                initialData={
                    selectedMapel
                        ? {
                              nama_mapel: selectedMapel.nama_mapel,
                              guru_id: selectedMapel.guru_id,
                          }
                        : { nama_mapel: "", guru_id: "" }
                }
                fields={[
                    {
                        name: "nama_mapel",
                        label: "Nama Mata Pelajaran",
                        type: "text",
                    },
                    {
                        name: "guru_id",
                        label: "Nama Guru",
                        type: "select",
                        options: guru.map((g) => ({
                            value: g.id,
                            label: g.nama, // Menampilkan nama guru
                        })),
                    },
                ]}
            />
        </AuthenticatedLayout>
    );
};

export default Index;
