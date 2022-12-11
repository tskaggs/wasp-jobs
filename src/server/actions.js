import HttpError from '@wasp/core/HttpError.js'

export const createCompany = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.Company.create({
    data: {
      name: args.name,
      website: args.website,
      description: args.description,
      user: { connect: { id: context.user.id } }
    }
  })
}

export const updateCompany = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.Company.updateMany({
    where: {
      id: args.companyId,
      user: { id: context.user.id }
    },
    data: args.data
  })
}

export const createTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.Task.create({
    data: {
      description: args.description,
      user: { connect: { id: context.user.id } }
    }
  })
}

// ...

export const updateTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.Task.updateMany({
    where: {
      id: args.taskId,
      user: { id: context.user.id }
    },
    data: {
      isDone: args.data.isDone
    }
  })
}