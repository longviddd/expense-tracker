import React from "react";
import { Form, Input } from "antd";
import { Link } from "react-router-dom";
import "../resources/authentication.css";

export default function Register() {
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div className="register">
      <div className="row justify-content-center align-items-center w-100 h-100">
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
        <div className="col-md-5">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>Register Now And Start Saving</h1>
            <hr></hr>
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password className="input-password" />
            </Form.Item>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login">Already Registered, Click Here To Login</Link>
              <button type="submit" className="primary">
                REGISTER
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
