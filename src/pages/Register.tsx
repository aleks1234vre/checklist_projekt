import './Register.css';
import {SyntheticEvent, useState} from "react";
import axios, {AxiosError} from "axios";
import {Link, Navigate} from "react-router-dom";

const Register = () => {
  const[firstName, setFirstName] = useState('');
  const[lastName, setLastName] = useState('');
    const[address, setAddress] = useState('');
    const[phoneNumber, setPhoneNumber] = useState('');
  const[email, setEmail] = useState('');
  const[pass1, setPass1] = useState('');
  const[pass2, setPass2] = useState('');


  const[errorText, setErrorText] = useState('');

  const[redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
      e.preventDefault();

      if (pass1 != pass2) {
          setErrorText('Gesli se ne ujemata');
      }
      if (pass1 == pass2) {
          const data = {
              "first_name": firstName,
              "last_name": lastName,
              "address": address,
              "phone_number": phoneNumber,
              "email": email,
              "password": pass1
          };
          try {
              const res = await axios.post('http://localhost:3000/users', data);

              if (res.status == 201) {
                  //redirect na login
                  setRedirect(true);
              }

          } catch (error) {
              if ((error as AxiosError).response?.status != 201) {
                  setErrorText('Invalid email or password');
              }


          }



          try {
              const res = await axios.get("http://localhost:3000/users", {
                  params: {email}
              });

              if (res.data.length > 0) {
                  setErrorText("Email is already registered");
              }
          } catch (error) {
              setErrorText("Error checking email availability");
          }
      }

      if(pass1.length < 8 || pass2.length<8)
      {
          setErrorText("Password should be atleast 8 characters long")

      }

      if (phoneNumber.includes(" ") || (!/^[0-9]+$/.test(phoneNumber))){
          setErrorText("Phone number should not contain spaces or letters.");

      }
}


  if (redirect) {
      return <Navigate to='/login' />;
  }

    return (
        <>
            <main className="form-signin w-100 m-auto">
                <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal">Please register</h1>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput"
                               placeholder="Input your first name"
                               value={firstName}
                               onChange={(e) => setFirstName(e.target.value)}
                               required
                        />
                        <label htmlFor="floatingInput">First name</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput"
                               placeholder="Input your last name"
                               value={lastName}
                               onChange={(e) => setLastName(e.target.value)}
                               required
                        />
                        <label htmlFor="floatingInput">Last name</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput"
                               placeholder="Input your address"
                               value={address}
                               onChange={(e) => setAddress(e.target.value)}
                               required
                        />
                        <label htmlFor="floatingInput">Address</label>
                    </div>
                    <div className="form-floating">
                        <input type="tel" className="form-control" id="floatingInput"
                               placeholder="Input your phone number"
                               value={phoneNumber}
                               onChange={(e) => setPhoneNumber(e.target.value)}
                               required
                        />
                        <label htmlFor="floatingInput">Phone Number</label>
                    </div>
                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput"
                               placeholder="name@example.com"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               required
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword"
                               placeholder="Password"
                               value={pass1}
                               onChange={(e) => setPass1(e.target.value)}
                               required
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="form-floating">

                        <input type="password" className="form-control" id="floatingPassword"
                               placeholder="Password"
                               value={pass2}
                               onChange={(e) => setPass2(e.target.value)}
                               required
                        />
                        <label htmlFor="floatingPassword">Repeat Password</label>
                    </div>
                    <button className="button_wide_reg" type="submit">Register</button>
                    <p style={{marginLeft:'20px'}}>Already have an account? <Link to="/login">Login here!</Link></p>
                    <h6 className="error">{errorText}</h6>
                </form>
            </main>
        </>
    )

}
export default Register;