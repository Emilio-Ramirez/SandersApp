
const getToken = () => {
    // Check if we are in a browser environment (window and localStorage exist)
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null; // Return null if not in a browser environment
  };
  
  export const createPhysicalDonation = async (data) => {
    const token = getToken(); // Safely retrieve the token
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/donaciones-fisicas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }), // Add token only if available
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create donation');
      }
  
      return await response.json();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error creating donation:', error); // Log error in development
      return { error: error.message };
    }
  };
  
  export const getAllDonations = async () => {
    const token = getToken(); // Safely retrieve the token
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/donaciones-fisicas`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }), // Add token only if available
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch donations');
      }
  
      return await response.json();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching donations:', error); // Log error in development
      return { error: error.message };
    }
  };
  