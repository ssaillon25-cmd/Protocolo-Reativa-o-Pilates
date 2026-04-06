/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft,
  Loader2, 
  AlertTriangle, 
  TrendingDown, 
  Zap,
  Gift,
  Check,
  ArrowDown,
  Plus,
  Minus,
  Brain,
  BarChart3,
  TrendingUp,
  Flame,
  Trophy,
  Calendar
} from "lucide-react";
import { GiftScreen } from "./components/GiftScreen";

// --- Types ---

type Option = {
  label: string;
  value: string;
  image?: string;
};

type Question = {
  id: number;
  text: string;
  type: "choice" | "input";
  multiple?: boolean;
  options?: Option[];
  placeholder?: string;
};

type Testimonial = {
  rating: number;
  author: string;
  role: string;
  avatar?: string;
  image?: string;
  quote: string;
};

type QuizStep = {
  type: "welcome" | "question" | "transition" | "analysis" | "result-cause" | "result-final" | "pre-scratch" | "gift";
  title?: string;
  subtitle?: string;
  text?: string;
  image?: string;
  questions?: Question[];
  buttonText?: string;
  nextStep?: number;
  testimonial?: Testimonial;
  testimonials?: Testimonial[];
  highlights?: string[];
  footerText?: string;
};

const PreScratchScreen = ({ nome, handleNext }: { nome: string, handleNext: () => void }) => {
  const [processStep, setProcessStep] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const steps = [
    "Verificando disponibilidade...",
    "Validando seu perfil...",
    "Liberando seu benefício..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProcessStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => setShowButton(true), 500);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-6 py-12 max-w-lg mx-auto w-full bg-brand-bg min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-display font-bold !text-[#ff4d6d] mb-4 leading-tight">
            {nome}, você deu o primeiro passo certo.
          </h2>
          <p className="text-brand-text font-semibold text-lg leading-snug">
            Com base na sua decisão, liberamos uma verificação final para acessar seu benefício.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-brand-bg-alt p-6 rounded-[24px] mb-8 border border-gray-100"
        >
          <p className="text-brand-text text-sm leading-relaxed mb-4">
            Nem todas as pessoas chegam até aqui…
          </p>
          <p className="text-brand-text text-sm leading-relaxed mb-4">
            E menos ainda têm o perfil ideal para esse tipo de resultado.
          </p>
          <p className="text-brand-pink font-bold text-lg">
            👉 Você tem.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mb-8"
        >
          <p className="text-brand-text font-medium mb-4">
            Por isso, o sistema liberou para você um presente personalizado 👇
          </p>
          <div className="inline-flex items-center gap-2 bg-brand-pink/10 text-brand-pink px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider">
            <Zap size={14} />
            Antecipação
          </div>
        </motion.div>

        <div className="space-y-6 mb-10">
          <p className="text-center text-brand-text-muted text-sm italic">
            Mas antes de acessar… precisamos validar sua liberação no sistema.
          </p>

          <div className="bg-brand-bg-alt p-6 rounded-[24px] border border-brand-text/10">
            <div className="flex flex-col gap-4">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${processStep >= i ? 'bg-brand-success' : 'bg-gray-200'}`}>
                    {processStep > i ? (
                      <Check size={12} className="text-white" />
                    ) : processStep === i ? (
                      <Loader2 size={12} className="text-white animate-spin" />
                    ) : (
                      <div className="w-1 h-1 bg-gray-400 rounded-full" />
                    )}
                  </div>
                  <span className={`text-sm font-medium transition-colors ${processStep >= i ? 'text-brand-text' : 'text-gray-400'}`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-[10px] font-bold text-brand-text uppercase mb-2">
                <span>Progresso</span>
                <span>{processStep === steps.length - 1 ? '92%' : `${Math.floor((processStep / steps.length) * 92)}%`} concluído</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-brand-success"
                  initial={{ width: 0 }}
                  animate={{ width: `${(processStep + 1) / steps.length * 92}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center text-brand-text-muted text-xs mb-8"
        >
          🔥 Isso garante que apenas pessoas com real potencial tenham acesso.
        </motion.p>

        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <p className="text-center font-bold text-brand-text">
                👉 Toque no botão abaixo para revelar seu presente
              </p>
              <button 
                onClick={() => handleNext()}
                className="w-full bg-[#22C55E] hover:bg-[#16a34a] text-white font-display font-black rounded-[16px] h-[64px] flex items-center justify-center transition-all active:scale-95 shadow-[0_10px_30px_rgba(34,197,94,0.4)] animate-pulse border-none hover:scale-[1.02]"
              >
                🎁 REVELAR MEU PRESENTE AGORA
              </button>
              <p className="text-center text-[10px] text-brand-pink font-bold uppercase tracking-widest">
                ⏰ Essa liberação é temporária e pode expirar a qualquer momento.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Data ---

const QUIZ_STEPS: QuizStep[] = [
  {
    type: "welcome",
    title: "ERRO SILENCIOSO QUE TRAVA O METABOLISMO DAS MULHERES APÓS OS 30!",
    subtitle: "Descubra em 2 minutos se seu corpo está bloqueando a queima de gordura",
    questions: [
      { 
        id: 1, 
        text: "Sua idade", 
        type: "choice", 
        options: [
          { label: "20–29 anos", value: "20-29", image: "https://res.cloudinary.com/drhg6wpcy/image/upload/f_webp/q_auto:eco/fl_lossy/c_fit%2Cw_384/c8wxnurtztbeoak4q5py" }, 
          { label: "30–39 anos", value: "30-39", image: "https://res.cloudinary.com/drhg6wpcy/image/upload/f_webp/q_auto:eco/fl_lossy/c_fit%2Cw_384/qhibewotvetgnb4wblj6" }, 
          { label: "40–49 anos", value: "40-49", image: "https://res.cloudinary.com/drhg6wpcy/image/upload/f_webp/q_auto:eco/fl_lossy/c_fit%2Cw_384/u5yhj6luzbri8mktij0b" }, 
          { label: "50+ anos", value: "50+", image: "https://res.cloudinary.com/drhg6wpcy/image/upload/f_webp/q_auto:eco/fl_lossy/c_fit%2Cw_384/szbdyzw4pxukc0psxsh8" }
        ] 
      }
    ]
  },
  {
    type: "question",
    questions: [
      { 
        id: 2, 
        text: "Como você descreveria seu corpo?", 
        type: "choice", 
        options: [
          { label: "Muito acima do peso", value: "muito", image: "https://media.inlead.cloud/uploads/23345/2025-04-19/md-jiazd-78eb4506b05a69e47a9cd293ce85e8e0cfc39fbe8869114f7fbcb615933cde81.png" }, 
          { label: "Um pouco acima", value: "pouco", image: "https://media.inlead.cloud/uploads/23345/2025-04-19/md-1tcdv-2b97ee2fb22ef9dfb8432154080b55a894fd8cff523922e0d3c7f7f682d557d7.png" }, 
          { label: "Falsa magra", value: "falsa", image: "https://media.inlead.cloud/uploads/23345/2025-04-19/md-go2s6-ca606d5839bfa062286f251757b3ecbbe03071c5088f4061eee45b4c94811969.png" }, 
          { label: "Magra", value: "magra", image: "https://media.inlead.cloud/uploads/23345/2025-04-19/md-i4j13-acd5cb8ace4b9a5f82fa4a7d02a8b993582a96e221bf60300e6e505038edd0f5.png" }
        ] 
      },
      { 
        id: 3, 
        text: "Qual seu principal objetivo?", 
        type: "choice", 
        multiple: true,
        options: [
          { label: "Perder barriga", value: "barriga", image: "https://media.inlead.cloud/uploads/23345/2025-04-19/md-ixr5a-67eac3074ca56b65893676de964b1b254163958b448e5a193aa3defeaa5ab509.png" }, 
          { label: "Emagrecer geral", value: "geral", image: "https://media.inlead.cloud/uploads/23345/2025-04-19/md-4ge82-97f0980e85374481b5d3f83222e0d44c74116ad635d6b91a9186ed644e53558b.png" }, 
          { label: "Definir corpo", value: "definir", image: "https://media.inlead.cloud/uploads/23345/2025-04-19/md-4r3lm-0d8ab1bfd6ca6b466b3bb8e29965e0c129aba6b65b62830a25a2396f5a997c8c.png" }, 
          { label: "Ter mais energia", value: "energia", image: "https://media.inlead.cloud/uploads/23345/2025-04-19/md-6410j-b84943e1b891bfbe7bf168a89011b16391e78b274625df3a83aa42599e64a991.png" }
        ] 
      }
    ]
  },
  {
    type: "transition",
    title: "Com base nas suas respostas…",
    text: "seu corpo já mostra sinais de desaceleração metabólica. Isso explica por que nada funciona como antes.",
    buttonText: "Continuar",
    testimonial: {
      rating: 5,
      author: "Carla M., 36 anos",
      role: "auxiliar administrativa",
      image: "https://i.ibb.co/HfHLh25M/ANTES-Metabolismo-travado.png",
      quote: "“Eu achava que era falta de disciplina… tentei dieta, academia, tudo. Mas depois dos 30 meu corpo simplesmente parou de responder. Quando entendi que era meu metabolismo, tudo começou a fazer sentido.”"
    }
  },
  {
    type: "question",
    questions: [
      { id: 4, text: "Seu metabolismo é:", type: "choice", options: [{ label: "Lento", value: "lento" }, { label: "Médio", value: "medio" }, { label: "Acelerado", value: "acelerado" }] },
      { id: 5, text: "Você sente dificuldade para emagrecer?", type: "choice", options: [{ label: "Sim, muita", value: "muita" }, { label: "Um pouco", value: "pouco" }, { label: "Não", value: "nao" }] },
      { id: 6, text: "Você ganha peso com facilidade?", type: "choice", options: [{ label: "Sim", value: "sim" }, { label: "Às vezes", value: "as-vezes" }, { label: "Não", value: "nao" }] },
      { id: 7, text: "Seu peso mudou nos últimos anos?", type: "choice", options: [{ label: "Aumentou", value: "aumentou" }, { label: "Oscila", value: "oscila" }, { label: "Igual", value: "igual" }] }
    ]
  },
  {
    type: "transition",
    title: "Seu corpo pode estar armazenando gordura mesmo quando você tenta emagrecer.",
    text: "E isso tende a piorar com o tempo.",
    buttonText: "Continuar",
    highlights: [
      "Mais de 127.000 mulheres já passaram por esse mesmo problema…",
      "e conseguiram reativar o metabolismo de forma simples e natural.",
      "Elas eliminaram, em média:",
      "👉 até 1kg por semana",
      "sem academia",
      "sem dieta radical",
      "e dedicando apenas 10 minutos por dia"
    ],
    image: "https://media.inlead.cloud/uploads/10687/2025-09-15/md-JtUsN-design-sem-nome-9.png",
    testimonial: {
      rating: 5,
      author: "Camila R., 38 anos",
      role: "Advogada",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
      quote: "“Meu metabolismo travou depois dos 35… eu já tinha tentado de tudo e nada funcionava. Com apenas 10 minutos de Pilates por dia, comecei a sentir meu corpo responder de novo. Em 3 meses, eliminei 14kg — e pela primeira vez o peso começou a cair toda semana.”"
    },
    footerText: "Você não está sozinha nisso…\n\n👉 milhares de mulheres já passaram exatamente pelo que você está passando agora.\n\nA diferença é que elas descobriram o que realmente funciona."
  },
  {
    type: "question",
    questions: [
      { id: 8, text: "Cansaço frequente?", type: "choice", options: [{ label: "Sim", value: "sim" }, { label: "Às vezes", value: "as-vezes" }, { label: "Não", value: "nao" }] },
      { id: 9, text: "Inchaço abdominal?", type: "choice", options: [{ label: "Sim", value: "sim" }, { label: "Às vezes", value: "as-vezes" }, { label: "Não", value: "nao" }] },
      { id: 10, text: "Dificuldade para dormir?", type: "choice", options: [{ label: "Sim", value: "sim" }, { label: "Às vezes", value: "as-vezes" }, { label: "Não", value: "nao" }] },
      { id: 11, text: "Dores no corpo?", type: "choice", options: [{ label: "Sim", value: "sim" }, { label: "Às vezes", value: "as-vezes" }, { label: "Não", value: "nao" }] },
      { id: 12, text: "Nível de energia?", type: "choice", options: [{ label: "Muito baixo", value: "baixo" }, { label: "Médio", value: "medio" }, { label: "Alto", value: "alto" }] }
    ]
  },
  {
    type: "transition",
    title: "Esses sinais indicam que seu metabolismo está em modo de economia.",
    text: "Ou seja… seu corpo está guardando gordura ao invés de queimar.",
    image: "https://res.cloudinary.com/dcef2qwzi/image/upload/v1774812457/Gemini_Generated_Image_g54eerg54eerg54e_kblcyy.png",
    buttonText: "Continuar"
  },
  {
    type: "question",
    questions: [
      { 
        id: 13, 
        text: "Onde quer perder gordura?", 
        type: "choice", 
        multiple: true, 
        options: [
          { label: "Barriga", value: "barriga", image: "https://media.inlead.cloud/uploads/23345/2025-04-19/md-9umtq-4e59b8fb77f05c552752d2e922ae07d89bedfccdc8a5e62df2a83778914a2b4f.png" }, 
          { label: "Coxas", value: "coxas", image: "https://media.inlead.cloud/uploads/23345/2025-04-19/md-mj4a3-8862d13f121129590604bc0f3128c9f33613f26b3fd538e33fcaa731b4ade292.png" }, 
          { label: "Braços", value: "braços", image: "https://media.inlead.cloud/uploads/23345/2025-04-19/md-6kjq3-ae83bcdfeed55319d91df29310e2a87e5be4fbc3a014a76728a735bf8b332a81.png" }, 
          { label: "Corpo todo", value: "todo", image: "https://media.inlead.cloud/uploads/23345/2025-04-19/md-4ge82-97f0980e85374481b5d3f83222e0d44c74116ad635d6b91a9186ed644e53558b.png" }
        ] 
      },
      { id: 14, text: "Como isso afeta sua autoestima?", type: "choice", options: [{ label: "Muito", value: "muito" }, { label: "Um pouco", value: "pouco" }, { label: "Não afeta", value: "nao" }] },
      { id: 15, text: "Você evita roupas por causa do corpo?", type: "choice", options: [{ label: "Sim", value: "sim" }, { label: "Às vezes", value: "as-vezes" }, { label: "Não", value: "nao" }] }
    ]
  },
  {
    type: "question",
    questions: [
      { id: 16, text: "Já tentou emagrecer?", type: "choice", options: [{ label: "Muitas vezes", value: "muitas" }, { label: "Algumas", value: "algumas" }, { label: "Nunca", value: "nunca" }] },
      { id: 17, text: "O que tentou?", type: "choice", multiple: true, options: [{ label: "Dieta", value: "dieta" }, { label: "Academia", value: "academia" }, { label: "Remédios", value: "remedios" }, { label: "Nada", value: "nada" }] },
      { id: 18, text: "Funcionou?", type: "choice", options: [{ label: "Não", value: "nao" }, { label: "Parcial", value: "parcial" }, { label: "Sim", value: "sim" }] }
    ]
  },
  {
    type: "transition",
    title: "O problema nunca foi falta de esforço…",
    text: "foi usar o método errado para o seu metabolismo atual.",
    buttonText: "Continuar",
    testimonials: [
      {
        rating: 5,
        author: "Patrícia M., 44 anos",
        role: "Verified User",
        image: "https://i.pinimg.com/1200x/0e/9b/fd/0e9bfd2547e712bf14c384a9a15db679.jpg",
        quote: "“Eu me culpava o tempo todo… achava que era falta de força de vontade. Tentava dieta, academia, tudo. Mas nada funcionava — até entender que o problema não era esforço… era o método errado pro meu metabolismo.”"
      },
      {
        rating: 5,
        author: "Renata S., 41 anos",
        role: "Verified User",
        image: "https://i.pinimg.com/736x/6b/4d/c2/6b4dc2713dc88da6cd617ca972c04dd4.jpg",
        quote: "“Eu achava que o problema era comigo… que eu não tinha disciplina suficiente. Mas a verdade é que eu estava fazendo tudo errado pro meu corpo. Quando comecei a usar o método certo, foi a primeira vez que vi resultado de verdade.”"
      }
    ]
  },
  {
    type: "question",
    questions: [
      { id: 19, text: "Sua rotina é:", type: "choice", options: [{ label: "Corrida", value: "corrida" }, { label: "Moderada", value: "moderada" }, { label: "Tranquila", value: "tranquila" }] },
      { id: 20, text: "Tempo disponível:", type: "choice", options: [{ label: "10 min", value: "10" }, { label: "20 min", value: "20" }, { label: "30+", value: "30" }] },
      { id: 21, text: "Dias por semana:", type: "choice", options: [{ label: "1–2", value: "1-2" }, { label: "3–4", value: "3-4" }, { label: "5+", value: "5+" }] }
    ]
  },
  {
    type: "question",
    questions: [
      { id: 22, text: "Alimentação:", type: "choice", options: [{ label: "Ruim", value: "ruim" }, { label: "Média", value: "media" }, { label: "Boa", value: "boa" }] },
      { id: 23, text: "Consome açúcar?", type: "choice", options: [{ label: "Sim", value: "sim" }, { label: "Às vezes", value: "as-vezes" }, { label: "Não", value: "nao" }] },
      { id: 24, text: "Sono:", type: "choice", options: [{ label: "<5h", value: "5" }, { label: "5–6h", value: "5-6" }, { label: "7–8h", value: "7-8" }, { label: "8h+", value: "8+" }] }
    ]
  },
  {
    type: "question",
    questions: [
      { id: 25, text: "Quer mudar agora?", type: "choice", options: [{ label: "Sim", value: "sim" }, { label: "Talvez", value: "talvez" }] },
      { id: 26, text: "Pode dedicar 10 minutos por dia?", type: "choice", options: [{ label: "Sim", value: "sim" }, { label: "Não sei", value: "nao-sei" }] }
    ]
  },
  {
    type: "question",
    questions: [
      { id: 27, text: "Peso atual (kg)", type: "input", placeholder: "Ex: 75" },
      { id: 28, text: "Peso ideal (kg)", type: "input", placeholder: "Ex: 60" },
      { id: 29, text: "Seu nome", type: "input", placeholder: "Como podemos te chamar?" }
    ],
    buttonText: "👉 Personalizar meu protocolo"
  },
  {
    type: "analysis"
  },
  {
    type: "result-cause"
  },
  {
    type: "result-final"
  },
  {
    type: "pre-scratch"
  },
  {
    type: "gift"
  }
];

// --- Components ---

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
    <motion.div 
      className="h-full bg-brand-success"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5 }}
    />
  </div>
);

