import ModalForm from "@/Components/ModalForm";
import ModalSiswa from "@/Components/ModalSiswa";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Index = ({ siswas, kelas, jurusan }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSiswa, setSelectedSiswa] = useState(null);
    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

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
            destroy(route("admin.siswa.destroy", id));
        }
    };

    const handleDeleteAccount = (id) => {
        if (
            window.confirm("Apakah Anda yakin ingin menghapus akun siswa ini?")
        ) {
            console.log(route("admin.siswa.delete-account", id));

            destroy(route("admin.siswa.delete-account", id));
        }
    };

    const openAddModal = () => {
        setSelectedSiswa(null); // Reset data agar modal digunakan untuk tambah
        setIsModalOpen(true);
    };

    const openAddAccountModal = (siswa) => {
        setSelectedSiswa(siswa);
        setIsAccountModalOpen(true);
    };

    // Fungsi untuk membuka modal edit data
    const openEditModal = (siswa) => {
        console.log("Editing:", siswa);
        setSelectedSiswa(siswa); // Set data yang akan diedit
        setIsModalOpen(true);
    };

    // Fungsi untuk menutup modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSiswa(null); // Reset setelah modal ditutup
    };

    const closeAccountModal = () => {
        setIsAccountModalOpen(false);
        setSelectedSiswa(null);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="flex items-center justify-between pb-5">
                <h1 className="text-2xl font-bold">Data Siswa</h1>
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
                                NISN
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nama
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Kelas
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {siswas.map((siswa) => (
                            <tr
                                key={siswa.id}
                                className="bg-white border-b border-gray-200"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {siswa.nisn}
                                </td>
                                <td className="px-6 py-4">{siswa.nama}</td>
                                <td className="px-6 py-4">
                                    {siswa.user
                                        ? siswa.user.email
                                        : "belum ada akun"}
                                </td>
                                <td className="px-6 py-4">
                                    {siswa.kelas.nama_kelas}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => openEditModal(siswa)}
                                            className="bg-yellow-500 px-3 py-1 text-white rounded-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(siswa.id)
                                            }
                                            className="bg-red-700 px-3 py-1 text-white rounded-sm"
                                        >
                                            Delete
                                        </button>
                                        {siswa.user_id ? (
                                            <button
                                                onClick={() =>
                                                    handleDeleteAccount(
                                                        siswa.id
                                                    )
                                                }
                                                className="bg-sky-700 text-white px-3 py-1 rounded-sm"
                                            >
                                                Delete Account
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    openAddAccountModal(siswa)
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
                    selectedSiswa ? "admin.siswa.update" : "admin.siswa.store"
                }
                method={selectedSiswa ? "PUT" : "POST"}
                id={selectedSiswa ? selectedSiswa.id : null} // Kirim ID hanya jika Edit
                initialData={
                    selectedSiswa
                        ? {
                              nisn: selectedSiswa.nisn,
                              nama: selectedSiswa.nama,
                              kelas_id: selectedSiswa.kelas_id,
                          }
                        : {
                              nisn: "",
                              nama: "",
                              kelas_id: null,
                              user_id: null,
                          }
                }
                fields={[
                    { name: "nisn", label: "NISN", type: "number" },
                    { name: "nama", label: "Nama Siswa", type: "text" },
                    {
                        name: "kelas_id",
                        label: "Kelas",
                        type: "select",
                        options: kelas.map((k) => ({
                            value: k.id,
                            label: k.nama_kelas,
                        })),
                    },
                ]}
            />

            <ModalSiswa
                isOpen={isAccountModalOpen}
                onClose={closeAccountModal}
                submitRoute="admin.siswa.add-account"
                method="POST"
                id={selectedSiswa ? selectedSiswa.id : null}
                initialData={{
                    email: "",
                    password: "",
                    role: "siswa",
                    siswa_id: selectedSiswa ? selectedSiswa.id : "",
                }}
            />
        </AuthenticatedLayout>
    );
};

export default Index;
