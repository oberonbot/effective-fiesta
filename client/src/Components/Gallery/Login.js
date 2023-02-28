import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { XLg } from "react-bootstrap-icons";
import axios from "axios";

function NewArtist(props) {
  const [show, setShow] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleToRegister = () => {
    setIsLogin(false);
    setError(null);
  };

  const handleToLogin = () => {
    setIsLogin(true);
    setError(null);
  };

  // window shows and closes
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        await login(inputs);
        navigate("/gallery");
      } catch (error) {
        setError(error.response.data);
      }
    } else {
      try {
        await axios.post("/api/gallery/register", inputs);
        setIsLogin(true);
      } catch (error) {
        setError(error.response.data);
      }
    }
  };

  return (
    <>
      <Button
        variant="outline-success"
        onClick={handleShow}
        className="toolbar-button"
      >
        Log in
      </Button>

      <Modal size="" show={show} onHide={handleClose} centered>
        <Modal.Body>
          {isLogin ? (
            <div className="login">
              <Button
                className="close-button"
                variant="light"
                onClick={handleClose}
              >
                <XLg size={15}></XLg>
              </Button>
              <div className="login-content">
                <h1>Welcome to log in!</h1>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      required
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name="password"
                      type="password"
                      required
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
                <Button
                  variant="outline-primary"
                  onClick={handleSubmit}
                  className="login-button"
                >
                  Log in
                </Button>
                {error && <p>{error}</p>}
                <span onClick={handleToRegister}>
                  Don't have an account yet? Sign up here
                </span>
              </div>
            </div>
          ) : (
            <div className="login">
              <Button className="close-button" variant="light">
                <XLg size={15}></XLg>
              </Button>
              <div className="login-content">
                <h1>Welcome to sign up!</h1>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      required
                      name="email"
                      type="email"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      name="password"
                      type="password"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
                <Button
                  variant="outline-primary"
                  onClick={handleSubmit}
                  className="login-button"
                >
                  Sign Up
                </Button>
                {error && <p>{error}</p>}
                <span onClick={handleToLogin}>
                  Already have an account? Sign in here
                </span>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NewArtist;
