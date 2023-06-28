import axios from "axios";
import { useEffect, useState } from "react";

const NotesProfile = () => {
    const [profileData, setProfileData] = useState({
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        phone_number: ""
    });
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProfileData, setUpdatedProfileData] = useState({
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        phone_number: ""
    });

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

    const handleEdit = () => {
        setUpdatedProfileData({
            ...profileData,
            id: profileData.id // Include the id field
        });
        setIsEditing(true);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUpdatedProfileData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            console.log(updatedProfileData.address)
            console.log(updatedProfileData.phone_number)
            await axios.patch(`http://localhost:3000/users/${updatedProfileData.id}`, updatedProfileData, { withCredentials: true });

            setProfileData(updatedProfileData);
            setIsEditing(false);
            console.log("Profile updated successfully");

        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setUpdatedProfileData(profileData);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profileData) {
        return <div>Error occurred while fetching profile data.</div>;
    }

    return (
        <div>
            <h2>Profile</h2>
            <p>
        <span style={{ marginRight: '20px' }}>
          Name:{" "}
            {isEditing ? (
                <input
                    type="text"
                    name="first_name"
                    value={updatedProfileData.first_name}
                    onChange={handleInputChange}
                />
            ) : (
                profileData.first_name
            )}
        </span>
                {!isEditing && (
                    <button className="button_small" onClick={handleEdit}>
                        Edit
                    </button>
                )}
            </p>
            <p>
                Last Name:{" "}
                {isEditing ? (
                    <input
                        type="text"
                        name="last_name"
                        value={updatedProfileData.last_name}
                        onChange={handleInputChange}
                    />
                ) : (
                    profileData.last_name
                )}
            </p>
            <p>Email: {profileData.email}</p>
            <p>
                Address:{" "}
                {isEditing ? (
                    <input
                        type="text"
                        name="address"
                        value={updatedProfileData.address}
                        onChange={handleInputChange}
                    />
                ) : (
                    profileData.address
                )}
            </p>
            <p>
                Phone number:{" "}
                {isEditing ? (
                    <input
                        type="tel"
                        name="phone_number"
                        value={updatedProfileData.phone_number}
                        onChange={handleInputChange}
                    />
                ) : (
                    profileData.phone_number
                )}
            </p>
            {isEditing ? (
                <div>
                    <button className="button_small" onClick={handleSave}>
                        Save
                    </button>
                    <button className="button_small" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default NotesProfile;