import * as uuid from 'uuid'
import { TodoAccess } from '../dataLayer/todoAccess.mjs'
import { createLogger } from '../utils/logger.mjs'

const logger = createLogger('todos');

const todoAccess = new TodoAccess();

export async function getTodos(userId){
    return await todoAccess.getTodos(userId);
}

export async function createTodo(newTodo, userId){
    const todoId = uuid.v4();
    const createdAt = new Date().toISOString();

    return await todoAccess.createTodo({
        todoId,
        userId,
        createdAt,
        done: false,
        name: newTodo.name,
        dueDate: newTodo.dueDate
    }); 
}

export async function updateTodo(userId, todoId, updatedTodo){
    return await todoAccess.updateTodo(userId, todoId, updatedTodo);
}

export async function deleteTodo(userId, todoId){
    return await todoAccess.deleteTodo(userId, todoId);
}