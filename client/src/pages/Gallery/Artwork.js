import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { Link, useLocation } from "react-router-dom";
import MainTitle from "../../Components/Gallery/MainTitle";
import ToolBar from "../../Components/Gallery/ToolBar";

function Artwork(props) {
  const [name, setName] = useState("");
  const [artistId, setArtistId] = useState("");
  const [artistName, setArtistname] = useState("");
  const [place, setPlace] = useState("");
  const [intro, setIntro] = useState("");
  const [tags, setTags] = useState([]);
  const [img, setImg] = useState(null);
  const [time, setTime] = useState("");
  const [other, setOther] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [artistPosterId, setArtistPosterId] = useState("");
  const [artworkPosterId, setArtworkPosterId] = useState("");

  const location = useLocation();
  const artworkId = location.pathname.split("/")[3];

  let tagsStr = "";

  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i].label;
    if (i === tags.length - 1) {
      tagsStr = tagsStr + tag;
      break;
    }
    tagsStr = tagsStr + tag + ", ";
  }

  useEffect(() => {
    if (!isLoading) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await axios.get(`/api/gallery/artwork/${artworkId}`);
          setName(res.data.title);
          setArtistId(res.data.artistId);
          setArtistname(res.data.artistName);
          setPlace(res.data.place);
          setIntro(res.data.intro);
          setTags(res.data.tags);
          setImg(res.data.img);
          setTime(res.data.time);
          setOther(res.data.other);
          setArtistPosterId(res.data.artistPosterId);
          setArtworkPosterId(res.data.artworkPosterId);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [isLoading, artworkId]);

  return (
    <>
      <div className="artwork">
        <Container className="main-content">
          <MainTitle title={"Artwork"}></MainTitle>
          <div className="divider"></div>
          <div className="artwork-area">
            <img src={`../../upload/gallery/${img}`} alt=""></img>
          </div>

          <div className="artwork-info">
            <div className="title">
              <h1>{name}</h1>
            </div>
            <div className="content">
              <div className="basic-info">
                <h4>{other}</h4>

                <h4>
                  <Link className="link" to={`/artist/${artistId}`}>
                    Artist: {artistName}
                  </Link>
                </h4>

                <h4>Created time: {time}</h4>
                <h4>Genre: {tagsStr}</h4>
                <h4>Exhibited At: {place}</h4>
              </div>
              <div className="vertical-divider"></div>
              <div className="intro">{intro}</div>
            </div>
          </div>
          <ToolBar
            type="artwork"
            id={artworkId}
            artistPosterId={artistPosterId}
            artworkPosterId={artworkPosterId}
          />
        </Container>
      </div>
    </>
  );
}

export default Artwork;
