const axios = require('axios');

// Test login functionality
async function testLogin() {
  const baseUrl = 'https://stockora.onrender.com';
  
  console.log('Testing login functionality...');
  
  // Test login with the user we just created
  console.log('\n1. Testing login with newly created user...');
  try {
    const response = await axios.post(`${baseUrl}/login`, {
      username: 'testuser123',
      password: 'testpass123'
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    
    console.log('Login successful:', response.data);
  } catch (error) {
    console.log('Login failed:', error.response?.status, error.response?.data);
  }
  
  // Test registration again to create another user
  console.log('\n2. Testing registration...');
  try {
    const registerResponse = await axios.post(`${baseUrl}/register`, {
      username: 'testuser456',
      email: 'test456@example.com',
      password: 'testpass456'
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    
    console.log('Registration successful:', registerResponse.data);
  } catch (error) {
    console.log('Registration failed:', error.response?.status, error.response?.data);
  }
  
  // Test login with the second user
  console.log('\n3. Testing login with second user...');
  try {
    const response = await axios.post(`${baseUrl}/login`, {
      username: 'testuser456',
      password: 'testpass456'
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    
    console.log('Login successful:', response.data);
  } catch (error) {
    console.log('Login failed:', error.response?.status, error.response?.data);
  }
}

testLogin();
