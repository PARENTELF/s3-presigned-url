import { Auth, Hub } from 'aws-amplify';
import { useEffect, useState } from 'react';
import './App.css';
import Landing from './pages/Landing';
import UserHome from './pages/UserHome';

function App() {
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function getUser() {
    try {
      const token = await Auth.currentAuthenticatedUser();
      const creds = await Auth.currentCredentials();

      Auth.currentSession().then((res) => {
        let accessToken = res.getAccessToken();
        let jwt = accessToken.getJwtToken();
        console.log(`myAccessToken: ${JSON.stringify(accessToken)}`);
        console.log(`myJwt: ${jwt}`);
        setAccessToken(jwt);
      });

      console.log('token ==> ', token);
      console.log('creds ==> ', creds);

      setLoading(false);
      setUser(token);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    Hub.listen('auth', ({ payload }) => {
      console.log('auth payload', payload);

      if (payload.event === 'signIn') {
        return getUser();
      }
      if (payload.event === 'signOut') {
        setUser(null);
        return setLoading(false);
      }
    });
    getUser();
  }, []);

  if (loading) return <span>Loading</span>;
  return (
    <div className='App'>
      {user ? (
        <UserHome email={user.attributes.email} accessToken={accessToken} />
      ) : (
        <Landing />
      )}
    </div>
  );
}

export default App;
