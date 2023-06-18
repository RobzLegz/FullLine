export const validateEmail = (email: string) => {
  if (email.length > 100) {
    return false;
  }

  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
};

export const validateUsername = (username: string) => {
  const re = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
  return re.test(username);
};

export const valdatePassword = (password: string) => {
  if (password.length < 6) {
    return false;
  }

  return true;
};
