import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const getAuthCookieOptions = () => {
  const isProduction = ENV.NODE_ENV === "production";

  return {
    httpOnly: true, // prevent XSS attacks: cross-site scripting
    // The deployed frontend and API are on different sites, so the browser
    // requires SameSite=None for the auth cookie to be sent cross-origin.
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
  };
};

export const generateToken = (userId, res) => {
  const { JWT_SECRET } = ENV;
  if (!JWT_SECRET) {
    throw new Error("Chưa cấu hình JWT_SECRET");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    ...getAuthCookieOptions(),
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
  });

  return token;
};

// http://localhost
// https://dsmakmk.com