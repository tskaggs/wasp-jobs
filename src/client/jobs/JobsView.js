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

  const onClose = () => {
    setOpenState(false)
  }

  const onOpen = () => {
    setOpenState(true)
  }

  return (
    <>
      <div>
        <JobsList jobs={jobs} onOpen={onOpen} />
        {openState && (<JobModal openState={openState} onClose={onClose} companyId={companyId} />)}
      </div>
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
  if (!jobs?.length) return (<NoJobs onOpen={() => onOpen()}/>)
  return jobs.map((job, idx) => <ListingView task={job} key={idx} />)
}

export default JobsView