const SocialProof = () => (
  <div className="mt-8 p-4 bg-white rounded-[12px] shadow-sm border border-gray-100 flex flex-col items-center">
    <div className="flex gap-1 mb-2">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
      ))}
    </div>
    <p className="text-brand-text italic text-center text-sm">
      “Perdi 4,5kg em 3 semanas com apenas 10 minutos por dia”
    </p>
  </div>
);

const TestimonialCarousel = ({ testimonials }: { testimonials: Testimonial[] }) => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [index]);

  const t = testimonials[index];

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-brand-bg-alt rounded-2xl p-6 mb-6 text-left border border-gray-100 relative shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            {t.avatar ? (
              <img 
                src={t.avatar} 
                alt={t.author}
                className="w-10 h-10 rounded-full object-cover border border-white/20"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink font-bold text-sm">
                {t.author.charAt(0)}
              </div>
            )}
            <div>
              <p className="text-brand-text font-bold text-sm">{t.author}</p>
              <p className="text-brand-text-muted text-xs">{t.role}</p>
            </div>
          </div>

          {t.image && (
            <div className="mb-6 rounded-xl overflow-hidden border border-gray-100 shadow-md">
              <img 
                src={t.image} 
                alt="Resultado"
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          <p className="text-brand-text font-medium text-sm italic leading-relaxed">
            {t.quote}
          </p>
        </motion.div>
      </AnimatePresence>
      
      {testimonials.length > 1 && (
        <div className="flex justify-center items-center gap-4 mb-10">
          <button onClick={() => prev()} className="p-2 rounded-full bg-brand-bg-alt hover:bg-gray-200 text-black transition-colors active:scale-90 border border-gray-100">
            <ChevronLeft size={20} className="text-black" />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === index ? 'bg-brand-pink w-4' : 'bg-gray-300'}`} />
            ))}
          </div>
          <button onClick={() => next()} className="p-2 rounded-full bg-brand-bg-alt hover:bg-gray-200 text-black transition-colors active:scale-90 border border-gray-100">
            <ChevronRight size={20} className="text-black" />
          </button>
        </div>
      )}
    </div>
  );
};

const ResultImageCarousel = () => {
  const images = [
    "https://res.cloudinary.com/dcef2qwzi/image/upload/v1774816534/ANTES_Metabolismo_travado_1_mxmga9.png",
    "https://res.cloudinary.com/dcef2qwzi/image/upload/v1774816535/ANTES_Metabolismo_travado_2_hcdve4.png",
    "https://res.cloudinary.com/dcef2qwzi/image/upload/v1774816534/ANTES_Metabolismo_travado_g7cw0l.png",
    "https://res.cloudinary.com/dcef2qwzi/image/upload/q_auto/f_auto/v1775082646/ANTES_Metabolismo_travado_3_qnkdhc.png"
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full mb-12 group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="rounded-[24px] overflow-hidden shadow-xl border border-gray-100"
        >
          <img 
            src={images[currentIndex]} 
            alt={`Resultado ${currentIndex + 1}`} 
            className="w-full h-auto object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button 
        onClick={() => prev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-brand-text hover:bg-white transition-all hover:scale-110 active:scale-95 z-10 opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={() => next()}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center text-brand-text hover:bg-white transition-all hover:scale-110 active:scale-95 z-10 opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={24} />
      </button>

      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-6 bg-brand-text' : 'w-2 bg-gray-200'}`} 
          />
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQuestionInBlock, setCurrentQuestionInBlock] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentStep = QUIZ_STEPS[stepIndex];
  const totalQuestions = 29;
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const handleNext = () => {
    if (isTransitioning || stepIndex >= QUIZ_STEPS.length - 1) return;

    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 400); // Guard against rapid clicks

    if (currentStep.type === "question") {
      const questions = currentStep.questions || [];
      if (currentQuestionInBlock < questions.length - 1) {
        setCurrentQuestionInBlock(prev => prev + 1);
      } else {
        setStepIndex(prev => prev + 1);
        setCurrentQuestionInBlock(0);
      }
    } else {
      setStepIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    // Prevent going back if we are in the diagnostic phase or later
    const diagnosticSteps = ["analysis", "result-cause", "result-final", "pre-scratch", "gift"];
    if (diagnosticSteps.includes(currentStep.type)) {
      return;
    }

    if (currentQuestionInBlock > 0) {
      setCurrentQuestionInBlock(prev => prev - 1);
    } else if (stepIndex > 0) {
      const prevStep = QUIZ_STEPS[stepIndex - 1];
      setStepIndex(stepIndex - 1);
      if (prevStep.type === "question") {
        setCurrentQuestionInBlock((prevStep.questions?.length || 1) - 1);
      } else {
        setCurrentQuestionInBlock(0);
      }
    }
  };

  const handleAnswer = (questionId: number, value: string) => {
    const question = currentStep.questions?.[currentQuestionInBlock];
    
    if (question?.multiple) {
      const currentAnswers = answers[questionId] ? answers[questionId].split(",").filter(Boolean) : [];
      const newAnswers = currentAnswers.includes(value)
        ? currentAnswers.filter(a => a !== value)
        : [...currentAnswers, value];
      
      setAnswers(prev => ({ ...prev, [questionId]: newAnswers.join(",") }));
    } else {
      setAnswers(prev => ({ ...prev, [questionId]: value }));
      handleNext();
    }
  };

  const handleInputChange = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  // Analysis Loading Effect
  useEffect(() => {
    if (currentStep.type === "analysis") {
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStepIndex(prevStep => prevStep + 1), 1000);
            return 100;
          }
          return prev + 1;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [currentStep.type]);

  const renderWelcome = () => {
    const ageQuestion = currentStep.questions?.[0];
    
    return (
      <div className="flex flex-col items-center text-center px-4 py-8 max-w-6xl mx-auto">
        {/* Previous Texts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 max-w-3xl"
        >
          <h1 className="text-2xl md:text-4xl font-display font-bold !text-[#ff4d6d] leading-tight mb-4">
            {currentStep.title}
          </h1>
          <p className="text-lg md:text-xl text-black font-semibold mb-6">
            {currentStep.subtitle}
          </p>
          <p className="text-brand-text-muted text-base md:text-lg leading-relaxed">
            {currentStep.text}
          </p>
        </motion.div>

        {/* Top Transformation Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-2xl mb-12 rounded-[24px] overflow-hidden shadow-sm bg-black"
        >
          <video 
            src="https://res.cloudinary.com/dcef2qwzi/video/upload/v1774809628/download_xk7xla.mp4" 
            className="w-full h-auto"
            autoPlay
            loop
            muted
            playsInline
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-lg md:text-xl font-bold text-brand-text mb-8 max-w-2xl"
        >
          💣 Perdeu 14kg com apenas 10 minutos por dia — sem academia, sem dieta radical.
        </motion.p>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm md:text-base font-display font-medium text-brand-text tracking-[0.2em] uppercase mb-8 px-4"
        >
          SELECIONE SUA IDADE PARA PERSONALIZAR SEU PROTOCOLO
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <ArrowDown className="text-brand-text" size={24} strokeWidth={3} />
        </motion.div>

        {/* Age Selection Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full mb-16">
          {ageQuestion?.options?.map((opt, i) => (
            <motion.button
              key={opt.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              onClick={() => handleAnswer(ageQuestion.id, opt.value)}
              className="flex flex-col bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all group active:scale-95 border border-gray-100"
            >
              <div className="p-4 flex-grow flex items-center justify-center min-h-[160px] md:min-h-[200px]">
                <img 
                  src={opt.image} 
                  alt={opt.label} 
                  className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="bg-brand-bg-alt p-4 flex items-center justify-between px-5">
                <span className="text-brand-text text-xs md:text-sm font-bold tracking-tight">{opt.label}</span>
                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                  <ChevronRight size={12} className="text-brand-text" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-brand-text-muted text-[10px] md:text-xs flex items-center gap-2 font-medium"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-text" />
          Teste gratuito · Resultado em menos de 2 minutos
        </motion.p>
      </div>
    );
  };

  const renderQuestion = () => {
    const questions = currentStep.questions || [];
    const question = questions[currentQuestionInBlock];

    if (!question) return null;

    const hasImages = question.options?.some(o => o.image);

    return (
      <div className={`px-4 py-12 mx-auto w-full ${hasImages ? 'max-w-3xl' : 'max-w-lg'}`}>
        <div className="flex items-center justify-start mb-8">
          <button 
            onClick={() => handleBack()}
            className="flex items-center gap-1 text-brand-text-muted hover:text-brand-pink transition-colors font-medium text-sm"
          >
            <ChevronLeft size={18} />
            Voltar
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card-quiz"
          >
            <h2 className="text-xl font-display font-bold !text-[#ff4d6d] mb-8">
              {question.text}
            </h2>

            {question.type === "choice" ? (
              <div className="flex flex-col gap-6">
                <div className={`flex flex-col gap-4 md:gap-6 ${hasImages ? 'grid grid-cols-2' : ''}`}>
                  {question.options?.map((opt) => {
                    const isSelected = answers[question.id]?.split(",").filter(Boolean).includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleAnswer(question.id, opt.value)}
                        className={`w-full transition-all group active:scale-95 relative ${
                          opt.image 
                            ? 'flex flex-col bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.02] border border-gray-100' 
                            : 'h-[56px] border-2 rounded-[16px] flex flex-row items-center justify-between px-6 font-bold transition-all hover:bg-white hover:shadow-sm'
                        } ${
                          !opt.image && isSelected 
                            ? 'border-brand-pink bg-brand-pink/5 text-brand-pink' 
                            : !opt.image ? 'border-gray-100 text-brand-text-muted hover:border-brand-pink hover:text-brand-pink hover:scale-[1.02]' : ''
                        }`}
                      >
                        {opt.image ? (
                          <>
                            <div className="p-4 flex-grow flex items-center justify-center min-h-[160px] md:min-h-[200px] relative">
                              <img 
                                src={opt.image} 
                                alt={opt.label} 
                                className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                                referrerPolicy="no-referrer"
                              />
                              {isSelected && (
                                <div className="absolute top-4 right-4 w-6 h-6 bg-brand-pink rounded-full flex items-center justify-center shadow-lg z-10">
                                  <Check size={14} className="text-white" />
                                </div>
                              )}
                            </div>
            <div className={`w-full p-4 flex items-center justify-between px-5 transition-colors ${isSelected ? 'bg-brand-pink' : 'bg-brand-bg-alt'}`}>
                              <span className={`${isSelected ? 'text-white' : 'text-brand-text'} text-xs md:text-sm font-bold tracking-tight text-left leading-tight`}>{opt.label}</span>
                              <div className={`w-5 h-5 rounded-full ${isSelected ? 'bg-white/20' : 'bg-gray-200'} flex items-center justify-center flex-shrink-0`}>
                                {isSelected ? <Check size={12} className="text-white" /> : <ChevronRight size={12} className="text-brand-text" />}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <span>{opt.label}</span>
                            {isSelected ? (
                              <CheckCircle2 size={20} className="text-brand-pink" />
                            ) : (
                              <ChevronRight size={20} className="text-gray-300 group-hover:text-brand-pink" />
                            )}
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>

                {question.multiple && (
                  <button 
                    onClick={() => handleNext()}
                    disabled={!answers[question.id]}
                    className="btn-primary w-full disabled:opacity-50 mt-4"
                  >
                    Continuar
                  </button>
                )}
              </div>
            ) : question.text.toLowerCase().includes("peso") ? (
              <div className="flex flex-col items-center gap-10 py-4">
                <div className="text-center">
                  <span className="text-sm font-bold text-brand-text-muted uppercase tracking-[0.2em] mb-2 block">
                    {question.text}
                  </span>
                  <p className="text-xs text-brand-text-muted opacity-60">Ex: 75kg</p>
                </div>

                <div className="flex items-center justify-center gap-10">
                  <button 
                    onClick={() => {
                      const current = parseInt(answers[question.id] || "70");
                      handleInputChange(question.id, Math.max(30, current - 1).toString());
                    }}
                    className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-brand-text hover:text-brand-pink transition-all active:scale-90 border border-gray-100"
                  >
                    <Minus size={28} />
                  </button>
                  
                  <div className="flex flex-col items-center min-w-[120px]">
                    <motion.div 
                      key={answers[question.id]}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-7xl font-display font-bold text-brand-text tabular-nums"
                    >
                      {answers[question.id] || "70"}
                    </motion.div>
                    <span className="text-brand-text-muted font-bold uppercase tracking-widest text-sm mt-1">Quilos</span>
                  </div>

                  <button 
                    onClick={() => {
                      const current = parseInt(answers[question.id] || "70");
                      handleInputChange(question.id, Math.min(250, current + 1).toString());
                    }}
                    className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-brand-text hover:text-brand-pink transition-all active:scale-90 border border-gray-100"
                  >
                    <Plus size={28} />
                  </button>
                </div>

                {/* Modern Visual Scale */}
                <div className="w-full h-24 relative flex items-end justify-center overflow-hidden px-10">
                  <div className="absolute top-0 h-full w-1 bg-brand-success rounded-full z-10 shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                  <div className="flex gap-6 items-end pb-4">
                    {[...Array(15)].map((_, i) => {
                      const currentVal = parseInt(answers[question.id] || "70");
                      const val = currentVal - 7 + i;
                      const isMain = val % 5 === 0;
                      const isCenter = val === currentVal;
                      
                      return (
                        <motion.div 
                          key={i} 
                          animate={{ 
                            height: isCenter ? 48 : (isMain ? 32 : 16),
                            opacity: isCenter ? 1 : (isMain ? 0.6 : 0.3)
                          }}
                          className={`w-1 bg-brand-text rounded-full transition-all`} 
                        />
                      );
                    })}
                  </div>
                </div>

                <button 
                  onClick={() => handleNext()}
                  className="btn-primary w-full shadow-xl"
                >
                  {currentStep.buttonText || "Continuar"}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <input 
                  type="text"
                  placeholder={question.placeholder}
                  value={answers[question.id] || ""}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                  className="w-full h-[56px] bg-brand-bg-alt border-none rounded-[12px] px-6 text-brand-text focus:ring-2 focus:ring-brand-success outline-none"
                />
                {currentQuestionInBlock === questions.length - 1 && (
                  <button 
                    onClick={() => handleNext()}
                    disabled={!answers[question.id]}
                    className="btn-primary w-full disabled:opacity-50"
                  >
                    {currentStep.buttonText || "Continuar"}
                  </button>
                )}
                {currentQuestionInBlock < questions.length - 1 && (
                  <button 
                    onClick={() => handleNext()}
                    disabled={!answers[question.id]}
                    className="btn-primary w-full disabled:opacity-50"
                  >
                    Próxima pergunta
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  const renderTransition = () => (
    <div className="fixed inset-0 bg-brand-bg-alt z-40 overflow-y-auto py-10">
      <div className="max-w-md mx-auto px-8 pt-4 flex items-center justify-start">
        <button 
          onClick={() => handleBack()}
          className="flex items-center gap-1 text-brand-text-muted hover:text-brand-pink transition-colors font-medium text-sm"
        >
          <ChevronLeft size={18} />
          Voltar
        </button>
      </div>
      <div className="min-h-full flex items-center justify-center px-8 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full my-auto"
        >
        <h2 className="text-2xl font-display font-bold !text-[#ff4d6d] mb-6 leading-tight">
          {currentStep.title}
        </h2>
        <p className="text-brand-text/80 text-lg mb-10 leading-relaxed">
          {currentStep.text}
        </p>

        {currentStep.highlights && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-10 text-left shadow-sm">
            {currentStep.highlights.map((h, i) => (
              <p key={i} className={`text-brand-text/90 leading-relaxed ${h.startsWith('👉') ? 'font-bold text-brand-success mt-2' : 'text-sm'}`}>
                {h}
              </p>
            ))}
          </div>
        )}

        {currentStep.image && (
          <div className="mb-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <img 
              src={currentStep.image} 
              alt="Visualização" 
              className="w-full h-auto"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {currentStep.testimonial && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 mb-10 text-left border border-gray-100 shadow-sm relative"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-1">
                {[...Array(currentStep.testimonial.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              {currentStep.testimonial.avatar ? (
                <img 
                  src={currentStep.testimonial.avatar} 
                  alt={currentStep.testimonial.author}
                  className="w-10 h-10 rounded-full object-cover border border-gray-100"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-brand-bg-alt flex items-center justify-center text-brand-text font-bold text-sm">
                  {currentStep.testimonial.author.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-brand-text font-bold text-sm">{currentStep.testimonial.author}</p>
                <p className="text-brand-text-muted text-xs">{currentStep.testimonial.role}</p>
              </div>
            </div>

            {currentStep.testimonial.image && (
              <div className="mb-6 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src={currentStep.testimonial.image} 
                  alt="Resultado"
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            <p className="text-brand-text/90 text-sm italic leading-relaxed">
              {currentStep.testimonial.quote}
            </p>
          </motion.div>
        )}

        {currentStep.testimonials && (
          <TestimonialCarousel testimonials={currentStep.testimonials} />
        )}

        {currentStep.footerText && (
          <div className="text-brand-text/80 text-sm mb-10 leading-relaxed whitespace-pre-line">
            {currentStep.footerText}
          </div>
        )}

        <button 
          onClick={() => handleNext()}
          className="bg-brand-pink text-white font-display font-black rounded-[16px] h-[64px] w-full flex items-center justify-center shadow-xl active:scale-95 transition-all"
        >
          {currentStep.buttonText}
        </button>
      </motion.div>
    </div>
  </div>
);

  const renderAnalysis = () => {
    const nome = answers[29] || "Você";
    
    return (
      <div className="flex flex-col items-center px-8 py-12 min-h-screen text-center overflow-y-auto bg-brand-bg">
        <div className="my-auto w-full flex flex-col items-center max-w-md mx-auto">
          {/* Pulsing Animation */}
          <div className="relative w-32 h-32 mb-12">
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-brand-success rounded-full"
            />
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute inset-4 bg-brand-success rounded-full"
            />
            <div className="absolute inset-8 bg-brand-success rounded-full flex items-center justify-center shadow-lg">
              <Loader2 size={32} className="text-white animate-spin" />
            </div>
          </div>

          <h2 className="text-2xl font-display font-bold !text-[#ff4d6d] mb-2">
            Analisando seu perfil…
          </h2>
          <p className="text-brand-text font-bold text-lg mb-8">
            {nome}, estamos quase lá! ({Math.floor(analysisProgress)}%)
          </p>
        
          <div className="w-full h-2 bg-gray-100 rounded-full mb-12 overflow-hidden shadow-inner">
            <motion.div 
              className="h-full bg-brand-success shadow-[0_0_10px_rgba(34,197,94,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${analysisProgress}%` }}
            />
          </div>

          <div className="flex flex-col gap-4 text-left w-full bg-brand-bg-alt p-8 rounded-[24px] border border-gray-100 shadow-sm">
            {[
              { label: "Perfil metabólico", threshold: 20 },
              { label: "Padrões hormonais", threshold: 50 },
              { label: "Queima de gordura", threshold: 80 },
              { label: "Identificando causa raiz", threshold: 95 }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${analysisProgress >= item.threshold ? 'bg-brand-success' : 'bg-gray-200'}`}>
                  {analysisProgress >= item.threshold ? (
                    <Check size={14} className="text-white" />
                  ) : (
                    <div className="w-1 h-1 bg-gray-400 rounded-full" />
                  )}
                </div>
                <span className={`font-medium transition-colors ${analysisProgress >= item.threshold ? 'text-brand-text' : 'text-gray-400'}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs text-brand-text-muted italic opacity-60">
            Não feche esta página. Seu protocolo personalizado está sendo gerado com base no seu metabolismo de {answers[1] || "30+"} anos.
          </p>
        </div>
      </div>
    );
  };

  const renderResultCause = () => {
    const nome = answers[29] || "Você";
    return (
      <div className="px-6 py-12 max-w-lg mx-auto w-full bg-brand-bg min-h-screen">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-success/10 text-brand-success px-4 py-2 rounded-full font-bold text-sm mb-6">
            <AlertTriangle size={16} />
            ⚠️ CAUSA RAIZ IDENTIFICADA
          </div>
          <h2 className="text-xl font-display font-bold text-brand-text mb-8 leading-tight">
            {nome}, encontramos o principal bloqueio do seu corpo:
          </h2>
          
          <div className="bg-brand-pink/5 p-6 rounded-[24px] border border-brand-pink/20 mb-10">
            <p className="text-brand-pink font-black text-sm uppercase tracking-widest mb-2">💣 SEU PROBLEMA É:</p>
            <p className="text-2xl font-display font-black !text-[#ff4d6d] leading-tight">
              👉 Metabolismo hormonal desacelerado
            </p>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="font-display font-bold text-brand-text mb-6 flex items-center gap-2 justify-center">
            <BarChart3 size={20} className="text-brand-text" />
            📊 SEU ESTADO ATUAL
          </h3>
          
          <div className="card-quiz mb-6">
            <div className="mb-6">
              <div className="flex justify-between items-end mb-2">
                <span className="font-bold text-brand-text flex items-center gap-1">
                  <Flame size={16} className="text-brand-pink" /> 🔥 Metabolismo
                </span>
                <span className="text-brand-success font-black text-xl">27%</span>
              </div>
              <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden flex">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "27%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-brand-success" 
                />
              </div>
              <p className="text-xs text-brand-text-muted mt-3 font-medium">Seu corpo está queimando muito menos gordura do que deveria.</p>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="font-bold text-brand-text flex items-center gap-1">
                  <TrendingDown size={16} className="text-brand-pink" /> ⚖️ Equilíbrio hormonal
                </span>
                <span className="text-brand-success font-black text-xl">32%</span>
              </div>
              <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "32%" }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="h-full bg-brand-success" 
                />
              </div>
              <p className="text-xs text-brand-text-muted mt-3 font-medium">Abaixo do nível ideal para ativar a queima de gordura.</p>
            </div>
          </div>
        </div>

        <div className="bg-brand-bg-alt p-8 rounded-[32px] border border-gray-100 mb-10 shadow-sm">
          <h3 className="font-display font-bold text-brand-text mb-6 flex items-center gap-2">
            <Brain size={20} className="text-brand-text" />
            🧠 EXPLICAÇÃO
          </h3>
          <p className="text-brand-text mb-6 leading-relaxed font-medium">
            Isso faz com que seu corpo entre em um modo de defesa…
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-brand-text font-bold">
              <span className="text-brand-pink text-lg">👉</span>
              <span>armazenando gordura ao invés de queimar</span>
            </li>
            <li className="flex items-start gap-3 text-brand-text font-bold">
              <span className="text-brand-pink text-lg">👉</span>
              <span>reduzindo sua energia</span>
            </li>
            <li className="flex items-start gap-3 text-brand-text font-bold">
              <span className="text-brand-pink text-lg">👉</span>
              <span>dificultando qualquer tentativa de emagrecimento</span>
            </li>
          </ul>
        </div>

        <div className="text-center mb-10 px-4">
          <p className="text-xl font-bold text-brand-text leading-tight">
            Por isso parece que nada funciona… <br />
            <span className="text-brand-text-muted">mesmo quando você se esforça.</span>
          </p>
        </div>

        <div className="bg-brand-success/5 p-8 rounded-[32px] border border-brand-success/20 mb-10 text-center">
          <p className="text-lg font-bold text-brand-text leading-tight">
            Mas a boa notícia é: <br />
            <span className="text-brand-success text-xl">👉 isso pode ser revertido ao ativar seu metabolismo da forma correta.</span>
          </p>
        </div>

        <div className="card-quiz mb-10 border-brand-success/30 bg-white">
          <h3 className="text-xl font-display font-black text-brand-text mb-4 leading-tight">
            ✅ {nome}, seu protocolo já está pronto
          </h3>
          <p className="text-brand-text-muted text-sm leading-relaxed">
            Criamos um plano personalizado com base nas suas respostas para reativar seu metabolismo de forma simples e progressiva.
          </p>
        </div>

        <div className="bg-brand-text p-8 rounded-[32px] mb-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
          <p className="font-bold text-lg mb-6 leading-tight">Nos próximos segundos, você vai ver exatamente:</p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-brand-success flex items-center justify-center shrink-0">
                <Check size={12} className="text-white" />
              </div>
              <span className="font-medium">Como ativar seu metabolismo</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-brand-success flex items-center justify-center shrink-0">
                <Check size={12} className="text-white" />
              </div>
              <span className="font-medium">Como começar com apenas 10 minutos por dia</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-brand-success flex items-center justify-center shrink-0">
                <Check size={12} className="text-white" />
              </div>
              <span className="font-medium">E como eliminar gordura de forma consistente</span>
            </li>
          </ul>
        </div>

        <button 
          onClick={() => handleNext()} 
          className="w-full py-6 text-xl font-black text-white bg-[#22C55E] hover:bg-[#16a34a] shadow-[0_15px_35px_rgba(34,197,94,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all animate-pulse-green rounded-2xl flex items-center justify-center gap-2 border-none"
        >
          👉 VER MEU PROTOCOLO PERSONALIZADO
        </button>
      </div>
    );
  };

  const renderResultFinal = () => {
    const nome = (answers[29] || "Você").toUpperCase();
    return (
      <div className="px-6 py-12 max-w-lg mx-auto w-full bg-brand-bg min-h-screen">
        <div className="flex items-center gap-2 text-brand-success font-bold mb-4 justify-center">
          <CheckCircle2 size={20} />
          Plano criado com sucesso
        </div>
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-black mb-2 uppercase tracking-tight !text-[#22c55e]">
            🎉 PARABÉNS, {nome}!
          </h2>
          <p className="text-brand-text font-bold text-lg leading-tight">
            Seu teste identificou um alto potencial de emagrecimento
          </p>
        </div>

        {/* Brain/Explanation Section */}
        <div className="bg-brand-text/5 border border-brand-text/10 p-6 rounded-[24px] mb-10 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-10">
            <Brain size={80} className="text-brand-text" />
          </div>
          <h3 className="font-display font-bold text-brand-text mb-4 flex items-center gap-2">
            <Brain size={20} className="text-brand-text" />
            🧠 EXPLICAÇÃO
          </h3>
          <p className="text-brand-text leading-relaxed">
            Com base nas suas respostas… <br />
            <span className="font-bold text-brand-success">👉 seu corpo tem capacidade de eliminar até 1kg por semana</span> desde que você ative corretamente o seu metabolismo hormonal.
          </p>
        </div>

        {/* Visual Projection Bars */}
        <div className="mb-10">
          <h3 className="font-display font-bold text-blue-600 mb-6 flex items-center gap-2">
            <BarChart3 size={20} className="text-blue-600" />
            📊 PROJEÇÃO VISUAL
          </h3>
          <p className="text-sm text-brand-text-muted mb-4 font-medium">Sua estimativa de emagrecimento:</p>
          
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
                <span>0.5kg</span>
                <span>Baixo</span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={`h-4 flex-1 rounded-sm ${i <= 2 ? 'bg-brand-text/40' : 'bg-gray-100'}`} />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1 relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-blue-600 font-bold text-xs flex items-center gap-1">
                Você está aqui <ArrowDown size={12} />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-blue-600 uppercase">
                <span>👉 1kg</span>
                <span>Ideal</span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={`h-4 flex-1 rounded-sm ${i <= 4 ? 'bg-blue-600' : 'bg-gray-100'}`} />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
                <span>1.5kg</span>
                <span>Acelerado</span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={`h-4 flex-1 rounded-sm bg-brand-text/20`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-brand-success/5 border-l-4 border-brand-success p-4 mb-10 italic text-brand-text font-medium">
          "Isso significa que seu corpo responde rápido quando o método certo é aplicado."
        </div>

        {/* Personalized Plan */}
        <div className="card-quiz mb-10 border-blue-200">
          <h3 className="font-display font-bold text-blue-600 mb-8 flex items-center gap-2">
            <TrendingUp size={20} />
            📈 SEU PLANO PERSONALIZADO:
          </h3>

          <div className="space-y-8">
            {[
              { 
                title: "1. Reativação Metabólica", 
                desc: "Primeiros 7 dias — seu metabolismo começa a acelerar", 
                icon: <Zap size={18} className="text-blue-600" /> 
              },
              { 
                title: "2. Queima Visível", 
                desc: "Semanas 2 e 3 — gordura localizada começa a reduzir", 
                icon: <Flame size={18} className="text-blue-600" /> 
              },
              { 
                title: "3. Resultado e Tonificação", 
                desc: "Semana 4 — corpo mais leve, definido e com mais energia", 
                icon: <Trophy size={18} className="text-blue-600" /> 
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 relative">
                {i < 2 && <div className="absolute left-4 top-10 bottom-[-20px] w-0.5 bg-blue-100" />}
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-blue-600 text-lg leading-tight mb-1">{item.title}</h4>
                  <p className="text-sm text-brand-text-muted leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Results */}
        <div className="bg-brand-text p-8 rounded-[32px] mb-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
          <h3 className="font-display font-bold !text-white mb-6 text-sm uppercase tracking-widest flex items-center gap-2">
            <Calendar size={16} />
            <span className="!text-white">📉 RESULTADO SEMANAL</span>
          </h3>
          <div className="space-y-4">
            {[
              { week: "Semana 1", loss: "−1kg" },
              { week: "Semana 2", loss: "−2kg" },
              { week: "Semana 3", loss: "−3kg" },
              { week: "Semana 4", loss: "−4kg" }
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center border-b border-white/10 pb-3 last:border-0 last:pb-0">
                <span className="text-lg font-medium text-white">{item.week}</span>
                <span className="text-2xl font-black text-brand-success">{item.loss}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof Carousel */}
        <ResultImageCarousel />

        {/* Closing Question */}
        <div className="text-center mb-10">
          <h3 className="text-xl font-display font-bold text-[#f59e0b] mb-8 px-4">
            👉 {nome}, você quer eliminar até 1kg por semana?
          </h3>
          
          <div className="space-y-4">
            <button 
              onClick={() => handleNext()}
              className="w-full py-6 text-xl font-black text-white bg-[#22C55E] hover:bg-[#16a34a] shadow-[0_15px_35px_rgba(34,197,94,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all animate-pulse-green rounded-2xl flex items-center justify-center gap-2 border-none"
            >
              🚀 ATIVAR MEU PROTOCOLO
            </button>
            <button 
              onClick={() => handleNext()}
              className="w-full py-4 text-brand-text-muted font-bold hover:text-brand-pink transition-colors"
            >
              🤔 QUERO TENTAR
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-brand-bg-alt flex flex-col">
      {stepIndex > 0 && stepIndex < QUIZ_STEPS.length - 5 && <ProgressBar progress={progress} />}
      
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {currentStep && (
            <motion.div
              key={stepIndex + (currentStep.type === "question" ? `-${currentQuestionInBlock}` : "")}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full my-auto"
            >
              {currentStep.type === "welcome" && renderWelcome()}
              {currentStep.type === "question" && renderQuestion()}
              {currentStep.type === "transition" && renderTransition()}
              {currentStep.type === "analysis" && renderAnalysis()}
              {currentStep.type === "result-cause" && renderResultCause()}
              {currentStep.type === "result-final" && renderResultFinal()}
              {currentStep.type === "pre-scratch" && (
                <PreScratchScreen 
                  nome={answers[29] || "Você"} 
                  handleNext={handleNext} 
                />
              )}
              {currentStep.type === "gift" && (
                <GiftScreen 
                  nome={answers[29] || "Você"} 
                  handleNext={handleNext} 
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Branding */}
      <footer className="py-6 text-center text-xs text-gray-300">
        © 2026 Protocolo Reativação Metabólica. Todos os direitos reservados.
      </footer>
    </div>
  );
}

