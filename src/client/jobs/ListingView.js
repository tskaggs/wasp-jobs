import React, { useState } from 'react'

import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from '@heroicons/react/20/solid'
import publishJob from '@wasp/actions/publishJob'

const ListingView = ({onOpen, job, companyId, isPublic}) => {
  const [showPublic] = useState(isPublic ?? false)
  const publish = async () => {
    try {
      await publishJob({
        jobId: job.id,
        companyId: companyId,
        data: {
          published: job.published ? false : true
        }
      })
    } catch (error) {
      window.alert('Error while updating task: ' + error.message)
    }
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const formatDate = (date)  => {
    return new Date(date).toDateString()
  }

  return (
    <div className="lg:flex lg:items-center lg:justify-between p-3 my-3 border border-yellow-500 rounded bg-yellow-50">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {job.title} <span className="text-xl text-gray-700">{isPublic && `at ${job.company.name}`}</span>
        </h2>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            {job.contract ? 'Contract' : 'Full-time'}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            {job.location}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            {job.compensation} {job.contract && '/ hour'}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            { job.published ? `Closing on ${formatDate(job.closingAt)}` : 'Not Published'}
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
      {!showPublic && (
        <span className="hidden sm:block">
          <button
            onClick={() => onOpen()}
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            Edit
          </button>
        </span>
      )}

        <span className="ml-3 hidden sm:block">
          <a
            href={job.link}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <LinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            View
          </a>
        </span>

        {!showPublic && (
          <span className="sm:ml-3">
            <button
              onClick={() => publish()}
              type="button"
              className={
                classNames(
                  job.published ? 'bg-rose-400 hover:bg-rose-700 focus:ring-rose-500' : 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
                    "inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  )
              }
            >
              <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              {job.published ? 'Unpublish' : 'Publish'}
            </button>
          </span>
        )}
      </div>
    </div>
  )
}

export default ListingView
