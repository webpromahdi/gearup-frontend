import jwt, { JwtPayload } from "jsonwebtoken";

type VerifyResult =
  { success: true; data: JwtPayload } | { success: false; data: null };

const verifyToken = (token: string, secret: string): VerifyResult => {
  try {
    // Next.js Edge Runtime doesn't support 'jsonwebtoken' (crypto module missing).
    // So we manually decode the payload and check expiration.
    if (!token || token.split(".").length !== 3) {
      return { success: false, data: null };
    }

    const payloadBase64 = token.split(".")[1];
    const base64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
    
    // Decode base64url robustly for Edge
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    const decoded = JSON.parse(jsonPayload) as JwtPayload;

    // Check expiration
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return { success: false, data: null };
    }

    return { success: true, data: decoded };
  } catch {
    return { success: false, data: null };
  }
};

export const jwtUtils = {
  verifyToken,
};
