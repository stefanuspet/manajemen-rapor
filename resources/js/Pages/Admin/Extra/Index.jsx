import ModalForm from "@/Components/ModalForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Index = ({ extras, guru }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedExtra, setSelectedExtra] = useState(null);

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
            destroy(route("admin.extra.destroy", id));
        }
    };

    const openAddModal = () => {
        setSelectedExtra(null); // Reset data agar modal digunakan untuk tambah
        setIsModalOpen(true);
    };

    // Fungsi untuk membuka modal edit data
    const openEditModal = (extra) => {
        console.log("Editing:", extra);
        setSelectedExtra(extra); // Set data yang akan diedit
        setIsModalOpen(true);
    };

    // Fungsi untuk menutup modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedExtra(null); // Reset setelah modal ditutup
    };

    console.log(extras);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="flex items-center justify-between pb-5">
                <h1 className="text-2xl font-bold">Data Extra</h1>
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
                                Nama Extra
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Pengampu Extra
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {extras.map((extra) => (
                            <tr
                                key={extra.id}
                                className="bg-white border-b border-gray-200"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {extra.nama_extra}
                                </td>
                                <td className="px-6 py-4">{extra.guru.nama}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => openEditModal(extra)}
                                            className="bg-yellow-500 px-3 py-1 text-white rounded-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(extra.id)
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
                    selectedExtra ? "admin.extra.update" : "admin.extra.store"
                }
                method={selectedExtra ? "PUT" : "POST"}
                id={selectedExtra ? selectedExtra.id : null} // Kirim ID hanya jika Edit
                initialData={
                    selectedExtra
                        ? {
                              nama_extra: selectedExtra.nama_extra,
                              guru_id: selectedExtra.guru_id,
                          }
                        : { nama_extra: "", guru_id: "" }
                }
                fields={[
                    {
                        name: "nama_extra",
                        label: "Nama Extrakulikuler",
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
