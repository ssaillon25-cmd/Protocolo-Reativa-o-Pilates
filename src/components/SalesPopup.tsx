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
    const showNotification = () => {
      const randomContent = notifications[Math.floor(Math.random() * notifications.length)];
      const randomTime = times[Math.floor(Math.random() * times.length)];
      
      setContent(randomContent);
      setTime(randomTime);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 5000);
    };

    const initialDelay = setTimeout(showNotification, 3000);
    const interval = setInterval(showNotification, 15000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -50, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -50, scale: 0.9 }}
          className="fixed bottom-6 left-6 z-[100] bg-white rounded-2xl shadow-2xl p-4 border border-gray-100 flex items-center gap-4 max-w-[320px]"
        >
          <div className="w-12 h-12 bg-brand-success/10 rounded-full flex items-center justify-center shrink-0">
            <div className="w-3 h-3 bg-brand-success rounded-full animate-ping" />
          </div>
          <div>
            <p 
              className="text-xs text-brand-text leading-tight mb-1"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <p className="text-[10px] text-brand-text-muted font-bold uppercase tracking-widest">
              {time}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
