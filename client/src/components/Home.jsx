import { useState, useEffect } from "react";

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://images.pexels.com/photos/1386422/pexels-photo-1386422.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/1938123/pexels-photo-1938123.jpeg",
    "https://images.pexels.com/photos/1093126/pexels-photo-1093126.jpeg",
    "https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg",
    "https://images.pexels.com/photos/32707801/pexels-photo-32707801.jpeg",
    "https://images.pexels.com/photos/9773818/pexels-photo-9773818.jpeg",
    "https://images.pexels.com/photos/5643640/pexels-photo-5643640.jpeg",
    
  ];

  // Change image every 3 seconds
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="absolute top-15 left-0 w-full h-[500px] overflow-hidden">
      {/* Carousel Images */}
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`slide-${index}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}

      {/* Search Bar */}
      <form className="absolute top-10 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4 z-30">
        <div className="flex items-center">
          <label htmlFor="voice-search" className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 21 21"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="voice-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
              placeholder="Search pets, breeds, services..."
              required
            />
            <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
              <svg
                className="w-4 h-4 text-gray-500 hover:text-gray-900"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"
                />
              </svg>
            </button>
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <svg
              className="w-4 h-4 me-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            Search
          </button>
        </div>
      </form>

      {/* Overlay Text */}
      <div className="mt-100 absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
        <h1 className="text-5xl font-bold text-white font-serif mb-1 drop-shadow-lg">
          Meet Your Future Companion
        </h1>
        <p className="text-xl text-white font-semibold drop-shadow-lg">
          Your perfect pet match is just a click away. Browse, connect and bring happiness home today!
        </p>
      </div>
    </div>
  );
}

export default Home;
