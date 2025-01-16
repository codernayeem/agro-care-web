import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig.ts";
// import { Link } from "react-router";

const MarketSection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch data from Firestore
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "api", "v2", "products")
        );
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
      <h2 className="text-xl mb-4">See Our Collections</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {data.map((item) => {
          const data = item as {
            id: string;
            name: string;
            image_url: string;
            category: string;
            original_price: number;
            current_price: number;
          };
          return (
            // <Link to={`/product_details/${data.id}`} className="w-full h-full">
            <div
              key={data.id}
              className="bg-white dark:bg-gray-900 hover:bg-gray-200 hover:shadow-lg dark:hover:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:scale-[1.01] transition duration-200 ease-in-out cursor-pointer font-notosans animate-fadeInUp"
            >
              <img
                src={data.image_url}
                alt={data.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <h3 className="text-md font-semibold">{data.name}</h3>
                <p className="text-sm text-gray-500">
                  {data.category
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </p>
                <div className="flex items-center">
                  <p className="text-sm text-gray-500 line-through mr-2">
                    ৳ {data.original_price}
                  </p>
                  <p className="text-md text-green-700 font-semibold">
                    ৳ {data.current_price}
                  </p>
                  {/* a button for adding to cart */}
                  <button className="ml-auto bg-green-700 text-white px-2 py-1 rounded hover:bg-green-900 transition duration-200 ease-in-out">
                    Add
                  </button>
                </div>
              </div>
            </div>
            // </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MarketSection;
