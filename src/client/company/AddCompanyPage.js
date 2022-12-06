import { Link } from 'react-router-dom'

import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import createCompany from '@wasp/actions/createCompany'
import { errorMessage } from '@wasp/utils.js'

const AddCompanyPage = () => {
  const history = useHistory()

  const [nameFieldVal, setNameFieldVal] = useState('')
  const [descriptionFieldVal, setDescriptionFieldVal] = useState('')
  const [websiteFieldVal, setWebsiteFieldVal] = useState('')

  const handleAddCompany = async (event) => {
    event.preventDefault()
    try {
      await createCompany({
        name: nameFieldVal,
        description: descriptionFieldVal,
        website: websiteFieldVal
      })

      setNameFieldVal('')
      setDescriptionFieldVal('')
      setWebsiteFieldVal('')

      // Redirect to configured page, defaults to /.
      history.push('/')
    } catch (err) {
      console.log(err)
      window.alert(errorMessage(err))
    }
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Add Company
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                back to dashboard
              </Link>
            </p>
          </div>
          <form onSubmit={handleAddCompany} className="mt-8 space-y-6" action="#" method="POST">
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
                Add Company
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddCompanyPage