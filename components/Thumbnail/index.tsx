import { FC } from "react";
import { MovieInfo } from "../../types";
import Image from "next/image";
import { BASE_URL_THUMBNAIL } from "../../common/constants";

interface ThumbnailProps {
  movie: MovieInfo;
}
 
const Thumbnail: FC<ThumbnailProps> = ({movie: {
  backdrop_path,
  poster_path
}}) => {
  return ( 
    <div className="relative h-28 min-w-[180px] cursor-pointer transition ease-out duration-200 md:h-36 md:min-w-[260px] md:hover:scale-105">
      <Image 
        src={`${BASE_URL_THUMBNAIL}${backdrop_path || poster_path}`}
        layout="fill"
        className="rounded-sm object-cover md:rounded"
      />
    </div>
  );
}
 
export default Thumbnail;