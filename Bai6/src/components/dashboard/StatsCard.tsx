import React from 'react';

interface StatsCardProps {
    title: string;
    value: string;
    change: string;
    isPositive?: boolean;
    variant?: 'primary' | 'default';
    icon: React.ReactNode;
}

export default function StatsCard({ title, value, change, isPositive = true, variant = 'default', icon }: StatsCardProps) {
    const isPrimary = variant === 'primary';

    return (
        <div className={`p-6 rounded-3xl shadow-sm transition-transform hover:scale-[1.02] duration-300 ${isPrimary ? 'bg-steel-blue-600 text-white shadow-steel-blue-200' : 'bg-white text-gray-900 shadow-gray-100'}`}>
            <div className="flex justify-between items-start mb-6">
                <span className={`text-sm font-semibold ${isPrimary ? 'text-steel-blue-100' : 'text-gray-500'}`}>{title}</span>
                <div className={`p-2.5 rounded-xl backdrop-blur-sm ${isPrimary ? 'bg-white/20' : 'bg-gray-50 text-gray-400'}`}>
                    {icon}
                </div>
            </div>

            <div className="mb-2">
                <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
            </div>

            <div className={`text-xs font-semibold flex items-center gap-2 ${isPrimary ? 'text-steel-blue-100' : ''}`}>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full ${isPrimary ? 'bg-white/20 text-white' : (isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600')}`}>
                    {isPositive ? '↑' : '↓'} {change}
                </span>
                <span className={isPrimary ? 'opacity-80' : 'text-gray-400'}>Tháng này</span>
            </div>
        </div>
    )
}
