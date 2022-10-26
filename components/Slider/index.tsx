import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { FC, useEffect, useRef, useState } from "react";
import { MovieInfo } from "../../types";
import Thumbnail from "../Thumbnail";

type SliderProps = {
  title: string;
  /* When using firebase
  movie: MovieInfo | DocumentData; */
  movies: MovieInfo[]
}

const Slider:FC<SliderProps> = ({ title, movies }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleSlide = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (sliderRef && sliderRef.current) {
      const target = e.target as HTMLDivElement;
      const {scrollLeft, clientWidth} = sliderRef.current;
      const scrollTo = target.id === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;

      if (scrollTo > 0) setIsScrolled(true);
      if (scrollTo <= 0) setIsScrolled(false);

      sliderRef.current.scrollTo({ left: scrollTo, behavior: "smooth"});
    }
  }

  return (
    <div className="h-40 space-y-0.5 md:space-y-2.5">
      <h3 className="w-56 font-semibold text-sm cursor-pointer text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">{title}</h3>
      <div className="relative group flex items-center md:-ml-2">
        <ChevronLeftIcon id="left" className={`absolute top-auto left-2 z-20 ${!isScrolled && 'hidden'} slider-arrow`} onClick={handleSlide}/>
        <div ref={sliderRef} className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5">
          {
            movies.map(movie => (
              <Thumbnail key={movie.id} movie={movie} />
            )) 
          }
        </div>
        <ChevronRightIcon id="right" className="absolute top-auto right-2 z-20 slider-arrow" onClick={handleSlide}/>
      </div>
    </div>
  );
}

export default Slider;