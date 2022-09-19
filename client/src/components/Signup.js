import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
const URL = "https://notieapp.herokuapp.com";
function SignUp() {
  const [credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${URL}/api/auth/createuser`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password }),
    });
    const json = await response.json();
    // console.log(json);
    refSubmit.current.click();

    if (json.success) {
      navigate("/");
    } else {
      alert("User already exists");
    }
  };
  const refSubmit = useRef(null);
  return (
    <div>
      <>
        <h1 className="my-3">Register for free</h1>
        <form onSubmit={handleSubmit} ref={refSubmit}>
          <div className="mb-3">
            <label htmlFor="name" name="name" className="form-label">
              Name
            </label>
            <input type="text" name="name" minLength="5" placeholder="Min 5 characters" onChange={handleChange} className="form-control" value={credential.name} id="name" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" name="email" className="form-label">
              Email
            </label>
            <input type="text" name="email" onChange={handleChange} className="form-control" value={credential.email} id="email" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" name="password" className="form-label">
              Password
            </label>
            <input type="password" minLength="5" placeholder="Min 5 characters" name="password" onChange={handleChange} value={credential.password} className="form-control" id="password" />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" name="cpassword" className="form-label">
              Confirm
            </label>
            <input type="password" name="cpassword" onChange={handleChange} value={credential.cpassword} className="form-control" id="cpassword" />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </>
    </div>
  );
}

export default SignUp;
