import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Profile: React.FC = () => {
    const { user, logout } = useAuth();

    if (!user) {
        return <p>No user logged in</p>;
    }

    return (
        <div>
            <p>Welcome, {user.email}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Profile;
