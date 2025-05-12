import {
  Uploader,
  UploadParams,
} from '@/domain/forum/application/storage/uploader';

interface Upload {
  fileName: string;
  url: string;
}

export class FakeUploader implements Uploader {
  public uploads: Upload[] = [];

  async upload({ fileName }: UploadParams): Promise<{ url: string }> {
    const url = `https://fake-storage.com/${fileName}`;

    this.uploads.push({
      fileName,
      url,
    });

    return Promise.resolve({
      url,
    });
  }
}
