import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { MovieInfo } from '../types'
import Req from '../common/utils/request'
import Banner from '../components/Banner'
import Header from '../components/Header'

type HomeDataKeys = 'originals' | 'topRated' | 'trending' | 'romanceMovies' | 'horrorMovies' | 'comedyMovies' | 'actionMovies' | 'documentaries';

type HomeProps = {
  [key in HomeDataKeys]: MovieInfo[];
}

const Home: NextPage<HomeProps> = ({ originals, topRated, romanceMovies, horrorMovies, comedyMovies, trending, actionMovies, documentaries }) => {
  
  return (
    <div className="relative h-screen bg-gradient-to-b from-black to-gray-900/10">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner originals={originals} />
        <section>
          {/* Rows */}
        </section>
      </main>
      {/* Modal */}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const [
    originals,
    topRated,
    documentaries,
    romanceMovies,
    trending,
    actionMovies,
    horrorMovies,
    comedyMovies
  ] = await Promise.all([
    fetch(Req.originals).then(res => res.json()),
    fetch(Req.topRated).then(res => res.json()),
    fetch(Req.documentaries).then(res => res.json()),
    fetch(Req.romanceMovies).then(res => res.json()),
    fetch(Req.trending).then(res => res.json()),
    fetch(Req.actionMovies).then(res => res.json()),
    fetch(Req.horrorMovies).then(res => res.json()),
    fetch(Req.comedyMovies).then(res => res.json()),
  ]);

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
