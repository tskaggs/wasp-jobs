import { useQuery } from '@wasp/queries'
import getCompany from '@wasp/queries/getCompany'
import AddCompanyAlert from './company/AddCompanyAlert'
import MainHeader from './components/MainHeader'
import JobsView from './jobs/JobsView'

import './Main.css'

const MainPage = () => {
  const {
    data: company,
  } = useQuery(getCompany)

  return (
    <div>
      <MainHeader/>
      {!company && <AddCompanyAlert/>}
      {company && <JobsView companyId={company.id} />}
    </div>
  )
}

export default MainPage