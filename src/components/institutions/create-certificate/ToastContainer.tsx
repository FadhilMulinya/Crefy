// components/ToastContainer.tsx
import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
}

interface ToastContainerProps {
    position?: 'bottom-right' | 'top-right' | 'bottom-left' | 'top-left';
}

const ToastContainer: React.FC<ToastContainerProps> = ({
    position = 'bottom-right'
}) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    // Position classes
    const positionClasses = {
        'bottom-right': 'bottom-4 right-4',
        'top-right': 'top-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'top-left': 'top-4 left-4',
    };

    useEffect(() => {
        // Subscribe to toast events
        const handleToast = (event: CustomEvent<Toast>) => {
            const newToast = event.detail;
            setToasts(prev => [...prev, { ...newToast, id: Date.now().toString() }]);
        };

        // Add event listener
        window.addEventListener('toast' as any, handleToast as EventListener);

        // Cleanup
        return () => {
            window.removeEventListener('toast' as any, handleToast as EventListener);
        };
    }, []);

    // Remove toast after duration
    useEffect(() => {
        if (toasts.length > 0) {
            const timer = setTimeout(() => {
                setToasts(prev => prev.slice(1));
            }, toasts[0].duration || 5000);

            return () => clearTimeout(timer);
        }
    }, [toasts]);

    // Remove a specific toast
    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    // Get icon based on toast type
    const getIcon = (type: ToastType) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'error':
                return <AlertCircle className="w-5 h-5 text-red-500" />;
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
            case 'info':
                return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    // Get background color based on toast type
    const getBgColor = (type: ToastType) => {
        switch (type) {
            case 'success':
                return 'bg-green-500/10 border-green-500/20';
            case 'error':
                return 'bg-red-500/10 border-red-500/20';
            case 'warning':
                return 'bg-yellow-500/10 border-yellow-500/20';
            case 'info':
                return 'bg-blue-500/10 border-blue-500/20';
        }
    };

    return (
        <div className={`fixed ${positionClasses[position]} z-50 flex flex-col gap-2 w-full max-w-sm`}>
            {toasts.map(toast => (
                <div
                    key={toast.id}
                    className={`flex items-center p-4 rounded-lg border ${getBgColor(toast.type)} text-white shadow-lg animate-slideIn`}
                    role="alert"
                >
                    <div className="mr-3">
                        {getIcon(toast.type)}
                    </div>
                    <div className="mr-2 flex-1">{toast.message}</div>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
};

// Toast utility function to display toasts
const toast = {
    show: (message: string, type: ToastType = 'info', duration: number = 5000) => {
        const event = new CustomEvent('toast', {
            detail: { message, type, duration }
        });
        window.dispatchEvent(event);
    },
    success: (message: string, duration?: number) => {
        toast.show(message, 'success', duration);
    },
    error: (message: string, duration?: number) => {
        toast.show(message, 'error', duration);
    },
    info: (message: string, duration?: number) => {
        toast.show(message, 'info', duration);
    },
    warning: (message: string, duration?: number) => {
        toast.show(message, 'warning', duration);
    }
};

export { ToastContainer, toast };