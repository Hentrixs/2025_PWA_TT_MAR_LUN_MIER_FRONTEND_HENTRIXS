import './Modal.css';

interface ModalProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    width?: string;
}

const Modal = ({ title, onClose, children, width }: ModalProps) => {
    return (
        <div className="modal-overlay">
            <div className="modal-container" style={width ? { width } : {}}>
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button onClick={onClose} className="close-btn">X</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
