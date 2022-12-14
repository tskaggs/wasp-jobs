import { useQuery } from '@wasp/queries'
import getCompany from '@wasp/queries/getCompany'
import AddCompanyAlert from './company/AddCompanyAlert'
import MainHeader from './components/MainHeader'
import JobsView from './jobs/JobsView'

import './Main.css'

const MainPage = ({ user }) => {
  // const {
  //   data: company,
  // } = useQuery(getCompany)

  return (
    <div>
      <MainHeader/>
    </div>
  )
}

export default MainPage