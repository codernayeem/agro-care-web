import { useState, useEffect } from "react";
import { doc, Timestamp, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseService.ts";
import ReactTimeAgo from "react-time-ago";
import { useParams } from "react-router";

const NewsDetails = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the document with the provided ID
        if (id) {
          const querySnapshot = await getDoc(doc(db, "agri_news", id));
          setData(querySnapshot.data() as never);
        } else {
          console.error("news_id is undefined");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching Firestore data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <img src="/favicon.png" alt="Agro Care" className="w-10 h-10 mb-2" />
        <h2 className="text-xl font-semibold">Loading...</h2>
        <p className="text-gray-500">Please wait while we fetch the data.</p>
      </div>
    );
  }

  const item = data
    ? (data as {
        id: string;
        title: string;
        imageUrl: string;
        datetime: Timestamp;
        category: string;
        content: string;
      })
    : null;

  return (
    <div className="flex flex-col p-4">
      {item ? (
        <div className="bg-white dark:bg-gray-900 font-notosans animate-fadeInUp">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-64 object-contain m-2"
          />
          <div className="p-3">
            <div className="flex items-center space-x-2 mb-2">
              <div>
                <span className="inline-block bg-green-900 text-white text-xs px-2 py-1 rounded">
                  {item.category}
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                <ReactTimeAgo date={item.datetime.toDate()} locale="bn-BD" />
              </p>
            </div>
            <p
              className="text-gray-500 text-md"
              dangerouslySetInnerHTML={{ __html: item.content }}
            ></p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No data found.</p>
      )}
    </div>
  );
};

export default NewsDetails;
