import UserType from "./UserType";

interface TaskType {
    id : number,
    name : string,
    description : string,
    duedate : string,
    status : string,
    user : UserType,
}

export default TaskType;