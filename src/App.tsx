import { Routes, Route, Navigate } from 'react-router-dom';
import ServicesPage from './pages/ServicesPage';
import MobileBookingPage from './pages/MobileBookingPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ServicesPage />} />
      <Route path="/book/:serviceId" element={<MobileBookingPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
