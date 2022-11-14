import { presignedUrlDev } from '../config/aws-exports';

// S3 API
export const GET_PRESIGNED_URL_API_PATH = 'get-presigned-url-s3';

const DEV_API_URL = presignedUrlDev.apiUrl;
const DEV_API_URL_WITHOUT_TRAILING_SLASH = DEV_API_URL.slice(
  0,
  DEV_API_URL.length - 1
);

const API_BASE_URL = DEV_API_URL_WITHOUT_TRAILING_SLASH;
const REGION = presignedUrlDev.region;
const S3_BUCKET_NAME = presignedUrlDev.bucketName;

export const S3_BUCKET_URL = `https://${S3_BUCKET_NAME}.s3.amazonaws.com`;
export const MAX_FILE_SIZE_BYTES = 1000000;

export { REGION, API_BASE_URL };
