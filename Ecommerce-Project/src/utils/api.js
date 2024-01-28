export const registerUser = async (email, password) => {
  try {
    const response = await fetch('https://js2-ecommerce-api.vercel.app/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || 'Registration failed');
    }
    return responseData;
  } catch (error) {
    console.error('Error in registerUser:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch('https://js2-ecommerce-api.vercel.app/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || 'Login failed');
    }
    // Store the token in local storage or a state management library
    localStorage.setItem('token', responseData.token);
    return responseData;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const getAccountDetails = async (token) => {
  try {
    const response = await fetch('https://js2-ecommerce-api.vercel.app/api/account', {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Account details endpoint not found');
      } else {
        throw new Error('Error fetching account details');
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting account details:', error);
    throw error;
  }
};

export const getOrders = async (token) => {
  try {
    const response = await fetch('https://js2-ecommerce-api.vercel.app/api/orders', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const responseData = await response.json();
    console.log("Orders response:", responseData); // Add this line to log the response
    if (!response.ok) {
      throw new Error('Error fetching orders');
    }
    return responseData;
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await fetch('https://js2-ecommerce-api.vercel.app/api/logout', {
      method: 'POST',
      credentials: 'include',
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error('Error during logout');
    }
    return responseData;
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

export const updateAccount = async (accountDetails, token) => {
  try {
    const response = await fetch('https://js2-ecommerce-api.vercel.app/api/account', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(accountDetails),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error('Error updating account');
    }
    return responseData;
  } catch (error) {
    console.error('Error updating account:', error);
    throw error;
  }
};
