import { use } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../Provider/Provider';
import useUserRole from '../hook/useUserRole';

const AdminRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if (!user || role !== 'admin') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
};

export default AdminRoute;