import useRequest from '../useRequest/useRequest';
import { updatePassword } from '../../services/authService';

const useUpdatePassword = () => {
    const { loading, response, error, sendRequest } = useRequest();

    const handleUpdatePassword = ({ formState }: { formState: Record<string, string> }) => {
        const { old_password, new_password } = formState;

        sendRequest({
            requestCb: () => updatePassword({ old_password, new_password })
        });
    };

    return {
        handleUpdatePassword,
        response,
        loading,
        error
    };
};

export default useUpdatePassword;
