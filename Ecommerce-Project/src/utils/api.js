export const registerUser = async (email, password) => {
    try {
      const response = await fetch('https://js2-ecommerce-api.vercel.app/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };
  
  export const login = async (email, password) => {
    try {
      const response = await fetch('https://js2-ecommerce-api.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  