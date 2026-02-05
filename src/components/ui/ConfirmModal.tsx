import React from 'react';

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmColor?: 'red' | 'blue';
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
                                                       isOpen,
                                                       title,
                                                       message,
                                                       confirmLabel = 'Confirmer',
                                                       cancelLabel = 'Annuler',
                                                       confirmColor = 'blue',
                                                       onConfirm,
                                                       onCancel,
                                                   }) => {
    if (!isOpen) return null;

    const confirmBtnClass =
        confirmColor === 'red'
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-blue-600 hover:bg-blue-700';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h2 className="text-lg font-bold mb-3">{title}</h2>

                <p className="text-gray-600 mb-6">{message}</p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                        {cancelLabel}
                    </button>

                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 rounded text-white ${confirmBtnClass}`}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
