import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using react-router-dom

interface Profile {
  id: number;
  nombre: string;
  mapa: string;
  tags: {
    tipo: string;
    valor: string;
  }[];
  media: { file_path: string }[];
}

const ProfilesList: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  const [nameFilter, setNameFilter] = useState('');
  const [nationalityFilter, setNationalityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const [nationalities, setNationalities] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${apiBaseUrl}/api/people`);
        const data = await response.json();
        setProfiles(data);

        // Extract unique nationalities and categories after data is fetched
        const uniqueNationalities = new Set<string>();
        const uniqueCategories = new Set<string>();

        if (Array.isArray(data)) { // Ensure data is an array before processing
          data.forEach((profile: Profile) => {
            if (profile.tags && Array.isArray(profile.tags)) { // Check if profile.tags exists and is an array
              profile.tags.forEach((tag: { tipo: string; valor: string } | null | undefined) => {
                if (tag && typeof tag === 'object' && tag.valor && typeof tag.valor === 'string') { // Check if tag is an object and tag.nombre exists and is a string
                  if (tag.tipo === 'nacionalidad') uniqueNationalities.add(tag.valor.toLowerCase());
                  if (tag.tipo === 'categoria') uniqueCategories.add(tag.valor.toLowerCase());
                }
              });
            }
          });
        } else {
          console.error("Fetched data is not an array:", data);
        }

        setNationalities(Array.from(uniqueNationalities));
        setCategories(Array.from(uniqueCategories));

        setLoading(false);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setLoading(false);
      }
    }

    fetchProfiles();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
      <h1 className="text-center mb-4">Models</h1>
      <div className="container mb-4">
        <div className="row justify-content-center">
          <div className="col-md-4 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Filter by name"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <select
              className="form-select"
              value={nationalityFilter}
              onChange={(e) => setNationalityFilter(e.target.value)}
            >
              <option value="">All Nationalities</option>
              {nationalities.map((nationality) => (
                <option key={nationality} value={nationality}>{nationality}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <select
              className="form-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-center">Loading profiles...</p>
      ) : (
        <div className="container mt-4">
          <div className="row">
            {profiles
              .filter(profile => {
                const nameMatch = profile.nombre.toLowerCase().includes(nameFilter.toLowerCase());
                const nationalityMatch = nationalityFilter === '' || profile.tags.some(tag => tag.tipo === 'nacionalidad' && tag.valor.toLowerCase() === nationalityFilter.toLowerCase());
                const categoryMatch = categoryFilter === '' || profile.tags.some(tag => tag.tipo === 'categoria' && tag.valor.toLowerCase() === categoryFilter.toLowerCase());
                return nameMatch && nationalityMatch && categoryMatch;
              })
              .filter(profile => profile.media && profile.media.length > 0) // Keep the media check
              .map((profile) => (
                <div key={profile.id} className="col-6 col-md-4 col-lg-3 col-xl-3 mb-4" style={{ cursor: 'pointer' }}>
 <Link to={`/profile/${profile.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>                  
 <div className="card">
 <div className="card-img-overlay d-flex flex-column justify-content-end" style={{ backgroundImage: `url(${profile.media && profile.media.length > 0 ? `https://lobasvip.com.ve/${profile.media[0].file_path}` : 'https://via.placeholder.com/400x200?text=No+Image'})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '200px' }}>
 <h5 className="card-title text-white">{profile.nombre}</h5>
 <p className="card-text text-white"><small>{profile.mapa}</small></p>
 </div>
 </div>
 </Link>                
                    </div>
              ))}
          </div>
        </div>
      )}      
    </>
  );
};

export default ProfilesList;