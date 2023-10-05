import '../../Styles/Layout/Layout.scss'
import SideBar from './sideBar';


const Layout = ({ children }: any) => {
  return (
    <div className='layout-main'>
      <div className="layout-container">
        <SideBar />
        <div className="layout-main">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;