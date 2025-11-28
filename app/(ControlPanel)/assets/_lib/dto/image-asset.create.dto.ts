import { z } from 'zod';

export const CreateImageAssetDto = z.object({
  bucketKey: z.string().min(1),
  url: z.url(),
  filename: z.string().min(1),
  mimeType: z.string().min(1),
  size: z.number().positive(),
  width: z.number().optional(),
  height: z.number().optional(),
  alt: z.string().optional(),
  description: z.string().optional(),
  variants: z.any().optional(),
});

export type TCreateImageAssetDto = z.infer<typeof CreateImageAssetDto>;
