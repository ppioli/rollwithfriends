import { UploadUrl } from "lib/getRelayClientEnvironment";
import { ACCESS_TOKEN } from "lib/useRefreshToken";
import { range } from "lodash";

export const uploadFile = (file: File, imageId: number) => {
  const postData = new FormData();

  postData.append("data", file);
  return fetch(`${UploadUrl}/${imageId}`, {
    method: "POST",
    body: postData,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  });
};

export interface FileUploadDefinition {
  file: File;
  id: number;
}

const DEFAULT_MAX_CHUNK = 10;

export const uploadBatch = async (
  uploads: FileUploadDefinition[],
  maxChunk?: number
) => {
  const batchSize = maxChunk ?? DEFAULT_MAX_CHUNK;

  for (const ix of range(0, uploads.length, batchSize)) {
    const start = ix;
    const end = Math.min(ix + batchSize, uploads.length);

    const promises = range(start, end).map((ix) =>
      uploadFile(uploads[ix].file, uploads[ix].id)
    );

    await Promise.all(promises);
  }
};
