import HttpError from '@wasp/core/HttpError.js'

export const getCompany = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  const company = context.entities.Company.findUnique(
    { where: { userId: context.user.id } }
  )
  return company
}

export const getJobs = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  const job = context.entities.Job.findMany(
    { where: { company: { id: args.companyId } } }
  )
  return job
}

export const getJob = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  if (!args.jobId) return null

  const job = context.entities.Job.findUnique(
    { where: { id: args.jobId } }
  )
  if (!job) { 
    throw new HttpError(404)
  }
  return job
}
