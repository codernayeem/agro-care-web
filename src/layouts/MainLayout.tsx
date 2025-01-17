import Header from "../components/common/Header";
import Sidebar from "../components/common/SideBar";
import { Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col h-screen w-screen justify-center items-center">
        <img src="/favicon.png" alt="loading" className="w-16 h-16 mb-2" />
        <div className="text-xl font-bold text-green-700">Agro Care</div>
        {/* progress bar */}
        <div className="loading-bar-container">
          <div className="loading-bar"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex flex-row">
        <div className="flex">
          <Sidebar />
        </div>
        <div className="flex-auto">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}

export default App;
