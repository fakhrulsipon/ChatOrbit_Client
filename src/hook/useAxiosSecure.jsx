
import { use } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { AuthContext } from '../Provider/Provider';


const axiosSecure = axios.create({
  baseURL: 'https://chatorbit-server.vercel.app',
  withCredentials: true,
});
 
const useAxiosSecure = () => {
  const { logOut } = use(AuthContext);
  const navigate = useNavigate();

  axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        // console.log('intercepter error', error)
        const status = error.status;
        if (status === 403) {
            navigate('/forbidden');
        }
        else if (status === 401) {
            logOut()
                .then(() => {
                    navigate('/login')
                })
                .catch(() => { })
        }

        return Promise.reject(error);
    })


    return axiosSecure;
};

export default useAxiosSecure;
