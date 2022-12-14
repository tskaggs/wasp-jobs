const FeatureSection = () => {
  return (
    <div className="bg-white py-14 sm:py-12 lg:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="sm:text-center">
          <h2 className="text-lg font-semibold leading-8 text-yellow-600">Wasp Jobs</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Find your future career!</p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            This is built as a proof of concept with the <a href="https://wasp-lang.dev/" className="text-lg font-semibold leading-8 text-yellow-600">Wasp DSL</a>.<br />
            🛑 Please use caution when using this app.
          </p>
        </div>
      </div>
    </div>
  )
}

export default FeatureSection