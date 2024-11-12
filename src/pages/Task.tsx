import { useEffect, useState } from "react";
import TaskType from "../types/TaskType";
import axios from "axios";

function Task() {

    const [tasks,setTasks] = useState<TaskType[]>([]);

    async function loadTasks() {
        try {
            const response = await axios.get("http://localhost:8080/tasks");
            console.log(response.data)
            setTasks(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(function(){
        loadTasks();
    },[])


    return (
        <div className="h-screen w-full bg-gray-100 pt-10 px-10">
            <div className="place-items-center">
                <div className="my-5">
                    <h1 className="text-4xl text-red-400 border-b-4">Here is your task list</h1>
                </div>
                <table className="bg-white">
                    <thead>
                        <tr>
                            <th className="text-xl font-bold p-4">Name</th>
                            <th className="text-xl font-bold p-4">Description</th>
                            <th className="text-xl font-bold p-4">Due Date</th>
                            <th className="text-xl font-bold p-4">Mark As Done</th>
                            <th className="text-xl font-bold p-4">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks && tasks.map(function(task:TaskType){
                            return (
                                <tr>
                                    <td className="px-6 py-2 text-center">{task.name}</td>
                                    <td className="px-6 py-2 text-center">{task.description}</td>
                                    <td className="px-6 py-2 text-center">{task.duedate}</td>
                                    <td className="px-6 py-2 text-center"></td>
                                    <td className="px-6 py-2 text-center"></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Task;