import { ImageVariants } from '../types/image-asset.dto';

export class ImageAssetEntity {
  constructor(
    public id: string,
    public bucketKey: string,
    public url: string,
    public filename: string,
    public mimeType: string,
    public size: number,
    public width?: number | null,
    public height?: number | null,
    public alt?: string | null,
    public description?: string | null,
    public variants?: ImageVariants | null,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}
