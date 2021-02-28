import TaskModel from "../models/ToDo.js";
var TD = new TaskModel();
class toDoController{
    constructor(){}
    async CreateTask(request, response){
        var data = request.body;
        var result = await TD.createTask(
            data.name,
            data.description,
            data.date,
            data.hour,
            data.done,
        );
        response.status(200).json(result);
    }
    async GetTask(request, response){
        var result = await TD.gettask();
        response.status(200).json(result);
    }
    async UpdateTask(request, response){
    var id = request.params.id;
    var updatedata = request.body;
    var result = await TD.updatetask(id, updatedata);
    response.status(200).json(result);
    }
    async DeleteTask(request, response){
    var id = request.params.id;
    var result = await TD.deletetask(id);
    response.status(200).json(result);
    }

}
export default toDoController;
