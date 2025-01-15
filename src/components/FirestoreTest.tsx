import { useState, useEffect } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig.ts";
import ReactTimeAgo from "react-time-ago";

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch data from Firestore
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "agri_news"));
        const items: unknown[] = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() }); // Include document ID
        });
        setData(items as never[]);
      } catch (error) {
        console.error("Error fetching Firestore data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <img src="/favicon.png" alt="Agro Care" className="w-10 h-10 mb-2" />
        <h2 className="text-xl font-semibold">Loading...</h2>
        <p className="text-gray-500">Please wait while we fetch the data.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Latest News for you</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((item) => {
          const data = item as {
            id: string;
            title: string;
            imageUrl: string;
            datetime: Timestamp;
            category: string;
            content: string;
          };
          return (
            <div
              key={data.id}
              className="bg-gray-900 shadow-md rounded-lg overflow-hidden hover:bg-gray-800 hover:scale-[1.01] transition duration-300 ease-in-out cursor-pointer"
            >
              <img
                src={data.imageUrl}
                alt={data.title}
                className="w-full h-64 sm:h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-sm font-semibold mb-2">{data.title}</h3>
                <p className="text-gray-500 text-sm mb-2">
                  <ReactTimeAgo date={data.datetime.toDate()} locale="bn-BD" />
                </p>
                <p
                  className="text-gray-700 mb-4 text-sm"
                  dangerouslySetInnerHTML={{
                    __html:
                      data.content.split(" ").slice(0, 25).join(" ") + "...",
                  }}
                ></p>
                <span className="inline-block bg-green-900 text-white text-xs px-2 py-1 rounded">
                  {data.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DataDisplay;
