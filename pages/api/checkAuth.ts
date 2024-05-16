"use server";

import cookie from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const session = cookies["data-access"];

  if (session) {
    try {
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(401).json({ success: false });
    }
  } else {
    res.status(401).json({ success: false });
  }
}
