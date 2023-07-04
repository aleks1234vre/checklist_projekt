import axios from "axios";
import { useEffect, useState } from "react";

const NotesProfile = () => {
    const [profileData, setProfileData] = useState({
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        phone_number: "",
    });
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProfileData, setUpdatedProfileData] = useState({
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        phone_number: "",
    });
    const [errorText, setErrorText] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("http://localhost:3000/auth/profile", {
                    withCredentials: true,
                });
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
            id: profileData.id,
        });
        setIsEditing(true);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUpdatedProfileData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            // Validation: Check phone number length and characters
            const phoneNumber = String(updatedProfileData.phone_number);

            if (phoneNumber.includes(" ") || !/^[0-9]+$/.test(phoneNumber)) {
                setErrorText("Phone number should not contain spaces or letters.");
                return;
            }

            if (phoneNumber.length > 8) {
                setErrorText("Phone number should not be over 8 characters long.");
                return;
            }

            await axios.patch(`http://localhost:3000/users/${updatedProfileData.id}`, updatedProfileData, {
                withCredentials: true,
            });

            setProfileData(updatedProfileData);
            setIsEditing(false);
            console.log("Profile updated successfully");
        } catch (error) {
            console.error("Error updating profile:", error);// Handle the error or display an error message to the user
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setUpdatedProfileData(profileData);
    };

    const handleDelete = () => {
        setShowConfirmation(true);
    };

    const confirmDelete = async () => {
        try {
            // Send delete request
            await axios.delete(`http://localhost:3000/auth/deleteaccount`, {
                withCredentials: true,
            });
            console.log("Account deleted successfully");
            localStorage.removeItem('hasCookie')
            window.location.href = "/"
            



        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profileData) {
        return <div>Error occurred while fetching profile data.</div>;
    }

    return (
        <>
            <div className="d-flex align-items-center" style={{ paddingLeft: "40%" }}>
                <h1>Profile</h1>
                {!isEditing && (
                    <button style={{ marginLeft: "30px" }} className="button_small1" onClick={handleEdit}>
                        Change account details
                    </button>
                )}
            </div>
            <hr />

            <div style={{ paddingLeft: "40%", paddingRight: "40%" }}>
                <p className="profile-field">
                    <label htmlFor="firstNameField">First Name:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            id="firstNameField"
                            name="first_name"
                            value={updatedProfileData.first_name}
                            onChange={handleInputChange}
                            required
                        />
                    ) : (
                        profileData.first_name
                    )}
                </p>

                <p className="profile-field">
                    <label htmlFor="lastNameField">Last Name:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            id="lastNameField"
                            name="last_name"
                            value={updatedProfileData.last_name}
                            onChange={handleInputChange}
                            required
                        />
                    ) : (
                        profileData.last_name
                    )}
                </p>

                <p className="profile-field">
                    <label htmlFor="emailField">Email:</label>
                    {profileData.email}
                </p>

                <p className="profile-field">
                    <label htmlFor="addressField">Address:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            id="addressField"
                            name="address"
                            value={updatedProfileData.address}
                            onChange={handleInputChange}
                            required
                        />
                    ) : (
                        profileData.address
                    )}
                </p>

                <p className="profile-field">
                    <label htmlFor="phoneNumberField">Phone Number:</label>
                    {isEditing ? (
                        <input
                            type="tel"
                            id="phoneNumberField"
                            name="phone_number"
                            value={updatedProfileData.phone_number}
                            onChange={handleInputChange}
                            required
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
                        <button className="button_small" onClick={() => (window.location.href = "/changepassword")}>
                            Change password
                        </button>
                        <button className="button_wide_account" onClick={handleDelete}>
                            Delete account
                        </button>
                        <h6 className="error">{errorText}</h6>
                    </div>
                ) : null}
            </div>

            {showConfirmation && (
                <div  style={{ paddingLeft: "40%", paddingRight: "40%" }} className="popup">
                    <div className="popup-content">
                        <p style={{ fontWeight: "bold", color: "red" }}>
                            Are you sure you want to delete your account?
                        </p>
                        <div className="popup-buttons">
                            <button className="btn btn-sm btn-outline-danger" onClick={confirmDelete}>
                                Confirm Delete
                            </button>

                            <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => setShowConfirmation(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NotesProfile;