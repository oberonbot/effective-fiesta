import React from "react";
import { Link } from "react-router-dom";

function Block(props) {
  let classStr = "block-" + props.size + "-" + props.theme;
  let output;
  if (props.size === "0" || props.theme === "light-still") {
    output = (
      <div className={classStr}>
        <BlockInfo
          size={props.size}
          title={props.title}
          sentence={props.sentence}
          theme={props.theme}
          img={props.img}
        ></BlockInfo>
      </div>
    );
  } else {
    output = (
      <Link className="link" to={props.href}>
        <div className={classStr}>
          <BlockInfo
            size={props.size}
            title={props.title}
            sentence={props.sentence}
            theme={props.theme}
            img={props.img}
          ></BlockInfo>
        </div>
      </Link>
    );
  }
  return output;
}

function BlockInfo(props) {
  let blockInfo;

  let blockLayout = "block-layout-" + props.size;
  let titleClass = "block-title-" + props.size + "-" + props.theme;
  let sentenceClass = "block-sentence-" + props.size + "-" + props.theme;

  if (props.size === "0") {
    blockInfo = (
      <div className={blockLayout}>
        <div className="info-area">
          <h1>{props.title}</h1>
          <p>Date of Birth: {props.sentence.birth}</p>
          <p>Nationality: {props.sentence.nation}</p>
          <p>Tags: {props.sentence.tagsStr}</p>
          <hr />
          <p>{props.sentence.intro}</p>
        </div>

        <img src={`../../upload/gallery/${props.img}`} alt=""></img>
      </div>
    );
    return blockInfo;
  }

  blockInfo = (
    <div className={blockLayout}>
      <div className={titleClass}>{props.title}</div>
      <div className={sentenceClass}>{props.sentence}</div>
    </div>
  );

  return blockInfo;
}

export default Block;
