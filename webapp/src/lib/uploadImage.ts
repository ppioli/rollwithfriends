import { range } from "lodash";
import { getDefaultHeaders, ServerUrl } from "lib/appFetch";

const DEFAULT_MAX_CHUNK = 10;

export interface FileUploadResult {
  file: File;
  id: string;
}

export const uploadFile = (file: File): Promise<FileUploadResult> => {
  const postData = new FormData();
  postData.append("data", file);

  return fetch(`${ServerUrl}/upload`, {
    method: "POST",
    headers: getDefaultHeaders(),
    body: postData,
  })
    .then((res) => {
      if (res.ok) {
        return res.text();
      }
      throw new Error("Error on upload");
    })
    .then((val) => ({
      file,
      id: val!,
    }));
};

export const uploadBatch = async (
  uploads: File[],
  onBatchCompleted: (uploaded: FileUploadResult[]) => void,
  maxChunk?: number
) => {
  const batchSize = maxChunk ?? DEFAULT_MAX_CHUNK;

  for (const ix of range(0, uploads.length, batchSize)) {
    const start = ix;
    const end = Math.min(ix + batchSize, uploads.length);

    const promises = range(start, end).map((ix) => uploadFile(uploads[ix]));

    Promise.all(promises).then(onBatchCompleted);
  }
};
