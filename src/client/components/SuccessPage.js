import { useLocation, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import {
  ArrowLeftIcon,
  Square2StackIcon
} from '@heroicons/react/24/outline'

const ManageCompanyPage = () => {
  const history = useHistory()
  const location = useLocation();
  const [status] = useState(location?.data?.status ?? '')

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              { status.toUpperCase() }
            </h2>
            <div className="mt-8 flex gap-x-4 sm:justify-center">
              <button
                onClick={history.goBack}
                className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
              >
              <ArrowLeftIcon className="inline text-indigo-200 h-6 w-6" aria-hidden="true" />{' '}
              Go back
              </button>
              <Link
                to="/"
                className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
              >
                <Square2StackIcon className="inline text-indigo-200 h-6 w-6" aria-hidden="true" />{' '}
                Go to dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageCompanyPage