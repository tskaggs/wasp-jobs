import { useQuery } from '@wasp/queries'
import getCompany from '@wasp/queries/getCompany'
import AddCompanyAlert from './company/AddCompanyAlert'
import MainHeader from './components/MainHeader'
import JobsView from './jobs/JobsView'

import './Main.css'

const MainPage = ({ user }) => {
  const {
    data: company,
  } = useQuery(getCompany)

  return (
    <div>
      <MainHeader/>
      {/* <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"> */}
          {!company && <AddCompanyAlert/>}
          {company && <JobsView companyId={company.id} />}
        {/* </div>
      </main> */}
    </div>
  )
}

export default MainPage