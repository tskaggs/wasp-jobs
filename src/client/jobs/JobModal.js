import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Switch } from '@headlessui/react'
import updateJob from '@wasp/actions/updateJob'
import createJob from '@wasp/actions/createJob'

const JobModal = ({ openState, onClose, jobId, companyId }) => {
  console.log('jobId', jobId)
  let [isOpen, setIsOpen] = useState(openState ?? false)

  async function closeModal(data) {
    setIsOpen(false)
    onClose()
    if (!data) return;

    console.log('🔥 data', data, jobId, companyId)

    try {
      if (jobId) {
        await updateJob({
          jobId,
          companyId,
          data
        })
      } else {
        await createJob({
          companyId,
          data
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Manage Job
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Add or update job details here.
                    </p>
                  </div>

                  <ManageJobView closeModal={closeModal} />

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

const ManageJobView = ({
  closeModal,
  title,
  description,
  duration,
  link,
  contract,
  compensation,
  equity,
  location,
  benefits,
  mvp
}) => {
  // const history = useHistory()
  const [titleFieldVal, setTitleFieldVal] = useState(title || '')
  const [descriptionFieldVal, setDescriptionFieldVal] = useState(description || '')
  const [durationFieldVal, setDurationFieldVal] = useState(duration || '')
  const [linkFieldVal, setLinkFieldVal] = useState(link || '')
  const [contractFieldVal, setContractFieldVal] = useState(contract || false)
  const [compensationFieldVal, setCompensationFieldVal] = useState(compensation || '')
  const [equityFieldVal, setEquityFieldVal] = useState(equity || '')
  const [locationFieldVal, setLocationFieldVal] = useState(location || '')
  const [benefitsFieldVal, setBenefitsFieldVal] = useState(benefits || false)
  const [mvpFieldVal, setMvpFieldVal] = useState(mvp || false)

  const handleSave = async (event) => {
    event.preventDefault()
    closeModal({
      title: titleFieldVal,
      description: descriptionFieldVal,
      duration: durationFieldVal,
      link: linkFieldVal,
      contract: contractFieldVal,
      compensation: compensationFieldVal,
      equity: equityFieldVal,
      location: locationFieldVal,
      benefits: benefitsFieldVal,
      mvp: mvpFieldVal,
    })
  }

  return (
    <>
      <form onSubmit={handleSave} className="mt-8 space-y-6">
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="name" className="sr-only">
              Job Title
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Job Title"
              value={titleFieldVal}
              onChange={e => setTitleFieldVal(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="location" className="sr-only">
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              autoComplete="location"
              required
              className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Location"
              value={locationFieldVal}
              onChange={e => setLocationFieldVal(e.target.value)}
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
              className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Job Description"
              value={descriptionFieldVal}
              onChange={e => setDescriptionFieldVal(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="link" className="sr-only">
              Job Link
            </label>
            <input
              id="link"
              name="link"
              type="text"
              autoComplete="link"
              required
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Job Link"
              value={linkFieldVal}
              onChange={e => setLinkFieldVal(e.target.value)}
            />
          </div>

          {/* Compensation Details */}
          <div className="pt-5">
            <label htmlFor="contract" className="pr-5">
              Is this a contract?
            </label>
            <Switch
              checked={contractFieldVal}
              onChange={setContractFieldVal}
              className={`${
                contractFieldVal ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Is this a contract contract?</span>
              <span
                className={`${
                  contractFieldVal ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
          <div>
            <label htmlFor="compensation" className="sr-only">
              Compensation
            </label>
            <input
              id="compensation"
              name="compensation"
              type="text"
              autoComplete="compensation"
              required
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder={contractFieldVal ? "$100" : "$150,000"}
              value={compensationFieldVal}
              onChange={e => setCompensationFieldVal(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="equity" className="sr-only">
              Equity
            </label>
            <input
              id="equity"
              name="equity"
              type="text"
              autoComplete="equity"
              required
              className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="1% or 5000 shares"
              value={equityFieldVal}
              onChange={e => setEquityFieldVal(e.target.value)}
            />
          </div>
          {/* duration */}
          {contractFieldVal && (<div>
            <label htmlFor="duration" className="sr-only">
              Duration
            </label>
            <input
              id="duration"
              name="duration"
              type="text"
              autoComplete="duration"
              required
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="3 months"
              value={durationFieldVal}
              onChange={e => setDurationFieldVal(e.target.value)}
            />
          </div>)}
          <div className="pt-5">
            <label htmlFor="jobType" className="pr-5">
              Will this include benefits?
            </label>
            <Switch
              checked={benefitsFieldVal}
              onChange={setBenefitsFieldVal}
              className={`${
                benefitsFieldVal ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Will this include benefits?</span>
              <span
                className={`${
                  benefitsFieldVal ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
          <div className="pt-5">
            <label htmlFor="jobType" className="pr-5">
              Is this an MVP?
            </label>
            <Switch
              checked={mvpFieldVal}
              onChange={setMvpFieldVal}
              className={`${
                mvpFieldVal ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Is this an MVP?</span>
              <span
                className={`${
                  mvpFieldVal ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
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

export default JobModal