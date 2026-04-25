import useRequest from '../useRequest/useRequest';
import { updateProfile } from '../../services/authService';

function useUpdateProfile() {
    const { loading, response, error, sendRequest } = useRequest();

    const handleUpdateProfile = (formState: Record<string, string>) => {
        const { name, description } = formState;

        sendRequest({
            requestCb: () => updateProfile({ name, description })
        });
    };

    return {
        handleUpdateProfile,
        response,
        loading,
        error
    }
};


export default useUpdateProfile;