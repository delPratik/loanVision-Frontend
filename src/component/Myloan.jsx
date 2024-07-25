import React from "react";
import { Follower } from ".";

export const Myloan = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-20"> {/* Increased gap */}
          {Follower.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 shadow-2xl rounded-lg p-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 text-center transform transition-transform duration-500 hover:scale-105"
            >
              <h3 className="text-3xl font-extrabold text-blue-700 mb-6">{item.name}</h3>
              <hr className="border-t-4 border-blue-700 w-2/3 mx-auto mb-6" />
              <p className="text-lg text-gray-800 font-medium leading-8">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
