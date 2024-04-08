import React from "react";
import { montserrat } from "../utils/fonts";

const BeerCountCard = ({ text, number }: { text: string; number: number }) => {
  return (
    <div className="flex flex-col items-center block m-2 p-2 w-[200px]">
      <h5
        className={`${montserrat} text-center mb-2 text-xl font-bold tracking-tight text-gray-900`}>
        {text}
      </h5>
      <div className="beer-cup w-40 h-40 flex flex-col justify-center">
        <p className="guinness-gold mt-10 font-bold text-xl text-center">
          {number}
        </p>
      </div>
    </div>
  );
};

export default BeerCountCard;
