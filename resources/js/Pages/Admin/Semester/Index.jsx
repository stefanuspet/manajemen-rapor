import ModalForm from "@/Components/ModalForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Index = ({ semesters }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState(null);

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
            destroy(route("admin.semester.destroy", id));
        }
    };

    const openAddModal = () => {
        setSelectedSemester(null); // Reset data agar modal digunakan untuk tambah
        setIsModalOpen(true);
    };

    // Fungsi untuk membuka modal edit data
    const openEditModal = (semester) => {
        console.log("Editing:", semester);
        setSelectedSemester(semester); // Set data yang akan diedit
        setIsModalOpen(true);
    };

    // Fungsi untuk menutup modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSemester(null); // Reset setelah modal ditutup
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="flex items-center justify-between pb-5">
                <h1 className="text-2xl font-bold">Data Semester</h1>
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
                                Nama Semester
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tahun Ajaran
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {semesters.map((semester) => (
                            <tr
                                key={semester.id}
                                className="bg-white border-b border-gray-200"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {semester.nama_semester}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {semester.tahun_ajaran}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {semester.status}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() =>
                                                openEditModal(semester)
                                            }
                                            className="bg-yellow-500 px-3 py-1 text-white rounded-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(semester.id)
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
                    selectedSemester
                        ? "admin.semester.update"
                        : "admin.semester.store"
                }
                method={selectedSemester ? "PUT" : "POST"}
                id={selectedSemester ? selectedSemester.id : null} // Kirim ID hanya jika Edit
                initialData={
                    selectedSemester
                        ? {
                              nama_semester: selectedSemester.nama_semester,
                              tahun_ajaran: selectedSemester.tahun_ajaran,
                              status: selectedSemester.status,
                          }
                        : { nama_semester: "" }
                }
                fields={[
                    {
                        name: "nama_semester",
                        label: "Nama Semester",
                        type: "text",
                    },
                    {
                        name: "tahun_ajaran",
                        label: "Tahun Ajaran",
                        type: "text",
                    },
                    {
                        name: "status",
                        label: "Status",
                        type: "select",
                        options: [
                            { label: "Aktif", value: "aktif" },
                            { label: "Tidak Aktif", value: "nonaktif" },
                        ],
                    },
                ]}
            />
        </AuthenticatedLayout>
    );
};

export default Index;
