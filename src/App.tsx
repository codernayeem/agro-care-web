import { useState } from "react";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import Sidebar from "./components/SideBar";

function App() {
  const [activePage, setActivePage] = useState("home");

  return (
    <>
      <Header setActivePage={setActivePage} />
      <div className="flex flex-row">
        <div className="flex">
          <Sidebar setActivePage={setActivePage} />
        </div>
        <div className="flex-auto">
          <MainContainer activePage={activePage} />
        </div>
      </div>
    </>
  );
}

export default App;
