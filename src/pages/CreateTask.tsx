import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from 'jwt-decode';

function CreateTask() {
    
    const [taskname,setTaskname] = useState<string>("");
    const [description,setDescription] = useState<string>("");
    const [dueyear,setDueyear] = useState<string>("");
    const [duemonth,setDuemonth] = useState<string>("");
    const [dueday,setDueDay] = useState<string>("");

    const { isAuthenticated , jwtToken ,username } = useAuth();

    const nav2 = useNavigate();

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    async function submit() {

        console.log(username)
        const data = {
            "name" : taskname,
            "description" : description,
            "duedate" : dueyear + "-" + duemonth + "-" +dueday,
            "status" : "PENDING",
            "user_name" : username
        }

        try {
            if(isAuthenticated) {
                const response = await axios.post("http://localhost:8080/tasks",data,config)
                console.log(response.data)
                nav2("/")
            }
            
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className="h-screen w-full bg-gray-100 pt-10 px-10 place-items-center">
            <p className="text-4xl text-red-400 border-b-8 mb-10">Create Task</p>
            <div className="bg-white shadow-lg w-[600px] p-4 rounded-xl">
                        <div className="flex flex-col pl-2">
                            <label className="mb-2">Name</label>
                            <input type="text" className="border w-72 mb-2 py-2 px-4 rounded-md" onChange={function(event){
                                setTaskname(event.target.value)
                            }} placeholder="Enter the new task" />
                        </div>
                        <div className="flex flex-col pl-2">
                            <label className="mb-2">Description</label>
                            <input type="text" className="border w-72 mb-2 py-2 px-4 rounded-md" onChange={function(event){
                                setDescription(event.target.value)
                            }} placeholder="Enter the description" />
                        </div>
                        <div className="flex flex-col pl-2">
                            <label className="mb-2">Duedate</label>
                            <div className="flex">
                                <input type="text" className="border w-40 mb-2 py-2 px-4 rounded-md mr-3" onChange={function(event){
                                    setDueyear(event.target.value)
                                }} placeholder="Enter the year" />
                                <input type="text" className="border w-40 mb-2 py-2 px-4 rounded-md mr-3" onChange={function(event){
                                    setDuemonth(event.target.value)
                                }} placeholder="Enter the month" />
                                <input type="text" className="border w-40 mb-2 py-2 px-4 rounded-md" onChange={function(event){
                                    setDueDay(event.target.value)
                                }} placeholder="Enter the date" />
                            </div>            
                        </div>
                        <div className="w-full p-3">                        
                        <button onClick={submit} className="bg-gradient-to-r from-cyan-500 to-blue-500 w-full my-5 p-2 rounded-md text-xl text-white text-center hover:scale-105 duration-300">Create task</button>
                        </div>
                        
                    </div>
        </div>
    )
}

export default CreateTask;