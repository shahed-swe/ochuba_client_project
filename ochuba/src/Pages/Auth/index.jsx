import React, { useState } from "react";
import "./auth.scss";
import { Col, Form, Input, Row, Spin, message } from "antd";
import { Logo, TradingHome } from "../../assets";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../Redux/Reducers/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState("login");
  const [loading, setLoading] = useState(false);
  //   const [disable, setDisable] = useState(true);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [form] = Form.useForm();
  const dispatch = useDispatch()

  const formHadler = (e) => {
    if (signUp == "signUp") {
      const formData = {
        fullName: e?.fullName,
        email: e?.email,
        phoneNumber: e?.mobile,
        password: e?.password,
      };

      setLoading(true);

      fetch(`${baseUrl}/api/v1/auth/signup`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data?.success) {
            message.success(data?.message);
            setSignUp("login");
            form.resetFields();
          }
        })
        .catch(error => {
          setLoading(false);
        })
    }

    if (signUp == "login") {
      const formData = {
        email: e?.email,
        password: e?.password,
      };

      setLoading(true);

      fetch(`${baseUrl}/api/v1/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data?.success) {
            message.success(data?.message);
            dispatch(setToken(data?.token))
            dispatch(setUser(data?.user))
            localStorage.setItem("tradingToken", data?.token);
            navigate("/market");
            window.location.href = "/market";
            setSignUp("login");
          }
        }).catch(error => {
          setLoading(false);
          message.error("Username or password invalid")
        })
    }
  };

  const mobileResponsive = useMediaQuery({
    query: "(max-width: 900px)",
  });

  //   const verifyOtp = () => {
  //     if (otp.length) {
  //       localStorage.setItem("tradingToken", "tokennnnnnnnnnnnnnnnnnnnnnnn");
  //       navigate("/market");
  //       window.location.href = "/market";
  //     } else {
  //       message.warning("please enter promo code");
  //     }
  //   };

  return (
    <Row style={{ height: "100vh" }}>
      {!mobileResponsive && (
        <Col span={12}>
          <img src={TradingHome} width="100%" height="100%" />
        </Col>
      )}
      <Col span={mobileResponsive ? 24 : 12}>
        <div className="auth-box">
          <div className="auth-fields">
            <Spin spinning={loading}>
              <Form form={form} onFinish={formHadler} layout="vertical">
                {signUp == "login" && (
                  <Row gutter={20}>
                    <Col span={24}>
                      <img
                        onClick={() => navigate("/market")}
                        src={Logo}
                        width="150px"
                        alt=""
                      />
                    </Col>
                    <Col span={24}>
                      <h2>Login User</h2>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name="email"
                        label="Email Address"
                        rules={[{ required: true }]}
                      >
                        <Input
                          className="ant-input-affix-wrapper"
                          placeholder="Enter Email"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true }]}
                      >
                        <Input.Password
                          className="ant-input-affix-wrapper"
                          placeholder="Enter Email"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={16}>
                      <button type="submit" style={{ width: "100%" }}>
                        Login
                      </button>
                    </Col>
                    <Col span={8}>
                      <button
                        onClick={() => setSignUp("signUp")}
                        style={{ width: "100%" }}
                        type="button"
                      >
                        Sign Up
                      </button>
                    </Col>
                  </Row>
                )}
                {signUp == "signUp" && (
                  <Row gutter={20}>
                    <Col span={24}>
                      <img
                        onClick={() => navigate("/market")}
                        src={Logo}
                        width="150px"
                        alt=""
                      />
                    </Col>
                    <Col span={24}>
                      <h2>Create New Account</h2>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name="fullName"
                        label="Full Name"
                        rules={[{ required: true }]}
                      >
                        <Input
                          className="ant-input-affix-wrapper"
                          placeholder="Enter Full Name"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name="email"
                        label="Email Address"
                        rules={[{ required: true }]}
                      >
                        <Input
                          className="ant-input-affix-wrapper"
                          placeholder="Enter Email"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true }]}
                      >
                        <Input.Password
                          className="ant-input-affix-wrapper"
                          placeholder="Enter Email"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item
                        name="mobile"
                        label="Phone Number"
                        rules={[{ required: true }]}
                      >
                        <Input
                          type="number"
                          className="ant-input-affix-wrapper"
                          placeholder="Enter Mobile Number"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <button type="submit" style={{ width: "100%" }}>
                        Sign Up
                      </button>
                    </Col>
                  </Row>
                )}
              </Form>
            </Spin>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
