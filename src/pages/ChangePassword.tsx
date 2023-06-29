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

        // Make a PATCH request to the change password endpoint
        axios
            .patch(
                'http://localhost:3000/auth/changepassword',
                { currentPassword, newPassword },
                { withCredentials: true } // Add withCredentials option
            )
            .then(response => {
                // Password changed successfully
                setSuccessMessage(response.data.message);
                setErrorText('');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
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
        <div>
            <h2>Change Password</h2>
            <form>
                <div>
                    <label>Current Password:</label>
                    <input
                        type="password"
                        value={currentPassword}

                        onChange={e => setCurrentPassword(e.target.value)}

                    />
                </div>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}


                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>
                {successMessage && <p className="success">{successMessage}</p>}
                <button className="button_small" type="button" onClick={handleChangePassword}>
                    Change Password
                </button>
                <h6 className="error">{errorText}</h6>
            </form>
        </div>
    );
};

export default ChangePassword;