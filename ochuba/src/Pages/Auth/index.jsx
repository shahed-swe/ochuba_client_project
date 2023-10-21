import React, { useEffect, useState } from "react";
import "./auth.scss";
import { Col, Form, Input, Row, Spin, message } from "antd";
import { Logo, TradingHome } from "../../assets";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../Redux/Reducers/authSlice";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { app } from "./firebase";

const Login = () => {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState("login");
  const [loading, setLoading] = useState(false);
  //   const [disable, setDisable] = useState(true);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [form] = Form.useForm();
  const dispatch = useDispatch();

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

  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  console.log(confirmationResult?.verificationId,"confirmationResult")
  const auth = getAuth(app);

  const handleSendCode = async (e) => {
    try {
      setLoading(true);
      setPhoneNumber(e?.phone_number);
      const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
      const confirmation = await signInWithPhoneNumber(
        auth,
        `+92${e.phone_number}`,
        // `+234${e.phone_number}`,
        verifier
      );
      setConfirmationResult(confirmation);
      message.success("OTP send successfully please check your inbox");
      setLoading(false);
      // SMS sent successfully, handle UI or further actions
    } catch (error) {
      console.error("Error sending SMS:", error);
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (code) {
      setLoading(true);
      try {
        await confirmationResult
          .confirm(code)
          .then((result) => {
            formHadler();
            setLoading(false);
          })
          .catch((err) => {
            message.error("Wrong code");
            setLoading(false);
          });
        // User is authenticated, handle UI or further actions
      } catch (error) {
        console.error("Error verifying code : ", error);
        setLoading(false);
      }
    } else {
      message.warning("Please enter Otp");
    }
  };

  const formHadler = () => {
    const formData = {
      // fullName: e?.fullName,
      // email: e?.email,
      phoneNumber: phoneNumber,
      // password: e?.password,
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
          form.resetFields();
          message.success(data?.message);
          dispatch(setToken(data?.token));
          dispatch(setUser(data?.user));
          localStorage.setItem("tradingToken", data?.token);
          navigate("/profile");
          window.location.href = "/profile";
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    form.setFieldsValue({
      country: "+234",
    });
  }, []);

  return (
    <Row style={{ height: "100vh" }}>
      {!mobileResponsive && (
        <Col span={12}>
          <img
            style={{ cursor: "pointer" }}
            src={TradingHome}
            width="100%"
            height="100%"
          />
        </Col>
      )}
      <Col span={mobileResponsive ? 24 : 12}>
        <div className="auth-box">
          <div className="auth-fields">
            <Spin spinning={loading}>
              <Form form={form} onFinish={handleSendCode} layout="vertical">
                {signUp == "login" && (
                  <Row gutter={20}>
                    <div id="recaptcha-container"></div>
                    <Col span={24}>
                      <img
                        onClick={() => navigate("/market")}
                        src={Logo}
                        style={{ cursor: "pointer" }}
                        width="150px"
                        alt=""
                      />
                    </Col>
                    <Col span={24}>
                      <h2>Login or Create a New Account</h2>
                    </Col>
                    <Col span={mobileResponsive ? 6 : 4}>
                      <Form.Item name="country" label=" ">
                        <Input disabled className="ant-input-affix-wrapper" />
                      </Form.Item>
                    </Col>
                    <Col span={mobileResponsive ? 18 : 20}>
                      <Form.Item
                        name="phone_number"
                        label="Phone Number"
                        rules={[{ required: true }]}
                      >
                        <Input
                          type="number"
                          className="ant-input-affix-wrapper"
                          placeholder="1 XXX XXXX"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        name="password"
                        label="OTP"
                        // rules={[{ required: true }]}
                      >
                        <Input
                          onChange={(e) => setCode(e.target.value)}
                          className="ant-input-affix-wrapper"
                          placeholder="Enter valid otp"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label=" ">
                        <button
                          disabled={!code}
                          onClick={() => handleVerifyCode()}
                          type="button"
                          style={{ width: "100%" }}
                        >
                          Verify OTP
                        </button>
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <button disabled={confirmationResult?.verificationId} type="submit" style={{ width: "100%" }}>
                        Get OTP via SMS
                      </button>
                    </Col>
                  </Row>
                )}
                {/* {signUp == "signUp" && (
                  <Row gutter={20}>
                    <Col span={24}>
                      <img
                        onClick={() => navigate("/market")}
                        src={Logo}
                        style={{cursor:"pointer"}}
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
                )} */}
              </Form>
            </Spin>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
