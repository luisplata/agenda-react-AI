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
  tarifaValue: string;
  tarifaCurrency: string;
}

interface ModelProfileFormProps {
  onAuthenticationError: () => void;
}

const ModelProfileForm: React.FC<ModelProfileFormProps> = ({ onAuthenticationError }) => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    about: '',
    horario: '',
    tarifa: '',
    whatsapp: '',
    telegram: '',
    mapa: '',
    tarifaValue: '',
    tarifaCurrency: '',
  });

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const { token } = useAuth();

  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof FormData) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleTarifaValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, tarifaValue: e.target.value.replace(/[^0-9.]/g, '') }); // Allow only numbers and decimal point
  };

  const parseTarifa = (tarifaString: string) => {
    const parts = tarifaString.split(' ');
    return { value: parts[0] || '', currency: parts[1] || '' };
  };

  useEffect(() => {
    if (!token) return; // Prevent fetching if no token

    const fetchProfileData = async () => {
      console.log('Fetching profile data...');
      try {
        const response = await fetch(`${apiBaseUrl}/api/me?token=${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 401) {
          console.log('Authentication error during fetch.');
          if (onAuthenticationError) onAuthenticationError();
          return;
        }

        if (response.ok) {
          const data = await response.json();
          if (data.Persona) {
            const parsedTarifa = parseTarifa(data.Persona.tarifa || '');
            setFormData({
              nombre: data.Persona.nombre || '',
              about: data.Persona.about || '',
              horario: data.Persona.horario || '',
              tarifa: data.Persona.tarifa || '',
              whatsapp: data.Persona.whatsapp || '',
              tarifaValue: parsedTarifa.value,
              tarifaCurrency: parsedTarifa.currency,
              telegram: data.Persona.telegram || '',
              mapa: data.Persona.mapa || '',
            });
            console.log('Profile data fetched successfully.');
          }
        } else {
           console.error('Failed to fetch profile data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };    
    fetchProfileData();
  }, [apiBaseUrl, token]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);1
    setIsSuccess(null);

    // Basic validation
    if (!formData.nombre || !formData.about || !formData.tarifaValue || !formData.tarifaCurrency || !formData.horario || !formData.whatsapp || !formData.telegram || !formData.mapa) {
      setMessage('Please fill in Name, About, and Rate fields.');
      setIsSuccess(false);
      return;
    }

    const dataToSend = { ...formData, token: token };

    // Combine tarifaValue and tarifaCurrency before sending
    dataToSend.tarifa = `${formData.tarifaValue} ${formData.tarifaCurrency}`;

    try {
      const response = await fetch(`${apiBaseUrl}/api/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (response.status === 401) {
         setMessage('Your session has expired.'); // Set message before calling callback
        console.log('Authentication error during submit.');
        if (onAuthenticationError) onAuthenticationError();
        return;
      }

      if (response.ok) {
        setMessage('Profile created successfully!');
        setIsSuccess(true);
        // Optionally reset form or redirect
      } else {
        setMessage(`Error: ${data.message || 'Failed to create profile.'}`);
        setIsSuccess(false);
      }
    } catch (error) {

      console.error('Error submitting form:', error);
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
            onChange={(e) => handleChange(e, 'nombre')}
            required
            className="form-control" />
        </div>
        <div>
          <label htmlFor="about">About:</label>
          <textarea
            id="about"
            name="about"
            value={formData.about}
            onChange={(e) => handleChange(e, 'about')}
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
            onChange={(e) => handleChange(e, 'horario')}
          />
        </div>
        {/* Combine tarifaValue and tarifaCurrency on the same line */}
        <div className="form-group">
          <label htmlFor="tarifaValue">Rate:</label>
          <div className='row align-items-center'>
            <div className='col-auto'>
              <input
                type="number"
                id="tarifaValue"
                name="tarifaValue"
                value={formData.tarifaValue}
                onChange={handleTarifaValueChange}
                required={!!formData.tarifaCurrency}
                placeholder="Value"
                inputMode="decimal"
                pattern="[0-9]*[.,]?[0-9]*"
                className="form-control col-auto"
                style={{ flex: 1 }}
              />
            </div>
            <div className='col-auto'>
              <select
                id="tarifaCurrency"
                name="tarifaCurrency"
                value={formData.tarifaCurrency} // Bind value to state
                onChange={(e) => setFormData({ ...formData, tarifaCurrency: e.target.value })} // Use inline handler for simplicity
                className="form-control col-auto" // Apply form-control class for styling
                required={!!formData.tarifaValue} // Require currency if value is entered
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="COP">COP</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="whatsapp">WhatsApp:</label>
          <input
            type="text"
            id="whatsapp"
            name="whatsapp"
            className="form-control"
            value={formData.whatsapp}
            onChange={(e) => handleChange(e, 'whatsapp')}
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
            onChange={(e) => handleChange(e, 'telegram')}
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
            onChange={(e) => handleChange(e, 'mapa')}
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