async function hashPassword(password: string): Promise<string> {
  // Encode the password as UTF-8
  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  // Hash the password with SHA-256
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convert ArrayBuffer to hexadecimal string for easy transmission
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export default hashPassword;
