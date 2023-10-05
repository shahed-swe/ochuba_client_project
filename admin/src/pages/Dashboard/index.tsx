import { useMediaQuery } from "react-responsive";
import TopBar from "../../Component/Layout/topBar";
import DashboardTable from "./dasboardTable";
import { Col, Modal, Row, message } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./dashboard.scss";

const Dashboard = () => {
  const mobileResponsive = useMediaQuery({
    query: "(max-width: 800px)",
  });

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = useSelector((state: any) => state.authReducer.Admintoken);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [endModal, setEndModal] = useState<any>({});
  const [editModal, setEditModal] = useState<any>({});
  const [deletEvent, setDelete] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Open, setOpen] = useState(false);
  const [user, setUser] = useState<any>({});

  const GetAllTrading = () => {
    setLoading(true);

    fetch(`${baseUrl}/api/v1/admin/trading`, {
      method: "get",
      headers: {
        "x-sh-auth": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data?.success) {
          setData(data.data);
        }
      });
  };

  useEffect(() => {
    GetAllTrading();
  }, [token]);

  const EndEvent = (object: any) => {
    setEndModal(object);
  };

  const EditEvent = (object: any) => {
    setEditModal(object);
  };

  const DeleteEvents = (object: any) => {
    setLoading(true);
    setDelete(object);

    fetch(`${baseUrl}/api/v1/admin/trading/${object?._id}`, {
      method: "delete",
      headers: {
        "x-sh-auth": token,
      },
    })
      .then((res) => res.json())
      .then((data: any) => {
        setLoading(false);
        message.success(data?.message);
        GetAllTrading();
      });
  };

  const EditModal = () => {
    setIsModalOpen(true);
  };
  const OpenModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setOpen(false);
  };

  const yesOrNo = (value: any) => {
    console.log(value)
    setLoading(true);
    const formData: any = {
      result: value,
    };

    fetch(`${baseUrl}/api/v1/admin/trading/result/${user?._id}`, {
      method: "post",
      headers: {
        "x-sh-auth": token,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data?.success) {
          message.success(data?.message);
          handleCancel();
          GetAllTrading();
        }
      });
  };

  return (
    <>
      <TopBar title="Dashboard" />
      <Row>
        <Col span={24}>
          <h2 className="all-trading"> All Tradings </h2>
        </Col>
      </Row>
      <DashboardTable
        EndEvent={EndEvent}
        EditEvent={EditEvent}
        DeleteEvents={DeleteEvents}
        EditModal={EditModal}
        OpenModal={OpenModal}
        mobileResponsive={mobileResponsive}
        data={data}
        setUser={setUser}
      />

      <Modal
        title="Edit"
        footer={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
      <Modal
        title="End Event"
        footer={false}
        open={Open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <p className="text-title">{endModal?.title}</p>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button
             onClick={() => yesOrNo("yes")}
              style={{ width: "100px" }}>
              Yes
            </button>
            <button
              onClick={() => yesOrNo("no")}
              className="noBtn"
              style={{ width: "100px" }}
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Dashboard;
