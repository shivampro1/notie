import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
const URL = "https://notieapp.herokuapp.com";

function Login() {
  const [credential, setCredential] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${URL}/api/auth/loginuser`;
    // console.log(url + `${id}`);
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ email: credential.email, password: credential.password }),
      // body data type must match "Content-Type" header
    });
    const json = await response.json();
    // console.log(json);
    refSubmit.current.click();

    if (json.success) {
      navigate("/");
      localStorage.setItem("auth-token", json.token);
    } else {
      alert("Invalid credentials");
    }
    // setCredential(note.id, note.etitle, note.edescription);
  };

  const refSubmit = useRef(null);
  return (
    <div>
      <>
        <h1 className="my-3">Login to create notes</h1>
        <form onSubmit={handleSubmit} ref={refSubmit}>
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
            <input type="password" name="password" onChange={handleChange} value={credential.password} className="form-control" id="password" />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </>
    </div>
  );
}

export default Login;
