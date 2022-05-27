import Grid from "components/battleMap/Grid";
import useMapControl from "components/battleMap/useMapControl";
import { Suspense, useEffect, useRef } from "react";
import TokenLayer from "components/battleMap/tokenLayer/TokenLayer";
import { layer, layerContainer } from "components/battleMap/mapStyles";
import Toolbar from "components/battleMap/toolbar/Toolbar";
import { useLazyLoadQuery, useQueryLoader } from "react-relay";
import { BaseMapQuery as BaseMapQueryType } from "components/battleMap/__generated__/BaseMapQuery.graphql";
import { BaseMapQuery } from "components/battleMap/BaseMapQuery";

interface BaseMapProps {
  width: number;
  height: number;
}

export default function BaseMap({ width, height }: BaseMapProps) {
  const containerRef = useRef<HTMLDivElement>();

  // const [
  //   homeTabQueryRef,
  //   loadHomeTabQuery,
  // ] = useQueryLoader<HomeTabQueryType>(
  //   HomeTabQuery,
  //   props.initialQueryRef, /* e.g. provided by router */
  // );

  // const onSelectHomeTab = () => {
  //   // Start loading query for HomeTab immediately in the event handler
  //   // that triggers navigation to that tab, *before* we even start
  //   // rendering the target tab.
  //   // Calling this function will update the value of homeTabQueryRef.
  //   loadHomeTabQuery({id: '4'});
  //
  //   // ...
  // }

  // const data = useLazyLoadQuery<BaseMapQueryType>(BaseMapQuery, {});

  const [baseMapQueryRef, loadBaseMapQuery] =
    useQueryLoader<BaseMapQueryType>(BaseMapQuery);

  useEffect(() => {
    loadBaseMapQuery();
  }, []);

  const {
    bind,
    x: offsetX,
    y: offsetY,
  } = useMapControl({
    onDrag: ({ x: dx, y: dy }) => {
      if (containerRef) {
        containerRef.current.style.setProperty(
          "transform",
          `translate(${dx}px, ${dy}px)`
        );
      }
    },
  });

  const cellSize = 60;

  const layerProps = {
    height,
    width,
    offsetX,
    offsetY,
    cellSize,
  };

  return (
    <Suspense fallback={"Loading..."}>
      <div {...bind()} style={{ ...layerContainer }}>
        <div
          style={{ ...layer, top: 10, left: 10, right: 100 }}
          className={"text-right"}
        >
          {`Position (${offsetX},${offsetY})`} <br />
          {`Canvas size (${width},${height})`} <br />
          {`Scale (${1})`} <br />
        </div>
        <div ref={containerRef} style={layer}>
          <div style={layerContainer}>
            <Grid {...layerProps} />
            {baseMapQueryRef && (
              <TokenLayer {...layerProps} queryRef={baseMapQueryRef} />
            )}
          </div>
        </div>
        <Toolbar />
      </div>
    </Suspense>
  );
}
