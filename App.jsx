import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Cpu, 
  ShieldCheck, 
  Zap, 
  ChevronRight, 
  Menu, 
  X, 
  ArrowUpRight,
  Clock,
  Activity,
  CheckCircle2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[92%] max-w-4xl rounded-full px-4 md:px-6 py-2 md:py-3 flex items-center justify-between border border-primary/10 ${
      isScrolled ? 'bg-background/60 backdrop-blur-xl' : 'bg-transparent text-white border-white/10'
    }`}>
      <div className="flex items-center gap-2">
        <span className="font-serif italic font-bold text-lg md:text-xl tracking-tighter">NextSolution</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="#features" className="hover:text-accent transition-colors">Serviços</a>
        <a href="#philosophy" className="hover:text-accent transition-colors">Filosofia</a>
        <a href="#protocol" className="hover:text-accent transition-colors">Protocolo</a>
      </div>

      <a 
        href="http://wa.link/nvjjtx" 
        target="_blank" 
        rel="noopener noreferrer"
        className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[12px] md:text-sm font-bold btn-magnetic overflow-hidden group ${
          isScrolled ? 'bg-primary text-white' : 'bg-white text-primary'
        }`}
      >
        <span className="bg-accent"></span>
        <label className="relative z-10 cursor-pointer whitespace-nowrap">Fazer Orçamento</label>
      </a>
    </nav>
  );
};

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full flex items-center md:items-end justify-start p-6 md:p-12 md:pb-32 overflow-hidden">
      {/* Background with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" 
          alt="Technical Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-4xl flex flex-col items-start gap-6 md:gap-8">
        <h1 className="hero-text text-white text-4xl md:text-7xl font-bold tracking-tight leading-[1.1]">
          Excelência técnica encontra a<br />
          <span className="font-serif italic text-accent text-5xl md:text-8xl block mt-2">Perfeição.</span>
        </h1>
        
        <div className="hero-text">
          <a 
            href="http://wa.link/nvjjtx" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-accent text-primary px-8 md:px-10 py-3 md:py-4 rounded-full font-bold flex items-center gap-2 btn-magnetic group w-fit"
          >
            <span className="bg-white"></span>
            <label className="relative z-10 cursor-pointer">Fazer Orçamento</label>
            <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <p className="hero-text text-white/70 text-base md:text-xl max-w-xl font-medium tracking-wide">
          Serviço técnico como você nunca viu.
        </p>
      </div>
    </section>
  );
};

const DiagnosticShuffler = () => {
  const [cards, setCards] = useState([
    { id: 1, title: "Hardware", color: "bg-dark" },
    { id: 2, title: "Software", color: "bg-primary" },
    { id: 3, title: "Diagnóstico", color: "bg-accent" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const next = [...prev];
        next.unshift(next.pop());
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-64 w-full flex items-center justify-center">
      {cards.map((card, idx) => (
        <div 
          key={card.id}
          className={`absolute w-48 h-48 rounded-[2rem] p-6 flex flex-col justify-end text-white transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${card.color}`}
          style={{
            transform: `translateY(${idx * 15}px) scale(${1 - idx * 0.05})`,
            zIndex: 10 - idx,
            opacity: 1 - idx * 0.3
          }}
        >
          <span className="font-mono text-xs mb-2 opacity-50">#00{card.id}</span>
          <h4 className="font-bold">{card.title}</h4>
        </div>
      ))}
    </div>
  );
};

const TelemetryTypewriter = () => {
  const [text, setText] = useState('');
  const fullText = "Monitorando integridade dos circuitos... 98% de precisão alcançada. Sistema operacional em modo ótimo. Próxima etapa: Calibração de hardware.";
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) index = 0;
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary/50">Live Feed</span>
      </div>
      <p className="font-mono text-sm leading-relaxed text-primary/80">
        {text}<span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse"></span>
      </p>
    </div>
  );
};

const ProtocolScheduler = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [activeDay, setActiveDay] = useState(2);
  const cursorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(cursorRef.current, { x: 80, y: 40, duration: 1.5, ease: "power2.inOut" })
        .to(cursorRef.current, { scale: 0.8, duration: 0.2 })
        .call(() => setActiveDay(3))
        .to(cursorRef.current, { scale: 1, duration: 0.2 })
        .to(cursorRef.current, { x: 120, y: 100, duration: 1.5, ease: "power2.inOut" })
        .to(cursorRef.current, { opacity: 0, duration: 0.5 })
        .delay(1);
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="p-6 relative">
      <div className="grid grid-cols-7 gap-2 mb-8">
        {days.map((day, i) => (
          <div 
            key={i} 
            className={`aspect-square flex items-center justify-center rounded-lg text-xs font-mono transition-colors duration-300 ${
              activeDay === i ? 'bg-accent text-primary' : 'bg-primary/5 text-primary/30'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="h-2 w-24 bg-primary/10 rounded-full overflow-hidden">
          <div className="h-full bg-accent w-2/3"></div>
        </div>
        <div className="px-4 py-2 bg-primary text-white text-[10px] rounded-full font-bold">SAVE</div>
      </div>
      <div ref={cursorRef} className="absolute pointer-events-none">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent fill-accent">
          <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
          <path d="m13 13 6 6" />
        </svg>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 md:px-12 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card-premium h-[380px] md:h-[400px] flex flex-col">
          <div className="p-6 md:p-8 flex-1">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Especialidades</h3>
            <p className="text-primary/60 text-xs md:text-sm mb-8">Sistemas integrados de reparo para todo tipo de dispositivo.</p>
            <DiagnosticShuffler />
          </div>
        </div>
        <div className="card-premium h-[380px] md:h-[400px]">
          <div className="p-6 md:p-8 h-full flex flex-col">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Monitoramento</h3>
            <p className="text-primary/60 text-xs md:text-sm mb-8">Acompanhamento em tempo real do seu equipamento.</p>
            <div className="flex-1 bg-primary/5 rounded-2xl overflow-hidden">
              <TelemetryTypewriter />
            </div>
          </div>
        </div>
        <div className="card-premium h-[380px] md:h-[400px]">
          <div className="p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold mb-4">Agendamento</h3>
            <p className="text-primary/60 text-xs md:text-sm mb-8">Seu tempo é precioso. Protocolos de entrada priorizados.</p>
            <ProtocolScheduler />
          </div>
        </div>
      </div>
    </section>
  );
};

const Philosophy = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-text", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-12 bg-dark text-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
          alt="Architecture" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="reveal-text text-background/50 text-base md:text-2xl mb-4 font-medium">
          A maioria da assistência técnica foca em: <span className="text-background">reparos rápidos e superficiais.</span>
        </p>
        <h2 className="reveal-text text-3xl md:text-7xl font-serif italic leading-tight">
          Nós focamos em: <br />
          <span className="text-accent">Restauração integral</span> com precisão <span className="text-accent underline decoration-1 underline-offset-8">cirúrgica</span>.
        </h2>
      </div>
    </section>
  );
};

const Protocol = () => {
  const cards = [
    {
      step: "01",
      title: "Diagnóstico Digital",
      desc: "Escaneamento completo de integridade e mapeamento de falhas sistêmicas.",
      icon: <Activity className="w-12 h-12 text-accent" />
    },
    {
      step: "02",
      title: "Intervenção Especializada",
      desc: "Reparos realizados em laboratório com controle estrito de contaminação e ferramentas de precisão.",
      icon: <Zap className="w-12 h-12 text-accent" />
    },
    {
      step: "03",
      title: "Certificação de Qualidade",
      desc: "Bateria de testes de estresse para garantir que o dispositivo retorne ao estado de fábrica.",
      icon: <CheckCircle2 className="w-12 h-12 text-accent" />
    }
  ];

  return (
    <section id="protocol" className="relative px-6 md:px-12 pb-24 md:pb-32">
      {cards.map((card, i) => (
        <div key={i} className="sticky top-20 md:top-32 min-h-[40vh] md:h-[70vh] mb-12 group">
          <div className="bg-background border border-primary/10 rounded-[2.5rem] md:rounded-[3rem] h-full shadow-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 group-hover:scale-[0.99] transition-transform duration-500">
            <div className="flex-1">
              <span className="font-mono text-accent text-sm md:text-lg mb-2 md:mb-4 block">PASSO {card.step}</span>
              <h3 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6">{card.title}</h3>
              <p className="text-primary/60 text-base md:text-lg max-w-md">{card.desc}</p>
            </div>
            <div className="w-32 h-32 md:w-64 md:h-64 flex items-center justify-center bg-primary/5 rounded-full shrink-0">
               {React.cloneElement(card.icon, { className: "w-12 h-12 md:w-20 md:h-20 text-accent" })}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

const Pricing = () => {
  return (
    <section className="py-24 px-12 bg-background border-t border-primary/5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card-premium p-10 flex flex-col">
          <h4 className="font-bold text-xl mb-2 text-primary">Essencial</h4>
          <p className="text-primary/40 text-sm mb-8">Manutenção preventiva de rotina.</p>
          <div className="text-4xl font-bold mb-8 text-primary">R$ 100<span className="text-lg font-normal text-primary/30">/serviço</span></div>
          <ul className="space-y-4 mb-12 flex-1">
            <li className="flex items-center gap-2 text-sm text-primary/80"><CheckCircle2 className="w-4 h-4 text-accent" /> Limpeza interna física</li>
            <li className="flex items-center gap-2 text-sm text-primary/80"><CheckCircle2 className="w-4 h-4 text-accent" /> Otimização de software</li>
            <li className="flex items-center gap-2 text-sm text-primary/80"><CheckCircle2 className="w-4 h-4 text-accent" /> Remoção de arquivos temporários</li>
          </ul>
          <a href="https://wa.me/5521981436672?text=Olá!%20Tenho%20interesse%20no%20serviço%20Essencial%20de%20manutenção%20preventiva.%20Pode%20me%20dar%20mais%20detalhes%3F" target="_blank" rel="noopener noreferrer" className="w-full py-4 rounded-full border border-primary text-primary font-bold btn-magnetic block text-center">Solicitar</a>
        </div>

        <div className="card-premium p-10 flex flex-col bg-primary text-background border-none relative md:scale-105 z-10 shadow-2xl">
          <div className="absolute top-4 right-8 bg-accent text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Mais Procurado</div>
          <h4 className="font-bold text-xl mb-2">Técnico</h4>
          <p className="text-background/40 text-sm mb-8">Restauração completa do sistema.</p>
          <div className="text-4xl font-bold mb-8 text-background">R$ 50<span className="text-lg font-normal text-background/30">/serviço</span></div>
          <ul className="space-y-4 mb-12 flex-1">
            <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-accent" /> Formatação de disco</li>
            <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-accent" /> Instalação de Sistema (Windows/macOS)</li>
            <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-accent" /> Configuração de drivers</li>
          </ul>
          <a href="https://wa.me/5521981436672?text=Olá!%20Quero%20contratar%20o%20serviço%20Técnico%20(formatação%20e%20instalação%20de%20sistema).%20Como%20funciona%3F" target="_blank" rel="noopener noreferrer" className="w-full py-4 rounded-full bg-accent text-primary font-bold btn-magnetic group block text-center">
            <span className="bg-white"></span>
            <label className="relative z-10 cursor-pointer">Escolher</label>
          </a>
        </div>

        <div className="card-premium p-10 flex flex-col">
          <h4 className="font-bold text-xl mb-2 text-primary">Upgrade</h4>
          <p className="text-primary/40 text-sm mb-8">Aumento de performance bruta.</p>
          <div className="text-4xl font-bold mb-8 text-primary">Sob Consulta</div>
          <ul className="space-y-4 mb-12 flex-1">
            <li className="flex items-center gap-2 text-sm text-primary/80"><CheckCircle2 className="w-4 h-4 text-accent" /> Upgrade de Memória RAM</li>
            <li className="flex items-center gap-2 text-sm text-primary/80"><CheckCircle2 className="w-4 h-4 text-accent" /> Instalação de SSD/NVMe</li>
            <li className="flex items-center gap-2 text-sm text-primary/80"><CheckCircle2 className="w-4 h-4 text-accent" /> Substituição de processador</li>
          </ul>
          <a href="https://wa.me/5521981436672?text=Olá!%20Gostaria%20de%20falar%20sobre%20um%20Upgrade%20de%20hardware%20(RAM%2FSSD%2Fprocessador).%20Pode%20me%20orientar%3F" target="_blank" rel="noopener noreferrer" className="w-full py-4 rounded-full border border-primary text-primary font-bold btn-magnetic block text-center">Falar com Consultor</a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary text-background rounded-t-[4rem] px-12 py-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-3xl font-serif italic mb-4">NextSolution</h2>
          <p className="text-background/40 max-w-sm mb-8">Trabalhamos com excelência e dedicação absoluta ao seu patrimônio digital.</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-background/60">System Operational</span>
          </div>
        </div>
        <div>
          <h5 className="font-bold mb-6">Navegação</h5>
          <ul className="space-y-4 text-background/40 text-sm">
            <li><a href="#" className="hover:text-accent">Início</a></li>
            <li><a href="#features" className="hover:text-accent">Serviços</a></li>
            <li><a href="#philosophy" className="hover:text-accent">Filosofia</a></li>
            <li><a href="#protocol" className="hover:text-accent">Protocolo</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-6">Contato</h5>
          <p className="text-background/40 text-sm">+55 21 98143-6672</p>
        </div>
      </div>
      <div className="pt-12 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-background/20 font-mono">
        <p>© 2026 NextSolution Assistência Técnica. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <main className="selection:bg-accent selection:text-primary">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Pricing />
      <Footer />
    </main>
  );
};

export default App;
