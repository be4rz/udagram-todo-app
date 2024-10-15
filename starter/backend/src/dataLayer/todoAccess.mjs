import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import AWSXRay from 'aws-xray-sdk-core'

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
        console.log('Creating a todo with id ${todo.todoId}')

        await this.dynamoDbClient.put({
            TableName: this.todosTable,
            Item: todoItem
        })

        return todoItem;
    }
}