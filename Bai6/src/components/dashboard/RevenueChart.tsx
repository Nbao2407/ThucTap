import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const data = [
    { name: 'T1', revenue: 18, expenses: 10 },
    { name: 'T2', revenue: 25, expenses: 20 },
    { name: 'T3', revenue: 22, expenses: 16 },
    { name: 'T4', revenue: 26, expenses: 20 },
    { name: 'T5', revenue: 20, expenses: 24 },
    { name: 'T6', revenue: 28, expenses: 20 },
    { name: 'T7', revenue: 32, expenses: 22 },
    { name: 'T8', revenue: 29, expenses: 21 },
    { name: 'T9', revenue: 25, expenses: 24 },
    { name: 'T10', revenue: 30, expenses: 22 },
    { name: 'T11', revenue: 28, expenses: 24 },
    { name: 'T12', revenue: 28, expenses: 24 },
];

export default function RevenueChart() {
    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm shadow-gray-100 h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-gray-800 text-lg">Doanh thu và Chi phí theo thời gian</h3>
                <div className="bg-gray-50 pl-3 pr-2 py-1.5 rounded-lg border border-gray-100 text-xs font-semibold text-gray-500 cursor-pointer hover:bg-gray-100 transition-colors flex items-center gap-1">
                    Tuần này <ChevronDownIcon className="w-3 h-3" strokeWidth={3} />
                </div>
            </div>

            <div className="flex-1 w-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: '#94a3b8' }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: '#94a3b8' }}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend
                            verticalAlign="top"
                            height={36}
                            align="right"
                            iconType="circle"
                            formatter={(value) => <span className="text-gray-500 font-medium text-xs ml-1">{value}</span>}
                        />
                        <Area
                            name="Doanh thu"
                            type="monotone"
                            dataKey="revenue"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                        />
                        <Area
                            name="Chi phí"
                            type="monotone"
                            dataKey="expenses"
                            stroke="#ef4444"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorExpenses)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
