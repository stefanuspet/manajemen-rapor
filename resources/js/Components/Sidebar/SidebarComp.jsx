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
        <aside className="w-60 bg-blue-600 text-white shadow-md">
            <div className="p-4">
                <h2 className="text-lg font-semibold">SMK Muh Denpasar</h2>
            </div>

            <ul className="space-y-2 pt-5">
                <li className="px-4 py-2 text-md gap-4 flex items-center hover:bg-gray-200 cursor-pointer">
                    <RxDashboard className="text-lg text-sky-500" />
                    Dashboard
                </li>
                <li className="px-4 py-2 text-sm gap-4 flex items-center hover:bg-gray-200 ">
                    <FaChalkboardTeacher className="text-lg text-sky-500" />
                    Guru
                </li>
                <li className="px-4 py-2 text-sm gap-4 flex items-center hover:bg-gray-200 ">
                    <PiStudentFill className="text-lg text-sky-500" />
                    Siswa
                </li>
                <li className="px-4 py-2 text-sm gap-4 flex items-center hover:bg-gray-200 ">
                    <SiGoogleclassroom className="text-lg text-sky-500" />
                    Kelas
                </li>
                <li className="px-4 py-2 text-sm gap-4 flex items-center hover:bg-gray-200 ">
                    <MdOutlineSportsBasketball className="text-lg text-sky-500" />
                    Extra
                </li>
                <li className="px-4 py-2 text-sm gap-4 flex items-center hover:bg-gray-200 ">
                    <CiCalendar className="text-lg text-sky-500" />
                    Semester
                </li>
                <li className="px-4 py-2 text-sm gap-4 flex items-center hover:bg-gray-200 ">
                    <LuUniversity className="text-lg text-sky-500" />
                    Jurusan
                </li>
            </ul>
        </aside>
    );
};

export default SidebarComp;
