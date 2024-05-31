'use client';

import { ITask } from "@/types/task";
import { FormEventHandler, useState } from "react";
import Modal from "./Modal";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "../api/api";

interface TaskProps {
  task: ITask
}


const tasksAction: React.FC<TaskProps> = ({task}) => {
  const router = useRouter();
  
  // Edit Button
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit
    });
    setOpenModalEdit(false);
    router.refresh();
  }

  
  // Deleted Button
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDelete(false);
    router.refresh;
  }
  
  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-2">

        <button onClick={() => setOpenModalEdit(true)} className="text-indigo-500"><FiEdit size={25} /></button>
        <Modal modalOpen = {openModalEdit} setModalOpen = {setOpenModalEdit}> 
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">Edit Task</h3>
            <div className="modal-action">
              <input value={taskToEdit} onChange={e => setTaskToEdit(e.target.value)} type="text" placeholder="Enter name" className="input input-bordered input-primary w-full max-w-full" />
              <button type="submit" className="btn btn-primary rounded-md">Submit</button>
            </div>
          </form>
        </Modal>

        <button onClick={() => setOpenModalDelete(true)} className="text-red-500"><FiTrash2 size={25}/></button>
        <Modal modalOpen = {openModalDelete} setModalOpen = {setOpenModalDelete}> 
          <h3 className="text-lg">Are you sure, you want to delete this task?</h3>
          <p className="mt-4">{taskToEdit}</p>
          <div className="modal-action gap-1">
            <button onClick={() => setOpenModalDelete(false)} className="btn bg-indigo-500 text-white">
              no
            </button>
            <button onClick={() => handleDeleteTask(task.id)} className="btn bg-red-600 text-white">
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  )
}

export default tasksAction; 