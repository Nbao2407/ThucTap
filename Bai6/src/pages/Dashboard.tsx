import { useState } from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import Header from '../components/dashboard/Header'
import StatsCard from '../components/dashboard/StatsCard'
import RevenueChart from '../components/dashboard/RevenueChart'
import ClientTransactionTable from '../components/dashboard/ClientTransactionTable'

import { WalletIcon, ArrowTrendingDownIcon, CurrencyDollarIcon, BanknotesIcon } from '@heroicons/react/24/outline'

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <div className="bg-[#f8fafc] min-h-screen font-sans text-slate-900 selection:bg-steel-blue-100 selection:text-steel-blue-900">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <div className={`relative transition-all duration-300 ease-in-out ${sidebarOpen ? 'lg:pl-[288px]' : 'lg:pl-[80px]'}`}>
                <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

                <main className="p-4 lg:p-8 pt-24 full-width- mx-auto">
                    <div className="grid grid-cols-12 gap-4">
                        {/* Left Column */}
                        <div className="col-span-12 flex flex-col gap-4">
                            {/* Cards Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                                <StatsCard
                                    title="Tổng doanh thu"
                                    value="$689"
                                    change="15%"
                                    isPositive={true}
                                    variant="default"
                                    icon={<WalletIcon className="w-6 h-6 text-steel-blue-600" />}
                                />
                                <StatsCard
                                    title="Tổng chi phí"
                                    value="$460"
                                    change="15%"
                                    isPositive={false}
                                    icon={<ArrowTrendingDownIcon className="w-6 h-6" />}
                                />
                                <StatsCard
                                    title="Lợi nhuận mới"
                                    value="$840"
                                    change="17%"
                                    isPositive={true}
                                    icon={<CurrencyDollarIcon className="w-6 h-6 text-steel-blue-600" />}
                                />
                                <StatsCard
                                    title="Số dư tiền mặt"
                                    value="$568"
                                    change="2%"
                                    isPositive={true}
                                    icon={<BanknotesIcon className="w-6 h-6 text-steel-blue-600" />}
                                />
                            </div>

                            {/* Revenue Chart */}
                            <div className="flex-1">
                                <RevenueChart />
                            </div>

                            {/* Client Transaction Table */}
                            <div className="flex-1">
                                <ClientTransactionTable />
                            </div>
                        </div>


                    </div>
                </main>
            </div>
        </div>
    )
}
