import { FormEvent, useState } from 'react';
import { useFileChange } from '../hook/use-file-change';
import { S3_BUCKET_URL } from '../utils/constants';
import { uploadToS3 } from '../utils/s3-upload';

const UserHome = (props: any) => {
  const { accessToken } = props;

  const {
    fileError,
    fileName,
    fileContents,
    fileType,
    fileDispatch,
    handleFileChange,
  } = useFileChange();

  const [s3FileUrl, setS3FileUrl] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (fileType && fileContents) {
        const filePath = await uploadToS3({
          fileType,
          fileContents,
          accessToken,
        });
        setS3FileUrl(`${S3_BUCKET_URL}/${filePath}`);
        fileDispatch({ type: 'RESET_FILE_STATE' });
      }
    } catch (err) {
      console.log('error is', err);
    }
  };

  return (
    <>
      <h3>Hello, {props.email}.</h3>
      <h1>Upload files...</h1>
      {fileError && (
        <h1 className='max-w-3xl text-3xl text-red-600'>{fileError}</h1>
      )}

      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='picture'>
              <span>{fileName || 'File Input'}</span>
              <input
                type='file'
                accept='image/*'
                id='picture'
                name='picture'
                className='hidden'
                onChange={handleFileChange}
              />
            </label>
            <button type='submit'>Upload to s3</button>
          </div>
        </form>
        <span>
          <img src={s3FileUrl || ''} alt='' />
        </span>
      </div>
    </>
  );
};
export default UserHome;
