import { getUploadUrl } from '../fileStorage/bucketAccess.mjs'
import { TodoAccess } from '../dataLayer/todoAccess.mjs'
import { createLogger } from '../utils/logger.mjs'

const logger = createLogger('attachedFile');

const todoAccess = new TodoAccess();

const bucketName = process.env.TODOS_S3_BUCKET;

export async function generateUploadUrl(userId, todoId){
    logger.info('Generating upload URL', {userId: userId, todoId: todoId});

    const uploadUrl = await getUploadUrl(todoId);

    const attachmentUrl = `https://${bucketName}.s3.amazonaws.com/${todoId}`;
    await todoAccess.updateAttachmentUrl(userId, todoId, attachmentUrl);

    return uploadUrl;
}