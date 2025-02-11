import ModalForm from "@/Components/ModalForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Index = ({ siswa }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    console.log(siswa);

    const { delete: destroy } = useForm();

    const openAddOrEditModal = (siswa, mapel) => {
        setSelectedData({
            siswa_id: siswa.id,
            semester_id: mapel.semester_id, // Sesuaikan jika ada semester_id
            mapel_id: mapel ? mapel.mapel_id : null,
            nilai: mapel ? mapel.nilai : "",
            capaian_kompetensi: mapel ? mapel.capaian_kompetensi : "",
            nilai_id: mapel ? mapel.nilai_id : null,
        });
        setIsModalOpen(true);
    };

    console.log(selectedData, "selectedData");

    const handleDeleteNilai = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus nilai ini?")) {
            destroy(route("wali.nilai.destroy", id));
        }
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
                <h1 className="text-2xl font-bold">Data Nilai</h1>
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
                                Mata Pelajaran
                            </th>
                            <th className="px-6 py-3 border border-gray-300">
                                Nilai
                            </th>
                            <th className="px-6 py-3 border border-gray-300">
                                Capaian Kompetensi
                            </th>
                            <th className="px-6 py-3 border border-gray-300 text-center">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {siswa.map((s) => (
                            <React.Fragment key={s.id}>
                                {s.mapel.length > 0 ? (
                                    s.mapel.map((mapel, index) => (
                                        <tr
                                            key={mapel.id}
                                            className="bg-white border-b border-gray-300"
                                        >
                                            {index === 0 && (
                                                <>
                                                    <td
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border border-gray-300"
                                                        rowSpan={s.mapel.length}
                                                    >
                                                        {s.nisn}
                                                    </td>
                                                    <td
                                                        className="px-6 py-4 border border-gray-300"
                                                        rowSpan={s.mapel.length}
                                                    >
                                                        {s.nama}
                                                    </td>
                                                </>
                                            )}
                                            <td className="px-6 py-4 border border-gray-300">
                                                {mapel.nama_mapel}
                                            </td>
                                            <td className="px-6 py-4 border border-gray-300">
                                                {mapel.nilai || "-"}
                                            </td>
                                            <td className="px-6 py-4 border border-gray-300">
                                                {mapel.capaian_kompetensi ||
                                                    "-"}
                                            </td>
                                            <td className="px-6 py-4 border border-gray-300 text-center">
                                                <button
                                                    onClick={() =>
                                                        openAddOrEditModal(
                                                            s,
                                                            mapel
                                                        )
                                                    }
                                                    className={`px-3 py-1 text-white rounded-sm mx-1 ${
                                                        mapel.nilai ||
                                                        mapel.capaian_kompetensi
                                                            ? "bg-blue-600"
                                                            : "bg-green-600"
                                                    }`}
                                                >
                                                    {mapel.nilai ||
                                                    mapel.capaian_kompetensi
                                                        ? "Edit"
                                                        : "Add Nilai"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="bg-white border-b border-gray-300">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border border-gray-300">
                                            {s.nisn}
                                        </td>
                                        <td className="px-6 py-4 border border-gray-300">
                                            {s.nama}
                                        </td>
                                        <td
                                            className="px-6 py-4 border border-gray-300 text-center"
                                            colSpan={3}
                                        >
                                            Tidak ada data mata pelajaran
                                        </td>
                                        <td className="px-6 py-4 border border-gray-300 text-center">
                                            <button
                                                onClick={() =>
                                                    openAddOrEditModal(s, null)
                                                }
                                                className="bg-green-600 px-3 py-1 text-white rounded-sm mx-1"
                                            >
                                                Add Nilai
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                submitRoute={
                    selectedData?.nilai_id
                        ? "wali.nilai.update"
                        : "wali.nilai.store"
                }
                method={selectedData?.nilai_id ? "PUT" : "POST"} // Sesuaikan metode dengan rutenya
                id={selectedData?.nilai_id || null}
                initialData={{
                    siswa_id: selectedData?.siswa_id || "",
                    semester_id: selectedData?.semester_id || "",
                    mapel_id: selectedData?.mapel_id || "",
                    nilai: selectedData?.nilai || "",
                    capaian_kompetensi: selectedData?.capaian_kompetensi || "",
                }}
                fields={[
                    { name: "siswa_id", type: "hidden" },
                    { name: "semester_id", type: "hidden" },
                    { name: "mapel_id", type: "hidden" },
                    {
                        name: "nilai",
                        label: "Nilai",
                        type: "number",
                        min: 0,
                        max: 100,
                    },
                    {
                        name: "capaian_kompetensi",
                        label: "Capaian Kompetensi",
                        type: "text",
                    },
                ]}
            />
        </AuthenticatedLayout>
    );
};

export default Index;
