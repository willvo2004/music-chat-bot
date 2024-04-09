import type { NextApiRequest, NextApiResponse } from 'next';
import querystring from 'querystring';

const client_id = process.env.SPOTIFY_CLIENT_KEY;
const redirect_uri = 'http://localhost:3000';

type ResponseData = {
  message: string
}

export default function Login(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email';
  
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
}

function generateRandomString(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}