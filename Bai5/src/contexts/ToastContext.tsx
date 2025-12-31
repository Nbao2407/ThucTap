import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
    action?: {
        label: string;
        onClick: () => void;
    };
    duration?: number;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType, action?: { label: string; onClick: () => void }, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'success', action?: { label: string; onClick: () => void }, duration = 3000) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type, action, duration }]);

        if (duration > 0) {
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, duration);
        }
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none items-center">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className="pointer-events-auto flex items-center gap-3 rounded-lg bg-[#1c1c1e] px-4 py-3 text-sm text-white shadow-lg animate-in slide-in-from-bottom-5 fade-in duration-300 min-w-[300px]"
                    >
                        {toast.type === 'success' && <CheckCircleIcon className="h-5 w-5 text-green-500" />}
                        {toast.type === 'error' && <XCircleIcon className="h-5 w-5 text-red-500" />}

                        <span className="flex-1 font-medium">{toast.message}</span>

                        {toast.action && (
                            <button
                                onClick={() => {
                                    toast.action?.onClick();
                                    removeToast(toast.id);
                                }}
                                className="ml-2 font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                {toast.action.label}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
