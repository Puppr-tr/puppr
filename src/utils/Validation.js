import strings from "../i18n/strings";

//name regEx
const nameRegEx = /^[a-zA-Z ]{2,40}$/;

// name Validation
const validName = name => {
  if (!name) {
    return {
      status: false,
      msg: strings.thisFieldIsMandatory,
    };
  } else {
    return nameRegEx.test(name)
      ? {status: true, msg: ''}
      : {
          status: false,
          msg: strings.enterValidName,
        };
  }
};

export {validName};
