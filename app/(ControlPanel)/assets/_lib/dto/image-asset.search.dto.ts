import { z } from 'zod';

export const SearchImageAssetDto = z.object({
  mimeType: z.string().optional(),
  q: z.string().optional(), // search keyword
});

export type TSearchImageAssetDto = z.infer<typeof SearchImageAssetDto>;
