import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { MovieInfo } from '../types'
import Req from '../common/utils/request'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Slider from '../components/Slider'
import useAuth from '../hooks/useAuth'

type HomeDataKeys = 'originals' | 'topRated' | 'trending' | 'romanceMovies' | 'horrorMovies' | 'comedyMovies' | 'actionMovies' | 'documentaries';

type HomeProps = {
  [key in HomeDataKeys]: MovieInfo[];
}

const Home: NextPage<HomeProps> = ({ originals, topRated, romanceMovies, horrorMovies, comedyMovies, trending, actionMovies, documentaries }) => {
  const { loading } = useAuth();

  return (
    loading 
      ? null 
      : (
    <div className="relative h-screen bg-gradient-to-b">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 w-screen box-border lg:space-y-24 lg:pl-16">
        <Banner originals={originals} />
        <section className="flex flex-col gap-y-2 md:gap-y-14">
          <Slider title="Trending now" movies={trending} />
          <Slider title="Top rated" movies={topRated} />
          {/* User List Component*/}
          <Slider title="Comedies" movies={comedyMovies} />
          <Slider title="Action movies" movies={actionMovies} />
          <Slider title="Horrors" movies={horrorMovies} />
          <Slider title="Romance movies" movies={romanceMovies} />
          <Slider title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {/* Modal */}
    </div>
    )  
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await Promise.all([
    fetch(Req.originals).then(res => res.json()),
    fetch(Req.topRated).then(res => res.json()),
    fetch(Req.documentaries).then(res => res.json()),
    fetch(Req.romanceMovies).then(res => res.json()),
    fetch(Req.trending).then(res => res.json()),
    fetch(Req.actionMovies).then(res => res.json()),
    fetch(Req.horrorMovies).then(res => res.json()),
    fetch(Req.comedyMovies).then(res => res.json()),
  ]);

  if (!data) {
    return {
      notFound: true,
    }
  }

  const [
    originals,
    topRated,
    documentaries,
    romanceMovies,
    trending,
    actionMovies,
    horrorMovies,
    comedyMovies
  ] = data;

  return {
    props: {
      originals: originals.results,
      topRated: topRated.results,
      romanceMovies: romanceMovies.results,
      horrorMovies: horrorMovies.results,
      comedyMovies: comedyMovies.results,
      actionMovies: actionMovies.results,
      documentaries: documentaries.results,
      trending: trending.results
    }
  }
}

export default Home
