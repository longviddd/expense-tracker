import React, { useState } from "react";
import { Dropdown, Menu, Space, Button, Layout, theme, Breadcrumb } from "antd";
import "../resources/default-layout.css";
import {
  UserOutlined,
  PieChartOutlined,
  UnorderedListOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("User", "sub1", <UserOutlined />, [getItem("Logout", "logout")]),
  getItem("All Transactions", "table", <UnorderedListOutlined />),
  getItem("Budget", "budget", <MoneyCollectOutlined />),
  getItem("Analytic", "analytic", <PieChartOutlined />),
];
const { Header, Content, Footer, Sider } = Layout;
function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255,255,255,0.2)",
          }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={["table"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Test</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {props.children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default DefaultLayout;
