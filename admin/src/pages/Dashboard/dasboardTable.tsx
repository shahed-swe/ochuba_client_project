import { Table } from "antd";
import moment from "moment";
// General Style
import "../../GeneralStyle/index.scss";
import { Edit, LogoutIcon, Trash } from "../../assets";
import { ReactSVG } from "react-svg";

const DashboardTable = ({ mobileResponsive, data, EndEvent,DeleteEvents,OpenModal,setUser }: any) => {
  console.log(data, "dataaaaaaaaaaaaaaaaaaaa");

  const columns = [
    {
      key: "1",
      title: "Title",
      render: (_: any, object: any) => object?.title || "-",
      width: "22%",
    },
  
    {
      key: "8",
      title: "Type",
      render: (_: any, object: any) => object?.type || "-",
      width: "10%",
    },

    {
      key: "8",
      title: "Category",
      render: (_: any, object: any) => object?.category || "-",
      width: "10%",
    },
  
    {
      key: "2",
      title: "Resolution",
      render: (_: any, object: any) => object?.resolution || "-",
  
      width: "30%",
    },
    {
      key: "3",
      title: "End Date & Time",
      render: (_: any, object: any) =>
        `${object?.endDate} ${object?.endTime}` || "-",
      width: "22%",
    },
    {
      key: "6",
      title: "Action",
      render: (_: any, object: any) => (
        <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
          <ReactSVG
            onClick={() =>{
                 EndEvent(object)
                 setUser(object)
                 OpenModal()
                }}
            width={20}
            src={LogoutIcon}
            className="end-point"
          />
          {/* <img onClick={() => {
            EditEvent(object)
            EditModal()
            }} style={{ cursor: "pointer" }} width={20} src={Edit} /> */}
          <ReactSVG onClick={() => DeleteEvents(object)} style={{ cursor: "pointer" }} width={20} src={Trash} />
        </div>
      ),
      width: "10%",
      align: "center",
    },
  ];

  return (
    <div className="MainTable">
      <Table
        className="Table"
        scroll={mobileResponsive ? { x: 1300, y: 660 } : {}}
        onChange={(e) => console.log(e)}
        columns={columns}
        dataSource={data}
        size="small"
      />
    </div>
  );
};

// const data = [
//   {
//     key: "1",
//     id: "34567",
//     initiatedby: "Treatment prog.",
//     amount: new Date(),
//     type: "John Doe",
//     initiatedon: "Flu (Influenza)",
//     decs: "Lorem ipsum dolor sit amet consectetur. Tristique neque diam dictumst hac. Arcu ac",
//     status: "Completed",
//   },
//   {
//     key: "2",
//     id: "34567",
//     initiatedby: "Treatment prog.",
//     amount: new Date(),
//     type: "John Doe",
//     initiatedon: "Flu (Influenza) Tristique neque diam dictumst hac. Arcu ac",
//     decs: "Lorem ipsum dolor sit amet consectetur. Tristique neque diam dictumst hac. Arcu ac",
//     status: "true",
//   },
//   {
//     key: "3",
//     id: "34567",
//     initiatedby: "Treatment prog.",
//     amount: new Date(),
//     type: "John Doe",
//     initiatedon: "Flu (Influenza)",
//     decs: "Lorem ipsum dolor sit amet consectetur. Tristique neque diam dictumst hac. Arcu ac",
//     status: "Completed",
//   },
//   {
//     key: "4",
//     id: "34567",
//     initiatedby: "Treatment prog.",
//     amount: new Date(),
//     type: "John Doe",
//     initiatedon: "Flu (Influenza)",
//     decs: "Lorem ipsum dolor sit amet consectetur. Tristique neque diam dictumst hac. Arcu ac",
//     status: "Completed",
//   },
//   {
//     key: "5",
//     id: "34567",
//     initiatedby: "Treatment prog.",
//     amount: new Date(),
//     type: "John Doe",
//     initiatedon: "Flu (Influenza)",
//     decs: "Lorem ipsum dolor sit amet consectetur. Tristique neque diam dictumst hac. Arcu ac",
//     status: <div style={{ color: "#EB5757" }}>Failed </div>,
//   },
//   {
//     key: "6",
//     id: "34567",
//     initiatedby: "Treatment prog.",
//     amount: new Date(),
//     type: "John Doe",
//     initiatedon: "Flu (Influenza)",
//     decs: "",
//     status: "true",
//   },
//   {
//     key: "7",
//     id: "34567",
//     initiatedby: "Treatment prog.",
//     amount: new Date(),
//     type: "John Doe",
//     initiatedon: "Flu (Influenza)",
//     decs: "Lorem ipsum dolor sit amet consectetur. Tristique neque diam dictumst hac. Arcu ac",
//     status: "Completed",
//   },
//   {
//     key: "8",
//     id: "34567",
//     initiatedby: "Treatment prog.",
//     amount: new Date(),
//     type: "John Doe",
//     initiatedon: "Flu (Influenza)",
//     decs: "Lorem ipsum dolor sit amet consectetur. Tristique neque diam dictumst hac. Arcu ac",
//     status: <div style={{ color: "#EB5757" }}>Failed </div>,
//   },

