import React, { useEffect } from "react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import { useForm } from "@inertiajs/react";

const ModalGuru = ({
    isOpen,
    onClose,
    initialData,
    submitRoute,
    method = "POST",
    id = null,
}) => {
    const { data, setData, post, put, reset } = useForm(initialData);

    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    const submit = (e) => {
        e.preventDefault();

        if (method === "POST") {
            post(route(submitRoute), {
                onFinish: () => {
                    reset();
                    onClose();
                },
            });
        } else if (method === "PUT") {
            put(route(submitRoute, id), {
                onFinish: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-between p-4 border-b">
                        <h3 className="text-xl font-semibold text-gray-900">
                            {method === "POST"
                                ? "Tambah Wali Kelas"
                                : "Edit Wali Kelas"}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
                        >
                            ✖
                        </button>
                    </div>
                    <div className="p-4">
                        <form className="space-y-4" onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email || ""}
                                    autoComplete="email"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password || ""}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                            </div>
                            <input
                                type="hidden"
                                name="role"
                                value="wali_kelas"
                            />
                            <TextInput
                                id="guru_id"
                                type="hidden"
                                name="guru_id"
                                value={id}
                                onChange={(e) =>
                                    setData("guru_id", e.target.value)
                                }
                            />

                            <button
                                type="submit"
                                className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                {method === "POST" ? "Tambah" : "Update"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalGuru;
