import './App.css'
import ProfilesList from '/home/user/agencia/src/ProfilesList.tsx';
import Topbar from '/home/user/agencia/src/Topbar.tsx';
import Sidebar from '/home/user/agencia/src/Sidebar.tsx';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ProfileDetail from '/home/user/agencia/src/ProfileDetail.tsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Topbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<ProfilesList />} />
            <Route path="/profile/:id" element={<ProfileDetail />} />
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
                      <i className="model-tag bi bi-tiktok" style={{ fontSize: '1.5rem' }}></i>
                    </a>
                    <a href="https://x.com/LobasVip?t=gDeAKbkne6kd_GoHxU2e2g&amp;s=09" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                      <i className="model-tag bi bi-twitter" style={{ fontSize: '1.5rem' }}></i>
                    </a>
                    <a href="https://www.instagram.com/lobas_vip?igsh=Y2tycTB5ZnBoNmZk" target="_blank" rel="noopener noreferrer" className="text-light">
                      <i className="model-tag bi bi-instagram" style={{ fontSize: '1.5rem' }}></i>
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
      </BrowserRouter>
    </>
  );
}
export default App
