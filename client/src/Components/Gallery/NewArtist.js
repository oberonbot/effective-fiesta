import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { PersonBoundingBox } from "react-bootstrap-icons";
import CreateableSelect from "react-select/creatable";
import Select from "react-select";
import axios from "axios";
import {
  checkName,
  checkNation,
  checkBirthAndPassing,
  checkImg,
  checkIntro,
} from "../../helpers";

function NewArtist(props) {
  const [show, setShow] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [artistTags, setArtistTags] = useState([]);
  const [nationTags, setNationTags] = useState([]);
  const [artist, setArtist] = useState({
    name: "",
    birth: "",
    passing: "",
    nation: "",
    tags: [],
    intro: "",
    img: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/gallery/artistTags`);
        setArtistTags(res.data.artistTags);
        setNationTags(res.data.nationTags);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [artist]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setArtist({ ...artist, img: selectedFile });

    const reader = new FileReader();
    reader.onload = function () {
      setPreviewSrc(reader.result);
    };

    reader.readAsDataURL(selectedFile);
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

    try {
      checkImg(artist.img);
      checkName(artist.name);
      checkNation(artist.nation);
      checkBirthAndPassing(artist.birth, artist.passing);
      checkIntro(artist.intro);

      const imgUrl = await upload();
      console.log(imgUrl);
      const data = {
        name: artist.name,
        birth: artist.birth,
        passing: artist.passing,
        nation: artist.nation,
        intro: artist.intro,
        tags: artist.tags,
        img: artist.img ? imgUrl : "",
      };
      console.log(artist);
      await axios.post("/api/gallery/artist", data);
      handleClose();
      window.location.reload();
    } catch (error) {
      alert(error);
    }
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

      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-90w"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Artist</Modal.Title>
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
                {previewSrc ? (
                  <label htmlFor="img">
                    <img src={previewSrc} alt="Preview" htmlFor="img" />
                  </label>
                ) : (
                  <label className="upload-portrait" htmlFor="img">
                    <PersonBoundingBox size={50} color="white" />
                    <p>Upload photo</p>
                  </label>
                )}
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
            Close
          </Button>
          <Button variant="outline-secondary" onClick={handleSubmit}>
            Sumbit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewArtist;
