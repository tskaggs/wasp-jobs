import { useQuery } from '@wasp/queries'
import getPublishedJobs from '@wasp/queries/getPublishedJobs'
import FeatureSection from './components/FeatureSection'
import MainHeader from './components/MainHeader'
import ListingView from './jobs/ListingView'

import './Main.css'

const MainPage = () => {
  const {
    data: jobs,
  } = useQuery(getPublishedJobs)

  return (
    <div>
      <MainHeader/>
      <main>
        <FeatureSection />
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <JobsList jobs={jobs} />
        </div>
      </main>
    </div>
  )
}

const NoJobs = ({ onOpen }) => {
  return (
    <div className="mt-8 flex gap-x-4 sm:justify-center">
      No Jobs at the moment
    </div>
  )
}

const JobsList = ({ jobs }) => {
  if (!jobs?.length) return (<NoJobs/>)
  return jobs.map((job, idx) => <ListingView job={job} key={idx} isPublic={true}/>)
}

export default MainPage