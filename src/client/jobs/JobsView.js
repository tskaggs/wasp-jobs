import { useQuery } from '@wasp/queries'
import React, { useState } from 'react'

import getJobs from '@wasp/queries/getJobs'
import ListingView from './ListingView'
import {
  DocumentPlusIcon
} from '@heroicons/react/24/outline'
import './../Main.css'
import JobModal from './JobModal'

const JobsView = ({ companyId }) => {
  const { data: jobs } = useQuery(getJobs, {companyId})
  const [openState, setOpenState] = useState(false)
  const [jobId, setJobId] = useState(null)

  const onClose = () => {
    setJobId(null);
    setOpenState(false)
  }

  const onOpen = ({jobId}) => {
    if (jobId) {
      setJobId(jobId);
    }
    setOpenState(true)
  }

  return (
    <>
      <header className="bg-white shadow">
        <div className="lg:flex lg:items-center lg:justify-between py-6 px-4 sm:px-6 lg:px-8">
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          </div>
          <div className="mt-5 flex lg:mt-0 lg:ml-4">
            <span className="sm:ml-3">
              <button
                onClick={() => onOpen({jobId: null})}
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-rose-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add Job listings
              </button>
            </span>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <JobsList jobs={jobs} onOpen={onOpen} />
          {openState && (<JobModal openState={openState} onClose={onClose} companyId={companyId} jobId={jobId}/>)}
        </div>
      </main>
    </>
  )
}

const NoJobs = ({ onOpen }) => {
  return (
    <div className="mt-8 flex gap-x-4 sm:justify-center">
      <button
        onClick={() => onOpen()}
        className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
      >
        <DocumentPlusIcon aria-hidden="true"/>
        Create a job listing
      </button>
    </div>
  )
}

const JobsList = ({ jobs, onOpen }) => {
  if (!jobs?.length) return (<NoJobs onOpen={() => onOpen({jobId: null})}/>)
  return jobs.map((job, idx) => <ListingView onOpen={() => onOpen({jobId: job.id})} job={job} key={idx} />)
}

export default JobsView