import axios from 'axios';
import { API_BASE_URL, GET_PRESIGNED_URL_API_PATH } from './constants';

type PresignedPostUrlResponse = {
  url: string;
  fields: {
    key: string;
    acl: string;
    bucket: string;
  };
  filePath: string;
};

export async function uploadToS3({
  fileType,
  fileContents,
  accessToken,
}: {
  fileType: string;
  fileContents: File;
  accessToken: string;
}) {
  const presignedPostUrl = await getPresignedPostUrl(fileType, accessToken);
  const formData = getFormData(fileType, presignedPostUrl, fileContents);

  const response = await axios.post(presignedPostUrl.url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  console.log('response from aws....', response);
  return presignedPostUrl.filePath;
}

async function getPresignedPostUrl(fileType: string, accessToken: string) {
  const { data: presignedPostUrl } = await axios.get<PresignedPostUrlResponse>(
    `${API_BASE_URL}/${GET_PRESIGNED_URL_API_PATH}?fileType=${fileType}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Access-Control-Allow-Origin': 'http://localhost:3002',
      },
    }
  );
  console.log('presignedPostUrl', presignedPostUrl);
  return presignedPostUrl;
}

const getFormData = (
  fileType: string,
  presignedPostUrl: PresignedPostUrlResponse,
  fileContents: File
) => {
  const formData = new FormData();
  formData.append('Content-Type', fileType);

  Object.entries(presignedPostUrl.fields).forEach(([k, v]) => {
    formData.append(k, v);
  });
  formData.append('file', fileContents); // The file has be the last element

  return formData;
};
