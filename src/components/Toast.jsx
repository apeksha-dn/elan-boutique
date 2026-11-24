import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Toast() {
  const { toast, dismissToast } = useShop();

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(dismissToast, 2400);
    return () => clearTimeout(t);
  }, [toast, dismissToast]);

  return (
    <div className="toast-wrap" aria-live="polite" role="status">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            className="toast"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
          >
            <Check size={16} /> {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
