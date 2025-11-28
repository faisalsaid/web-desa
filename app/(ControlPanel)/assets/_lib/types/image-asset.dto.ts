export type ImageAssetDTO = {
  id: string;
  filename: string;
  alt: string | null;
  signedUrl: string;
};

export type ImageVariants = {
  thumbnail?: string;
  webp?: string;
  [key: string]: string | undefined; // optional variant types
};
