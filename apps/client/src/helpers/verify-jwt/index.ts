async function verifyJwt(token: string, secret: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);

  // Import the secret as an HMAC key
  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  // Split the token into header, payload, and signature
  const [header, payload, signature] = token.split(".");

  const data = `${header}.${payload}`;
  const signatureBuffer = Uint8Array.from(atob(signature), (c) =>
    c.charCodeAt(0)
  );

  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    signatureBuffer,
    new TextEncoder().encode(data)
  );

  return valid;
}
export default verifyJwt;
