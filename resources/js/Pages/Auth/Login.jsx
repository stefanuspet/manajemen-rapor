import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";


export default function Login() {
    const { data, setData, post, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    const user = usePage().props.auth.user;

    useEffect(() => {
        if (user) {
            if (user.role === "admin") {
                return window.location.replace(route("admin.dashboard"));
            } else if (user.role === "siswa") {
                return window.location.replace(route("siswa.dashboard"));
            } else if (user.role === "wali_kelas") {
                return window.location.replace(route("wali.dashboard"));
            } else if (user.role === "kepala_sekolah") {
                return window.location.replace(route("kepala.dashboard"));
            }
        }
    });

    return (
        <GuestLayout>
            <Head title="Log in" />

            <form onSubmit={submit} className="space-y-4 md:space-y-6">
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="email"
                        onChange={(e) => setData("email", e.target.value)}
                    />
                </div>
                <div>
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />
                </div>
                <InputError
                    className="text-center"
                    message={errors.email || errors.email}
                />
                <button
                    type="submit"
                    className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Login
                </button>
            </form>
        </GuestLayout>
    );
}
