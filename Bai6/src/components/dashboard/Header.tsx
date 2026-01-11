import { MagnifyingGlassIcon, BellIcon, Bars3Icon } from '@heroicons/react/24/outline'

interface HeaderProps {
    onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
    return (
        <header className="h-[96px] sticky top-0 z-40 px-4 lg:px-8 flex items-center justify-between bg-[#f8fafc]/80 backdrop-blur-md transition-all duration-200">
            <div className="flex items-center gap-2 lg:gap-4 flex-1">
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg shrink-0"
                >
                    <Bars3Icon className="w-6 h-6" />
                </button>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 whitespace-nowrap truncate">
                    Quản lý <span className="text-slate-900 hidden sm:inline">Tài chính</span>
                    <span className="sm:hidden text-slate-900">TC</span>
                </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 shrink-0">
                {/* Search - Mobile: Icon only, Desktop: Input */}
                <div className="relative group">
                    <div className="md:hidden">
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                            <MagnifyingGlassIcon className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="hidden md:block relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 group-focus-within:text-steel-blue-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="block w-64 lg:w-80 pl-11 pr-4 py-3 border-none rounded-2xl bg-gray-100/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-steel-blue-100 focus:bg-white transition-all sm:text-sm"
                            placeholder="Tìm kiếm"
                        />
                    </div>
                </div>

                {/* Notifications */}
                <button className="p-2 text-gray-400 hover:text-gray-600 relative transition-colors">
                    <BellIcon className="w-6 h-6" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>
            </div>
        </header>
    )
}

export default Header
