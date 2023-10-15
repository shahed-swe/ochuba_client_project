import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Spin,
  message,
} from "antd";
import React, { useState, useEffect } from "react";
import "./profile.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Google from "../../Component/Google/google";
import { Profileeee } from "../../assets";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../Redux/Reducers/gernalSlice";
import { setUser } from "../../Redux/Reducers/authSlice";

const Profile = () => {
  const user = useSelector((state) => state?.authReducer?.user);
  const completeUser = useSelector((state) => state?.gernalReducer?.completeUser);


  const [formState, setFormState] = useState({
    image: null,
  });
  const dispatch = useDispatch()
  const token = useSelector((state) => state?.authReducer?.token);

  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file, "filefilefilefilefile");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormState({ image: reader.result });
    };
  };

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleSubmit = (e) => {
    const formData = {
      fullName: e?.full_name,
      email: e?.email,
      phoneNumber: e?.phone,
    };

    setLoading(true);

    fetch(`${baseUrl}/api/v1/auth/update/${user?._id}`, {
      method: "put",
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
          fetch(`${baseUrl}/api/v1/auth/user`, {
            method: "get",
            headers: {
              Authorization: token,
            },
          })
            .then((res) => res.json())
            .then((userData) => {
              dispatch(setUserDetails(userData?.data));
              dispatch(setUser(data?.user));
            })
            .catch((error) => {
              setLoading(false);
            });
        } else {
          message.error("Something went wrong");
          setLoading(false);
        }
      })
      .catch(() => {
        message.error("Something went wrong");
        setLoading(false);
      });
  };

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      full_name: completeUser?.fullName || "",
      phone: completeUser?.phoneNumber || "",
      email: completeUser?.email || "",
    });
  }, [completeUser]);

  return (
    <Spin spinning={loading}>
      <div className="profile">
        <div className="left-side">
          <div className="left-side-inner">
            <Form form={form} onFinish={handleSubmit} layout="vertical">
              <Row>
                <Col span={24}>
                  <Form.Item
                    name="full_name"
                    label="Full Name"
                    rules={[
                      { required: true, message: "Please Enter Your Name" },
                    ]}
                  >
                    <Input
                      className="ant-input-affix-wrapper"
                      placeholder="Enter Your Name"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="phone"
                    label="Phone Name"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Your Phone Number",
                      },
                    ]}
                  >
                    <Input
                      className="ant-input-affix-wrapper"
                      type="number"
                      placeholder="Enter Your Phone Number"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="email"
                    label="Email Address"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Your Phone Number",
                      },
                    ]}
                  >
                    <Input
                      className="ant-input-affix-wrapper"
                      type="email"
                      placeholder="Enter Your Phone Number"
                    />
                  </Form.Item>
                </Col>
                {/* <Col span={24}>
                <Form.Item
                  name="Address"
                  label="Residential Address Pincode"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Your Address Pincode",
                    },
                  ]}
                >
                  <Input
                    className="ant-input-affix-wrapper"
                    type="number"
                    placeholder="Enter Your Address Pincode"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="Date of birth"
                  label="Residential Address Pincode"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Your Address Pincode",
                    },
                  ]}
                >
                  <DatePicker className="ant-input-affix-wrapper" />
                </Form.Item>
              </Col> */}
                {/* <Col span={24}>
                <GoogleOAuthProvider clientId="739106075686-o3iq57fl19qmf50planckptdekklb1du.apps.googleusercontent.com">
                  <Google />
                </GoogleOAuthProvider>
              </Col> */}
                {/* <Col style={{ marginTop: "20px" }} span={24}>
                <Checkbox>loram iphsam</Checkbox>
              </Col> */}
                <Col span={24}>
                  <button className="submit-button">Submit</button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
        {/* <div className="right-side">
          <div className="right-side-inner">
            <label className="profile-image" htmlFor="image-upload">
              <img src={formState?.image ? formState?.image : Profileeee} />
            </label>
            <input
              style={{ display: "none" }}
              required
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <div className="profile-details">
              <p style={{ textAlign: "center", fontWeight: "600" }}>
                Profile Update Pending
              </p>
              <p style={{ textAlign: "center" }}>
                Please complete your profile
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </Spin>
  );
};

export default Profile;
