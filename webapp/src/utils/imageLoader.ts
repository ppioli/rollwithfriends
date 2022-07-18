// export function loadImages(files: File[]): Promise<HTMLImageElement[]> {
//   const loaders = files.map((file, ix) => {
//     return new Promise<string>((resolve) => {
//       const reader = new FileReader();
//       reader.addEventListener("load", (event) => {
//         resolve(event.target?.result as string);
//       });
//       reader.readAsDataURL(file);
//     }).then(
//       (src) =>
//         new Promise<HTMLImageElement>((resolve) => {
//           const img = new Image();
//           img.onload = (event: any) => {
//             resolve(img);
//           };
//           img.src = src;
//         })
//     );
//   });
//
//   return Promise.all(loaders);
// }

export function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      resolve(event.target?.result as string);
    });
    reader.readAsDataURL(file);
  }).then(
    (src) =>
      new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.onload = (event: any) => {
          resolve(img);
        };
        img.src = src;
      })
  );
}
