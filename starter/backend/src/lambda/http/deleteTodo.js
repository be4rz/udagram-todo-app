import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { getUserId } from "../utils.mjs"
import { deleteTodo } from "../../businessLogic/todo.mjs"
import { createLogger } from '../../utils/logger.mjs'

const logger = createLogger('deleteTodo');

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    logger.info('Processing event: ', {event: event});

    const userId = getUserId(event);
    const todoId = event.pathParameters.todoId;

    const deletedTodoId = await deleteTodo(userId, todoId);

    return {
      statusCode: 201,
      body: JSON.stringify({
        todoId: deletedTodoId
      })
    }
  })

