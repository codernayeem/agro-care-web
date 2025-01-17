import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../services/firebaseService";

const CaroselBanners = () => {
  const [banners, setBanners] = useState<string[]>([]);
  const [bannersLoading, setBannersLoading] = useState(true);

  const [activeIndex, setActiveIndex] = useState(0);

  // Function to fetch data from Firestore
  const fetchData = async () => {
    try {
      // Fetch the banners collection
      const querySnapshot = await getDocs(
        collection(db, "api", "v2", "banners")
      );
      const items: string[] = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data().photoUrl);
      });
      setBanners(items);
    } catch (error) {
      console.error("Error fetching Firestore data: ", error);
    } finally {
      setBannersLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners]);

  if (bannersLoading || banners.length === 0) {
    return <> </>;
  }

  return (
    <div className="w-full h-64 md:h-96 lg:h-96">
      <div className="relative w-full h-full">
        <div className="absolute w-full h-full flex justify-center items-center">
          <div className="w-11/12 h-3/4 flex justify-center items-center">
            <img
              src={banners[activeIndex]}
              alt="Banner"
              className="w-full h-full object-cover rounded-lg shadow-lg transition duration-300 ease-in-out"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaroselBanners;
