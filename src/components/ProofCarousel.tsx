import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    rating: 5,
    author: "Camila R., 38 anos",
    quote: "“Depois dos 35 meu corpo simplesmente parou de responder. Eu fazia tudo certo e nada funcionava. Com 10 minutos por dia, comecei a ver resultado já na segunda semana.”",
    image: "https://res.cloudinary.com/dcef2qwzi/image/upload/q_auto,f_auto/v1774999952/prova_01_r0edzo.jpg"
  },
  {
    rating: 5,
    author: "Lucia M., 44 anos",
    quote: "“Eliminava peso e voltava tudo de novo… Com o protocolo, comecei a perder 1kg por semana de forma constante. Já são mais de 10kg a menos.”",
    image: "https://res.cloudinary.com/dcef2qwzi/image/upload/q_auto,f_auto/v1774999953/prova_02_ijmb3j.jpg"
  },
  {
    rating: 5,
    author: "Patrícia S., 52 anos",
    quote: "“Eu nunca tinha feito Pilates na vida. Achei que seria difícil, mas é só dar o play e seguir. Em poucas semanas já me sentia mais leve e sem dores.”",
    image: "https://res.cloudinary.com/dcef2qwzi/image/upload/q_auto,f_auto/v1774999957/prova_03_ia8aas.jpg"
  },
  {
    rating: 5,
    author: "Fernanda L., 36 anos",
    quote: "“Eu não tinha tempo pra academia… Esse protocolo salvou minha rotina. São só 10 minutos e meu corpo começou a mudar de verdade.”",
    image: "https://res.cloudinary.com/dcef2qwzi/image/upload/q_auto,f_auto/v1774999952/prova_04_cg5jdo.jpg"
  }
];

export const ProofCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[currentIndex];

  return (
    <div className="bg-white rounded-[32px] p-8 shadow-xl border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Star size={80} className="text-brand-pink" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex flex-col gap-6 items-center"
        >
          <div className="w-full aspect-square max-w-[280px] rounded-2xl overflow-hidden border-4 border-brand-pink/20 shrink-0">
            <img 
              src={t.image} 
              alt={t.author}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="text-center">
            <div className="flex gap-1 mb-3 justify-center">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-brand-text text-lg font-medium leading-relaxed mb-4 italic">
              {t.quote}
            </p>
            <p className="text-brand-text font-black uppercase tracking-widest text-sm">
              {t.author}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center md:justify-end gap-4 mt-8">
        <button 
          onClick={prev}
          className="p-3 rounded-full bg-brand-bg-alt hover:bg-gray-200 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={next}
          className="p-3 rounded-full bg-brand-bg-alt hover:bg-gray-200 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
