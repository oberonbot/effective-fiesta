import React from "react";
import { Container } from "react-bootstrap";
import photo from "../images/Vizcaya-Cut.jpg";
function AboutMe() {
  const details = {
    street: "543 Central Ave",
    cityZip: "Jersey City, 07307",
    country: "United States",
    phone: "+1 201-699-8556",
    mail: "oberonbot@gmail.com",
  };

  const links = [
    {
      label: "LinkedIn",
      value: "https://www.linkedin.com/in/ethan-zhao-631987211/",
    },
    { label: "GitHub", value: "https://github.com/oberonbot" },
    {
      label: "Portfolio",
      value: "/",
    },
  ];

  const skills = [
    "JavaScript, TypeScript",
    "Java",
    "Python",
    "Node.js",
    "Vue.js, React.js",
    "HTML&CSS",
    "Bootstrap",
    "Git",
    "Linux",
    "MongdoDB, PostgreSQL",
    "Springboot",
    "Docker, Heroku, AWS",
  ];

  const experience = [
    {
      title:
        "Java Web Developer Intern at Beichende Technology Co., Ltd., Shenzhen",
      time: "January 2021 — April 2021",
      content: [
        "- Developed a client information system full stack by using Springboot framework, ElementUI, Vue.js, Mybatis, and Oracle database.",
        "- Implemented a test framework connecting bank system and POS system by using tools such as Postman, and SVN tortoise.",
        "- Learned practical business knowledge and exercised communication skills with colleagues and bank business counterparts.",
      ],
    },
  ];

  const projects = [
    {
      title: "Functional HTML5 video player that can trace user behavior",
      content: [
        "- Designed and developed a full stack HTML5 video player that can trace the user’s behavior of cursor on progress bar using JavaScript and JQuery.",
        "- Implemented Map Reduce algorithm on the project, built Linux environment for Hadoop Distributed File System.",
        "- Awarded the Best Project in the College Students' Innovative Entrepreneurial Training Plan Program of Beijing.",
      ],
    },
    {
      title: "Art Gallery collection app similar to Pinterest using MERN stack",
      content: [
        "- Design and implemented a functional photo-posting app that has a beautiful and creative design with MongoDB, Express.js, React.js and Node.js.",
        "- Implemented user registration, and authentication, a cascade photo feature that's similar to Pinterest, and a lot of popular components.",
        "- Deployed the app to AWS server.",
      ],
    },
    {
      title: "Functional blog app using MERN stack",
      content: [
        "- Developed a functional full stack blog app where users can view blogs by categories, post, edit their blogs with uploaded photos.",
        "- Simple and beautiful UI/UX design.",
      ],
    },
    {
      title: "Android app UI development",
      content: [
        "- Participated in developing an Android app to facilitate on-campus living. Implemented the UI and UX design on Android Studio.",
      ],
    },
    {
      title: "Contribution to FLAML of Microsoft",
      content: [
        "- Contributed to an open source NLP project under Microsoft called FLAML, transferred the successful multi-choice classification model from Transformer to FLAML, acquired the knowledge of Git operations in enterprise environment.",
      ],
    },
  ];

  return (
    <Container className="main-content">
      <div className="resume">
        <div className="info">
          <img src={photo} alt="avatar" />
          <div className="title">
            <h1>Hongzhi Zhao (Ethan)</h1>
            <h3>Software Engineer</h3>
          </div>
        </div>
        <div className="divider"></div>
        <div className="main-content">
          <div className="left-area">
            <div className="details">
              <h4>Details</h4>
              <div>{details.street}</div>
              <div>{details.cityZip}</div>
              <div>{details.country}</div>
              <div>{details.phone}</div>
              <a href={`mailto:${details.mail}`}>{details.mail}</a>
            </div>

            <div className="links">
              <h4>Links</h4>
              {links.map((link) => (
                <a href={link.value}>{link.label}</a>
              ))}
            </div>

            <div className="skills">
              <h4>Skills</h4>
              {skills.map((skill) => (
                <div>{skill}</div>
              ))}
            </div>
          </div>
          <div className="divider-vertical"></div>
          <div className="right-area">
            <div>
              <h4>Experience</h4>
              {experience.map((exp) => (
                <div className="block">
                  <div className="title">{exp.title}</div>
                  <div className="time">{exp.time}</div>
                  {exp.content.map((sen) => (
                    <div className="content">{sen}</div>
                  ))}
                </div>
              ))}
            </div>
            <div>
              <h4>Projects</h4>
              {projects.map((proj) => (
                <div className="block">
                  <div className="title">{proj.title}</div>
                  {proj.content.map((sen) => (
                    <div className="content">{sen}</div>
                  ))}
                </div>
              ))}
            </div>

            <div>
              <h4>Education</h4>
              <div className="block">
                <div className="title">
                  MS in Computer Science, Stevens Institute of Technology,
                  Hoboken GPA: 3.85 / 4.0
                </div>
                <div className="time">September 2021 — May 2023</div>
              </div>
              <div className="block">
                <div className="title">
                  B.S. in Computer Science, North China Electric Power
                  University, Beijing
                </div>
                <div className="time">September 2017 — May 2021</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default AboutMe;
