import type { NextApiRequest, NextApiResponse } from "next";
import querystring from "querystring";
import { saveUser } from "../../app/lib/data";
import axios from "axios";
import { serialize } from "cookie";
import { encrypt, decrypt } from "../../app/lib/session";

const client_id = process.env.SPOTIFY_CLIENT_KEY;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET_KEY;
const redirect_uri = "http://localhost:3000/api/callback";

const base64Credentials = btoa(`${client_id}:${client_secret}`);

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect("/#" + querystring.stringify({ error: "state_mismatch" }));
  }
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + base64Credentials,
    },
    json: true,
  };

  const {
    access_token,
    refresh_token,
  }: { access_token: string; refresh_token: string } = (
    await axios.post(authOptions.url, authOptions.form, {
      headers: authOptions.headers,
    })
  ).data;

  const response = (
    await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
  ).data;

  saveUser(
    response.email,
    response.display_name,
    response.images[0].url,
    refresh_token,
  );
  const encryptedData = await encrypt({ access_token });
  const cookie = serialize("data-access", encryptedData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    path: "/",
  });
  res.setHeader("Set-Cookie", cookie);
  res.redirect("/");
}