//   {
//     key: "7",
//     id: "34567",
//     initiatedby: "Treatment prog.",
//     amount: new Date(),
//     type: "John Doe",
//     initiatedon: "Flu (Influenza)",
//     decs: "Lorem ipsum dolor sit amet consectetur. Tristique neque diam dictumst hac. Arcu ac",
//     status: "Completed",
//   },
//   {
//     key: "8",
//     id: "34567",
//     initiatedby: "Treatment prog.",
//     amount: new Date(),
//     type: "John Doe",
//     initiatedon: "Flu (Influenza)",
//     decs: "Lorem ipsum dolor sit amet consectetur. Tristique neque diam dictumst hac. Arcu ac",
//     status: <div style={{ color: "#EB5757" }}>Failed </div>,
//   },
//   {
//     key: "7",
//     id: "34567",
//     initiatedby: "Treatment prog.",
//     amount: new Date(),
//     type: "John Doe",
//     initiatedon: "Flu (Influenza)",
//     decs: "Lorem ipsum dolor sit amet consectetur. Tristique neque diam dictumst hac. Arcu ac",
//     status: "Completed",
//   },
//   {
//     key: "8",
//     id: "34567",
//     initiatedby: "Treatment prog.",
//     amount: new Date(),
//     type: "John Doe",
//     initiatedon: "Flu (Influenza)",
//     decs: "Lorem ipsum dolor sit amet consectetur. Tristique neque diam dictumst hac. Arcu ac",
//     status: <div style={{ color: "#EB5757" }}>Failed </div>,
//   },
//   {
//     key: "7",
//     id: "34567",
//     initiatedby: "Treatment prog.",
//     amount: new Date(),
//     type: "John Doe",
//     initiatedon: "Flu (Influenza)",
//     decs: "Lorem ipsum dolor sit amet consectetur. Tristique neque diam dictumst hac. Arcu ac",
//     status: "Completed",
//   },
//   {
//     key: "8",
//     id: "34567",
//     initiatedby: "Treatment prog.",
//     amount: new Date(),
//     type: "John Doe",
//     initiatedon: "Flu (Influenza)",
//     decs: "Lorem ipsum dolor sit amet consectetur. Tristique neque diam dictumst hac. Arcu ac",
//     status: <div style={{ color: "#EB5757" }}>Failed </div>,
//   },
//   {
//     key: "7",
//     id: "34567",
//     initiatedby: "Treatment prog.",
//     amount: new Date(),
//     type: "John Doe",
//     initiatedon: "Flu (Influenza)",
//     decs: "Lorem ipsum dolor sit amet consectetur. Tristique neque diam dictumst hac. Arcu ac",
//     status: "Completed",
//   },
//   {
//     key: "8",
//     id: "34567",
//     initiatedby: "Treatment prog.",
//     amount: new Date(),
//     type: "John Doe",
//     initiatedon: "Flu (Influenza)",
//     decs: "Lorem ipsum dolor sit amet consectetur. Tristique neque diam dictumst hac. Arcu ac",
//     status: <div style={{ color: "#EB5757" }}>Failed </div>,
//   },
// ];

export default DashboardTable;
