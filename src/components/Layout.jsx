import { Outlet, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';
import Footer from './Footer';
import Toast from './Toast';
import WhatsAppFloat from './WhatsAppFloat';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
  const location = useLocation();
  const reduce = useReducedMotion();

  return (
    <>
      <ScrollToTop />
      <a href="#main" className="skip-link">Skip to content</a>
      <AnnouncementBar />
      <Navbar />
      <motion.main
          id="main"
          key={location.pathname}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.35, ease: 'easeOut' }}
        >
          <Outlet />
        </motion.main>
      <Footer />
      <WhatsAppFloat />
      <Toast />
    </>
  );
}
