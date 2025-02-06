import React from "react";
import { RxDashboard } from "react-icons/rx";
import { PiStudentFill } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlineSportsBasketball } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { FaChalkboardTeacher } from "react-icons/fa";
import { LuUniversity } from "react-icons/lu";

const SidebarComp = () => {
    return (
        <aside className="w-52 bg-white shadow-md border">
            <h2 className="text-md font-semibold mb-4 p-4">SMK MUH Denpasar</h2>
            <ul className="space-y-2">
                <li className="px-4 py-2 text-sm gap-4 flex items-center hover:bg-gray-200 border-l-2 border-blue-500 cursor-pointer">
                    <RxDashboard className="text-lg text-sky-500" />
                    Dashboard
                </li>
                <li className="px-4 py-2 text-sm gap-4 flex items-center hover:bg-gray-200 border-l-2 ">
                    <FaChalkboardTeacher className="text-lg text-sky-500" />
                    Guru
                </li>
                <li className="px-4 py-2 text-sm gap-4 flex items-center hover:bg-gray-200 border-l-2 ">
                    <PiStudentFill className="text-lg text-sky-500" />
                    Siswa
                </li>
                <li className="px-4 py-2 text-sm gap-4 flex items-center hover:bg-gray-200 border-l-2 ">
                    <SiGoogleclassroom className="text-lg text-sky-500" />
                    Kelas
                </li>
                <li className="px-4 py-2 text-sm gap-4 flex items-center hover:bg-gray-200 border-l-2 ">
                    <MdOutlineSportsBasketball className="text-lg text-sky-500" />
                    Extra
                </li>
                <li className="px-4 py-2 text-sm gap-4 flex items-center hover:bg-gray-200 border-l-2 ">
                    <CiCalendar className="text-lg text-sky-500" />
                    Semester
                </li>
                <li className="px-4 py-2 text-sm gap-4 flex items-center hover:bg-gray-200 border-l-2 ">
                    <LuUniversity className="text-lg text-sky-500" />
                    Jurusan
                </li>
            </ul>
        </aside>
    );
};

export default SidebarComp;
