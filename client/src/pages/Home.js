import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Block from "../Components/Gallery/Block";
import MainTitle from "../Components/Gallery/MainTitle";

function Home() {
  return (
    <Container className="main-content">
      <MainTitle title="Home"></MainTitle>
      <div className="divider"></div>

      <Block
        size="1"
        title="Art Gallery"
        sentence="Post and archive your favorite artists and their artworks, display them in a popular cascade view."
        theme="light"
        href="/gallery"
      ></Block>
      <Row>
        <Col>
          <Block
            size="2"
            title="About Me"
            sentence="Just my resume, including skill stack, employed history, study experience and projects etc."
            theme="dark"
            href="/aboutme"
          ></Block>
        </Col>
        <Col>
          <Block
            size="2"
            title="Simple Blog"
            sentence="A simple blog app that you can share your thoughts and everything."
            theme="light"
            href="/blog"
          ></Block>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
