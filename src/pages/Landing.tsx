import GoogleSignIn from '../auth/GoogleSignIn';

const Landing = () => {
  return (
    <>
      <h3>Authenticate to continue</h3>
      <GoogleSignIn />
    </>
  );
};
export default Landing;
