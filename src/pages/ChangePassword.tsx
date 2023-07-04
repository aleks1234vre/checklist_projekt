import { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorText, setErrorText] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChangePassword = () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            setErrorText('Please fill in all fields');
            return;
        }
        if (newPassword !== confirmPassword) {
            setErrorText('New password and confirm password must match');
            return;
        }



        axios
            .patch(
                'http://localhost:3000/auth/changepassword',
                { currentPassword, newPassword },
                { withCredentials: true }
            )
            .then(response => {
                setSuccessMessage(response.data.message);
                setErrorText('');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');

                setTimeout(() => {
                    window.location.href = "/profile"
                }, 1500);
            })
            .catch(error => {
                // Handle error
                if (error.response && error.response.data) {
                    setErrorText(error.response.data.message);
                } else {
                    setErrorText('An error occurred. Please try again.');
                }
            });
    };

    return (
        <>

            <h2 style={{ paddingLeft: "40%", paddingRight: "40%" }}>Change Password</h2>
            <hr></hr>
            <div style={{ paddingLeft: "40%", paddingRight: "40%" }}>
            <form>
                <div>
                    <p className="profile-field">
                    <label>Current Password:</label>
                    <input
                        type="password"
                        value={currentPassword}

                        onChange={e => setCurrentPassword(e.target.value)}

                    />
                    </p>
                </div>
                <div>
                    <p className="profile-field">
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}


                    />
                    </p>
                </div>
                <div>
                    <p className="profile-field">
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                    </p>
                </div>
                {successMessage && <p className="success">{successMessage}</p>}
                <button  className="button_small" type="button" onClick={handleChangePassword}>
                    Change Password
                </button>
                <button  className="button_small" type="button"  onClick={() => (window.location.href = "/profile")}>
                    Cancel
                </button>
                <h6 className="error">{errorText}</h6>
            </form>
            </div>
            </>
    );
};

export default ChangePassword;