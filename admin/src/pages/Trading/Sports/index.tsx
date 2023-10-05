import { Col, Form, Input, Row, Spin, message } from "antd";
const { TextArea } = Input;
import TopBar from "../../../Component/Layout/topBar";
import { useState } from "react";
import { ImgUpload } from "../../../assets";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./sports.scss";

type contectData = {
  image: any;
};

type MyObject = {
  bid: String,
  share: String,
  bidamount: String
  // userId: String
}

const Sports = () => {
  const token = useSelector((state: any) => state.authReducer.Admintoken);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [dataBody, setDataBody] = useState({
    title: "",
    resolution: "",
    endDate: "", // Add endDate and endTime fields to dataBody
    endTime: ""
  });
  const [img, setImg] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [bid, setBid] = useState<MyObject[]>([])

  const [team1, setTeam1] = useState<contectData>({
    image: null,
  });

  const [form] = Form.useForm();

  const handleTeam1 = (event: any) => {
    const file = event.target.files[0];
    setImg(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setTeam1({ image: reader.result });
    };
  };

  const formHandler = async (value: any) => {
    if (team1?.image) {
      setLoading(true);

      let formData = new FormData();
      Object.entries(dataBody).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("category", value.category);
      formData.append(`bids`, JSON.stringify(bid));
      if (img) {
        formData.append("image", img);
      }
      fetch(`${baseUrl}/api/v1/admin/trading/sports`, {
        method: "post",
        headers: {
          "x-sh-auth": token,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setDataBody({
            title: "",
            resolution: "",
            endDate: "",
            endTime: ""
          });
          setLoading(false);
          if (data?.success) {
            form.resetFields();
            message.success(data?.message);
            setTeam1({ image: null });
            navigate("/admin/dashboard");
          }
        });
    } else {
      message.warning("please upload image");
    }
  };

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setDataBody({ ...dataBody, [name]: value });
  };

  const onChangePrice = (e: any) => {
    const { name, value } = e.target;
    var newArr = [...bid, {
      bid: name,
      share: "1",
      bidamount: value
    }]
    setBid(newArr)
  };

  // const handleChange = (value: string) => {
  //   setDataBody({ ...dataBody, category: value });
  //   console.log(dataBody)
  // };

  return (
    <Spin spinning={loading}>
      <TopBar title="Sports" breadcrumb={true} consdition={true} />
      <Form
        form={form}
        onFinish={formHandler}
        layout="vertical"
        style={{ marginTop: "20px", paddingBottom: "30px" }}
        encType="multipart/form-data"
      >
        <Row gutter={10}>
          <Col span={18}>
            <div className="form-left">
              {team1.image ? (
                <>
                  <label
                    className="image-upload-button"
                    htmlFor="image-upload1"
                    onClick={handleTeam1}
                  >
                    <img src={team1.image} alt="uploaded" />
                    <span>Team 1</span>
                  </label>
                </>
              ) : (
                <>
                  <label
                    className="image-upload-button"
                    htmlFor="image-upload1"
                  >
                    <img src={ImgUpload} />
                    <span>Team 1</span>
                  </label>
                </>
              )}
              <input
                style={{ display: "none" }}
                id="image-upload1"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleTeam1}
              />
            </div>
          </Col>

          <Col span={18}>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input
                placeholder="Enter the Trade Title"
                name="title"
                id="title"
                className="ant-input-affix-wrapper"
                value={dataBody.title}
                onChange={onChange}
              />
            </Form.Item>
          </Col>

          <Col span={18}>
            <Form.Item
              className="testarea"
              name="resolution"
              label="Resolution"
              rules={[{ required: true }]}
            >
              <TextArea
                placeholder="Enter Resolution"
                name="resolution"
                id="resolution"
                className="ant-input-affix-wrapper"
                rows={4}
                value={dataBody.resolution}
                onChange={onChange}
              />
            </Form.Item>
          </Col>

          <Col span={18}>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true }]}
            >
              <Input
                placeholder="Please enter a Category"
                className="ant-input-affix-wrapper"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col span={18}>
            <Form.Item
              name="endDate"
              label="End Date"
              rules={[{ required: true }]}
            >
              <Input
                type="date"
                name="endDate"
                id="endDate"
                className="ant-input-affix-wrapper"
                onChange={onChange}
              />
            </Form.Item>
          </Col>

          <Col span={18}>
            <Form.Item
              name="endTime"
              label="End Time"
              rules={[{ required: true }]}
            >
              <Input
                type="time"
                name="endTime"
                id="endTime"
                className="ant-input-affix-wrapper"
                onChange={onChange}
              />
            </Form.Item>
          </Col>
          <Col span={18}>
            <Form.Item
              name="yes"
              label="Start Price for Yes"
              rules={[{ required: true }]}
            >
              <Input
                type="number"
                name="yes"
                id="yes"
                className="ant-input-affix-wrapper"
                onChange={onChangePrice}
              />
            </Form.Item>
          </Col>
          <Col span={18}>
            <Form.Item
              name="no"
              label="Start Price for No"
              rules={[{ required: true }]}
            >
              <Input
                type="number"
                name="no"
                id="no"
                className="ant-input-affix-wrapper"
                onChange={onChangePrice}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col>
            <button style={{ width: "100px" }}>Submit</button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default Sports;
