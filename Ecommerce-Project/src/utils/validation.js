export const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  
  export const validatePassword = (password, confirmPassword) => {
    return password === confirmPassword && password.length >= 6;
  };