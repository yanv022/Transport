interface ToastProps {
    message: string;
    type?: 'success' | 'error';
    onClose: () => void;
}

const Toast = ({ message, type = 'success', onClose }: ToastProps) => {
    const color =
        type === 'success'
            ? 'bg-green-600'
            : 'bg-red-600';

    return (
        <div className="fixed top-5 right-5 z-50">
            <div className={`${color} text-white px-4 py-3 rounded shadow-lg`}>
                <div className="flex items-center justify-between gap-4">
                    <span>{message}</span>
                    <button onClick={onClose} className="font-bold">×</button>
                </div>
            </div>
        </div>
    );
};

export default Toast;
