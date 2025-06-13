import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface FormData {
  nombre: string;
  about: string;
  horario: string;
  tarifa: string;
  whatsapp: string;
  telegram: string;
  mapa: string;
}

interface PersonaData extends FormData {
  tags: { tipo: string; valor: string }[];
}

const ModelProfileForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    about: '',
    horario: '',
    tarifa: '',
    whatsapp: '',
    telegram: '',
    mapa: '',
  });

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const { token } = useAuth();

  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!token) return;

      try {
        const response = await fetch(`${apiBaseUrl}/api/me?token=${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.Persona) {
            setFormData({
              nombre: data.Persona.nombre || '',
              about: data.Persona.about || '',
              horario: data.Persona.horario || '',
              tarifa: data.Persona.tarifa || '',
              whatsapp: data.Persona.whatsapp || '',
              telegram: data.Persona.telegram || '',
              mapa: data.Persona.mapa || '',
            });
          }
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchProfileData();
  }, [apiBaseUrl, token]); // Re-run effect if apiBaseUrl or token changes
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setIsSuccess(null);

    // Basic validation
    if (!formData.nombre || !formData.about || !formData.tarifa || !formData.horario || !formData.whatsapp || !formData.telegram || !formData.mapa) {
      setMessage('Please fill in Name, About, and Rate fields.');
      setIsSuccess(false);
      return;
    }

    const dataToSend = { ...formData, token: token };

    try {
      const response = await fetch(`${apiBaseUrl}/api/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Profile created successfully!');
        setIsSuccess(true);
        // Optionally reset form or redirect
        // setFormData({ nombre: '', about: '', horario: '', tarifa: '', whatsapp: '', telegram: '', mapa: '', token: 'YOUR_PLACEHOLDER_TOKEN' });
      } else {
        setMessage(`Error: ${data.message || 'Failed to create profile.'}`);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('An unexpected error occurred.');
      setIsSuccess(false);
    }
  };

  return (
    <div className="model-profile-form">
      <h2 className="form-title">Create Model Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Name:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="form-control" />
        </div>
        <div>
          <label htmlFor="about">About:</label>
          <textarea
            id="about"
            name="about"
            value={formData.about}
            onChange={handleChange}
            required
            className="form-control" />
        </div>
        <div>
          <label htmlFor="horario">Schedule:</label>
          <input
            type="text"
            id="horario"
            name="horario"
            className="form-control"
            value={formData.horario}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="tarifa">Rate:</label>
          <input
            type="text"
            id="tarifa"
            name="tarifa"
            value={formData.tarifa}
            onChange={handleChange}
            required
            className="form-control" />
        </div>
        <div>
          <label htmlFor="whatsapp">WhatsApp:</label>
          <input
            type="text"
            id="whatsapp"
            name="whatsapp"
            className="form-control"
            value={formData.whatsapp}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="telegram">Telegram:</label>
          <input
            type="text"
            id="telegram"
            name="telegram"
            className="form-control"
            value={formData.telegram}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="mapa">Map/Location:</label>
          <input
            type="text"
            id="mapa"
            name="mapa"
            className="form-control"
            value={formData.mapa}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Profile</button>
      </form>

      {message && (
        <div style={{ color: isSuccess ? 'green' : 'red', marginTop: '10px' }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default ModelProfileForm;