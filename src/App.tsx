import DataDisplay from "./components/FirestoreTest";

function App() {
  return (
    <div className="flex  flex-col w-full text-gray-950 dark:text-white bg-gray-900">
      <div className="flex w-full items-center justify-center p-4 bg-green-900">
        <img src="/favicon.png" alt="Agro Care" className="w-10 h-10 mr-2" />
        <p className="text-3xl text-white font-bold mb-0">Agro Care</p>
      </div>
      <DataDisplay />
    </div>
  );
}

export default App;
