export default function GuestLayout({ children }) {
    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-20">
                <img
                    src="/images/logo.png"
                    alt="logo"
                    className="w-28 h-28 mb-8"
                />
                <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className="text-center">
                            <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
                                SMK Muhammadiyah Denpasar
                            </h1>
                            <h1 className="text-xl font-thin text-gray-900 md:text-sm">
                                Sistem Informasi Manajemen Rapor
                            </h1>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
}
