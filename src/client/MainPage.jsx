import getTasks from '@wasp/queries/getTasks'
import getCompany from '@wasp/queries/getCompany'
import { useQuery } from '@wasp/queries'
import createTask from '@wasp/actions/createTask'
import updateTask from '@wasp/actions/updateTask'
import logout from '@wasp/auth/logout.js'
import './Main.css'
import AddCompanyAlert from './company/AddCompanyAlert'
import MainHeader from './components/MainHeader'

const MainPage = ({ user }) => {
  const { data: tasks, isFetching, error } = useQuery(getTasks)
  const { data: company, isFetchingCompany, errorCompany } = useQuery(getCompany)

  return (
    <div>
      <MainHeader/>
      {!company && <AddCompanyAlert/>}
      <NewTaskForm/>
      {tasks && <TasksList tasks={tasks} />}

      {isFetching && 'Fetching...'}
      {error && 'Error: ' + error}
      <button onClick={logout} class="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"> Logout </button>
    </div>
  )
}

const Task = (props) => {
  const handleIsDoneChange = async (event) => {
    try {
      await updateTask({
        taskId: props.task.id,
        data: { isDone: event.target.checked }
      })
    } catch (error) {
      window.alert('Error while updating task: ' + error.message)
    }
  }

  return (
    <div>
      <input
        type='checkbox' id={props.task.id}
        checked={props.task.isDone}
        onChange={handleIsDoneChange}
      />
      {props.task.description}
    </div>
  )
}

const TasksList = (props) => {
  if (!props.tasks?.length) return 'No tasks'
  return props.tasks.map((task, idx) => <Task task={task} key={idx} />)
}

const NewTaskForm = (props) => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const description = event.target.description.value
      event.target.reset()
      await createTask({ description })
    } catch (err) {
      window.alert('Error: ' + err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name='description'
        type='text'
        defaultValue=''
      />
      <input type='submit' value='Create task' />
    </form>
  )
}

export default MainPage