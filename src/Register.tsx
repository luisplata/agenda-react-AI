import React, { useState } from 'react';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; // Assuming VITE_API_BASE_URL is defined in your environment

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const apiUrl = `${apiBaseUrl}/api/register`;

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      }),
    })
      .then(async response => {
        const data = await response.json();
        if (response.status === 201) { // Specifically check for 201 status
          console.log('Registration successful:', data);
          setModalTitle('Registration Successful');
          setModalMessage(data.message || 'User registered successfully.');
          console.log('Registration successful:', data);
          setModalTitle('Registration Successful');
          setModalMessage(data.message || 'User registered successfully.');
        } else { // Status is not 2xx
          console.error('Registration failed:', data);
          setModalTitle('Registration Failed');
          // Attempt to show validation errors or a general message
          if (data.errors) {
            const errorMessages = Object.entries(data.errors)
              .map(([field, messages]) => {
                // @ts-ignore
                return `${field}: ${(messages as string[]).join(', ')}`;
              })
              .join('\n'); // Join errors with newlines for better readability

            setModalMessage(errorMessages);
          } else {
            setModalMessage(data.message || 'An error occurred during registration.');
          }
          // Reset inputs on failure
          setName('');
          setEmail('');
          setPassword('');
          setPasswordConfirmation('');
        }
        setIsModalOpen(true); // Show modal in both success and failure cases
      })
      .catch(error => {
        console.error('Registration failed:', error);
        setModalTitle('Registration Failed');
        setModalMessage('Could not connect to the server.');
        setIsModalOpen(true); // Show modal on fetch error
        setName(''); // Reset inputs on failure
        setEmail('');
        setPassword('');
        setPasswordConfirmation('');
      });
  };

  const closeModal = () => {
    // Inputs are reset only on login failure within handleSubmit
    setIsModalOpen(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Registrarse</h2>
      <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
        <div className="mb-3">
          <label htmlFor="nameInput" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="passwordConfirmationInput" className="form-label">Confirmar Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="passwordConfirmationInput"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Registrarse</button>
      </form>

      {/* Registration Result Modal */}
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

export default Register;