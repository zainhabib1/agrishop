import React from 'react';
import { FaSeedling, FaCarrot, FaSprayCan, FaUsersCog, FaTools, FaWater } from 'react-icons/fa'; // Importing icons

const categories = [
  { name: 'Crop', icon: <FaSeedling className="text-4xl mb-2" /> },
  { name: 'Seed', icon: <FaCarrot className="text-4xl mb-2" /> },
  { name: 'Pesticide', icon: <FaSprayCan className="text-4xl mb-2" /> },
  { name: 'Fertilizer', icon: <FaUsersCog className="text-4xl mb-2" /> },
  { name: 'Tools', icon: <FaTools className="text-4xl mb-2" /> },
  { name: 'Irrigation', icon: <FaWater className="text-4xl mb-2" /> },
];

const CategoryScroll = () => {
  return (
    <div className="bg-gray-100 py-8">
      <h2 className="text-4xl font-extrabold text-center mb-4 text-green-600 
              bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600 
              shadow-md tracking-wide pb-4">
        Explore Our Agriculture Categories
      </h2>

      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-green-400 to-green-600 shadow-lg rounded-lg p-6 m-2 w-32 sm:w-36 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              {category.icon} {/* Displaying icon */}
              <h3 className="text-lg font-semibold text-white">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryScroll;