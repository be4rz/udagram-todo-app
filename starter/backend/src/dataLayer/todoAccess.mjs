import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import AWSXRay from 'aws-xray-sdk-core'
import { createLogger } from '../utils/logger.mjs'

const logger = createLogger('todos');

export class TodoAccess{
    constructor(
        documentClient = AWSXRay.captureAWSv3Client(new DynamoDB()),
        todosTable = process.env.TODOS_TABLE
    ){
        this.documentClient = documentClient
        this.todosTable = todosTable
        this.dynamoDbClient = DynamoDBDocument.from(this.documentClient)
    }

    async createTodo(todoItem){
        logger.info('Creating a todo with id ${todoItem.todoId}',{todoItem: todoItem})

        await this.dynamoDbClient.put({
            TableName: this.todosTable,
            Item: todoItem
        })

        return todoItem;
    }

    async getTodos(userId){
        logger.info('Getting todos for user ${userId}',{userId: userId})

        const result = await this.dynamoDbClient.query({
            TableName: this.todosTable,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        })

        return result.Items;
    }

    async updateTodo(userId, todoId, updatedTodo){
        logger.info('Updating todo with id ${todoId}',{todoId: todoId})

        await this.dynamoDbClient.update({
            TableName: this.todosTable,
            Key: {
                userId,
                todoId
            },
            UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done',
            ExpressionAttributeValues: {
                ':name': updatedTodo.name,
                ':dueDate': updatedTodo.dueDate,
                ':done': updatedTodo.done
            },
            ExpressionAttributeNames: {
                '#name': 'name'
            }
        })

        return updatedTodo;
    }

    async deleteTodo(userId, todoId){
        logger.info('Deleting todo with id ${todoId}',{todoId: todoId})

        await this.dynamoDbClient.delete({
            TableName: this.todosTable,
            Key: {
                userId,
                todoId
            }
        })

        return todoId;
    }

    async updateAttachmentUrl(userId, todoId, attachmentUrl){
        logger.info('Updating attachment URL for todo with id ${todoId}',{todoId: todoId})

        await this.dynamoDbClient.update({
            TableName: this.todosTable,
            Key: {
                userId,
                todoId
            },
            UpdateExpression: 'set attachmentUrl = :attachmentUrl',
            ExpressionAttributeValues: {
                ':attachmentUrl': attachmentUrl
            }
        })
    }
}