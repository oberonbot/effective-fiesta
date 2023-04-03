import React from "react";
import TwoColumns from "./TwoColumns";

function splitArray(arr, share) {
  const subarrays = [];
  for (let i = 0; i < share; i++) {
    subarrays.push([]);
  }

  let subarrayIndex = 0;
  for (const photoObj of arr) {
    subarrays[subarrayIndex].push(photoObj);
    subarrayIndex = (subarrayIndex + 1) % share;
  }

  return subarrays;
}

function Cascade(props) {
  let photos = props.photos;

  if (typeof photos === "undefined") {
    return <div className="photo-area"></div>;
  }

  if (props.type === "artists") {
    const splittedPhotos = splitArray(photos, 6);

    const photos1 = [splittedPhotos[0], splittedPhotos[1]];
    const photos2 = [splittedPhotos[2], splittedPhotos[3]];
    const photos3 = [splittedPhotos[4], splittedPhotos[5]];

    return (
      <div className="photo-area">
        <TwoColumns photos={photos1}></TwoColumns>
        <TwoColumns photos={photos2}></TwoColumns>
        <TwoColumns photos={photos3}></TwoColumns>
      </div>
    );
  } else {
    const splittedPhotos = splitArray(photos, 4);

    const photos1 = [splittedPhotos[0], splittedPhotos[1]];
    const photos2 = [splittedPhotos[2], splittedPhotos[3]];

    return (
      <div className="photo-area">
        <TwoColumns photos={photos1}></TwoColumns>
        <TwoColumns photos={photos2}></TwoColumns>
      </div>
    );
  }
}

export default Cascade;
