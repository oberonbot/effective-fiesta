import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";

import MainTitle from "../../Components/Gallery/MainTitle";
import Block from "../../Components/Gallery/Block";
import ToolBar from "../../Components/Gallery/ToolBar";
import Cascade from "../../Components/Gallery/Cascade";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Artist() {
  const [artist, setArtist] = useState({
    name: "",
    birth: "",
    passing: "",
    nation: "",
    tags: [],
    intro: "",
    img: null,
  });
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
          setArtist({ ...artist, name: res.data.name });
          setArtist({ ...artist, birth: res.data.birth });
          setArtist({ ...artist, passing: res.data.passing });
          setArtist({ ...artist, nation: res.data.nation });
          setArtist({ ...artist, intro: res.data.intro });
          setArtist({ ...artist, tags: res.data.tags });
          setArtist({ ...artist, img: res.data.img });
          setArtworks(res.data.artworks);
          setArtistPosterId(res.data.artistPosterId);
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [isLoading, artistId, artist]);

  let tagsStr = "";
  for (let i = 0; i < artist.tags.length; i++) {
    const tag = artist.tags[i].label;
    if (i === artist.tags.length - 1) {
      tagsStr = tagsStr + tag;
      break;
    }
    tagsStr = tagsStr + tag + ", ";
  }

  const sentence = {
    birth: artist.birth,
    passing: artist.passing,
    nation: artist.nation,
    tagsStr: tagsStr,
    intro: artist.intro,
  };
  return (
    <>
      <Container className="main-content">
        <MainTitle title={"Artist"}></MainTitle>
        <div className="divider"></div>
        <Block
          size="0"
          title={artist.name}
          sentence={sentence}
          img={artist.img}
          theme="light"
        ></Block>
        <ToolBar type="artist" id={artistId} artistPosterId={artistPosterId} />
      </Container>
      <Cascade photos={artworks} type="artwork" />
    </>
  );
}

export default Artist;
