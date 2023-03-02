import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function PhotoCard(props) {
  const [hovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(true);
  };

  const handleUnhover = () => {
    setHovered(false);
  };

  let photocard;
  let output;

  if (hovered) {
    photocard = (
      <>
        <div className="photo-hovered" onMouseLeave={handleUnhover}>
          <h5>{props.name}</h5>
          <img src={`./upload/gallery/${props.img}`} alt=""></img>
        </div>
      </>
    );
  } else {
    photocard = (
      <>
        <div className="photo-unhovered" onMouseEnter={handleHover}>
          <img src={`./upload/gallery/${props.img}`} alt=""></img>
        </div>
      </>
    );
  }
  if (props.type === "artists") {
    output = (
      <Link className="link" to={`/gallery/artist/${props.id}`}>
        {photocard}
      </Link>
    );
  } else {
    output = (
      <Link className="link" to={`/gallery/artwork/${props.id}`}>
        {photocard}
      </Link>
    );
  }
  return <div className="photo-card">{output}</div>;
}

function TwoColumns(props) {
  const photos = props.photos;

  const photoList1 = photos[0].map((photo) => (
    <PhotoCard
      key={photo["id"].toString()}
      id={photo["id"]}
      name={photo["name"]}
      size={photo["size"]}
      img={photo["img"]}
      type={photo["type"]}
    ></PhotoCard>
  ));

  const photoList2 = photos[1].map((photo) => (
    <PhotoCard
      key={photo["id"].toString()}
      id={photo["id"]}
      name={photo["name"]}
      size={photo["size"]}
      img={photo["img"]}
      type={photo["type"]}
    ></PhotoCard>
  ));

  return (
    <div className="two-columns">
      <Row>
        <Col>{photoList1}</Col>
        <Col>{photoList2}</Col>
      </Row>
    </div>
  );
}

export default TwoColumns;
