import React, { useState } from 'react';

const ModelAdditionalDataForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<Array<{ tipo: string; valor: string }>>([]);
  const [weight, setWeight] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [age, setAge] = useState<number | ''>('');
  const [formErrors, setFormErrors] = useState<{ [key: number]: string | null }>({});

  const servicesOptions = [
    'Presencial',
    'A Domicilio',
    'Virtual',
    'Masajista',
    'Streaptease',
  ];

  const handleServiceChange = (service: string) => {
    setSelectedServices(prevServices => {
      const existingServiceIndex = prevServices.findIndex(s => s.valor === service);

      if (existingServiceIndex > -1) {
        // If service is already selected, remove it
        return prevServices.filter(s => s.valor !== service);
      } else {
        // If service is not selected, add it
        return [...prevServices, { tipo: 'servicio', valor: service }];
      }
    });
  };

  // Function to return selected services
  const getSelectedServices = () => {
    return selectedServices;
  };

  const validateStep = (step: number) => {
    let errors: { [key: number]: string | null } = { ...formErrors };
    let isValid = true;

    // Validation for Step 1
    if (step === 1) {
      // Service validation
      if (selectedServices.length === 0) {
        errors[step] = 'Please select at least one service.';
        isValid = false;
      } else {
        errors[step] = null;
      }

      // Age validation for Step 1
      if (age === '' || typeof age !== 'number' || age < 18 || age > 99 || isNaN(age)) {
        errors[step] = (errors[step] ? errors[step] + ' ' : '') + 'Age must be a valid number between 18 and 99.'; // Combine error messages and check for NaN
        isValid = false;
      } else {
 if (errors[step] && typeof errors[step] === 'string' && errors[step].includes('Age')) {
 errors[step] = errors[step].replace('Age must be a valid number between 18 and 99.', '').trim();
 if (errors[step] === '') errors[step] = null;
 }
      }
    }

    // Validation for Step 2
    if (step === 2) {
      // Estatura validation
      if (height === '' || typeof height !== 'number' || height <= 0 || height > 2.50 || isNaN(height)) {
        errors[step] = 'Estatura must be a valid number greater than 0 and less than or equal to 2.50.';
        isValid = false;
      } else {
        errors[step] = null;
      }

    }

    setFormErrors(errors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  return (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Additional Data</h2> {/* Added classes for styling */}
          <p className="mb-4 text-gray-700 dark:text-gray-300">Step {currentStep} of 2</p> {/* Added step indicator */}

          <>
            <h3>Paso 1: Servicios</h3>
            <div className="form-group">
              <label>Services:</label>
              <br /> {/* Add a break after label */}
              <div className="flex flex-wrap gap-2"> {/* Used flexbox classes for layout */}

                {servicesOptions.map(service => (
                  <div key={service}> {/* Individual option container */}
                    <input
                      type="checkbox"
                      className="service-checkbox" // Add a custom class
                      id={`service-${service}`}
                      checked={selectedServices.some(s => s.valor === service)}
                      onChange={() => handleServiceChange(service)}
                    />
                    <label
                      className={`px-3 py-1 border rounded-md cursor-pointer transition duration-300 ease-in-out ${selectedServices.some(s => s.valor === service)
                        ? 'bg-blue-500 text-white border-blue-500' // Selected state classes
                        : 'bg-gray-200 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600' // Default state classes with dark mode
                        }`}
                      htmlFor={`service-${service}`}
                    >
                      {service}
                    </label>
                  </div>
                ))}
              </div>
              {formErrors[1] && <div className="text-red-500 text-sm mt-1">{formErrors[1]}</div>} {/* Added styling for error message */}
            </div>

            {/* Moved Edad field to Step 1 */}
            <div className="form-group mt-4"> {/* Added margin top */}
              <label>Edad:</label>
              <br />
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" // Added classes for input styling
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value) || '')} // Parse input as number
                min="18" // Added min attribute for browser validation
                max="99" // Added max attribute for browser validation
              />
              {formErrors[1] && typeof formErrors[1] === 'string' && formErrors[1].includes('Age') && (
                <div className="text-red-500 text-sm mt-1">{formErrors[1]}</div> // Specific error message for age
              )}

            </div>

          </>

      {currentStep === 2 && (
        <>
          <h3>Paso 2: Otros Datos</h3>
          {/* Estatura field */}
           <div className="form-group mt-4"> {/* Added margin top */}
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Peso (kgs):</label> {/* Added classes for styling */}
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" // Added classes for input styling
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value) || '')} // Parse input as float
                step="0.01" // Allow decimal input
                min="0.01" // Minimum value for browser validation (optional but helpful)
                max="250" // Maximum value for browser validation (optional but helpful)
                required // Mark as required for browser validation
              />
               {formErrors[2] && typeof formErrors[2] === 'string' && formErrors[2].includes('Peso') && (
                <div className="text-red-500 text-sm mt-1">{formErrors[2]}</div> // Specific error message for weight
              )}
            </div>

           <div className="form-group mt-4"> {/* Added margin top */}
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Estatura (mts):</label> {/* Added classes for styling */}
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" // Added classes for input styling
                value={height}
                onChange={(e) => setHeight(parseFloat(e.target.value) || '')} // Parse input as float
                step="0.01" // Allow decimal input
                min="0.01" // Minimum value for browser validation (optional but helpful)
                max="2.50" // Maximum value for browser validation (optional but helpful)
                required // Mark as required for browser validation
              />
              {formErrors[2] && typeof formErrors[2] === 'string' && formErrors[2].includes('Estatura') && (
                <div className="text-red-500 text-sm mt-1">{formErrors[2]}</div> // Specific error message for height
              )}
            </div>

        </>
      )}

      <div className="mt-6 flex justify-between">
        {currentStep > 1 && (
          <button onClick={handlePrevious} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">Previous</button>
        )}
        {currentStep < 2 && ( // Assuming 2 steps in total for now
          <button onClick={handleNext} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">Next</button>
        )}
      </div>
    </div>
  );
};
export default ModelAdditionalDataForm;