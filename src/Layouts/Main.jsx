import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";
import NotifyModal from "../components/NotifyModal";

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-427.68px)]">
        <Outlet></Outlet>
        <NotifyModal />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
