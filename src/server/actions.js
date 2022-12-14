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

export const createJob = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.Job.create({
    data: {
      title: args.data.title,
      description: args.data.description,
      duration: args.data.duration,
      link: args.data.link,
      contract: args.data.contract,
      compensation: args.data.compensation,
      equity: args.data.equity,
      benefits: args.data.benefits,
      mvp: args.data.mvp,
      location: args.data.location,
      company: { connect: { id: args.companyId } }
    }
  })
}

export const updateJob = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.Job.updateMany({
    where: {
      id: args.jobId,
      company: { id: args.companyId }
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