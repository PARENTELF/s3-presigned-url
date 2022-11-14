import { Auth } from 'aws-amplify';
import btn from './btn_google_signin_dark_normal_web.png';

const GoogleSignIn = () => {
  const providerGoogle: any = { provider: 'Google' };

  return (
    <button onClick={() => Auth.federatedSignIn(providerGoogle)}>
      <img
        src={btn}
        alt='Google Sign In button'
        className='googleSignIn'
        style={{ height: '45px', width: '190px' }}
      />
    </button>
  );
};
export default GoogleSignIn;
