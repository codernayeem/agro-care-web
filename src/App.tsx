import Header from "./components/Header";
import Sidebar from "./components/SideBar";

interface AppProps {
  children?: React.ReactNode;
}

function App({ children }: AppProps) {
  return (
    <>
      <Header />
      <div className="flex flex-row">
        <div className="flex">
          <Sidebar />
        </div>
        <div className="flex-auto">{children}</div>
      </div>
    </>
  );
}

export default App;
