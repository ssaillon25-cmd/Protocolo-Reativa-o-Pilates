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

export const ProofCarousel = React.memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#f8fafc] py-16 px-4 md:px-6 text-center border-y border-gray-200 shadow-sm">
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="flex justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} size={28} fill="#FFB800" className="text-[#FFB800]" />
              ))}
            </div>

            <div className="mb-6 w-full max-w-full aspect-square rounded-3xl overflow-hidden shadow-2xl border-2 border-white">
              <img 
                src={testimonials[currentIndex].image} 
                alt={testimonials[currentIndex].author}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>

            <p className="text-brand-text font-black text-2xl mb-2">
              {testimonials[currentIndex].author}
            </p>
            
            <p className="text-brand-text font-medium text-xl italic leading-relaxed mb-6">
              {testimonials[currentIndex].quote}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center items-center gap-6">
          <button 
            onClick={() => prev()}
            className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-all hover:scale-110 active:scale-95"
          >
            <ChevronLeft size={24} className="text-brand-text" />
          </button>
          
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <div 
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-6 bg-brand-pink' : 'w-2 bg-gray-200'}`}
              />
            ))}
          </div>

          <button 
            onClick={() => next()}
            className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-all hover:scale-110 active:scale-95"
          >
            <ChevronRight size={24} className="text-brand-text" />
          </button>
        </div>
      </div>
    </div>
  );
});
