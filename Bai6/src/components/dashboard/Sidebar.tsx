import {
    HomeIcon,
    CreditCardIcon,
    ChartBarIcon,
    Square3Stack3DIcon,
    ChatBubbleLeftIcon,
    QuestionMarkCircleIcon,
    Cog6ToothIcon,
    XMarkIcon,
    UserIcon,
} from '@heroicons/react/24/outline'

import logo from '../../assets/logo.svg'
import iconLogo from '../../assets/icon.svg'

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div className={`
                fixed left-0 top-0 z-50 h-screen bg-white border-r border-gray-100 flex flex-col transition-all duration-300 ease-in-out
                w-[288px] ${isOpen ? 'lg:w-[288px]' : 'lg:w-[80px]'}
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Logo */}
                <div className={`h-[96px] flex items-center ${isOpen ? 'justify-between px-8' : 'justify-center px-2'}`}>
                    {isOpen ? (
                        <img src={logo} alt="FinTrack Logo" className="h-10 w-auto" />
                    ) : (
                        <img src={iconLogo} alt="FinTrack Icon" className="h-10 w-10" />
                    )}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Menu */}
                <div className={`flex-1 overflow-y-auto py-6 scrollbar-hide ${isOpen ? 'px-6' : 'px-2'}`}>
                    <div className="mb-8">
                        <div className={`px-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 ${isOpen ? 'block' : 'hidden'}`}>Menu</div>
                        <nav className="space-y-2">
                            <a href="#" className={`flex items-center px-4 py-3 bg-steel-blue-600 text-white rounded-xl shadow-lg shadow-steel-blue-200 transition-all ${!isOpen && 'justify-center'}`}>
                                <HomeIcon className={`w-6 h-6 ${isOpen ? 'mr-3' : ''}`} />
                                <span className={`font-medium ${isOpen ? 'block' : 'hidden'}`}>Tổng quan</span>
                            </a>
                            <a href="#" className={`flex items-center px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-colors group ${!isOpen && 'justify-center'}`}>
                                <CreditCardIcon className={`w-5 h-5 ${isOpen ? 'mr-3' : ''} group-hover:text-steel-blue-600 transition-colors`} />
                                <span className={`font-medium ${isOpen ? 'block' : 'hidden'}`}>Thanh toán</span>
                                {isOpen && (
                                    <span className="ml-auto text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </span>
                                )}
                            </a>
                            <a href="#" className={`flex items-center px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-colors group ${!isOpen && 'justify-center'}`}>
                                <ChartBarIcon className={`w-5 h-5 ${isOpen ? 'mr-3' : ''} group-hover:text-steel-blue-600 transition-colors`} />
                                <span className={`font-medium ${isOpen ? 'block' : 'hidden'}`}>Phân tích</span>
                            </a>
                            <a href="#" className={`flex items-center px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-colors group ${!isOpen && 'justify-center'}`}>
                                <Square3Stack3DIcon className={`w-5 h-5 ${isOpen ? 'mr-3' : ''} group-hover:text-steel-blue-600 transition-colors`} />
                                <span className={`font-medium ${isOpen ? 'block' : 'hidden'}`}>Dịch vụ</span>
                            </a>
                            <a href="#" className={`flex items-center px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-colors group justify-between ${!isOpen && 'justify-center'}`}>
                                <div className="flex items-center">
                                    <ChatBubbleLeftIcon className={`w-5 h-5 ${isOpen ? 'mr-3' : ''} group-hover:text-steel-blue-600 transition-colors`} />
                                    <span className={`font-medium ${isOpen ? 'block' : 'hidden'}`}>Tin nhắn</span>
                                </div>
                            </a>
                        </nav>
                    </div>

                    <div>
                        <div className={`px-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 ${isOpen ? 'block' : 'hidden'}`}>Hỗ trợ</div>
                        <nav className="space-y-2">
                            <a href="#" className={`flex items-center px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-colors group ${!isOpen && 'justify-center'}`}>
                                <QuestionMarkCircleIcon className={`w-5 h-5 ${isOpen ? 'mr-3' : ''} group-hover:text-steel-blue-600 transition-colors`} />
                                <span className={`font-medium ${isOpen ? 'block' : 'hidden'}`}>Trợ giúp</span>
                            </a>
                            <a href="#" className={`flex items-center px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-colors group ${!isOpen && 'justify-center'}`}>
                                <Cog6ToothIcon className={`w-5 h-5 ${isOpen ? 'mr-3' : ''} group-hover:text-steel-blue-600 transition-colors`} />
                                <span className={`font-medium ${isOpen ? 'block' : 'hidden'}`}>Cài đặt</span>
                            </a>
                        </nav>
                    </div>
                </div>

                {/* Profile Section */}
                <div className={`border-t border-gray-100 mt-auto ${isOpen ? 'p-6' : 'p-2 py-6'}`}>
                    <div className={`flex items-center group cursor-pointer hover:bg-gray-50 rounded-xl transition-all ${isOpen ? 'p-4' : 'justify-center p-2'}`}>
                        <div className="relative shrink-0">
                            <div className="absolute inset-0 bg-steel-blue-100 rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <UserIcon
                                className="relative h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm"
                            />
                        </div>
                        {isOpen && (
                            <div className="ml-3 overflow-hidden">
                                <p className="text-sm font-bold text-gray-800 group-hover:text-steel-blue-600 transition-colors truncate">Trần Văn A</p>
                                <p className="text-xs text-gray-500 font-medium truncate">Trợ lý</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
