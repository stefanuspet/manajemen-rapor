import ModalForm from "@/Components/ModalForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Index = ({ jurusans }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJurusan, setSelectedJurusan] = useState(null);

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
            destroy(route("admin.jurusan.destroy", id));
        }
    };

    const openAddModal = () => {
        setSelectedJurusan(null); // Reset data agar modal digunakan untuk tambah
        setIsModalOpen(true);
    };

    // Fungsi untuk membuka modal edit data
    const openEditModal = (jurusan) => {
        console.log("Editing:", jurusan);
        setSelectedJurusan(jurusan); // Set data yang akan diedit
        setIsModalOpen(true);
    };

    // Fungsi untuk menutup modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedJurusan(null); // Reset setelah modal ditutup
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="flex items-center justify-between pb-5">
                <h1 className="text-2xl font-bold">Data Jurusan</h1>
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
                                Nama Jurusan
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {jurusans.map((jurusan) => (
                            <tr
                                key={jurusan.id}
                                className="bg-white border-b border-gray-200"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {jurusan.nama_jurusan}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() =>
                                                openEditModal(jurusan)
                                            }
                                            className="bg-yellow-500 px-3 py-1 text-white rounded-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(jurusan.id)
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
                    selectedJurusan
                        ? "admin.jurusan.update"
                        : "admin.jurusan.store"
                }
                method={selectedJurusan ? "PUT" : "POST"}
                id={selectedJurusan ? selectedJurusan.id : null} // Kirim ID hanya jika Edit
                initialData={
                    selectedJurusan
                        ? {
                              nama_jurusan: selectedJurusan.nama_jurusan,
                          }
                        : { nama_jurusan: "" }
                }
                fields={[
                    {
                        name: "nama_jurusan",
                        label: "Nama Jurusan",
                        type: "text",
                    },
                ]}
            />
        </AuthenticatedLayout>
    );
};

export default Index;
