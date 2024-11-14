import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

    const [email,setEmail] = useState<string>("");
    const [error,setError] = useState<string>("");
    const [username,setUsername] = useState<string>("");
    const [createdpw,setCreatepw] = useState<string>("");
    const [checkpw,setChechpw] = useState<string>("");

    const nav = useNavigate();

    async function submit(event: any) {
        event.preventDefault();
        if(email === "") {
            setError("Enter your email");

        }else if(username === ""){
            setError("Enter your username");
        }else if(createdpw === ""){
            setError("Enter your password");
        }else if(checkpw === ""){
            setError("Confirm your password");
        }else {
            if(createdpw==checkpw) {
                const data = {
                    "email" : email,
                    "username" : username,
                    "password" : createdpw
                }
                const response = await axios.post("http://localhost:8080/auth/users",data)
                console.log(response)
                nav("/auth/login")
            }else {
                setError("Passwords are not matching");
            }
        }

    }

    return (
        <div className="h-screen w-full items-center pt-10 justify-center bg-gray-100">
            <div className="max-w-[500px] mx-auto px-10 pb-10 pt-2 bg-white rounded-xl shadow-lg">
                <div>
                    <h1 className="text-center text-4xl pt-2 pb-8 font-normal text-neutral-700">Sign up</h1>
                </div>
                <form onSubmit={submit}>
                    <div className="flex flex-col pl-2">
                        <label className="mb-2">Email</label>
                        <input type="text" onChange={function(event) {
                            setEmail(event.target.value);
                            setError("");
                        }} placeholder="Enter your email" className="border w-full mb-2 py-2 px-4 rounded-md"/>
                    </div>
                    <div className="flex flex-col pl-2">
                        <label className="mb-2">Username</label>
                        <input type="text" onChange={function(event) {
                            setUsername(event.target.value);
                            setError("");
                        }} placeholder="Enter your username" className="border w-full mb-2 py-2 px-4 rounded-md"/>
                    </div>
                    <div className="flex flex-col pl-2">
                        <label className="mb-2">Create password</label>
                        <input type="password" onChange={function(event){
                            setCreatepw(event.target.value);
                            setError("");
                        }} placeholder="Create password" className="border w-full mb-8 py-2 px-4 rounded-md"/>
                    </div>
                    <div className="flex flex-col pl-2">
                        <label className="mb-2">Enter password again</label>
                        <input type="password" onChange={function(event){
                            setChechpw(event.target.value);
                            setError("");
                        }} placeholder="Enter password again" className="border w-full mb-8 py-2 px-4 rounded-md"/>
                    </div>
                    {error && 
                        <div className="text-red-500 text-sm pb-5">
                            {error}
                        </div>
                    }
                    <div>
                        <button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-500 w-full p-2 rounded-md text-white text-lg hover:scale-x-105 duration-300">
                            Create account
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Signup;