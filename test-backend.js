const axios = require('axios');

// Test the backend endpoints
async function testBackend() {
  const baseUrl = 'https://stockora.onrender.com';
  
  console.log('Testing backend endpoints...');
  
  try {
    // Test health endpoint
    console.log('\n1. Testing /health endpoint...');
    const healthResponse = await axios.get(`${baseUrl}/health`);
    console.log('Health check successful:', healthResponse.data);
    
    // Test CORS endpoint
    console.log('\n2. Testing /test-cors endpoint...');
    const corsResponse = await axios.get(`${baseUrl}/test-cors`);
    console.log('CORS test successful:', corsResponse.data);
    
    // Test check-auth endpoint
    console.log('\n3. Testing /check-auth endpoint...');
    const authResponse = await axios.get(`${baseUrl}/check-auth`);
    console.log('Auth check successful:', authResponse.data);
    
    // Test debug users endpoint
    console.log('\n4. Testing /debug/users endpoint...');
    const usersResponse = await axios.get(`${baseUrl}/debug/users`);
    console.log('Users check successful:', usersResponse.data);
    
  } catch (error) {
    console.error('Error testing backend:', error.response?.data || error.message);
  }
}

testBackend();
