import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Index = ({ extras }) => {
    const { flash } = usePage().props;

    // State untuk menyimpan data yang akan dikirim
    const { data, setData, post, processing, reset } = useForm({
        extra_id: "",
    });

    console.log(extras);

    useEffect(() => {
        if (flash.success || flash.error) {
            toast[flash.success ? "success" : "error"](
                flash.success || flash.error
            );
        }
    }, [flash]);

    // Fungsi untuk langsung mengirimkan data ketika tombol "Daftar Extra" ditekan
    const handleRegisterExtra = (extraId) => {
        console.log("extraId sebelum post:", extraId);

        post(route("siswa.extra.store", { id: extraId }), {
            onSuccess: () => {
                toast.success("Berhasil mendaftar ekstra!");
                reset();
            },
            onError: (errors) => {
                console.error("Errors:", errors);
                toast.error("Gagal mendaftar ekstra.");
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <div className="flex items-center justify-between pb-5">
                <h1 className="text-2xl font-bold">Pendaftaran Extra</h1>
            </div>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right bg-gray-50">
                    <thead className="text-md">
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
                                    <button
                                        onClick={() =>
                                            handleRegisterExtra(extra.id)
                                        }
                                        disabled={
                                            extra.is_registered || processing
                                        }
                                        className={`${
                                            extra.is_registered
                                                ? "bg-gray-500 cursor-not-allowed"
                                                : "bg-sky-500"
                                        } px-3 py-1 text-white rounded-sm`}
                                    >
                                        {extra.is_registered
                                            ? "Sudah Terdaftar"
                                            : processing
                                            ? "Mendaftar..."
                                            : "Daftar Extra"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
