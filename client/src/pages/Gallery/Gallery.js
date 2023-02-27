import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import MainTitle from "../../Components/Gallery/MainTitle";
import Block from "../../Components/Gallery/Block";
import ToolBar from "../../Components/Gallery/ToolBar";
import Cascade from "../../Components/Gallery/Cascade";
import axios from "axios";
// import { useLocation } from "react-router-dom";

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [type, setType] = useState("artists");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await axios.get(`/gallery/${type}`);
          setPhotos(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [type, isLoading]);

  let cascade;

  if (type === "artists") {
    cascade = <Cascade photos={photos} type="artists" />;
  } else {
    cascade = <Cascade photos={photos} type="artworks" />;
  }
  return (
    <>
      <Container className="main-content">
        <MainTitle title="Art Gallery"></MainTitle>
        <div className="divider"></div>
        <Block
          size="1"
          title="Art Gallery"
          sentence="Post and archive your favorite artists and their artworks, display them in a popular cascade view."
          theme="light-still"
          button="false"
        ></Block>
        <ToolBar type="gallery" />
      </Container>
      {cascade}
    </>
  );
}

export default Gallery;
