import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import CreateableSelect from "react-select/creatable";
import axios from "axios";
import Select from "react-select";
import { useLocation } from "react-router-dom";

function EditArtist(props) {
  const [show, setShow] = useState(false);
  const [imgShow, setImgShow] = useState("");
  const [artistTags, setArtistTags] = useState([]);
  const [nationTags, setNationTags] = useState([]);
  const [artistPosterId, setArtistPosterId] = useState("");
  const [artist, setArtist] = useState({
    name: "",
    birth: "",
    passing: "",
    nation: "",
    tags: [],
    intro: "",
    img: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const artistId = location.pathname.split("/")[3];

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      try {
        const res = axios.get(`/api/gallery/artist/${artistId}`);
        setArtist({ ...artist, name: res.data.name });
        setArtist({ ...artist, birth: res.data.birth });
        setArtist({ ...artist, passing: res.data.passing });
        setArtist({ ...artist, nation: res.data.nation });
        setArtist({ ...artist, intro: res.data.intro });
        setArtist({ ...artist, tags: res.data.tags });
        setArtist({ ...artist, img: res.data.img });
        setArtistTags(res.data.artistTags);
        setNationTags(res.data.nationTags);
        setArtistPosterId(res.data.artistPosterId);
        setImgShow(res.data.img);
        console.log(artist);
      } catch (error) {
        console.log(error);
      }
    }
  }, [isLoading, artistId, artist]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setArtist({ ...artist, img: selectedFile });
  };

  // window shows and closes
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", artist.img);
      const res = await axios.post("/api/gallery/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imgUrl;
    if (artist.img !== null) {
      imgUrl = await upload();
    } else {
      imgUrl = imgShow;
    }

    try {
      const data = {
        artistPosterId: artistPosterId,
        name: artist.name,
        birth: artist.birth,
        passing: artist.passing,
        nation: artist.nation,
        intro: artist.intro,
        tags: artist.tags,
        img: artist.img ? imgUrl : "",
      };

      await axios.put(`/api/gallery/artist/${artistId}`, data);
      handleClose();
    } catch (error) {
      console.log(error);
    }
    handleClose();
    window.location.reload();
  };

  return (
    <>
      <Button
        variant="outline-secondary"
        onClick={handleShow}
        className="toolbar-button"
      >
        {props.title}
      </Button>

      <Modal size="" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Artist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="new-artist">
              <div className="top-area">
                <div className="top-area-left">
                  {/* ---------------------------- Artist Name ---------------------- */}
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      autoFocus
                      onChange={(e) =>
                        setArtist({ ...artist, name: e.target.value })
                      }
                      value={artist.name}
                      placeholder="Artist Name"
                    />
                  </Form.Group>

                  {/* ----------------------------  Nationality ---------------------- */}
                  <div className="nationality">
                    Country / Region
                    <Select
                      name="nation"
                      isSearchable
                      options={nationTags}
                      onChange={(e) => {
                        setArtist({ ...artist, nation: e.value });
                      }}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  </div>

                  {/* ---------------------------- Birth Year ---------------------- */}
                  <div className="birth-death">
                    From
                    <Form.Group>
                      <Form.Control
                        name="birth"
                        type="text"
                        onChange={(e) => {
                          setArtist({ ...artist, birth: e.target.value });
                        }}
                        placeholder="Year"
                      />
                    </Form.Group>
                    To
                    {/* ---------------------------- Passing Year ---------------------- */}
                    <Form.Group>
                      <Form.Control
                        name="passing"
                        type="text"
                        onChange={(e) =>
                          setArtist({ ...artist, passing: e.target.value })
                        }
                        placeholder="Year"
                      />
                    </Form.Group>
                  </div>
                </div>

                {/* ---------------------------- Photo Upload ---------------------- */}
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="img"
                  name=""
                  onChange={handleFileChange}
                />
                <label htmlFor="img">
                  <img src={`../../upload/gallery/${imgShow}`} alt=""></img>
                </label>
              </div>

              {/* ---------------------------- Tags ---------------------- */}
              <div>Add Tags</div>
              <div className="select">
                <CreateableSelect
                  isMulti
                  isSearchable
                  options={artistTags}
                  onChange={(e) => setArtist({ ...artist, tags: e })}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>

              {/* ---------------------------- Introduction ---------------------- */}
              <Form.Group>
                <Form.Label>Introduction</Form.Label>
                <Form.Control
                  className="text-area"
                  as="textarea"
                  name="intro"
                  onChange={(e) =>
                    setArtist({ ...artist, intro: e.target.value })
                  }
                  placeholder="No more than 60 words"
                />
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outline-secondary" onClick={handleSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditArtist;
