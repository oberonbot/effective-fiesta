const createResume = async () => {
  let newResume = {
    firstName: "Hongzhi",
    lastName: "Zhao",
    preferredName: "Ethan",
    title: "Software Engineer",
    details: {
      street: "543 Central Ave",
      city: "Jersey City",
      zipCode: "07307",
      country: "United States",
      phone: "+1 201-699-8556",
      email: "oberonbot@gmail.com",
    },
    links: {
      LinkedIn: "",
      GitHub: "",
    },
    skills: {
      Java: 5,
      Python: 5,
      SQL: 5,
      Linux: 5,
      Springboot: 4,
      Git: 4,
      "Vue.js": 4,
      JavaScript: 3,
      "Node.js": 3,
      "HTML&CSS": 3,
      Docker: 3,
    },
    experiences: [
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
    ],
    projects: [
      {
        title: "HTML5 video player that can trace user behavior",
        content: [
          "- Designed and developed as full stack for HTML5 video player that can trace the user’s behavior of cursor on progress bar by using mainly JavaScript.",
          "- Implemented Map Reduce algorithm on the project, built Linux environment for Hadoop Distributed File System.",
          "- Awarded the Best Project in the College Students' Innovative Entrepreneurial Training Plan Program of Beijing.",
        ],
      },
      {
        title: "Android app UI development",
        content: [
          "- Participated in developing an Android app to facilitate on-campus living.  Implemented the user interface and interactive design on Android Studio.",
        ],
      },
    ],
    educations: [
      {
        title:
          "MS in Computer Science, Stevens Institute of Technology, Hoboken GPA: 4.0 / 4.0",
        time: "September 2021 — Present",
      },
      {
        title:
          "B.S. in Computer Science, North China Electric Power University, Beijing",
        time: "September 2017 — May 2021",
      },
    ],
  };

  return newResume;
};

module.exports = {
  createResume,
};
