export class Task{
    title!: string;
    description!: string;
    dueDate!: Date;
    completed!: boolean;

    static of(serverData:any): Task {
        let task = new Task();
        task.title = serverData.title;
        task.description = serverData.description;
        task.dueDate = serverData.dueDate;
        task.completed = serverData.completed;
        return task;
    }

    static assign(data: any): Task {
        return Object.assign(new Task(), data);
    }


}