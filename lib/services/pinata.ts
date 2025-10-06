import { PinataSDK } from 'pinata';

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: 'gateway.pinata.cloud',
});

export interface IPFSUploadResult {
  hash: string;
  url: string;
  thumbnailUrl: string;
}

export async function uploadToIPFS(
  imageBase64: string,
  filename: string = 'incident.jpg'
): Promise<IPFSUploadResult> {
  try {
    // Convert base64 to blob
    const base64Data = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Upload to Pinata
    const upload = await pinata.upload.file(
      new File([buffer], filename, { type: 'image/jpeg' })
    );

    const hash = upload.IpfsHash;
    const url = `https://gateway.pinata.cloud/ipfs/${hash}`;

    // For now, use the same image as thumbnail
    // In production, you might want to generate a thumbnail
    const thumbnailUrl = url;

    return {
      hash,
      url,
      thumbnailUrl,
    };
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw new Error('Failed to upload image to IPFS');
  }
}

