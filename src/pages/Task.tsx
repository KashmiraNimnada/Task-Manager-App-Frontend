import { useEffect, useState } from "react";
import TaskType from "../types/TaskType";
import axios from "axios";

function Task() {

    const [tasks,setTasks] = useState<TaskType[]>([]);
    const [completed,isCompleted] = useState<boolean>(false);

    async function loadTasks() {
        try {
            const response = await axios.get("http://localhost:8080/tasks");
            console.log(response.data)
            setTasks(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function updateTask(id:number) {
        if(completed) {
            const req1 = {
                "name" : "Java assignment 3",
                "description" : "This assignment contains about Arrays",
                "duedate" : "2024-11-30",
                "status" : "COMPLETED",
                "user_id" : 3
            }

            try {
                const response1 = await axios.put(`http://localhost:8080/tasks/${id}`,req1)
                console.log(response1.data);
                loadTasks()
            } catch (error) {
                console.log(error)
            }

        }else {
            const req2 = {
                "name" : "Java assignment 3",
                "description" : "This assignment contains about Arrays",
                "duedate" : "2024-11-30",
                "status" : "PENDING",
                "user_id" : 3
            }

            try {
                const response2 = await axios.put(`http://localhost:8080/tasks/${id}`,req2)
                console.log(response2.data)
                loadTasks()
            } catch (error) {
                console.log(error)
            }

        }
    }

    function setStatus(id:number) {
        isCompleted(!completed);
        updateTask(id);
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
                            if(task.status=="COMPLETED") {
                                return (
                                    <tr key={task.id}>
                                        <td className="px-6 py-2 line-through">{task.name}</td>
                                        <td className="px-6 py-2 line-through">{task.description}</td>
                                        <td className="px-6 py-2 line-through">{task.duedate}</td>
                                        <td className="px-6 py-2">
                                            <button onClick={() => setStatus(task.id)} className="bg-gradient-to-r text-sm from-cyan-500 to-blue-500 rounded-md p-2 hover:scale-105 duration-300 text-white">{task.status}</button>
                                        </td>
                                        <td className="px-6 py-2 text-center"></td>
                                    </tr>
                                )
                            } else {
                                return (
                                    <tr key={task.id}>
                                        <td className="px-6 py-2">{task.name}</td>
                                        <td className="px-6 py-2">{task.description}</td>
                                        <td className="px-6 py-2">{task.duedate}</td>
                                        <td className="px-6 py-2">
                                            <button onClick={() => setStatus(task.id)} className="bg-gradient-to-r text-sm from-cyan-500 to-blue-500 rounded-md p-2 hover:scale-105 duration-300 text-white">{task.status}</button>
                                        </td>
                                        <td className="px-6 py-2 text-center"></td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Task;