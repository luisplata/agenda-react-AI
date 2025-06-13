import './App.css'
import ProfilesList from './ProfilesList.tsx';
import Topbar from './Topbar.tsx';
import Sidebar from './Sidebar.tsx';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ProfileDetail from './ProfileDetail';
import AgeVerificationModal from "./components/AgeVerificationModal";
import Login from './Login.tsx';
import ModelDashboard from './ModelDashboard.tsx'; // Import ModelDashboard
import AssistDashboard from './AssistDashboard.tsx'; // Import AssistDashboard
import AdminDashboard from './AdminDashboard.tsx';
import Register from './Register.tsx'; // Import Register component
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <AgeVerificationModal />
          <Topbar />
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<ProfilesList />} />
              <Route path="/profile/:id" element={<ProfileDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} /> {/* Add route for Register */}
              <Route path="/model/dashboard" element={<ModelDashboard />} /> {/* Add route for ModelDashboard */}
              <Route path="/assist/dashboard" element={<AssistDashboard />} /> {/* Add route for AssistDashboard */}
              <Route element={<ProtectedRoute />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Route>
            </Routes>

            {/* Footer */}
            <footer className="py-4 model-tag bg-dark text-light">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 mb-3 d-flex justify-content-center">
                    <div>
                      <h5>Contacto</h5>
                      <p>Email: hello@lobasvip.com.ve</p>
                      <p>Telegran : t.me/El_Lobo_2109</p>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3 d-flex justify-content-center">
                    <div>
                      <h5>Síguenos</h5>
                      <a href="https://www.tiktok.com/@lobas.vip?_t=ZM-8tJQYRXlH8P&amp;_r=1" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-tiktok" viewBox="0 0 16 16">
                          <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                        </svg>
                      </a>
                      <a href="https://x.com/LobasVip?t=gDeAKbkne6kd_GoHxU2e2g&amp;s=09" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                        </svg>
                      </a>
                      <a href="https://www.instagram.com/lobas_vip?igsh=Y2tycTB5ZnBoNmZk" target="_blank" rel="noopener noreferrer" className="text-light">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                          <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <p className="mb-0">
                    Lobasvip.com es exclusivamente una guía publicitaria de avisos foto-clasificados y de medios audiovisuales en general.<br />
                    Todo el contenido de los medios audiovisuales es recibido de los anunciantes, de forma única y de su exclusiva responsabilidad individual, de ninguna manera Lobas VIP conoce, participa o interfiere de alguna forma o manera en las actividades de los anunciantes.<br />
                    Lobas VIP no se hace responsable por la veracidad, fidelidad, o legalidad del contenido de los avisos foto-clasificados, videos y en general de medios de comunicación audiovisuales.<br /><br />
                    <span className="text-danger">Lobasvip.com es para uso exclusivo de personas mayores de edad.</span><br /><br />
                    Lobasvip.com no participa en la captura, procesamiento, remasterización, edición, recepción y/o envío del material virtual que el anunciante ofrece y tampoco funge como servidor de almacenamiento y/o plataforma de streaming de dicho material.<br />
                    Lobasvip.com ofrece únicamente el servicio de publicidad para personas mayores de edad debidamente verificadas, por ende, no somos responsables por la veracidad, autenticidad y legalidad del material digital que el anunciante como sujeto emisor entregue al cliente como sujeto receptor de dicho material.<br />
                    Lobasvip.com de forma responsable asegura que todos los anunciante son mayores de edad; que el número y redes sociales de contacto pertenece a dicha persona y que ofrece el material virtual de su persona y nadie más. Otros eventos sobrevenidos son resultado de decisiones independientes de personas adultas, y no están incluidas, solicitadas y/o contratadas en el precio arriba mencionado.<br /><br />
                    &copy; 2025 Lobas.vip. Todos los derechos reservados.
                  </p>
                </div>
              </div>
            </footer>

          </div>
          <Sidebar />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
export default App
