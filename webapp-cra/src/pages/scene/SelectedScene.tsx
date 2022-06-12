import {
  SelectedScene_scene$data,
  SelectedScene_scene$key,
} from "pages/scene/__generated__/SelectedScene_scene.graphql";
import { useRef } from "react";
import { useFragment } from "react-relay";
import { useResizeDetector } from "react-resize-detector";
import Grid from "features/battleMap/grid/Grid";
import MapEntityLayer from "features/battleMap/mapEntityLayer/MapEntityLayer";
import useMapControl from "features/battleMap/useMapControl";
import Toolbar from "features/battleMap/toolbar/Toolbar";
import {
  useMapEntityAddMutation,
  useMapEntitySubscription,
} from "features/mapEntity/MapEntity.graphql";
import classNames from "classnames";
import { loadImages } from "utils/imageLoader";
import { getFormData } from "utils/getFormData";
import { UploadUrl } from "lib/getRelayClientEnvironment";
import { ACCESS_TOKEN } from "lib/useRefreshToken";

export interface SceneProps {
  id: string;
  scene: SelectedScene_scene$key;
  className: string;
}

const graphql = require("babel-plugin-relay/macro");

export function SelectedScene({ id, scene, className }: SceneProps) {
  console.info(
    " ++++++++ ++++++++ ++++++++ ++++++++ Redrawing scene ++++++++ ++++++++ ++++++++ ++++++++ "
  );
  useMapEntitySubscription({ sceneId: id });

  const data: SelectedScene_scene$data = useFragment(
    graphql`
      fragment SelectedScene_scene on Scene {
        name
        ...MapEntityLayer_scene
      }
    `,
    scene
  );

  const { ref, width, height } = useResizeDetector();
  const containerRef = useRef<HTMLDivElement>(null);

  const commit = useMapEntityAddMutation();
  const { handlers, fileDragging, offsetX, offsetY, scale } = useMapControl({
    onChange: ([dx, dy], scale) => {
      if (containerRef.current) {
        containerRef.current.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
      }
    },
    onFilesDropped: (files) => {
      loadImages(files).then((imageList) => {
        const entities = imageList.map((img, ix) => ({
          x: 10,
          y: 10,
          width: img.width,
          height: img.height,
          fileType: files[ix].type,
        }));

        const input = { sceneId: id, entities };

        commit({ input }, (data) => {
          const result = data.mapEntityAdd.mapEntity;
          if (!result) {
            return;
          }

          result.forEach(({ imageId }, ix) => {
            const postData = new FormData();

            postData.append("data", files[ix]);
            fetch(`${UploadUrl}/${imageId}`, {
              method: "POST",
              body: postData,
              headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
              },
            });
          });
        });
      });
    },
  });

  const cellSize = 60;

  const layerProps = {
    offsetX,
    offsetY,
    cellSize,
    scale,
  };

  const draw = width && height && width > 50 && height > 50;

  return (
    <div ref={ref} className={className}>
      <div
        {...handlers}
        className={classNames(
          "w-full h-full relative touch-none overflow-hidden"
        )}
      >
        {draw && (
          <div
            className={classNames("absolute", { blur: fileDragging })}
            ref={containerRef}
          >
            <Grid
              {...layerProps}
              width={width}
              height={height}
              className={"absolute"}
            />

            <MapEntityLayer sceneId={id} {...layerProps} entities={data} />
          </div>
        )}
        <div className={"absolute left-1 bottom-1"}>
          {`Position (${offsetX},${offsetY})`} <br />
          {`Canvas size (${width},${height})`} <br />
          {`Scale (${scale})`} <br />
        </div>
        {fileDragging && (
          <div
            className={
              "absolute inset-y-0 left-0 editor-width flex justify-center content-center flex-wrap"
            }
          >
            <div className={"text-center"}>
              <h3>Drag ICON</h3>
              <h1>Drop to add</h1>
            </div>
          </div>
        )}
        <Toolbar
          sceneId={id}
          className={
            "absolute top-0 bottom-0 left-1 flex flex-col justify-center"
          }
        />
      </div>
    </div>
  );
}
