import validate from 'deep-email-validator';

const validateEmail = async (email) => {
  const isValid = await validate({
    email,
    sender: email,
    validateRegex: true,
    validateMx: true,
    validateTypo: true,
    validateDisposable: true,
    validateSMTP: false,
  });
  return isValid.valid;
};

export default validateEmail;
