import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { createLogger } from '../utils/logger.mjs'
import AWSXRay from 'aws-xray-sdk-core'

const logger = createLogger('bucketAccess');

const s3Client = new S3Client();

const xrayWrappedS3Client = AWSXRay.captureAWSv3Client(s3Client);

const bucketName = process.env.TODOS_S3_BUCKET;
const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION);

export async function getUploadUrl(todoId) {
    logger.info('Generating upload URL', {todoId: todoId});

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: todoId
    })
    const url = await getSignedUrl(xrayWrappedS3Client, command, {
      expiresIn: urlExpiration
    });

    return url;
}