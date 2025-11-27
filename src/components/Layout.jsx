import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      {/* <Navbar /> */}

      <div style={{ minHeight: "80vh" }}>
        <Outlet />  {/* Page content loads here */}
      </div>

      {/* Footer (if you have one) */}
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
