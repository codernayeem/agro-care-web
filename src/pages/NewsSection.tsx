import { useState, useEffect } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../services/firebaseService.ts";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router";

const NewsSection = () => {
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
    <div className="flex flex-col p-4">
      <h2 className="text-xl mb-4">Latest News for you</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
            <Link to={`/news/${data.id}`} className="w-full">
              <div
                key={data.id}
                className="bg-white dark:bg-gray-900 hover:bg-gray-200 hover:shadow-lg dark:hover:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:scale-[1.01] transition duration-200 ease-in-out cursor-pointer font-notosans animate-fadeInUp"
              >
                <img
                  src={data.imageUrl}
                  alt={data.title}
                  className="w-full h-64 sm:h-48 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-md font-semibold mb-1">{data.title}</h3>
                  <div className="flex items-center space-x-2 mb-2 ">
                    <div>
                      <span className="inline-block bg-green-900 text-white text-xs px-2 py-1 rounded">
                        {data.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      <ReactTimeAgo
                        date={data.datetime.toDate()}
                        locale="bn-BD"
                      />
                    </p>
                  </div>
                  <p
                    className="text-gray-500 text-sm"
                    dangerouslySetInnerHTML={{
                      __html:
                        data.content.split(" ").slice(0, 15).join(" ") + "...",
                    }}
                  ></p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NewsSection;
