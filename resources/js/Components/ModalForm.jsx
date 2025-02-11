import React, { useEffect } from "react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";

const ModalForm = ({
    isOpen,
    onClose,
    fields,
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
            console.log("POST");
            
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
                            {method === "POST" ? "Tambah Data" : "Edit Data"}
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
                            {fields.map((field) => (
                                <div key={field.name}>
                                    <InputLabel
                                        htmlFor={field.name}
                                        value={field.label}
                                    />
                                    {field.type === "select" ? (
                                        <select
                                            id={field.name}
                                            name={field.name}
                                            value={data[field.name] || ""}
                                            onChange={(e) =>
                                                setData(
                                                    field.name,
                                                    e.target.value
                                                )
                                            }
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                                        >
                                            <option value="" disabled selected>
                                                {`Pilih ${field.label}`}
                                            </option>

                                            {field.options?.map((option) => (
                                                <option
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <TextInput
                                            id={field.name}
                                            type={field.type || "text"}
                                            name={field.name}
                                            value={data[field.name] || ""}
                                            autoComplete={field.name}
                                            onChange={(e) =>
                                                setData(
                                                    field.name,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    )}
                                </div>
                            ))}
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

export default ModalForm;
