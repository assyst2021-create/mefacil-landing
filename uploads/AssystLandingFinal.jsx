import React, { useEffect, useRef, useState } from 'react';

const C = {
  blue: '#1c79b4',
  blueDark: '#125685',
  blueDeep: '#0a3957',
  blueInk: '#072740',
  yellow: '#c4b400',
  yellowDark: '#8a7e00',
  ink: '#101826',
  slate: '#4b5565',
  paper: '#fbfaf6',
  white: '#ffffff',
  line: 'rgba(16,24,38,0.09)',
  whatsapp: '#25D366',
};

function useReveal() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.unobserve(el); } }, { threshold: 0.12 });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

function R({ children, delay = 0, y = 22 }) {
  const [ref, v] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity .75s cubic-bezier(.21,.91,.4,.97) ${delay}ms, transform .75s cubic-bezier(.21,.91,.4,.97) ${delay}ms`,
    }}>{children}</div>
  );
}

function Logo({ size = 44, light = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
      <circle cx="100" cy="100" r="96" fill={light ? 'none' : '#fff'} stroke={light ? '#fff' : C.blue} strokeWidth="6" />
      <circle cx="100" cy="100" r="80" fill="none" stroke={light ? 'rgba(255,255,255,0.55)' : C.blue} strokeWidth="2" />
      <path d="M62 108c0-26 17-46 38-46s38 20 38 46" fill={C.yellow} stroke={C.yellowDark} strokeWidth="2" />
      <path d="M62 108h76v10a6 6 0 0 1-6 6H68a6 6 0 0 1-6-6v-10z" fill={C.yellow} stroke={C.yellowDark} strokeWidth="2" />
      <text x="100" y="150" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="26" fill={light ? '#fff' : C.blue}>ASSYST</text>
    </svg>
  );
}

function CheckIcon({ color = C.blue, size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

function ShieldIcon({ size = 22, color = C.blue }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 3.5v6c0 5-3.4 8.8-8 10.5-4.6-1.7-8-5.5-8-10.5v-6L12 2z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

// Official, complete WhatsApp glyph (fixed — previous version was a cropped path)
function WhatsAppIcon({ size = 20, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill={color} aria-hidden="true">
      <path d="M16.004 3C9.376 3 4 8.373 4 15c0 2.39.701 4.617 1.912 6.49L4 29l7.7-1.875A11.93 11.93 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3zm0 21.7c-1.96 0-3.84-.524-5.47-1.516l-.392-.232-4.57 1.113 1.142-4.46-.255-.406A9.62 9.62 0 0 1 5.3 15c0-5.91 4.79-10.7 10.704-10.7S26.7 9.09 26.7 15 21.918 24.7 16.004 24.7z" />
      <path d="M22.05 18.105c-.33-.165-1.955-.965-2.258-1.075-.303-.11-.523-.165-.744.165-.22.33-.853 1.075-1.046 1.296-.193.22-.385.248-.715.083-.33-.165-1.392-.513-2.652-1.637-.98-.875-1.642-1.955-1.835-2.285-.193-.33-.02-.508.145-.673.149-.148.33-.385.495-.578.165-.193.22-.33.33-.55.11-.22.055-.413-.027-.578-.083-.165-.744-1.793-1.02-2.456-.27-.65-.543-.562-.744-.572l-.633-.011c-.22 0-.578.083-.881.413-.303.33-1.156 1.13-1.156 2.756 0 1.626 1.184 3.198 1.349 3.418.165.22 2.331 3.56 5.648 4.992.789.34 1.405.543 1.885.695.792.252 1.514.217 2.084.132.636-.095 1.955-.8 2.231-1.572.275-.773.275-1.435.193-1.572-.083-.138-.303-.22-.633-.385z" />
    </svg>
  );
}

const PROBLEMS = [
  { icon: 'hourglass', title: 'Días diseñando lo que tomaría minutos', text: 'Construyes cada sistema desde cero, sin herramientas que aceleren el proceso. Tiempo que no te pagan.' },
  { icon: 'clipboard', title: 'Todo en papel, todo manual, todo lento', text: 'Formatos impresos, firmas físicas, archivos perdidos, mientras el resto del mundo se digitalizó.' },
  { icon: 'spark', title: 'La IA existe, pero no la aplicas', text: 'ChatGPT, Gemini, Claude... todos hablan de IA, pero nadie te enseña a usarla específicamente para SST.' },
  { icon: 'chart', title: 'Mucho trabajo, pocos clientes', text: 'Tienes el conocimiento, pero no sabes estructurarte como empresa ni cobrar lo que vales.' },
];

const AUDIENCE = [
  'Técnicos y tecnólogos que quieren destacar en el mercado.',
  'Profesionales con experiencia, cansados del trabajo manual.',
  'Especialistas listos para crear su propia empresa.',
  'Consultores que desean escalar y tomar más clientes.',
];

const MODULES = [
  { n: '01', title: 'Estructura y montaje empresarial', text: 'Cómo convertirte en un profesional independiente exitoso en SST. Bases legales y técnicas para constituir una empresa sólida.', items: ['Constitución legal paso a paso', 'Modelo de negocio rentable', 'Posicionamiento profesional'] },
  { n: '02', title: 'Diseño del SG-SST', text: 'Implementación real: matrices de riesgo, políticas y planes de acción, preparación para auditorías.', items: ['Matrices de riesgo desde cero', '100% alineado a normativa vigente', 'Listo para auditoría'] },
  { n: '03', title: 'Automatización con IA', text: 'El secreto de los consultores top. Usa IA para redactar y analizar en el 10% del tiempo.', items: ['Prompts probados para SST', 'Reportes en minutos, no días', 'Plantillas reutilizables'] },
];

const FAQS = [
  { q: '¿Necesito experiencia previa con inteligencia artificial?', a: 'No. Empezamos desde cero contigo: qué herramientas usar, cómo escribir instrucciones efectivas y cómo aplicarlas directo a tu trabajo en SST.' },
  { q: '¿El curso aplica a la normativa colombiana?', a: 'Sí, todo el contenido de diseño del SG-SST está alineado a la normativa vigente en Colombia, con ejemplos reales del sector.' },
  { q: '¿Tengo acceso de por vida o solo por un tiempo?', a: 'Acceso de por vida. Puedes repasar los módulos, plantillas y clases en vivo cuantas veces lo necesites.' },
  { q: '¿Qué pasa si tengo dudas durante el curso?', a: 'Tienes contacto directo con un asesor por WhatsApp y espacio de foro dentro de la plataforma para resolver dudas puntuales.' },
];

function ProblemIcon({ name, color = C.blue }) {
  const c = { width: 24, height: 24, fill: 'none', stroke: color, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'hourglass': return <svg {...c} viewBox="0 0 24 24"><path d="M6 2h12M6 22h12M7 2c0 5 5 6 5 10s-5 5-5 10M17 2c0 5-5 6-5 10s5 5 5 10" /></svg>;
    case 'clipboard': return <svg {...c} viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 2h6v3H9z" /><path d="M8 11h8M8 15h5" /></svg>;
    case 'spark': return <svg {...c} viewBox="0 0 24 24"><path d="M12 2l2 7 7 2-7 2-2 7-2-7-7-2 7-2z" /></svg>;
    case 'chart': return <svg {...c} viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>;
    default: return null;
  }
}

function Button({ children, href = '#', variant = 'primary', size = 'md', style = {}, ...rest }) {
  const sizes = { sm: '12px 22px', md: '15px 28px', lg: '18px 36px' };
  const fontSizes = { sm: 13.5, md: 14.5, lg: 16 };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    fontWeight: 700,
    fontSize: fontSizes[size],
    padding: sizes[size],
    borderRadius: 10,
    textDecoration: 'none',
    border: '1.5px solid transparent',
    cursor: 'pointer',
    transition: 'transform .14s ease, box-shadow .2s ease, filter .2s ease',
    letterSpacing: 0.1,
  };
  const variants = {
    primary: { background: C.yellow, color: '#3a3300', boxShadow: '0 1px 2px rgba(0,0,0,0.06), 0 8px 20px rgba(196,180,0,0.3)' },
    dark: { background: C.ink, color: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.08), 0 10px 24px rgba(16,24,38,0.22)' },
    outline: { background: 'transparent', color: C.ink, borderColor: C.line },
    outlineLight: { background: 'rgba(255,255,255,0.07)', color: '#fff', borderColor: 'rgba(255,255,255,0.35)' },
    whatsapp: { background: C.whatsapp, color: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.08), 0 8px 20px rgba(37,211,102,0.32)' },
  };
  return (
    <a href={href} className="assyst-btn-press" style={{ ...base, ...variants[variant], ...style }} {...rest}>
      {children}
    </a>
  );
}

export default function AssystLandingFinal() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: C.ink, background: C.paper, overflowX: 'hidden' }}>
      <style>{`
        @keyframes pulse { 0%{box-shadow:0 0 0 0 rgba(37,211,102,.5)} 70%{box-shadow:0 0 0 14px rgba(37,211,102,0)} 100%{box-shadow:0 0 0 0 rgba(37,211,102,0)} }
        @keyframes floatSlow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        .assyst-btn-press:hover { transform: translateY(-2px); filter: brightness(1.04); }
        .assyst-btn-press:active { transform: translateY(0) scale(0.98); filter: brightness(0.96); }
        .card-pro { transition: transform .25s cubic-bezier(.21,.91,.4,.97), box-shadow .25s ease, border-color .25s ease; }
        .card-pro:hover { transform: translateY(-5px); box-shadow: 0 18px 40px rgba(7,39,64,0.12); border-color: rgba(28,121,180,0.28) !important; }
        .faq-row { cursor: pointer; transition: background .2s ease; }
        .faq-row:hover { background: rgba(28,121,180,0.03); }
        .wa-float { transition: transform .2s ease, box-shadow .2s ease; }
        .wa-float:hover { transform: scale(1.08); box-shadow: 0 10px 26px rgba(0,0,0,0.3); }
        a { color: inherit; }
        ::selection { background: ${C.yellow}; color: #fff; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-thumb { background: rgba(28,121,180,0.25); border-radius: 8px; }
        @media (max-width: 760px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .huellitas-grid { grid-template-columns: 1fr !important; }
          .price-grid { grid-template-columns: 1fr !important; text-align: center; }
        }
        @media (max-width: 600px) {
          .nav-advisor-text { display: none; }
        }
      `}</style>

      {/* TRUST BAR */}
      <div style={{ background: C.blueInk, padding: '9px 24px', textAlign: 'center' }}>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', fontSize: 12.5, fontWeight: 500, letterSpacing: 0.3 }}>
          🔒 Pago 100% seguro · Metodología práctica · Cupos limitados para Colombia 2026
        </p>
      </div>

      {/* NAV */}
      <header style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(251,250,246,0.94)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <Logo size={40} />
            <div style={{ lineHeight: 1.15 }}>
              <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: 0.2 }}>ASSYST <span style={{ color: C.yellowDark }}>ACADEMIA</span></div>
              <div style={{ fontSize: 10.5, color: C.slate, letterSpacing: 0.6 }}>SST CON INTELIGENCIA ARTIFICIAL</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer" className="nav-advisor-link" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <WhatsAppIcon size={17} color={C.whatsapp} />
              <span className="nav-advisor-text" style={{ fontSize: 13.5, fontWeight: 600, color: C.slate }}>Hablar con un asesor</span>
            </a>
            <Button href="#inscribirme" variant="primary" size="sm">Asegurar mi cupo</Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section style={{ position: 'relative', background: `linear-gradient(155deg, ${C.blueInk} 0%, ${C.blueDeep} 48%, ${C.blueDark} 100%)`, overflow: 'hidden' }}>
        <svg width="560" height="560" viewBox="0 0 560 560" style={{ position: 'absolute', right: -140, top: -100, opacity: 0.07 }} aria-hidden="true">
          <rect x="90" y="50" width="300" height="380" rx="10" fill="none" stroke="#fff" strokeWidth="3" />
          <line x1="130" y1="130" x2="350" y2="130" stroke="#fff" strokeWidth="3" />
          <line x1="130" y1="182" x2="350" y2="182" stroke="#fff" strokeWidth="3" />
          <line x1="130" y1="234" x2="280" y2="234" stroke="#fff" strokeWidth="3" />
          <circle cx="150" cy="306" r="11" fill="#fff" />
          <line x1="182" y1="306" x2="350" y2="306" stroke="#fff" strokeWidth="3" />
          <circle cx="150" cy="350" r="11" fill="none" stroke="#fff" strokeWidth="3" />
          <line x1="182" y1="350" x2="320" y2="350" stroke="#fff" strokeWidth="3" />
        </svg>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '84px 24px 70px', position: 'relative' }}>
          <R>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(196,180,0,0.14)', border: '1px solid rgba(196,180,0,0.4)', borderRadius: 999, padding: '7px 16px', marginBottom: 26 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.yellow }} />
              <span style={{ color: C.yellow, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.5 }}>Formación profesional · Colombia 2026</span>
            </div>
          </R>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,0.95fr)', gap: 50, alignItems: 'center' }} className="hero-grid">
            <div>
              <R delay={60}>
                <h1 style={{ color: '#fff', fontSize: 'clamp(34px,4.6vw,54px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: -1, margin: '0 0 22px' }}>
                  Domina el SST con <span style={{ color: C.yellow }}>inteligencia artificial</span>
                </h1>
              </R>
              <R delay={140}>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17.5, lineHeight: 1.65, margin: '0 0 32px', maxWidth: 500 }}>
                  Aprende a diseñar sistemas completos, automatizar procesos con IA y construir tu empresa de consultoría SST. Trabaja menos horas en formatos, factura más por tu criterio.
                </p>
              </R>
              <R delay={220}>
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 38 }}>
                  <Button href="#inscribirme" variant="primary" size="lg">¡Quiero inscribirme ahora!</Button>
                  <Button href="#modulos" variant="outlineLight" size="lg">Ver entrenamientos →</Button>
                </div>
              </R>
              <R delay={300}>
                <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.16)', paddingTop: 24 }}>
                  {[['5', 'Módulos prácticos'], ['20h', 'Formación intensiva'], ['100%', 'Virtual, a tu ritmo']].map(([n, l]) => (
                    <div key={l}>
                      <div style={{ color: C.yellow, fontSize: 25, fontWeight: 800, lineHeight: 1 }}>{n}</div>
                      <div style={{ color: 'rgba(255,255,255,0.58)', fontSize: 12.5, marginTop: 5 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </R>
            </div>

            <R delay={180}>
              <div style={{ display: 'flex', justifyContent: 'center', animation: 'floatSlow 5.5s ease-in-out infinite' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 22, padding: 'clamp(26px,3vw,38px)', backdropFilter: 'blur(6px)', width: '100%', maxWidth: 380 }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                    <Logo size={104} light />
                  </div>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.14)', paddingTop: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {['Bases legales para tu empresa SST', 'Diseño completo del SG-SST', 'Automatización con IA aplicada'].map((t) => (
                      <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                        <div style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(196,180,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <CheckIcon color={C.yellow} size={12} />
                        </div>
                        <span style={{ color: 'rgba(255,255,255,0.86)', fontSize: 14 }}>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </R>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF STRIP */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.line}`, padding: '22px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 'clamp(24px,5vw,64px)', flexWrap: 'wrap' }}>
          {[
            ['🎓', 'Metodología práctica'],
            ['📜', 'Alineado a normativa vigente'],
            ['🔐', 'Pago seguro y verificado'],
            ['💬', 'Asesoría directa por WhatsApp'],
          ].map(([icon, t]) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <span style={{ fontSize: 16 }}>{icon}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.slate }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PROBLEMA */}
      <section style={{ padding: '96px 24px', maxWidth: 1140, margin: '0 auto' }}>
        <R>
          <p style={{ textAlign: 'center', color: C.blue, fontWeight: 700, fontSize: 12.5, letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 12px' }}>El problema real</p>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(27px,3.6vw,40px)', fontWeight: 800, margin: '0 0 16px', letterSpacing: -0.6 }}>¿Te suena familiar?</h2>
          <p style={{ textAlign: 'center', color: C.slate, fontSize: 15.5, maxWidth: 520, margin: '0 auto 58px' }}>Si te identificas con esto, no estás solo — y sí tiene solución.</p>
        </R>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
          {PROBLEMS.map((p, i) => (
            <R key={p.title} delay={i * 90}>
              <div className="card-pro" style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 16, padding: 28, height: '100%' }}>
                <div style={{ width: 46, height: 46, borderRadius: 11, background: 'rgba(28,121,180,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <ProblemIcon name={p.icon} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 9px', lineHeight: 1.35 }}>{p.title}</h3>
                <p style={{ fontSize: 13.5, color: C.slate, lineHeight: 1.6, margin: 0 }}>{p.text}</p>
              </div>
            </R>
          ))}
        </div>
        <R delay={360}>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Button href="#inscribirme" variant="primary" size="lg">¡Basta de perder tiempo! Me inscribo ya →</Button>
          </div>
        </R>
      </section>

      {/* PARA QUIEN */}
      <section style={{ background: C.white, padding: '96px 24px', borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 740, margin: '0 auto' }}>
          <R>
            <p style={{ textAlign: 'center', color: C.blue, fontWeight: 700, fontSize: 12.5, letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 12px' }}>¿Para quién es esto?</p>
            <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px,3.2vw,34px)', fontWeight: 800, margin: '0 0 52px', letterSpacing: -0.5, lineHeight: 1.25 }}>
              Hecho para profesionales de <span style={{ color: C.blue }}>SST en Colombia</span>
            </h2>
          </R>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {AUDIENCE.map((a, i) => (
              <R key={a} delay={i * 80}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: C.paper, borderRadius: 12, padding: '17px 20px', border: `1px solid ${C.line}` }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: C.blue, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckIcon color="#fff" size={14} />
                  </div>
                  <p style={{ margin: 0, fontSize: 15, fontWeight: 500 }}>{a}</p>
                </div>
              </R>
            ))}
          </div>
          <R delay={340}>
            <div style={{ textAlign: 'center', marginTop: 42 }}>
              <Button href="#inscribirme" variant="primary" size="lg">Sí, este entrenamiento es para mí →</Button>
            </div>
          </R>
        </div>
      </section>

      {/* MODULOS */}
      <section id="modulos" style={{ padding: '100px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <R>
          <p style={{ textAlign: 'center', color: C.blue, fontWeight: 700, fontSize: 12.5, letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 12px' }}>La decisión inteligente</p>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(28px,3.8vw,42px)', fontWeight: 800, margin: '0 0 14px', letterSpacing: -0.6 }}>Acelera tu carrera. Elige tu ruta.</h2>
          <p style={{ textAlign: 'center', color: C.slate, fontSize: 15.5, maxWidth: 560, margin: '0 auto 58px' }}>
            Entrenamiento especializado en emprendimiento, diseño y automatización del SG-SST.
          </p>
        </R>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 22, marginBottom: 50 }}>
          {MODULES.map((m, i) => (
            <R key={m.n} delay={i * 100}>
              <div className="card-pro" style={{
                background: i === 2 ? `linear-gradient(160deg, ${C.blueInk}, ${C.blueDeep})` : C.white,
                border: i === 2 ? 'none' : `1px solid ${C.line}`,
                borderRadius: 18, padding: 30, height: '100%', display: 'flex', flexDirection: 'column',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: 1, color: i === 2 ? C.yellow : C.blue }}>MÓDULO {m.n}</div>
                  {i === 2 && <div style={{ background: C.yellow, color: '#3a3300', fontSize: 10.5, fontWeight: 800, padding: '4px 10px', borderRadius: 999, letterSpacing: 0.5 }}>DESTACADO</div>}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 11px', lineHeight: 1.3, color: i === 2 ? '#fff' : C.ink }}>{m.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, margin: '0 0 20px', color: i === 2 ? 'rgba(255,255,255,0.72)' : C.slate }}>{m.text}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 'auto' }}>
                  {m.items.map((it) => (
                    <div key={it} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <CheckIcon color={i === 2 ? C.yellow : C.blue} size={13} />
                      <span style={{ fontSize: 12.5, color: i === 2 ? 'rgba(255,255,255,0.82)' : C.slate }}>{it}</span>
                    </div>
                  ))}
                </div>
              </div>
            </R>
          ))}
        </div>

        {/* PRICE CARD */}
        <R delay={200}>
          <div style={{ position: 'relative', background: `linear-gradient(135deg, ${C.blueInk}, ${C.blueDark})`, borderRadius: 24, padding: 'clamp(34px,5vw,58px)', overflow: 'hidden' }}>
            <svg width="320" height="320" viewBox="0 0 320 320" style={{ position: 'absolute', right: -60, top: -60, opacity: 0.06 }} aria-hidden="true">
              <circle cx="160" cy="160" r="150" fill="none" stroke="#fff" strokeWidth="2" />
              <circle cx="160" cy="160" r="110" fill="none" stroke="#fff" strokeWidth="2" />
            </svg>
            <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 36, alignItems: 'center' }} className="price-grid">
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(196,180,0,0.16)', borderRadius: 999, padding: '6px 14px', marginBottom: 18 }}>
                  <ShieldIcon size={14} color={C.yellow} />
                  <span style={{ color: C.yellow, fontSize: 11.5, fontWeight: 700, letterSpacing: 0.5 }}>INVERSIÓN ÚNICA · SIN MENSUALIDADES</span>
                </div>
                <div style={{ color: '#fff', fontSize: 'clamp(38px,5.2vw,56px)', fontWeight: 800, marginBottom: 18, lineHeight: 1 }}>
                  $750.000 <span style={{ fontSize: 18, fontWeight: 500, color: 'rgba(255,255,255,0.65)' }}>COP</span>
                </div>
                <div style={{ display: 'flex', gap: 'clamp(16px,3vw,26px)', flexWrap: 'wrap' }}>
                  {['20 horas de formación', 'Todas las plantillas incluidas', 'Acceso de por vida', 'Certificado de finalización'].map((t) => (
                    <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <CheckIcon color={C.yellow} size={14} />
                      <span style={{ color: 'rgba(255,255,255,0.88)', fontSize: 13.5 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div id="inscribirme" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <Button href="#" variant="primary" size="lg" style={{ width: '100%', justifyContent: 'center', fontSize: 16 }}>¡Quiero inscribirme!</Button>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11.5 }}>Pago 100% seguro y verificado</span>
              </div>
            </div>
          </div>
        </R>
      </section>

      {/* HUELLITAS */}
      <section style={{ background: C.white, padding: '96px 24px', borderTop: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0,0.85fr) minmax(0,1.15fr)', gap: 50, alignItems: 'center' }} className="huellitas-grid">
          <R>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <svg width="100%" height="260" viewBox="0 0 320 260" style={{ maxWidth: 320 }} aria-hidden="true">
                <circle cx="60" cy="40" r="10" fill={`${C.yellow}30`} />
                <circle cx="270" cy="60" r="14" fill={`${C.yellow}30`} />
                <circle cx="40" cy="200" r="12" fill={`${C.yellow}30`} />
                <circle cx="290" cy="220" r="9" fill={`${C.yellow}30`} />
                <g transform="translate(60,60)">
                  <ellipse cx="40" cy="90" rx="50" ry="42" fill={C.blue} opacity="0.12" />
                  <circle cx="20" cy="50" r="9" fill={C.blue} opacity="0.5" />
                  <circle cx="40" cy="38" r="9" fill={C.blue} opacity="0.5" />
                  <circle cx="60" cy="38" r="9" fill={C.blue} opacity="0.5" />
                  <circle cx="78" cy="50" r="9" fill={C.blue} opacity="0.5" />
                  <ellipse cx="49" cy="78" rx="34" ry="28" fill={C.blue} opacity="0.5" />
                </g>
                <g transform="translate(150,70)">
                  <ellipse cx="40" cy="90" rx="50" ry="42" fill={C.yellow} opacity="0.18" />
                  <circle cx="18" cy="46" r="10" fill={C.yellow} opacity="0.65" />
                  <circle cx="62" cy="46" r="10" fill={C.yellow} opacity="0.65" />
                  <ellipse cx="40" cy="78" rx="36" ry="30" fill={C.yellow} opacity="0.65" />
                </g>
              </svg>
            </div>
          </R>
          <R delay={120}>
            <div>
              <h2 style={{ fontSize: 'clamp(25px,3.2vw,34px)', fontWeight: 800, margin: '0 0 10px', color: C.blue }}>
                Huellitas <span style={{ color: C.yellowDark }}>en Acción</span>
              </h2>
              <p style={{ fontSize: 15, color: C.slate, lineHeight: 1.65, margin: '0 0 20px' }}>
                Una iniciativa solidaria que transforma la educación en esperanza. Por cada estudiante que se une, destinamos parte de los ingresos a alimentar y cuidar perros y gatos en condición de abandono.
              </p>
              <div style={{ background: C.paper, borderLeft: `4px solid ${C.yellow}`, borderRadius: '0 12px 12px 0', padding: '17px 20px', marginBottom: 22 }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 15.5 }}>Cada aprendizaje se convierte en un plato lleno.</p>
                <p style={{ margin: '4px 0 0', fontSize: 13.5, color: C.slate }}>Cuando tú creces, ellos también ganan.</p>
              </div>
              <Button href="#inscribirme" variant="dark" size="md">Quiero inscribirme y ayudar →</Button>
            </div>
          </R>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '96px 24px', maxWidth: 760, margin: '0 auto' }}>
        <R>
          <p style={{ textAlign: 'center', color: C.blue, fontWeight: 700, fontSize: 12.5, letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 12px' }}>Resolvemos tus dudas</p>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(25px,3.2vw,34px)', fontWeight: 800, margin: '0 0 48px', letterSpacing: -0.5 }}>Preguntas frecuentes</h2>
        </R>
        <div style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 16, overflow: 'hidden' }}>
          {FAQS.map((f, i) => (
            <div key={f.q} className="faq-row" onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ borderBottom: i < FAQS.length - 1 ? `1px solid ${C.line}` : 'none', padding: openFaq === i ? '20px 24px 24px' : '20px 24px', transition: 'padding .2s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{f.q}</span>
                <span style={{ fontSize: 20, color: C.blue, fontWeight: 300, transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform .25s ease', flexShrink: 0 }}>+</span>
              </div>
              <div style={{ maxHeight: openFaq === i ? 240 : 0, opacity: openFaq === i ? 1 : 0, overflow: 'hidden', transition: 'max-height .35s ease, opacity .3s ease' }}>
                <p style={{ margin: '14px 0 0', fontSize: 14, color: C.slate, lineHeight: 1.6 }}>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ASESOR */}
      <section style={{ padding: '0 24px 96px', maxWidth: 900, margin: '0 auto' }}>
        <R>
          <div style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 22, padding: 'clamp(30px,5vw,48px)', display: 'flex', flexWrap: 'wrap', gap: 28, alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: '1 1 300px' }}>
              <p style={{ color: C.blue, fontWeight: 700, fontSize: 12.5, letterSpacing: 1.5, textTransform: 'uppercase', margin: '0 0 10px' }}>¿Tienes dudas?</p>
              <h2 style={{ fontSize: 'clamp(21px,2.6vw,26px)', fontWeight: 800, margin: '0 0 8px', lineHeight: 1.3 }}>Habla directo con un asesor</h2>
              <p style={{ fontSize: 14, color: C.slate, margin: 0, lineHeight: 1.6 }}>
                Resolvemos tus preguntas sobre el curso, el pago o el contenido, sin formularios ni esperas.
              </p>
            </div>
            <Button href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer" variant="whatsapp" size="md">
              <WhatsAppIcon size={18} color="#fff" />
              Escribir por WhatsApp
            </Button>
          </div>
        </R>
      </section>

      {/* PAGOS + FOOTER */}
      <section style={{ background: `linear-gradient(160deg, ${C.blueInk}, ${C.blueDeep})`, padding: '80px 24px 0' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <R>
            <h2 style={{ color: '#fff', fontSize: 'clamp(26px,3.4vw,36px)', fontWeight: 800, margin: '0 0 8px' }}>
              Métodos de <span style={{ color: C.yellow }}>pago</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: 14, margin: '0 0 44px' }}>Paga fácil, rápido y seguro</p>
          </R>
          <div style={{ display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 44 }}>
            {[['Nequi', 'Transferencia inmediata'], ['PSE', 'Débito desde tu banco'], ['Tarjeta', 'Crédito o débito']].map(([label, sub], i) => (
              <R key={label} delay={i * 80}>
                <div style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: 14, padding: '22px 30px', width: 156 }}>
                  <div style={{ fontWeight: 800, fontSize: 16, color: '#fff', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.55)' }}>{sub}</div>
                </div>
              </R>
            ))}
          </div>
          <R delay={200}>
            <div style={{ display: 'inline-flex', gap: 9, alignItems: 'center', background: 'rgba(196,180,0,0.14)', border: `1px solid ${C.yellow}`, borderRadius: 999, padding: '9px 20px', fontSize: 12, fontWeight: 700, color: C.yellow, letterSpacing: 0.5, marginBottom: 40 }}>
              CUPOS ESTRICTAMENTE LIMITADOS · FORMACIÓN 100% ONLINE
            </div>
          </R>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', marginTop: 20, padding: '26px 24px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Logo size={26} light />
              <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12 }}>© 2026 ASSYST Academia · Cali, Colombia</span>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11.5 }}>Formación profesional en SST con inteligencia artificial</span>
          </div>
        </div>
      </section>

      {/* WHATSAPP FLOAT — fixed full glyph, soft pulse ring, scales on hover */}
      <a
        href="https://wa.me/573000000000"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 50, width: 60, height: 60, borderRadius: '50%',
          background: C.whatsapp, display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(0,0,0,0.25)', animation: 'pulse 2.4s infinite',
        }}
        aria-label="Hablar con un asesor por WhatsApp"
      >
        <WhatsAppIcon size={30} color="#fff" />
      </a>
    </div>
  );
}
