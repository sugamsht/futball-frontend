import Head from 'next/head'
import Fixtures from '../components/Fixtures'
import Footer from '../components/Footer'
import Gallery from '../components/Gallery'
import League from '../components/League'
import LiveScore from '../components/LiveScore'
import Menu from '../components/Menu'
import PointsTable from '../components/PointsTable'
import Results from '../components/Results'
import Stories from '../components/Stories'

export async function getServerSideProps() {

  const res = await fetch('http://localhost:3000/api/tournaments')
  const data = await res.json()

  return {
    props: {
      apiData: data
    },
  }
}

export default function Home({ apiData }) {

  return (
    <div className="w-screen h-screen overflow-x-hidden bg-gray-700">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <main className='mx-2 md:mx-10 lg:mx-20 2xl:mx-32'>
        < Results result={apiData[0]?.resultList} />
        <div className='grid grid-cols-7 gap-2 w-full'>
          <Stories />
          <LiveScore />
        </div>
        <div className='grid grid-cols-6 gap-2 w-full'>
          <Gallery />
          <PointsTable view={'hidden md:block col-span-2 w-auto h-[30rem] my-2 bg-gray-700 items-center justify-center float-right'} points={apiData[0]?.teamList} />
        </div>
        <League />
        <Fixtures fixture={apiData[0]?.fixtureList} />
      </main>
      <Footer />
    </div>
  )
}
