const isValidYear = (input) => {
  // Check if the input is in the year format (YYYY)
  if (!/^\d{4}$/.test(input)) {
    return false;
  }

  // Convert the input to a number
  const year = Number(input);

  // Check if the year is between 1000 and 9999
  const currentYear = new Date().getFullYear();
  if (year < 1000 || year > currentYear) {
    return false;
  }

  return true;
};

const checkName = (input) => {
  if (input === null || typeof input === "undefined") {
    throw new Error("Error: Name can't be empty");
  }
};

const checkNation = (input) => {
  if (input === null || typeof input === "undefined") {
    throw new Error("Error: Country/Region can't be empty");
  }
};

const checkBirthAndPassing = (birth, death) => {
  if (birth !== null && typeof birth !== "undefined") {
    if (!isValidYear(birth)) {
      throw new Error("Error: Birth is invalid");
    }
  }

  if (death !== null && typeof death !== "undefined") {
    if (!isValidYear(death)) {
      throw new Error("Error: Death is invalid");
    }
    if (Number(death) < Number(birth)) {
      throw new Error("Error: Passing year can not be prior to birth year.");
    }
  }
};

const checkImg = (img) => {
  if (img === null || typeof img === "undefined") {
    throw new Error("Please upload one photo to continue :)");
  }
};

const checkIntro = (intro) => {
  if (intro === null || typeof intro === "undefined") {
    if (intro >= 560) {
      throw new Error("Error: Sorry, intro should be less than 60 words");
    }
  }
};

export {
  isValidYear,
  checkName,
  checkNation,
  checkBirthAndPassing,
  checkImg,
  checkIntro,
};
