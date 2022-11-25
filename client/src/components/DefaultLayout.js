import React from "react";
import { Dropdown, Menu, Space, Button } from "antd";
import "../resources/default-layout.css";
import { useNavigate } from "react-router-dom";
function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <li
              onClick={() => {
                localStorage.removeItem("currentUser");
                navigate("/login");
              }}
            >
              Logout
            </li>
          ),
        },
      ]}
    />
  );
  return (
    <div className="layout">
      <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="logo">LONG MONEY</h1>
        </div>
        <div>
          <Dropdown overlay={menu} placement="bottomLeft">
            <button className="primary">{user.name}</button>
          </Dropdown>
        </div>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
