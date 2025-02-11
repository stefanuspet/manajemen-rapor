import ModalForm from "@/Components/ModalForm";
import ModalGuru from "@/Components/ModalGuru";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Index = ({ gurus }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGuru, setSelectedGuru] = useState(null);
    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

    const { delete: destroy } = useForm();

    const { flash } = usePage().props;

    console.log(gurus, "guru id");

    useEffect(() => {
        if (flash.success || flash.error) {
            toast[flash.success ? "success" : "error"](
                flash.success || flash.error
            );
        }
    }, [flash]);

    const handleDelete = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            destroy(route("admin.guru.destroy", id));
        }
    };

    const handleDeleteAccount = (id) => {
        if (
            window.confirm("Apakah Anda yakin ingin menghapus akun guru ini?")
        ) {
            console.log(route("admin.guru.delete-account", id));

            destroy(route("admin.guru.delete-account", id));
        }
    };

    const openAddModal = () => {
        setSelectedGuru(null); // Reset data agar modal digunakan untuk tambah
        setIsModalOpen(true);
    };

    const openAddAccountModal = (guru) => {
        setSelectedGuru(guru);
        setIsAccountModalOpen(true);
    };

    // Fungsi untuk membuka modal edit data
    const openEditModal = (guru) => {
        console.log("Editing:", guru);
        setSelectedGuru(guru); // Set data yang akan diedit
        setIsModalOpen(true);
    };

    // Fungsi untuk menutup modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedGuru(null); // Reset setelah modal ditutup
    };

    const closeAccountModal = () => {
        setIsAccountModalOpen(false);
        setSelectedGuru(null);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="flex items-center justify-between pb-5">
                <h1 className="text-2xl font-bold">Data Guru</h1>
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
                                Nip
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nama
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Wali Kelas
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {gurus.map((guru) => (
                            <tr
                                key={guru.id}
                                className="bg-white border-b border-gray-200"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {guru.nip}
                                </td>
                                <td className="px-6 py-4">{guru.nama}</td>
                                <td className="px-6 py-4">
                                    {guru.user
                                        ? guru.user.email
                                        : "Belum Punya Akun"}
                                </td>
                                <td className="px-6 py-4">
                                    {guru.kelas ? "Yes" : "No"}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => openEditModal(guru)}
                                            className="bg-yellow-500 px-3 py-1 text-white rounded-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(guru.id)
                                            }
                                            className="bg-red-700 px-3 py-1 text-white rounded-sm"
                                        >
                                            Delete
                                        </button>
                                        {guru.user_id ? (
                                            <button
                                                onClick={() =>
                                                    handleDeleteAccount(guru.id)
                                                }
                                                className="bg-sky-700 text-white px-3 py-1 rounded-sm"
                                            >
                                                Delete Account
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    openAddAccountModal(guru)
                                                }
                                                className="bg-green-700 text-white px-3 py-1 rounded-sm"
                                            >
                                                Add Account
                                            </button>
                                        )}
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
                    selectedGuru ? "admin.guru.update" : "admin.guru.store"
                }
                method={selectedGuru ? "PUT" : "POST"}
                id={selectedGuru ? selectedGuru.id : null} // Kirim ID hanya jika Edit
                initialData={
                    selectedGuru
                        ? {
                              nip: selectedGuru.nip,
                              nama: selectedGuru.nama,
                              user_id: selectedGuru.user_id,
                          }
                        : { nip: "", nama: "", user_id: null }
                }
                fields={[
                    { name: "nip", label: "NIP", type: "number" },
                    { name: "nama", label: "Nama Guru", type: "text" },
                ]}
            />
            <ModalGuru
                isOpen={isAccountModalOpen}
                onClose={closeAccountModal}
                submitRoute="admin.guru.add-account"
                method="POST"
                id={selectedGuru ? selectedGuru.id : null}
                initialData={{
                    email: "",
                    password: "",
                    role: "wali_kelas",
                    guru_id: selectedGuru ? selectedGuru.id : null,
                }}
            />
        </AuthenticatedLayout>
    );
};

export default Index;
