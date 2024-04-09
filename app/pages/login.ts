import { useEffect } from 'react';
import { useRouter } from 'next/router';
import  express  from 'express';
import querystring from 'querystring';

const client_id = 'CLIENT_ID';
const redirect_uri = 'http://localhost:8888/callback';

const app = express();

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email';

    router.push('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
  }, [router]);

  return null;
}