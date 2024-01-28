export const validateName = (name) => {
    // Name should be at least 2 characters and only contain letters
    const nameRegex = /^[a-zA-Z]{2,}$/;
    return nameRegex.test(name);
  };
  
  export const validateEmail = (email) => {
    // More comprehensive email validation using regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  
  export const validatePassword = (password, confirmPassword) => {
    // Password should be at least 8 characters, contain at least one uppercase letter, 
    // one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (confirmPassword) {
      return passwordRegex.test(password) && password === confirmPassword;
    }
    
    return passwordRegex.test(password);
  };
  
  export const validatePasswordMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };


  export const validatePasswordStrength = (password) => {
    // Your password strength validation logic here
    // You can define your own rules for password strength
    // Example: Check if the password has a minimum length, contains numbers, symbols, etc.
  };