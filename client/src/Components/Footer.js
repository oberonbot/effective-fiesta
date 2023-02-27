import React from "react";
import { CodeSlash } from "react-bootstrap-icons";
import Container from "react-bootstrap/esm/Container";
import { Instagram } from "react-bootstrap-icons";
import { Twitter } from "react-bootstrap-icons";
import { Github } from "react-bootstrap-icons";
function Footer() {
  return (
    <div className="footer">
      <Container>
        <div className="divider"></div>
        <div className="footer-bar">
          <div className="icon-company">
            <CodeSlash />
            <div>© 2022 Company. Inc</div>
          </div>

          <div className="links-block">
            <a
              className="links-icon"
              href="https://twitter.com/home?lang=zh-cn"
            >
              <Twitter />
            </a>
            <a
              className="links-icon"
              href="https://www.instagram.com/oberonbot/"
            >
              <Instagram />
            </a>

            <a className="links-icon" href="https://github.com/oberonbot">
              <Github />
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
