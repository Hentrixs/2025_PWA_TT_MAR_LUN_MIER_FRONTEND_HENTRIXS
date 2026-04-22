import { useEffect } from 'react';
import useRequest from '../useRequest/useRequest';
import { getProfile } from '../../services/authService';

const useGetProfile = () => {
    const { loading, response, error, sendRequest } = useRequest();

    const fetchProfile = () => {
        sendRequest({
            requestCb: () => getProfile()
        });
    };

    useEffect(() => {
        fetchProfile();
    }, []); // Only fetch once on mount

    return {
        profile: response?.data,
        loading,
        error,
        refetchProfile: fetchProfile
    };
};

export default useGetProfile;
