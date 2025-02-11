import ModalForm from "@/Components/ModalForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const index = ({ kelasMapelSemesters, kelas, semesters, mapels }) => {
    const [openMapelModal, setOpenMapelModal] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const [selectedManajemenKelas, setselectedManajemenKelas] = useState(null);

    const { delete: destroy } = useForm();

    const { flash } = usePage().props;
    console.log(kelasMapelSemesters, "kelasMapelSemesters");

    useEffect(() => {
        if (flash.success || flash.error) {
            toast[flash.success ? "success" : "error"](
                flash.success || flash.error
            );
        }
    }, [flash]);

    const handleDelete = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            destroy(route("kepala.kurikulum.destroy", id));
        }
    };
    // Fungsi untuk membuka modal
    const openAddModal = () => {
        setselectedManajemenKelas(null); // Reset data agar modal digunakan untuk tambah
        setOpenModal(true);
    };

    const openAddMapelModal = (kelasMapelSemester) => {
        setselectedManajemenKelas(kelasMapelSemester); // Set data kelas yang akan ditambahkan mapelnya
        setOpenMapelModal(true);
    };

    const closeAddMapelModal = (kms) => {
        setselectedManajemenKelas(kms);
        setOpenMapelModal(false);
    };

    const openEditModal = (kms) => {
        setselectedManajemenKelas(kms); // Set data yang akan diedit
        setOpenModal(true);
    };

    // Fungsi untuk menutup modal
    const closeAddModal = (kms) => {
        setselectedManajemenKelas(kms);
        setOpenModal(false);
    };

    const handleDeleteMapel = (mapelId) => {
        if (
            window.confirm(
                "Apakah Anda yakin ingin menghapus mata pelajaran ini?"
            )
        ) {
            destroy(route("kepala.kurikulum.destroy.mapel", mapelId));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Data Kurikulum" />
            <div className="flex justify-between items-center pb-5">
                <h1 className="text-2xl font-bold">Data Manajemen Kelas</h1>
                <button
                    onClick={openAddModal}
                    className="bg-green-700 text-white py-1 px-2 rounded-sm"
                >
                    Add Data
                </button>
            </div>

            {/* Tabel Data Kurikulum */}
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right bg-gray-50">
                    <thead className="text-md">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Semester
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nama Kelas
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Mata Pelajaran
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {kelasMapelSemesters.length > 0 ? (
                            kelasMapelSemesters.map(
                                (kelasMapelSemester, index) => (
                                    <tr
                                        key={kelasMapelSemester.id}
                                        className="bg-white border-b border-gray-200"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            {kelasMapelSemester.semester}
                                        </td>
                                        <td className="px-6 py-4">
                                            {kelasMapelSemester.kelas}
                                        </td>
                                        <td className="px-6 py-4">
                                            {kelasMapelSemester.mapels.map(
                                                (mapel) => (
                                                    <div
                                                        key={mapel.id}
                                                        className="flex py-2 justify-between"
                                                    >
                                                        {mapel.nama}{" "}
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteMapel(
                                                                    mapel.id
                                                                )
                                                            }
                                                            className="bg-sky-700 px-3 py-1 text-white rounded-sm"
                                                        >
                                                            Delete Mapel
                                                        </button>
                                                    </div>
                                                )
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-3">
                                                {/* <button
                                                    onClick={() =>
                                                        openEditModal(
                                                            kelasMapelSemester
                                                        )
                                                    }
                                                    className="bg-yellow-500 px-3 py-1 text-white rounded-sm"
                                                >
                                                    Edit
                                                </button> */}
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            kelasMapelSemester.kelas_id
                                                        )
                                                    }
                                                    className="bg-red-700 px-3 py-1 text-white rounded-sm"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        openAddMapelModal(
                                                            kelasMapelSemester
                                                        )
                                                    }
                                                    className="bg-green-700 px-3 py-1 text-white rounded-sm"
                                                >
                                                    Add Mapel
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="px-6 py-4 text-center"
                                >
                                    No Data Available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <ModalForm
                isOpen={openModal}
                onClose={closeAddModal}
                submitRoute={
                    selectedManajemenKelas
                        ? "kepala.kurikulum.update"
                        : "kepala.kurikulum.store"
                }
                method={selectedManajemenKelas ? "PUT" : "POST"}
                id={
                    selectedManajemenKelas
                        ? selectedManajemenKelas.semester_id
                        : null
                }
                initialData={
                    selectedManajemenKelas
                        ? {
                              kelas_id: selectedManajemenKelas.kelas_id,
                              semester_id: selectedManajemenKelas.semester_id,
                              mapel_id: selectedManajemenKelas.mapel_id,
                          }
                        : { kelas: "", mapel: "", semester: "" }
                }
                fields={[
                    {
                        type: "select",
                        label: "Kelas",
                        name: "kelas_id",
                        options: kelas.map((kelas) => ({
                            value: kelas.id,
                            label: kelas.nama_kelas,
                        })),
                    },
                    ...(!selectedManajemenKelas
                        ? [
                              {
                                  type: "select",
                                  label: "Mata Pelajaran",
                                  name: "mapel_id",
                                  options: mapels.map((mapel) => ({
                                      value: mapel.id,
                                      label: mapel.nama_mapel,
                                  })),
                              },
                          ]
                        : []),
                    {
                        type: "select",
                        label: "Semester",
                        name: "semester_id",
                        options: semesters.map((semester) => ({
                            value: semester.id,
                            label: semester.nama_semester,
                        })),
                    },
                ]}
            />
            <ModalForm
                isOpen={openMapelModal}
                onClose={closeAddMapelModal}
                submitRoute="kepala.kurikulum.store.mapel"
                method="POST"
                id={selectedManajemenKelas ? selectedManajemenKelas.id : null}
                initialData={{
                    kelas_id: selectedManajemenKelas?.kelas_id,
                    semester_id: selectedManajemenKelas?.semester_id,
                }}
                fields={[
                    {
                        type: "select",
                        label: "Mata Pelajaran",
                        name: "mapel_id",
                        options: mapels.map((mapel) => ({
                            value: mapel.id,
                            label: mapel.nama_mapel,
                        })),
                    },
                ]}
            />
        </AuthenticatedLayout>
    );
};

export default index;
