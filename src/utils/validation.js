const emailPattern = /\w+@\w+\.\w+/;
const namePattern = /^[A-Za-zА-Яа-я -]+$/imu;

export const validate = ({ email, name, password }) => {
  return (
    emailPattern.test(email) &&
    (name ? name?.length > 2 && name?.length < 40 : true) &&
    (password ? password.length > 6 && password.length < 40 : true)
  );
};

export const validateEmail = (emailInput) => {
  return emailPattern.test(emailInput);
};

export const validateName = (nameInput) => {
  return namePattern.test(nameInput) && nameInput?.length >= 2 && nameInput?.length <= 40;
};

export const validatePassword = (passwordInput) => {
  return passwordInput.length > 6 && passwordInput.length < 40;
};
