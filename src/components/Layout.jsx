import { Outlet } from "react-router-dom";
import Menubar from "../Menubar";

function Layout() {
  return (
    <>
    <Menubar />

      <div style={{ minHeight: "80vh" }}>
        <Outlet />  {/* Page content loads here */}
      </div>

    </>
  );
}

export default Layout;
