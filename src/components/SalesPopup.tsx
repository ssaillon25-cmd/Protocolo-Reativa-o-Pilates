import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const notifications = [
  "🟢 Compra confirmada<br><strong>Carla M. de São Paulo</strong> acabou de adquirir o protocolo",
  "🟢 Compra confirmada<br><strong>Juliana R. de Belo Horizonte</strong> começou hoje",
  "🔥 <strong>Fernanda L. de Curitiba</strong> garantiu o desconto de 80%",
  "💪 <strong>Patrícia M. de Salvador</strong> já iniciou o Dia 1",
  "🎯 <strong>Ana C. de Recife</strong> decidiu mudar hoje",
  "🟢 Compra confirmada<br><strong>Mariana S. de Porto Alegre</strong> entrou agora no programa"
];

const times = ["há 1 minuto", "há 2 minutos", "agora mesmo", "há poucos segundos"];

export const SalesPopup = () => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const show = () => {
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      const randomTime = times[Math.floor(Math.random() * times.length)];
      setContent(randomNotification);
      setTime(randomTime);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 5000);
    };

    const initialTimeout = setTimeout(show, 4000);
    const interval = setInterval(show, 9000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="fixed bottom-5 left-5 w-[280px] bg-white rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.15)] p-4 z-[9999] border border-gray-100"
        >
          <div 
            className="text-sm text-gray-800 leading-snug" 
            dangerouslySetInnerHTML={{ __html: content }} 
          />
          <div className="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-wider">
            {time}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
