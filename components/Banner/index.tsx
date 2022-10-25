import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { BASE_URL_MOVIE } from "../../common/constants";
import { MovieInfo } from "../../types";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/24/solid"

type BannerProps = {
  originals: MovieInfo[];
}

const Banner: FC<BannerProps> = ({ originals }) => {
  const [currentMovie, seCurrentMovie] = useState<MovieInfo | null>(null);

  useEffect(() => {
    seCurrentMovie(originals[Math.floor(Math.random() * originals.length)])
  },[originals]);

  console.log(currentMovie);

  return ( 
    <section className="flex flex-col space-y-2 pb-16 pt-24 md:pt-20 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12 lg:pt-16">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen overflow-x-hidden">
        <Image 
          src={`${BASE_URL_MOVIE}${currentMovie?.backdrop_path || currentMovie?.poster_path}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h1 className="text-2xl lg:text-7xl md:text-4xl font-bold">{currentMovie?.title || currentMovie?.name || currentMovie?.original_title || currentMovie?.original_name}</h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xls">{currentMovie?.overview}</p>
      <div className="flex gap-x-4">
        <button className="banner-btn bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-6 md:w-6" />
          Play
        </button>
        <button className="banner-btn bg-[gray]/70">
          More
          <InformationCircleIcon className="h-4 w-4 md:h-7 md:w-7"/>
        </button>
      </div>
    </section>
  );
}
 
export default Banner;