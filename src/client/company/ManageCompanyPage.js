import { Link, useHistory } from 'react-router-dom'
import { useQuery } from '@wasp/queries'
import getCompany from '@wasp/queries/getCompany'

import React, { useState } from 'react'
import updateCompany from '@wasp/actions/updateCompany'
import createCompany from '@wasp/actions/createCompany'

const ManageCompanyPage = () => {
  const {
    data: company,
    isFetching,
    error
  } = useQuery(getCompany)

  if (error) { return (<><div> Sorry something happened... </div></>) }

  return (
    <>
      {isFetching ? 
      (<div> Fetching company ... </div>):
      (
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Manage Company
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                back to dashboard
              </Link>
            </p>
          </div>
          <ManageCompanyView company={company}/>
        </div>
      </div>)}
    </>
  )
}

const ManageCompanyView = (props) => {
  const history = useHistory()
  const company = props.company
  const [nameFieldVal, setNameFieldVal] = useState(company?.name || '')
  const [descriptionFieldVal, setDescriptionFieldVal] = useState(company?.description || '')
  const [websiteFieldVal, setWebsiteFieldVal] = useState(company?.website || '')

  const handleSave = async (event) => {
    event.preventDefault()
    try {
      if (company?.id) {
        await updateCompany({
          companyId: company.id,
          data: {
            name: nameFieldVal,
            description: descriptionFieldVal,
            website: websiteFieldVal
          }
        })
      } else {
        await createCompany({
          name: nameFieldVal,
          description: descriptionFieldVal,
          website: websiteFieldVal
        })
      }

      history.push({
        pathname: '/success',
        data: {
          status: 'success 👍',
          verbage: 'Company has been successfully managed.',
          links: [
            {
              to: '/',
              label: 'Go to dashboard',
              icon: 'squares-2x2'
            },

          ]
        }
      })
    } catch (error) {
      console.log(error)
      history.push({
        pathname: '/success',
        data: {
          status: 'failure 😵',
          verbage: 'Company management has failed.',
          links: [
            {
              to: '/',
              label: 'Go to dashboard',
              icon: 'squares-2x2'
            },

          ]
        }
      })
    }
  }

  return (
    <>
      <form onSubmit={handleSave} className="mt-8 space-y-6">
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="name" className="sr-only">
              Company Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Company Name"
              value={nameFieldVal}
              onChange={e => setNameFieldVal(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="website" className="sr-only">
              Website
            </label>
            <input
              id="website"
              name="website"
              type="text"
              autoComplete="website"
              required
              className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Website"
              value={websiteFieldVal}
              onChange={e => setWebsiteFieldVal(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description" className="sr-only">
              Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              autoComplete="description"
              required
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Company Description"
              value={descriptionFieldVal}
              onChange={e => setDescriptionFieldVal(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </form>
    </>
  )
}

export default ManageCompanyPage