import React, { useEffect, useRef } from "react";

function TrendingAnimals() {
  const animals = [
    {
      name: "Golden Retriever",
      img: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "Persian Cat",
      img: "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "Parrot",
      img: "https://images.pexels.com/photos/1430567/pexels-photo-1430567.jpeg",
    },
    {
      name: "Rabbit",
      img: "https://images.pexels.com/photos/2439784/pexels-photo-2439784.jpeg",
    },
    {
      name: "Siberian Husky",
      img: "https://images.pexels.com/photos/29298410/pexels-photo-29298410.jpeg",
    },
    {
      name: "Arabian Horse",
      img: "https://images.pexels.com/photos/25950485/pexels-photo-25950485.jpeg",
    },
  ];

  // Duplicate the array for seamless scrolling
  const duplicatedAnimals = [...animals, ...animals];

  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const scrollStep = 2; // speed of scroll
    const interval = setInterval(() => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollStep;

        // When half of the duplicated content is scrolled, reset to start
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
    }, 30); // lower = faster

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-[560px] px-4 py-6">
      <h2 className="text-4xl font-bold mb-4">Experiment for merge conflict</h2>
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto no-scrollbar py-6 bg-gray-200"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {duplicatedAnimals.map((animal, index) => (
          <div
            key={index}
            className="min-w-[200px] bg-white shadow-lg hover:shadow-2xl rounded-lg overflow-hidden transform hover:scale-105 hover:-translate-y-1 transition-all duration-300"
            style={{
              boxShadow: "0 6px 10px rgba(0,0,0,1), inset 0 1px 3px rgba(255,255,255,0.6)",
            }}
          >
            <img
              src={animal.img}
              alt={animal.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-2 text-center font-semibold">{animal.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingAnimals;