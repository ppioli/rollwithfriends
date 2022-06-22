import { useEffect, useState } from "react";
import { LoadMoreFn } from "react-relay";

export interface UseBatchLoaderOpts {
  loadNext: LoadMoreFn<any>;
  loadedCount: number;
}

export function useBatchLoader({ loadNext, loadedCount }: UseBatchLoaderOpts) {
  const [loading, setLoading] = useState(false);
  const [requested, setRequested] = useState<null | number>(null);

  useEffect(() => {
    if (loading || requested == null || requested === loadedCount) {
      return;
    }

    setLoading(true);
    const count = requested - loadedCount;
    loadNext(count, {
      onComplete: () => setLoading(false),
    });
  }, [requested, loadedCount, loading, loadNext]);

  return setRequested;
}
