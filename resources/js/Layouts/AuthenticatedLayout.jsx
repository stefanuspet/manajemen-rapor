import SidebarAdmin from "@/Components/Sidebar/SidebarAdmin";
import SidebarComp from "@/Components/Sidebar/SidebarComp";
import SidebarKepala from "@/Components/Sidebar/SidebarKepala";
import SidebarSiswa from "@/Components/Sidebar/SidebarSiswa";
import SidebarWali from "@/Components/Sidebar/SidebarWali";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);


    return (
        <div className="bg-white">
            <div className="flex h-screen overflow-hidden">
                {user?.role === "admin" ? (
                    <SidebarAdmin />
                ) : user?.role === "siswa" ? (
                    <SidebarSiswa />
                ) : user?.role === "wali_kelas" ? (
                    <SidebarWali />
                ) : user?.role === "kepala_sekolah" ? (
                    <SidebarKepala />
                ) : null}
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <header className="bg-blue-800 text-white border-l-[0.5px] border-blue-500 shadow-md">
                        <div className="container mx-auto max-w-screen-2xl p-4 md:p-4 2xl:p-10">
                            <h1 className="text-2xl font-semibold">
                                Welcome {user?.role}
                            </h1>
                        </div>
                    </header>
                    <main>
                        <div className="container mx-auto max-w-screen-2xl p-4 md:p-10 2xl:p-16">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
