import Head from 'next/head'
import Fixtures from '../components/Fixtures'
import Footer from '../components/Footer'
import Gallery from '../components/Gallery'
import Layout from '../components/layout'
import League from '../components/League'
import LiveScore from '../components/LiveScore'
import Menu from '../components/Menu'
import PointsTable from '../components/PointsTable'
import Results from '../components/Results'
import Stories from '../components/Stories'

export async function getServerSideProps() {

  // const res = await fetch('https://nepalscores.herokuapp.com/api/tournaments')
  const res = await fetch('http://localhost:3000/api/tournaments')
  const data = await res.json()
  const res1 = await fetch("http://localhost:3000/api/scoreboard");
  const liveData = await res1.json();

  return {
    props: {
      apiData: data,
      liveData,
    },
  }
}

export default function Home({ apiData, liveData }) {
  return (
    <div className="bg-gray-700 overflow-x-hidden">
      <main className='mx-2 md:mx-10 lg:mx-40 2xl:mx-64'>
        < Results result={apiData[0]?.resultList} />
        <div className='grid grid-cols-7 gap-2 w-full'>
          <Stories />
          <LiveScore initialData={liveData} />
        </div>
        <div className='grid grid-cols-6 gap-2 w-full'>
          <Gallery />
          <PointsTable view={'hidden md:block col-span-2 w-auto h-[30rem] my-2 bg-gray-700 items-center justify-center float-right'} points={apiData[0]?.teamList} />
        </div>
        <League />
        <Fixtures fixture={apiData[0]?.fixtureList} />
      </main>
    </div>
  )
}
