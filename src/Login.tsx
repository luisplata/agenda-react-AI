import React, { useState, useEffect } from 'react'; // Import useEffect
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from './context/AuthContext'; // Import useAuth

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const { login, profile } = useAuth(); // Get login function and profile from context
  const navigate = useNavigate(); // Get navigate function

  // Use useEffect to navigate AFTER the profile state is updated in AuthContext
  useEffect(() => {
    if (profile === 'Admin') {
      navigate('/admin/dashboard');
    } else if (profile === 'Model') {
      navigate('/model/dashboard');
    } else if (profile === 'Assist') {
      navigate('/assist/dashboard');
    }
    // Add other profile checks as needed
  }, [profile, navigate]); // Depend on profile and navigate

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const apiUrl = `${apiBaseUrl}/api/login`;

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(async response => {
        const data = await response.json();
        if (response.ok) {
          console.log('Login successful:', data);
          // Call the login function from AuthContext to update state and sessionStorage
          login(data.token, data.profile);
          // Navigation will now be handled by the useEffect hook
        } else {
          console.error('Login failed:', data);
          setModalTitle('Login Failed');
          setModalMessage(data.message || 'An error occurred during login.');
          setIsModalOpen(true);
          setEmail(''); // Reset inputs on failure
          setPassword('');
        }
      })
      .catch(error => {
        console.error('Login failed:', error);
        setModalTitle('Login Failed');
        setModalMessage('Could not connect to the server.');
        setIsModalOpen(true);
        setEmail(''); // Reset inputs on failure
        setPassword('');
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mt-5">
      {/* ... rest of your login form ... */}
      <h2 className="text-center mb-4">Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Iniciar sesión</button>
      </form>


      {/* Login Result Modal */}
      {isModalOpen && (
        <div className="modal show d-block" tabIndex={-1} role="dialog" onClick={closeModal}>
          <div className="modal-dialog" role="document" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p>{modalMessage}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
