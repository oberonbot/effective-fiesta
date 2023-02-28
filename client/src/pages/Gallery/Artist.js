import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";

import MainTitle from "../../Components/Gallery/MainTitle";
import Block from "../../Components/Gallery/Block";
import ToolBar from "../../Components/Gallery/ToolBar";
import Cascade from "../../Components/Gallery/Cascade";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Artist() {
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [nation, setNation] = useState("");
  const [intro, setIntro] = useState("");
  const [tags, setTags] = useState([]);
  const [img, setImg] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [artistPosterId, setArtistPosterId] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const artistId = location.pathname.split("/")[3];

  useEffect(() => {
    if (!isLoading) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await axios.get(`/api/gallery/artist/${artistId}`);
          setName(res.data.name);
          setBirth(res.data.birth);
          setNation(res.data.nation);
          setIntro(res.data.intro);
          setTags(res.data.tags);
          setImg(res.data.img);
          setArtworks(res.data.artworks);
          setArtistPosterId(res.data.artistPosterId);
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [isLoading, artistId]);

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i].label;
    if (i === tags.length - 1) {
      tagsStr = tagsStr + tag;
      break;
    }
    tagsStr = tagsStr + tag + ", ";
  }

  const sentence = {
    birth: birth,
    nation: nation,
    tagsStr: tagsStr,
    intro: intro,
  };
  return (
    <>
      <Container className="main-content">
        <MainTitle title={"Artist"}></MainTitle>
        <div className="divider"></div>
        <Block
          size="0"
          title={name}
          sentence={sentence}
          img={img}
          theme="light"
        ></Block>
        <ToolBar type="artist" id={artistId} artistPosterId={artistPosterId} />
      </Container>
      <Cascade photos={artworks} type="artwork" />
    </>
  );
}

export default Artist;
