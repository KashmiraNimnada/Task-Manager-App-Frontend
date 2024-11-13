import { useEffect, useState } from "react";
import TaskType from "../types/TaskType";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from 'jwt-decode';

function Task() {

    const [tasks,setTasks] = useState<TaskType[]>([]);
    const [completed,isCompleted] = useState<boolean>(false);

    const { isAuthenticated , jwtToken } = useAuth();

    const [realusername,setRealusername] = useState<string | undefined>(undefined);

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    async function loadTasks() {
        try {
            console.log(config)
            const response = await axios.get("http://localhost:8080/tasks",config);
            console.log(response.data)
            setTasks(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(function(){
        if(isAuthenticated) {
            const decodedToken = jwtDecode(jwtToken);
            const realuser = decodedToken.sub
            console.log(realuser)
            setRealusername(realuser);
            console.log(realusername)
            loadTasks();
        }
    },[isAuthenticated])

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
                const response1 = await axios.put(`http://localhost:8080/tasks/${id}`,req1,config)
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
                const response2 = await axios.put(`http://localhost:8080/tasks/${id}`,req2,config)
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

    

    async function deleteTask(id:number) {
        try {
            await axios.delete(`http://localhost:8080/tasks/${id}`,config)
            loadTasks();
        } catch (error) {
            console.log(error)
        }
    }

    function setForDelete(id:number) {
        deleteTask(id)
    }

    const nav = useNavigate();

    function setNav() {
        nav("/create")
    }

    return (
        <div className="h-screen w-full bg-gray-100 pt-10 px-10">
            <div className="place-items-center flex flex-col p-5">
                <div className="mt-5 mb-10">
                    <h1 className="text-4xl text-red-400 border-b-8">Here is your task list</h1>
                </div>
                <div className="bg-white mb-10 p-5 shadow-lg rounded-xl">
                <table>
                    <thead>
                        <tr>
                            <th className="text-xl font-bold p-4 text-center">Name</th>
                            <th className="text-xl font-bold p-4 text-center">Description</th>
                            <th className="text-xl font-bold p-4 text-center">Due Date</th>
                            <th className="text-xl font-bold p-4 text-center">Mark As Done</th>
                            <th className="text-xl font-bold p-4 text-center">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks && tasks.map(function(task:TaskType){
                            if(task.status=="COMPLETED") {
                                return (
                                    <tr key={task.id}>
                                        <td className="px-6 py-3 line-through text-center">{task.name}</td>
                                        <td className="px-6 py-3 line-through text-center">{task.description}</td>
                                        <td className="px-6 py-3 line-through text-center">{task.duedate}</td>
                                        <td className="px-6 py-3">
                                            <button onClick={() => setStatus(task.id)} className="bg-gradient-to-r text-sm from-cyan-500 to-blue-500 rounded-md p-2 hover:scale-105 duration-300 text-white">{task.status}</button>
                                        </td>
                                        <td className="px-6 py-3 text-center">
                                            <button className="bg-gradient-to-r from-red-400 to-red-600 text-sm rounded-md p-2 hover:scale-105 duration-300 text-white" onClick={() => setForDelete(task.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            } else {
                                return (
                                    <tr key={task.id}>
                                        <td className="px-6 py-3 text-center">{task.name}</td>
                                        <td className="px-6 py-3 text-center">{task.description}</td>
                                        <td className="px-6 py-3 text-center">{task.duedate}</td>
                                        <td className="px-6 py-3 text-center">
                                            <button onClick={() => setStatus(task.id)} className="bg-gradient-to-r text-sm from-cyan-500 to-blue-500 rounded-md p-2 hover:scale-105 duration-300 text-white">{task.status}</button>
                                        </td>
                                        <td className="px-6 py-3 text-center">
                                            <button className="bg-gradient-to-r from-red-400 to-red-600 text-sm rounded-md p-2 hover:scale-105 duration-300 text-white" onClick={() => setForDelete(task.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </table>
                </div>
                <div className="text-center text-xl bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white mb-10 shadow-lg p-2 cursor-pointer w-[500px] hover:scale-x-105 duration-300" onClick={setNav}>
                    <p>Add a new task</p>
                </div>

            </div>
        </div>
    )
}

export default Task;