import { Link } from 'react-router-dom'

import { MegaphoneIcon } from '@heroicons/react/24/outline'

const AddCompanyAlert = () => {
  return (
    <div className="bg-indigo-600">
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
            <span className="flex rounded-lg bg-indigo-800 p-2">
              <MegaphoneIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <p className="ml-3 truncate font-medium text-white">
              <span className="md:hidden">Create a company before adding jobs!</span>
              <span className="hidden md:inline">Whoa! Please create a company before adding jobs.</span>
            </p>
          </div>
          <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
            <Link to="/managecompany"
                  className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-50"
            >
              Add Company
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCompanyAlert