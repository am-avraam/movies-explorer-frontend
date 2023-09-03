const emailPattern = /\w+@\w+\.\w+/;

export const validate = ({ email, name, password }) => {
  return (
    emailPattern.test(email) &&
    (name ? name?.length > 2 && name?.length < 40 : true) &&
    (password ? password.length > 6 && password.length < 40 : true)
  );
};
