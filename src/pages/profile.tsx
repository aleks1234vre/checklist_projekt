import axios from "axios";
import { useEffect, useState } from "react";

const NotesProfile = () => {
    const [profileData, setProfileData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        phone_number: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("http://localhost:3000/auth/profile", { withCredentials: true });
                setProfileData(response.data);
                setLoading(false);
            } catch (error) {
                // Handle error
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profileData) {
        return <div>Error occurred while fetching profile data.</div>;
    }

    return (
        <div>
            <h2>Profile</h2>
            <p>Name: {profileData.first_name}</p>
            <p>Last Name: {profileData.last_name}</p>
            <p>Email: {profileData.email}</p>
            <p>Address: {profileData.address}</p>
            <p>Phone number: {profileData.phone_number}</p>

        </div>
    );
};

export default NotesProfile;