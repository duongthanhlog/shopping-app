import ConfirmModal from '@/components/ui/Confirm.modal'
import Modal from '@/components/ui/Modal'
import { useModal } from '../../../context/modal.context'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import ModalForm from './OrderForm'

export default function AuthModal() {
    const { type } = useModal()
    const renderForm = () => {
        switch (type) {
            case 'register':
                return <RegisterForm />
            case 'login':
                return <LoginForm />
            case 'confirm':
                return <ConfirmModal />
            case 'orders':
                return <ModalForm />
            default:
                return null
        }
    }

    return <Modal>{renderForm()}</Modal>
}
