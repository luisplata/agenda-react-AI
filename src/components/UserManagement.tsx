import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { useAuth } from '../context/AuthContext'; // Assuming useAuth provides the token

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// Define an interface for the user data structure
interface User {
  id: number;
  nombre: string;
  about: string | null;
  horario: string | null;
  tarifa: string | null;
  whatsapp: string | null;
  telegram: string | null;
  mapa: string | null;
  created_at: string;
  updated_at: string;
  user_id: string;
  is_visible: boolean;
  tags: any[]; // You might want to define a more specific type for tags later
  media: any[]; // You might want to define a more specific type for media later
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // State to store user data with the defined interface
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState<string | null>(null); // State to track errors

  const { token } = useAuth(); // Get the authentication token from AuthContext

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/all_people?token=${token}`, {
          method: 'GET', // Keep as GET
          headers: {
            'Content-Type': 'application/json',
            // **Ideally, send the token in the Authorization header:**
            // 'Authorization': `Bearer ${token}`,
          },
          // **REMOVE the body for GET requests:**
          // body: JSON.stringify({
          //   token: token, // Include the token in the request body
          // }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Error fetching users: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched user data:', data); // Log the fetched data
        setUsers(data); // Store the fetched data in state
      } catch (err: any) {
        console.error('Error fetching users:', err);
        setError(err.message);
      } finally {
        setLoading(false); // Set loading to false after fetch is complete in all cases
      }
    };

    // Only fetch if a token is available
    if (token) {
      fetchUsers();
    } else {
      setLoading(false); // If no token, stop loading immediately
      setError("User not authenticated."); // Set an error if no token
    }
  }, [token]); // Re-run effect if token changes

  // For now, just log data and show loading/error status
  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3>User List</h3>
      <table className="table table-striped table-bordered table-dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.nombre}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2" data-user-id={user.id}>Edit</button>
                <button className="btn btn-danger btn-sm" data-user-id={user.id}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
