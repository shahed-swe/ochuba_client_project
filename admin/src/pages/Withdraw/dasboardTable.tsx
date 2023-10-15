import { Table } from "antd";
// General Style
import "../../GeneralStyle/index.scss";
import { Tag } from 'antd';
import moment from "moment";

const DashboardTable = ({ mobileResponsive, data, CompleteEvents}: any) => {
  console.log(data, "dataaaaaaaaaaaaaaaaaaaa");

  const columns = [
    {
      key: "1",
      title: "IBAN",
      render: (_: any, object: any) => object?.IBAN || "-",
      width: "22%",
    },
    {
      key: "2",
      title: "Amount",
      render: (_: any, object: any) => object?.Amount || "-",
      width: "22%",
    },
    {
      key: "3",
      title: "Phone Number",
      render: (_: any, object: any) => object?.User.phoneNumber || "-",
      width: "22%",
    },
    {
      key: "4",
      title: "Status",
      render: (_: any, object: any) => ( object?.Status == "pending" ? <Tag color="#f50">Pending</Tag> : <Tag color="#87d068">Completed</Tag>  || "-" ),
      width: "10%",
    },
    {
      key: "5",
      title: "Date",
      render: (_: any, object: any) => moment(object?.Date).format("DD/MM/YYYY hh:mm A") || "-",
      width: "36%",
    },
    {
      key: "6",
      title: "Action",
      render: (_: any, object: any) => (
          <button style={{marginTop: 0}} onClick={() => CompleteEvents(object?._id)}>Complete</button>
      ),
      width: "22%",
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

export default DashboardTable;
