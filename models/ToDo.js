import mongoose from "../connection/connect.js";
import modelenum from "../utils/enumModel.js";
class TaskModel {
    constructor() {
        this.Schema = mongoose.Schema;
        this.TaskSchema = new this.Schema({
            name: String,
            descripcion: String,
            date: Date,
            hour: String,
            done: Boolean
        });
        //this.mymodel = mongoose.model("tasks", this.TaskSchema)
         if (modelenum["tasks"] == null) {
            this.mymodel = mongoose.model("tasks", this.TaskSchema);
            modelenum["tasks"] = this.mymodel;
          } else {
            this.mymodel = modelenum["tasks"];
        } 
    }
    /** Agregar Tareas. */ 
    createTask(name, descripcion, date, hour, done) {
        var task = {
            name,
            descripcion,
            date,
            hour,
            done,
        };
        var newtask = new this.mymodel(task);
        // validación
        var error = newtask.validateSync();
            return new Promise((resolve,reject) => {
                if(error){
                    resolve(error);
                    return;
               }
                newtask.save().then((docs) => {
                    console.log("Tarea por realizar REGISTRADA.");
                    resolve(docs);
                });
            });
    }
    //
    gettask(){
        return new Promise((resolve,reject) => {
            this.mymodel.find({}, (err,docs) => {
                if (err) {
                    console.log (err);
                    resolve(err);
                    return;
                }
                resolve(docs);
            });
        });
    }

    updatetask(id, todoUpdate){
        return new Promise((resolve,reject) => {
            this.mymodel.update({ _id: id}, {$set: taskUpdate}, (err,docs) => {
                if(err){
                    console.log(err);
                    resolve(err);
                    return;
                }
                resolve(docs);
            });
        });    
    }
    //
    deletetask(id) {
        return new Promise((resolve, reject) => {
          this.mymodel.remove({ _id: id }).then((err, docs) => {
            if (err) {
              console.log(err);
              resolve(err);
              return;
            }
            resolve(docs);
          });
        });
    }

    getModel(){
        return this.mymodel
    }
    getSchema(){
        return this.todoSchema;
    }
}
export default TaskModel;