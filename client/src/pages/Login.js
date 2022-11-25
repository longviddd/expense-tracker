import React from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post("/api/users/login", values);
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...response.data, password: "" })
      );
      message.success("Login successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      message.error("Login failed.");
    }
  };
  return (
    <div className="login">
      <div className="row justify-content-center align-items-center w-100 h-100">
        <div className="col-md-4">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>Login Now And Start Saving</h1>
            <hr></hr>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password className="input-password" />
            </Form.Item>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/register">Don't have an account? Register now</Link>
              <button type="submit" className="primary">
                LOGIN
              </button>
            </div>
          </Form>
        </div>
        <div className="col-md-5">
          <div className="lottie">
            {" "}
            <lottie-player
              src="https://assets10.lottiefiles.com/packages/lf20_06a6pf9i.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
      </div>
    </div>
  );
}
