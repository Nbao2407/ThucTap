import { Outlet, Link } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="min-h-screen">
            <nav className="bg-white shadow-sm">
                <div className="mx-auto max-w-[2000px] px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex flex-shrink-0 items-center">
                                <span className="text-xl font-bold text-indigo-600">Quản lý sinh viên</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="py-10">
                <main>
                    <div className="mx-auto max-w-[2000px] sm:px-6 lg:px-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
    