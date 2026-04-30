import { useTranslation } from '../../context/LanguageContext/LanguageContext';
import Modal from '../Modal/Modal';
import './ConfirmationModal.css';

interface ConfirmationModalProps {
    title: string;
    message: string;
    confirmText: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    isDanger?: boolean;
}

const ConfirmationModal = ({
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    isDanger = false
}: ConfirmationModalProps) => {
    const { t } = useTranslation();
    const finalCancelText = cancelText || t.common.cancel;

    return (
        <Modal title={title} onClose={onCancel} width="400px">
            <div className="confirmation-modal-content">
                <p className='confirmation-message'>{message}</p>
                <div className="confirmation-modal-actions">
                    <button className="secondary-btn" onClick={onCancel}>{finalCancelText}</button>
                    <button className={isDanger ? 'delete-btn' : 'primary-btn'} onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
