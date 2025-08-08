const axios = require('axios');

// Test login with existing users
async function testSpecificLogin() {
  const baseUrl = 'https://stockora.onrender.com';
  
  console.log('Testing login with existing users...');
  
  // Test with existing users from the database
  const testUsers = [
    { username: 'siudent', password: 'password123' },
    { username: 'tauhid', password: 'password123' },
    { username: 'jeeshan', password: 'password123' },
    { username: 'testuser', password: 'password123' },
    { username: 'testuser123', password: 'testpass123' },
    { username: 'testuser456', password: 'testpass456' }
  ];
  
  for (let i = 0; i < testUsers.length; i++) {
    const user = testUsers[i];
    console.log(`\n${i + 1}. Testing login with: ${user.username}`);
    
    try {
      const response = await axios.post(`${baseUrl}/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      
      console.log('✅ Login successful:', response.data);
    } catch (error) {
      console.log('❌ Login failed:', error.response?.status, error.response?.data);
    }
  }
}

testSpecificLogin();
