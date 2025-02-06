import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import SidebarComp from "@/Components/SidebarComp";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    // console.log(user?.role);

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen flex bg-gray-100 font-poppins border">
            <SidebarComp />
            {/* Main Content */}
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}
