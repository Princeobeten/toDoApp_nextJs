import { ITask } from "@/types/task"
import TasksAction from "../components/TasksAction"

interface TodoListProps {
  tasks: ITask[]
}

const TodoList: React.FC<TodoListProps> = ({tasks}) => {
  return (
    <div className="overflow-x-auto">
    <table className="table">
        <thead>
        <tr className="bg-base-200 ">
            <th>Task</th>
            <th>Action</th>
        </tr>
        </thead>

        <tbody>
          {tasks.map((task) => <TasksAction key={task.id} task={task}/> )}
        </tbody>
    </table>
    </div>
  )
}

export default TodoList