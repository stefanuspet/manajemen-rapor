import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import foto from "../../../public/images/gradient-international-day-education-background_23-2151120677.avif";

export default function GuestLayout({ children }) {
    return (
        <div className="flex justify-center min-h-screen items-center bg-gray-200 pt-6 sm:justify-center sm:pt-0">
            <div className="w-[32rem] overflow-hidden px-6 py-4 bg-white rounded-lg">
                <h1 className="text-3xl font-bold">Hello,</h1>
                <h1 className="text-3xl font-bold pb-10">Welcome Back</h1>
                {children}
            </div>
        </div>
    );
}
