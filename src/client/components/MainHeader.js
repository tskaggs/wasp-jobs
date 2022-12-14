import { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

import logout from '@wasp/auth/logout.js'
import useAuth from '@wasp/auth/useAuth.js'

const navigation = [
  { name: 'Home', href: '/', current: false, private: false },
  { name: 'Dashboard', href: '/dashboard', current: false, private: true },
  { name: 'Analytics', href: '#', current: false, private: true },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Company', href: '/managecompany' },
  { name: 'Settings', href: '#' },
]

const imageUrl = 'https://wasp-lang.dev/img/wasp-logo-eqpar-circle.png'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ProfileDropdown = ({ user }) => {
  console.log('🔥user', user)
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>
          <img className="h-8 w-8 rounded-full" src={imageUrl} alt="" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <Link
                  to={item.href}
                  className={classNames(
                    active ? 'bg-gray-500' : '',
                    'block px-4 py-2 text-sm text-gray-700'
                  )}
                >
                  {item.name}
                </Link>
              )}
            </Menu.Item>
          ))}
          <button
            onClick={logout}
            className="block px-4 py-2 text-sm text-gray-700"
          >
            Log out
          </button>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

const MainHeader = () => {
  const { data: user } = useAuth()

  console.log(user)
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-yellow-100">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <Link
                      to="/"
                      className="flex-shrink-0 bg-yellow-400 p-2 rounded border border-double border-yellow-600">
                      <span className="h-8 w-8 font-medium text-slate-900 text-lg font-sans">
                        🐝💼 Wasp Jobs
                      </span>
                    </Link>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => {
                          let nav;
                          if (!item.private || (item.private && user)) {
                            nav = (
                              <Link
                                key={item.name}
                                to={item.href}
                                className={classNames(
                                  item.current
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-700 hover:bg-gray-700 hover:text-white',
                                  'px-3 py-2 rounded-md text-sm font-medium'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                              >
                                {item.name}
                              </Link>
                            )
                          }
                          return nav
                        }
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {user ?
                      (<ProfileDropdown user={user} />) : (<>
                      <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                        <Link to="/login" className="whitespace-nowrap text-base font-medium text-gray-700 hover:text-gray-900">
                          Sign in
                        </Link>
                        <Link
                          to="/signup"
                          className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-yellow-700"
                        >
                          Sign up
                        </Link>
                      </div>
                      </>)}
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="border-t border-gray-700 pt-4 pb-3">
                  {user && (
                    <div className="flex items-center px-5">
                      {/* <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                      </div> */}
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">{user.name}</div>
                        <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                      </div>
                      <button
                        type="button"
                        className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  )
}

export default MainHeader