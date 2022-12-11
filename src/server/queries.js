import HttpError from '@wasp/core/HttpError.js'

export const getCompany = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  const company = context.entities.Company.findUnique(
    { where: { userId: context.user.id } }
  )
  return company
}

export const getTasks = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.Task.findMany(
    { where: { user: { id: context.user.id } } }
  )
}