import { Drawer } from "antd";
import "../../Styles/Layout/TopBar.scss";
import { ReactSVG } from "react-svg";
import { BackArrow, BottleIcon, BrowserIcon, DashboardIcon, FileIcon, LoginLogo, MedicalIcon, MenuIcon, NotificationBells, Ochuba, ProfilePic, TryAngleIcon } from "../../assets";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import Breadcrumb from "../../Utils/Helpers/BreadCrumb";


const TopBar = ({ title,breadcrumb,consdition }: any) => {

    const navigate = useNavigate();


    const backHandler = () => {
        navigate(-1);
    };

    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("")

    const location = window.location.pathname

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };



    const toggle = (tabName: any) => {
        // if (tabName == selectedOption) {
        //     setSelectedOption("")
        //     return
        // }
        setSelectedOption(tabName)
    }

    return (
        <>
            <div className="mobile-header" >
                <img width={50} src={Ochuba} />
                <img width={"20px"} onClick={showDrawer} src={MenuIcon} />
            </div>
            <div className="dashboard-header-main">
                <div className="dashboard-heading">
                    {
                        breadcrumb  && consdition &&
                        <div style={{ paddingBottom: "20px" }} className="main-top">
                            <ReactSVG
                                src={BackArrow}
                                className="back-button"
                                onClick={backHandler}
                                
                            />
                            <div className="page-name-wrapper">
                                <p>{title}</p>
                                <Breadcrumb />
                            </div>
                        </div>
                    }
                    
                    {title && !consdition &&<p>{title}</p>}

                   
                </div>
            </div>
            <Drawer
                title="Menu"
                placement={"right"}
                closable={true}
                onClose={onClose}
                open={open}
                width={"250px"}
                key={"right"}
                className="mobile-menu-drawer"
            >
                <div className="side-bar-top-section-items">
                    <Link to={"/admin/dashboard"} onClick={() => toggle("/admin/dashboard")}>
                        <div className={location.includes("/admin/dashboard") ? "active-side-bar-top-section-single-item" : "side-bar-top-section-single-item"}>
                            <div style={{ width: "20px" }}>
                                <ReactSVG src={DashboardIcon} />
                            </div>
                            <p>Dashboard</p>
                        </div>
                    </Link>
                    <Link to={"#"} onClick={() => toggle("/admin/trading")}>
                            <div className="side-bar-top-section-single-item">
                                <ReactSVG src={TryAngleIcon} />
                                <p>Trading</p>
                                <DownOutlined className={selectedOption == "/admin/trading" ? "option-arrow" : ""} />
                                {selectedOption == '/admin/trading' &&
                                    <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                                        <Link to={"/admin/trading/sports"} onClick={() => toggle("/management")}>
                                            <p className={location.includes("/admin/trading/sports") ? "activeA" : "suboption"} >Sports</p>
                                        </Link>
                                        <Link to={"/admin/trading/news"} >
                                            <p className={location.includes("/admin/trading/news") ? "activeA" : "suboption"} >News</p>
                                        </Link>
                                        <Link to={"/admin/trading/politics"} >
                                            <p className={location.includes("/admin/trading/politics") ? "activeA" : "suboption"} >Politics</p>
                                        </Link>
                                        <Link to={"/admin/trading/finance"} onClick={() => toggle("/management")}>
                                            <p className={location.includes("/admin/trading/finance") ? "activeA" : "suboption"} >Finance</p>
                                        </Link>
                                        <Link to={"/admin/trading/media"} >
                                            <p className={location.includes("/admin/trading/media") ? "activeA" : "suboption"} >Media</p>
                                        </Link>
                                        
                                    </div>
                                }
                            </div>
                        </Link>
                    
                </div>
            </Drawer>
        </>
    );
};

export default TopBar;
