import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import classes from '../styles/Account.module.css';

export default function Account() {
    const { currentUser, logout } = useAuth();
    function handleLogout() {
        logout();
        <Navigate to="/login" />;
    }
    return (
        <div className={classes.account}>
            {currentUser ? (
                <>
                    <span className="material-icons-outlined" title="Account">
                        account_circle
                    </span>
                    <span>{currentUser.displayName}</span>
                    <span className="material-icons-outlined" title="Logout" onClick={handleLogout}>
                        logout
                    </span>
                </>
            ) : (
                <>
                    <Link to="/signup">Signup</Link>
                    <Link to="/login">Login</Link>
                </>
            )}
        </div>
    );
}
