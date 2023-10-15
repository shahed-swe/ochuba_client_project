import { useState } from "react";
import { ReactSVG } from "react-svg";
import "../../Styles/Layout/SideBar.scss";
import { DashboardIcon, Ochuba, TryAngleIcon } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";

const SideBar = () => {

    const [selectedOption, setSelectedOption] = useState("")

    const location = window.location.pathname

    const toggle = (tabName: any) => {
        // if (tabName == selectedOption) {
        //     setSelectedOption("")
        //     return
        // }
        setSelectedOption(tabName)
    }

    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()
        window.location.href = "/admin/login"
    }



    return (
        <div className="side-bar-main">
            <div className="side-bar-content">
                <div className="side-bar">
                    <div className="side-bar-top-section">
                        <img style={{ cursor: "pointer", width: "50px" }} onClick={() => navigate("/admin")} src={Ochuba} />
                        <div className="side-bar-top-section-items">
                            <Link to={"/admin/dashboard"} onClick={() => toggle("/admin/dashboard")}>
                                <div className={location.includes("/admin/dashboard") ? "active-side-bar-top-section-single-item" : "side-bar-top-section-single-item"}>
                                    <ReactSVG src={DashboardIcon} />
                                    <p>Dashboard</p>
                                </div>
                            </Link>
                            <Link to={"/admin/withdraw"} onClick={() => toggle("/admin/withdraw")}>
                                <div className={location.includes("/admin/withdraw") ? "active-side-bar-top-section-single-item" : "side-bar-top-section-single-item"}>
                                    <ReactSVG src={DashboardIcon} />
                                    <p>Withdraw</p>
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
                    </div>
                    <div style={{ marginTop: "20px" }} className="side-bar-down-section">

                        <div className="side-bar-profile">
                            <p onClick={() => logout()} style={{ color: "red", fontWeight: "600", cursor: "pointer" }}>Logout</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
