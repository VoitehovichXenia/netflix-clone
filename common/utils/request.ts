import { BASE_URL_REQ } from "../constants";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const Req  ={
  trending: `${BASE_URL_REQ}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  originals: `${BASE_URL_REQ}/discover/movie?api_key=${API_KEY}&with_networks=213`,
  topRated: `${BASE_URL_REQ}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  actionMovies: `${BASE_URL_REQ}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  comedyMovies: `${BASE_URL_REQ}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  horrorMovies: `${BASE_URL_REQ}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  romanceMovies: `${BASE_URL_REQ}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  documentaries: `${BASE_URL_REQ}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
};

export default Req;