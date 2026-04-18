import Modal from "../Modal/Modal";
import './InviteMemberModal.css';

interface InviteMemberModalProps {
    onClose: () => void
}

const InviteMemberModal = ({ onClose }: InviteMemberModalProps) => {
    return (
        <Modal title="Invitar personas" onClose={onClose}>
            <div className='invite-member-form'>
                <p>Envía una invitación a tus colegas.</p>
                <input type="email" placeholder="email@example.com" />
                <select>
                    <option value="member">Miembro</option>
                    <option value="admin">Administrador</option>
                </select>
                <button>Enviar Invitación</button>
            </div>
        </Modal>
    )
};

export default InviteMemberModal;

