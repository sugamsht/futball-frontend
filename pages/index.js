import Fixtures from '../components/Fixtures'
import Gallery from '../components/Gallery'
import League from '../components/League'
import LiveScore from '../components/LiveScore'
import PointsTable from '../components/PointsTable'
import Results from '../components/Results'
import Stories from '../components/Stories'

export async function getServerSideProps() {
  try {
    const res = await fetch('http://localhost:3000/api/tournaments')
    const data = await res.json()

    const res1 = await fetch("http://localhost:3000/api/scoreboard");
    const liveData = await res1.json();

    const res2 = await fetch("http://localhost:3000/api/tables");
    const tableData = await res2.json();

    return {
      props: {
        apiData: data,
        liveData,
        tableData,
      },
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        apiData: [],
        liveData: [],
        tableData: [],
      },
    }
  }
}

export default function Home({ apiData, liveData, tableData }) {
  // Extract most recent non-empty results from all tournaments
  const recentResults = apiData.reduce((results, tournament) => {
    if (tournament.resultList) {
      // Filter out empty or undefined results
      const filteredResults = tournament.resultList.filter(result => result);
      results.push(...filteredResults.slice(0, 5));
    }
    return results;
  }, []);

  return (
    <div className="bg-gray-700 overflow-x-hidden">
      <main className='mx-2 md:mx-10 lg:mx-40 2xl:mx-64'>
        <Results results={recentResults} />

        <div className='grid grid-cols-7 gap-2 w-full'>
          <Stories />
          <LiveScore initialData={liveData} />
        </div>

        <div className='grid grid-cols-6 gap-2 w-full'>
          <Gallery />
          <PointsTable
            view={'hidden md:block col-span-2 w-auto h-[30rem] my-2 bg-gray-700 items-center justify-center float-right'}
            points={tableData.message}
            tournaments={apiData && apiData.map(tournament => tournament.title)}
          />
        </div>

        <League />
        <Fixtures fixture={apiData && apiData[0]?.fixtureList} />
      </main>
    </div>
  )
}
