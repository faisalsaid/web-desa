import { z } from 'zod';

export const UpdateImageAssetDto = z.object({
  id: z.string().min(1),
  alt: z.string().optional(),
  description: z.string().optional(),
});

export type TUpdateImageAssetDto = z.infer<typeof UpdateImageAssetDto>;
