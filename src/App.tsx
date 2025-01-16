import { Outlet } from "react-router";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";

function App() {
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
