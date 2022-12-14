import { Link } from 'react-router-dom'

import SignupForm from './Signup'

const SignupPage = () => {
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create an account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Log in to your account
              </Link>
            </p>
          </div>
          <SignupForm/>
          <p className="mt-2 text-center text-sm text-gray-600">
            <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignupPage