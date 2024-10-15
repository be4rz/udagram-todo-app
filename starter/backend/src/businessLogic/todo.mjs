import * as uuid from 'uuid'

import { TodoAccess } from '../dataLayer/todoAccess.mjs';

const todoAccess = new TodoAccess();

export async function createTodo(newTodo, userId){
    const todoId = uuid.v4();

    return await todoAccess.createTodo({
        todoId,
        userId,
        name: newTodo.name,
        dueDate: newTodo.dueDate
    }); 
}