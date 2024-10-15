import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { getUserId } from "../utils.mjs"
import { getTodos } from "../../businessLogic/todo.mjs"
import { createLogger } from '../../utils/logger.mjs'

const logger = createLogger('todos');

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

    const todoItems = await getTodos(userId);

    return {
      statusCode: 201,
      body: JSON.stringify({
        items: todoItems
      })
    }
  })


