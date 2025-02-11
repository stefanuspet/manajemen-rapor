import React from "react";
import { RxDashboard } from "react-icons/rx";
import { PiStudentFill } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlineSportsBasketball } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { FaBook, FaChalkboardTeacher } from "react-icons/fa";
import { LuUniversity } from "react-icons/lu";
import { MdLogout } from "react-icons/md";

const SidebarAdmin = () => {
    const location = window.location.pathname;

    const isDashboard = location === "/admin/dashboard";
    const isGuru = location === "/admin/guru";
    const isSiswa = location === "/admin/siswa";
    const isKelas = location === "/admin/kelas";
    const isExtra = location === "/admin/extra";
    const isSemester = location === "/admin/semester";
    const isJurusan = location === "/admin/jurusan";
    const isMapel = location === "/admin/mapel";
    return (
        <aside className="w-60 bg-blue-800 text-white shadow-md">
            <div className="p-5">
                <h2 className="text-xl font-bold">SMK Muh Denpasar</h2>
            </div>

            <ul className="space-y-2 pt-5">
                <a href="/admin/dashboard">
                    <li
                        className={`px-4 py-2 text-lg gap-4 flex items-center hover:bg-blue-600 cursor-pointer ${
                            isDashboard ? " bg-blue-600" : "bg-transparent"
                        }`}
                    >
                        <RxDashboard className="text-xl text-white" />
                        Dashboard
                    </li>
                </a>
                <a href="/admin/guru">
                    <li
                        className={`px-4 py-2 text-lg gap-4 flex items-center hover:bg-blue-600 cursor-pointer ${
                            isGuru ? "bg-blue-600" : "bg-transparent"
                        }`}
                    >
                        <FaChalkboardTeacher className="text-xl text-white" />
                        Guru
                    </li>
                </a>
                <a href="/admin/siswa">
                    <li
                        className={`px-4 py-2 text-lg gap-4 flex items-center hover:bg-blue-600 cursor-pointer ${
                            isSiswa ? "bg-blue-600" : "bg-transparent"
                        }`}
                    >
                        <PiStudentFill className="text-xl text-white" />
                        Siswa
                    </li>
                </a>
                <a href="/admin/kelas">
                    <li
                        className={`px-4 py-2 text-lg gap-4 flex items-center hover:bg-blue-600 cursor-pointer ${
                            isKelas ? "bg-blue-600" : "bg-transparent"
                        }`}
                    >
                        <SiGoogleclassroom className="text-xl text-white" />
                        Kelas
                    </li>
                </a>
                <a href="/admin/extra">
                    <li
                        className={`px-4 py-2 text-lg gap-4 flex items-center hover:bg-blue-600 cursor-pointer ${
                            isExtra ? "bg-blue-600" : "bg-transparent"
                        }`}
                    >
                        <MdOutlineSportsBasketball className="text-xl text-white" />
                        Extra
                    </li>
                </a>
                <a href="/admin/semester">
                    <li
                        className={`px-4 py-2 text-lg gap-4 flex items-center hover:bg-blue-600 cursor-pointer ${
                            isSemester ? "bg-blue-600" : "bg-transparent"
                        }`}
                    >
                        <CiCalendar className="text-xl text-white" />
                        Semester
                    </li>
                </a>
                <a href="/admin/jurusan">
                    <li
                        className={`px-4 py-2 text-lg gap-4 flex items-center hover:bg-blue-600 cursor-pointer ${
                            isJurusan ? "bg-blue-600" : "bg-transparent"
                        }`}
                    >
                        <LuUniversity className="text-xl text-white" />
                        Jurusan
                    </li>
                </a>
                <a href="/admin/mapel">
                    <li
                        className={`px-4 py-2 text-lg gap-4 flex items-center hover:bg-blue-600 cursor-pointer ${
                            isMapel ? "bg-blue-600" : "bg-transparent"
                        }`}
                    >
                        <FaBook className="text-xl text-white" />
                        Mapel
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

export default SidebarAdmin;
