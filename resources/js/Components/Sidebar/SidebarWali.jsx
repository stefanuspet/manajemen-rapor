import React from "react";
import { RxDashboard } from "react-icons/rx";
import { PiStudentFill } from "react-icons/pi";
import { FaBook, FaChalkboardTeacher } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

const SidebarWali = () => {
    const location = window.location.pathname;

    const isDashboard = location === "/wali/dashboard";
    const isGuru = location === "/wali/nilai";
    const isextra = location === "/wali/extra";
    const isAbsensi = location === "/wali/absensi";
    const isSiswa = location === "/wali/rapor";
    return (
        <aside className="w-60 bg-blue-800 text-white shadow-md">
            <div className="p-5">
                <h2 className="text-xl font-bold">SMK Muh Denpasar</h2>
            </div>

            <ul className="space-y-2 pt-5">
                <a href="/wali/dashboard">
                    <li
                        className={`px-4 py-2 text-lg gap-4 flex items-center hover:bg-blue-600 cursor-pointer ${
                            isDashboard ? " bg-blue-600" : "bg-transparent"
                        }`}
                    >
                        <RxDashboard className="text-xl text-white" />
                        Dashboard
                    </li>
                </a>
                <a href="/wali/absensi">
                    <li
                        className={`px-4 py-2 text-lg gap-4 flex items-center hover:bg-blue-600 cursor-pointer ${
                            isAbsensi ? "bg-blue-600" : "bg-transparent"
                        }`}
                    >
                        <FaChalkboardTeacher className="text-xl text-white" />
                        Absensi
                    </li>
                </a>
                <a href="/wali/nilai">
                    <li
                        className={`px-4 py-2 text-lg gap-4 flex items-center hover:bg-blue-600 cursor-pointer ${
                            isGuru ? "bg-blue-600" : "bg-transparent"
                        }`}
                    >
                        <FaChalkboardTeacher className="text-xl text-white" />
                        Upload Nilai
                    </li>
                </a>
                <a href="/wali/extra">
                    <li
                        className={`px-4 py-2 text-lg gap-4 flex items-center hover:bg-blue-600 cursor-pointer ${
                            isextra ? "bg-blue-600" : "bg-transparent"
                        }`}
                    >
                        <FaChalkboardTeacher className="text-xl text-white" />
                        upload Nilai Extra
                    </li>
                </a>
                <a href="/wali/rapor">
                    <li
                        className={`px-4 py-2 text-lg gap-4 flex items-center hover:bg-blue-600 cursor-pointer ${
                            isSiswa ? "bg-blue-600" : "bg-transparent"
                        }`}
                    >
                        <PiStudentFill className="text-xl text-white" />
                        Rapor
                    </li>
                </a>

                <a href="/logout">
                    <li className="px-4 py-2 text-lg gap-4 flex items-center hover:bg-blue-600 ">
                        <MdLogout className="text-xl text-white" />
                        Logout
                    </li>
                </a>
            </ul>
        </aside>
    );
};

export default SidebarWali;
