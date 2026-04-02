import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Gift, 
  Check, 
  Star, 
  Zap, 
  Clock, 
  Play, 
  Calendar, 
  Utensils, 
  Flame,
  ShieldCheck,
  Lock,
  CreditCard,
  Smartphone,
  Trophy,
  Users
} from 'lucide-react';
import { ScratchCard } from './ScratchCard';
import { SalesPopup } from './SalesPopup';

import { ProofCarousel } from './ProofCarousel';

interface GiftScreenProps {
  nome: string;
  handleNext: () => void;
}

export const GiftScreen: React.FC<GiftScreenProps> = ({ nome, handleNext }) => {
  const [scratched, setScratched] = useState(false);
  const [timeLeft, setTimeLeft] = useState(599); // 09:59 in seconds

  useEffect(() => {
    if (scratched) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [scratched]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleScratchComplete = () => {
    setScratched(true);
  };

  return (
    <div className="fixed inset-0 bg-brand-bg-alt z-50 overflow-y-auto">
      {/* Sticky Timer Header (Only after scratched) */}
      <AnimatePresence>
        {scratched && (
          <motion.div 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="sticky top-0 z-[60] bg-red-600 text-white py-2 px-4 text-center font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
          >
            <Clock size={16} className="animate-pulse" />
            <span>OFERTA EXPIRA EM: {formatTime(timeLeft)}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-md mx-auto px-6 pt-6 flex items-center justify-start relative z-50">
      </div>

      <div className="min-h-full flex flex-col items-center justify-start px-6 py-8">
        {!scratched && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full text-center mb-8"
          >
            <h2 className="text-2xl font-display font-bold text-brand-success mb-2">
              🎁 Seu presente está aqui, {nome}
            </h2>
            <p className="text-brand-text-muted font-medium">
              Raspe abaixo para revelar sua condição exclusiva
            </p>
          </motion.div>
        )}

        <div className={`w-full max-w-sm mx-auto ${scratched ? 'mb-4' : 'mb-10'}`}>
          <div className={`${scratched ? 'bg-transparent' : 'bg-white p-1 rounded-[32px] border border-gray-200 shadow-sm'}`}>
            <ScratchCard 
              width={340} 
              height={200} 
              onComplete={handleScratchComplete}
            >
              <div className="text-center p-6 bg-white rounded-[24px] shadow-xl border-2 border-brand-pink relative overflow-hidden">
                {/* Gold Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/10 via-transparent to-yellow-400/10 pointer-events-none" />
                
                <div className="inline-flex items-center gap-1 bg-brand-pink text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter mb-2">
                  <Trophy size={10} />
                  Prêmio Desbloqueado
                </div>
                <h3 className="font-black text-2xl mb-1 !text-[#22c55e]">PARABÉNS, {nome.toUpperCase()}!</h3>
                <p className="text-brand-pink font-black text-xl mb-2">🔥 80% DE DESCONTO</p>
                <div className="flex flex-col items-center">
                  <span className="text-gray-400 line-through text-xs">De R$297,00</span>
                  <span className="text-brand-success font-black text-4xl">R$49,90</span>
                </div>
              </div>
            </ScratchCard>
          </div>
          {!scratched && (
            <div className="flex flex-col items-center gap-4 mt-4">
              <motion.p 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center text-brand-text-muted text-xs font-bold uppercase tracking-widest"
              >
                👉 Deslize o dedo sobre a área cinza
              </motion.p>
              <button 
                onClick={() => {
                  // Scroll to scratch card or just a decorative button
                  const element = document.querySelector('.scratch-card-container');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full max-w-xs py-5 text-lg font-black text-white bg-[#22C55E] hover:bg-[#16a34a] shadow-[0_15px_35px_rgba(34,197,94,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all animate-pulse-green rounded-2xl flex items-center justify-center gap-2 border-none"
              >
                🎁 REVELAR MEU PRESENTE...
              </button>
            </div>
          )}
        </div>

        <AnimatePresence>
          {scratched && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full space-y-6 pb-20"
            >
              {/* Main Sales Card */}
              <div className="bg-white rounded-[40px] shadow-2xl relative overflow-hidden border border-gray-100">
                <div className="absolute top-0 left-0 w-full h-3 bg-brand-pink" />
                
                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-1 text-brand-text font-bold text-xs uppercase tracking-widest mb-4">
                      <Zap size={14} className="fill-brand-text" />
                      Protocolo Ativação Metabólica
                    </div>
                    <h1 className="text-3xl font-display font-black text-brand-text mb-4 leading-[0.95] tracking-tight">
                      ATIVE SEU METABOLISMO COM APENAS 10 MINUTOS POR DIA E PERCA ATÉ 1 KG POR SEMANA.
                    </h1>
                    <p className="text-brand-text font-bold text-lg leading-snug">
                      O método exato para fazer seu corpo queimar gordura naturalmente — sem academia e sem dietas malucas.
                    </p>
                  </div>

                  {/* Belief Break */}
                  <div className="bg-brand-text/5 p-6 rounded-[24px] mb-8 border-l-4 border-brand-text">
                    <p className="text-brand-text leading-relaxed italic">
                      "Você não precisa de mais esforço, você só precisa <span className="font-bold text-brand-success underline">ativar o mecanismo certo</span> no seu corpo."
                    </p>
                  </div>

                  {/* What you get */}
                  <div className="space-y-6 mb-8">
                    <h3 className="font-display font-black text-brand-text text-xl flex items-center gap-2">
                      <Check size={24} className="text-brand-success" />
                      O QUE VOCÊ RECEBE HOJE:
                    </h3>
                    <div className="space-y-4">
                      {[
                        { title: "Protocolo Pilates em Casa", desc: "Aulas completas do zero ao avançado." },
                        { title: "Método 10 Minutos", desc: "Sessões rápidas que cabem na sua rotina." },
                        { title: "Passo a Passo Guiado", desc: "Não precisa pensar, é só dar o play." }
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-brand-bg-alt border border-gray-100">
                          <div className="bg-brand-success/10 p-2 rounded-full mt-1">
                            <Check size={16} className="text-brand-success" />
                          </div>
                          <div>
                            <p className="font-bold text-brand-text">{item.title}</p>
                            <p className="text-sm text-brand-text-muted">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Video Access Image */}
                  <div className="mb-6 rounded-[32px] overflow-hidden shadow-lg border-4 border-white">
                    <img 
                      src="https://res.cloudinary.com/dcef2qwzi/image/upload/q_auto,f_auto/v1775084863/Untitled_design_hddre8.png" 
                      alt="Acesso Imediato"
                      className="w-full h-auto object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>

                  {/* Video Access */}
                  <div className="bg-brand-success/10 text-black p-6 rounded-[32px] mb-10 flex items-center gap-5 border border-brand-success/20">
                    <div className="bg-brand-success p-4 rounded-full">
                      <Play size={28} className="fill-white text-white" />
                    </div>
                    <div>
                      <p className="font-black text-lg leading-tight text-brand-success">ACESSO IMEDIATO</p>
                      <p className="text-sm text-black/80">Assista pelo celular, tablet ou computador.</p>
                    </div>
                  </div>

                  {/* Bonuses Section */}
                  <div className="space-y-6 mb-10">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-black text-brand-text text-xl flex items-center gap-2">
                        <Gift size={24} className="text-brand-pink" />
                        BÔNUS EXCLUSIVOS
                      </h3>
                      <span className="text-[10px] font-bold text-brand-pink bg-brand-pink/10 px-2 py-1 rounded">GRÁTIS HOJE</span>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { icon: Utensils, title: "Plano Alimentar 7 Dias", val: "R$ 67,00" },
                        { icon: Calendar, title: "Calendário 28 Dias", val: "R$ 47,00" },
                        { icon: Flame, title: "Aula Ativação Metabólica", val: "R$ 97,00" }
                      ].map((bonus, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl border-2 border-dashed border-brand-pink/30 bg-brand-pink/[0.02]">
                          <div className="flex items-center gap-3">
                            <bonus.icon size={20} className="text-brand-pink" />
                            <span className="font-bold text-brand-text text-sm">{bonus.title}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-gray-400 line-through block">{bonus.val}</span>
                            <span className="text-xs font-black text-brand-success uppercase">Grátis</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Social Proof Carousel */}
                  <div className="-mx-8 mb-12">
                    <ProofCarousel />
                  </div>

                  {/* Guarantee */}
                  <div className="flex items-center gap-5 p-6 rounded-[32px] bg-brand-success/5 border-2 border-brand-success/20 mb-10">
                    <ShieldCheck size={48} className="text-brand-success shrink-0" />
                    <div>
                      <p className="font-black text-brand-text leading-tight mb-1">GARANTIA INCONDICIONAL</p>
                      <p className="text-xs text-brand-text-muted">7 dias para testar. Se não gostar, devolvemos 100% do seu dinheiro sem perguntas.</p>
                    </div>
                  </div>

                  {/* Visual Projection & Personalized Plan */}
                  <div className="space-y-8 mb-10">
                    <div className="bg-[#eff6ff] p-6 rounded-[32px] border border-blue-100">
                      <h3 className="text-blue-600 font-black text-xl flex items-center gap-2 mb-4">
                        📊 PROJEÇÃO VISUAL
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm bg-blue-600 p-3 rounded-xl">
                          <span className="!text-white font-bold">📉 RESULTADO SEMANAL</span>
                          <span className="bg-white px-2 py-1 rounded-lg text-blue-600 font-black">-1.2kg</span>
                        </div>
                        <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 2 }}
                            className="h-full bg-blue-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#eff6ff] p-8 rounded-[32px] text-blue-600 shadow-xl shadow-blue-600/5 border border-blue-100">
                      <h3 className="text-blue-600 font-black text-xl flex items-center gap-2 mb-6">
                        📈 SEU PLANO PERSONALIZADO
                      </h3>
                      <div className="space-y-4">
                        {[
                          "1. Reativação Metabólica",
                          "2. Queima Visível",
                          "3. Resultado e Tonificação"
                        ].map((step, i) => (
                          <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-blue-100">
                            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                              {i + 1}
                            </div>
                            <span className="font-bold text-sm text-blue-600">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-center mb-10">
                    <p className="text-[#f59e0b] font-black text-lg leading-tight">
                      👉 {nome}, você quer eliminar até 1kg por semana?
                    </p>
                  </div>

                  {/* Final Pricing */}
                  <div className="text-center mb-10">
                    <p className="text-brand-text-muted font-bold text-sm mb-2">VALOR TOTAL COM BÔNUS: <span className="line-through">R$ 508,00</span></p>
                    <p className="text-brand-text font-medium text-sm mb-1">HOJE POR APENAS:</p>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-brand-success font-black text-5xl tracking-tighter">R$ 49,90</span>
                    </div>
                    <p className="text-brand-success font-bold text-sm uppercase tracking-widest">PAGAMENTO ÚNICO, À VISTA</p>
                  </div>

                  {/* CTA Button */}
                  <div className="space-y-6">
                    <button 
                      onClick={() => window.open('https://payment.ticto.app/O6623526A', '_blank')}
                      className="w-full py-8 text-2xl font-black text-white bg-[#22C55E] hover:bg-[#16a34a] shadow-[0_20px_45px_rgba(34,197,94,0.5)] hover:scale-[1.03] active:scale-[0.97] transition-all animate-pulse-green rounded-[32px] flex flex-col items-center justify-center leading-none border-none"
                    >
                      <span>ATIVAR MEU PROTOCOLO AGORA</span>
                      <span className="text-[10px] font-bold opacity-80 mt-2 uppercase tracking-widest">Acesso imediato liberado</span>
                    </button>
                    
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex items-center gap-4 opacity-40">
                        <Lock size={16} />
                        <CreditCard size={16} />
                        <ShieldCheck size={16} />
                        <Smartphone size={16} />
                      </div>
                      <p className="text-[10px] text-brand-text-muted font-bold uppercase tracking-widest text-center">
                        🔒 Compra 100% Segura e Criptografada
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Final Urgency Footer */}
              <div className="text-center px-4">
                <p className="text-brand-text-muted text-xs font-bold uppercase tracking-widest mb-4">
                  ⚠️ Atenção: Esta oferta é única e não será repetida.
                </p>
                <div className="flex items-center justify-center gap-6 opacity-60">
                  <div className="text-center">
                    <p className="text-brand-text font-black text-xl">12k+</p>
                    <p className="text-brand-text-muted text-[8px] uppercase font-bold">Alunas</p>
                  </div>
                  <div className="w-px h-8 bg-gray-200" />
                  <div className="text-center">
                    <p className="text-brand-text font-black text-xl">4.9/5</p>
                    <p className="text-brand-text-muted text-[8px] uppercase font-bold">Avaliação</p>
                  </div>
                  <div className="w-px h-8 bg-gray-200" />
                  <div className="text-center">
                    <p className="text-brand-text font-black text-xl">100%</p>
                    <p className="text-brand-text-muted text-[8px] uppercase font-bold">Seguro</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {scratched && <SalesPopup />}
    </div>
  );
};
