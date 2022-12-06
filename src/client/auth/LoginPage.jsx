import { Link } from 'react-router-dom'

import LoginForm from './Login'

const LoginPage = () => {
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                I don't have an account yet — go to signup
              </Link>
            </p>
          </div>
          <LoginForm/>
        </div>
      </div>
    </>
  )
}

export default LoginPage