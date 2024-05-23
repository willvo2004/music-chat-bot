import querystring from "querystring";
import { saveUser } from "../../lib/data";
import axios from "axios";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { createSession, decrypt } from "../../lib/session";

export async function GET(req: Request, res: Response) {
  const client_id = process.env.SPOTIFY_CLIENT_KEY;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET_KEY;
  const redirect_uri = "http://localhost:3000/api/callback";
  const prisma = new PrismaClient();

  const base64Credentials = btoa(`${client_id}:${client_secret}`);
  const url = new URL(req.url);

  const code = url.searchParams.get("code") || null;
  const state = url.searchParams.get("state") || null;

  if (state === null) {
    redirect("/#" + querystring.stringify({ error: "state_mismatch" }));
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

  if (response) {
    try {
      saveUser(
        response.email,
        response.display_name,
        response.images[0].url,
        refresh_token,
      );
      const user = await prisma.user.findUnique({
        where: {
          email: response.email,
        },
      });
      if (user) {
        await createSession(user.id);
      }
    } catch (error) {
      console.error("Error occured: ", error);
    }
  }
  cookies().set("data-access", access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
  redirect("/");
}
