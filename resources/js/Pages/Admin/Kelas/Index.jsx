import ModalForm from "@/Components/ModalForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Index = ({ kelas, walikelases, jurusans }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedKelas, setSelectedkelas] = useState(null);

    console.log(kelas);

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
            destroy(route("admin.kelas.destroy", id));
        }
    };

    const openAddModal = () => {
        setSelectedkelas(null); // Reset data agar modal digunakan untuk tambah
        setIsModalOpen(true);
    };

    // Fungsi untuk membuka modal edit data
    const openEditModal = (guru) => {
        console.log("Editing:", guru);
        setSelectedkelas(guru); // Set data yang akan diedit
        setIsModalOpen(true);
    };

    // Fungsi untuk menutup modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedkelas(null); // Reset setelah modal ditutup
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="flex ks-center justify-between pb-5">
                <h1 className="text-2xl font-bold">Data Kelas</h1>
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
                                Nama Kelas
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nama Wali Kelas
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Jurusan
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {kelas.map((k) => (
                            <tr
                                key={k.id}
                                className="bg-white border-b border-gray-200"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {k.nama_kelas}
                                </td>
                                <td className="px-6 py-4">
                                    <p>
                                        {k.wali_kelas
                                            ? k.wali_kelas.nama
                                            : "No Wali Kelas"}
                                    </p>
                                </td>
                                <td className="px-6 py-4">
                                    <p>
                                        {k.jurusan
                                            ? k.jurusan.nama_jurusan
                                            : "No Jurusan"}
                                    </p>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => openEditModal(k)}
                                            className="bg-yellow-500 px-3 py-1 text-white rounded-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(k.id)}
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
                    selectedKelas ? "admin.kelas.update" : "admin.kelas.store"
                }
                method={selectedKelas ? "PUT" : "POST"}
                id={selectedKelas ? selectedKelas.id : null} // Kirim ID hanya jika Edit
                initialData={
                    selectedKelas
                        ? {
                              nama_kelas: selectedKelas.nama_kelas,
                              wali_kelas_id: selectedKelas.wali_kelas_id,
                              jurusan_id: selectedKelas.jurusan_id,
                          }
                        : { nama_kelas: "", wali_kelas_id: "", jurusan_id: "" }
                }
                fields={[
                    { name: "nama_kelas", label: "Nama Kelas", type: "text" },
                    {
                        name: "wali_kelas_id",
                        label: "Nama Wali Kelas",
                        type: "select",
                        options: walikelases.map((wali) => ({
                            value: wali.id,
                            label: wali.nama, // Menampilkan nama guru
                        })),
                    },
                    {
                        name: "jurusan_id",
                        label: "Nama Jurusan",
                        type: "select",
                        options: jurusans.map((j) => ({
                            value: j.id,
                            label: j.nama_jurusan, // Menampilkan nama guru
                        })),
                    },
                ]}
            />
        </AuthenticatedLayout>
    );
};

export default Index;
