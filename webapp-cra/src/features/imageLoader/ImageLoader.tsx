import React, { useState } from "react";
import { commitLocalUpdate, useSubscription } from "react-relay";
import { ImageLoaderSubscription as ImageLoaderSubscriptionType } from "./__generated__/ImageLoaderSubscription.graphql";
import { RelayEnvironment } from "lib/getRelayClientEnvironment";

const graphql = require("babel-plugin-relay/macro");

interface ImageLoaderProps {
  width: number;
  height: number;
  imageId: number;
  entityId: string;
}

const ImageLoaderSubscription = graphql`
  subscription ImageLoaderSubscription($fileId: Int!) {
    fileLoadingSub(fileId: $fileId) {
      progress
    }
  }
`;

export function ImageLoader({
  width,
  height,
  imageId,
  entityId,
}: ImageLoaderProps) {
  const [progress, setProgress] = useState(0);
  useSubscription<ImageLoaderSubscriptionType>({
    subscription: ImageLoaderSubscription,
    variables: { fileId: imageId },
    onError: (e) => {
      console.error(e);
    },
    onNext: (data) => {
      const progress = data?.fileLoadingSub.progress;
      console.log("Got " + progress);
      if (progress === 100) {
        commitLocalUpdate(RelayEnvironment, (store) => {
          const entity = store.get(entityId);
          entity?.setValue("LOADED", "imageState");
        });
      } else {
        setProgress(progress ?? 0);
      }
    },
  });
  return (
    <div className={"border-4 bg-red-400"} style={{ width, height }}>
      Loading ({progress}%)
    </div>
  );
}

export function ImageMissing({ width, height }: ImageLoaderProps) {
  const onChange = (evt: any) => {
    console.log(evt);
  };

  return (
    <div className={"border-4 bg-red-400"} style={{ width, height }}>
      Whoops... This image seems to be missing
      <input type={"file"} onChange={onChange} />
    </div>
  );
}
