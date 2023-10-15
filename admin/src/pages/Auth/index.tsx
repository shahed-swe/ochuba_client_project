import { useState } from "react";
import { Col, Form, Input, Row, Spin, message } from "antd";
import { Logo, Ochuba } from "../../assets";
import "./auth.scss";
import "../../GeneralStyle/index.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../../Redux/Reducers/authSlice";

const Login = () => {
  const [userBody, setUserBody] = useState({
    email: "",
    password: "",
  });
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formHandler = async () => {
    setLoading(true);
    fetch(`${baseUrl}/api/v1/auth/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userBody),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          dispatch(setUser(data.user));
          dispatch(setToken(data.token));
          setLoading(false);
          navigate("/admin/trading/sports");
        } else {
          message.error("Invalid username or passsword");
          setLoading(false);
        }
      }).catch(()=>{
        message.error("Invalid username or passsword");
        setLoading(false);
      })
  };

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setUserBody({ ...userBody, [name]: value });
  };

  return (
    <Spin spinning={loading}>
      <div className="auth">
        <Row style={{ width: "100%" }}>
          <Col span={24}>
            <img width={200} src={Logo} />
          </Col>
        </Row>
        <div className="auth-box">
          <div className="auth-fields">
            <Form onFinish={formHandler} layout="vertical">
              <Row>
                <Col>
                  <h2>Admin Login</h2>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "please enter valid email",
                      },
                    ]}
                  >
                    <Input
                      className="ant-input-affix-wrapper"
                      placeholder="Please enter your email"
                      name="email"
                      id="email"
                      value={userBody.email}
                      onChange={onChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Password"
                    rules={[
                      { required: true, message: "please enter password" },
                    ]}
                  >
                    <Input.Password
                      name="password"
                      id="password"
                      className="ant-input-affix-wrapper"
                      placeholder="Please enter your password"
                      value={userBody.password}
                      onChange={onChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <button style={{ width: "100%" }}>Login</button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Login;
