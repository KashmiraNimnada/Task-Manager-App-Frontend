function Task() {
    return (
        <div className="h-screen w-full bg-gray-100 pt-10 px-10">
            <div className="place-items-center">
                <div className="my-5">
                    <h1 className="text-4xl text-red-400 border-b-4">Here is your task list</h1>
                </div>
                <table className="bg-white">
                    <thead>
                        <th className="text-xl font-bold p-4">Name</th>
                        <th className="text-xl font-bold p-4">Description</th>
                        <th className="text-xl font-bold p-4">Due Date</th>
                        <th className="text-xl font-bold p-4">Mark As Done</th>
                        <th className="text-xl font-bold p-4">Delete</th>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Task;