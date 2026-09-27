export interface KeyPairData {
  keyPair: CryptoKeyPair;
  publicKeyDisplay: string;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

export async function generateKeyPair(): Promise<KeyPairData> {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-256",
    },
    true,
    ["sign", "verify"]
  );

  const rawPublicKey = await crypto.subtle.exportKey(
    "raw",
    keyPair.publicKey
  );

  return {
    keyPair,
    publicKeyDisplay: arrayBufferToBase64(rawPublicKey),
  };
}

export async function signMessage(
  privateKey: CryptoKey,
  message: string
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);

  const signature = await crypto.subtle.sign(
    {
      name: "ECDSA",
      hash: "SHA-256",
    },
    privateKey,
    data
  );

  return arrayBufferToBase64(signature);
}

export async function verifySignature(
  publicKey: CryptoKey,
  message: string,
  signatureBase64: string
): Promise<boolean> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const signatureBuffer = base64ToArrayBuffer(signatureBase64);

  return crypto.subtle.verify(
    {
      name: "ECDSA",
      hash: "SHA-256",
    },
    publicKey,
    signatureBuffer,
    data
  );
}