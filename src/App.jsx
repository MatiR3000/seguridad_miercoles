import React, { useState } from 'react';

// Icons implemented as pure SVGs for standalone compatibility
const LockIcon = () => (
  <svg className="pillar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const ShieldCheckIcon = () => (
  <svg className="pillar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <polyline points="9 11 12 14 22 4"></polyline>
  </svg>
);

const ClockIcon = () => (
  <svg className="pillar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const ShieldHeaderIcon = () => (
  <svg className="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const CodeIcon = () => (
  <svg className="block-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const CpuIcon = () => (
  <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
    <rect x="9" y="9" width="6" height="6"></rect>
    <line x1="9" y1="1" x2="9" y2="4"></line>
    <line x1="15" y1="1" x2="15" y2="4"></line>
    <line x1="9" y1="20" x2="9" y2="23"></line>
    <line x1="15" y1="20" x2="15" y2="23"></line>
    <line x1="20" y1="9" x2="23" y2="9"></line>
    <line x1="20" y1="15" x2="23" y2="15"></line>
    <line x1="1" y1="9" x2="4" y2="9"></line>
    <line x1="1" y1="15" x2="4" y2="15"></line>
  </svg>
);

export default function App() {
  const [activePillar, setActivePillar] = useState('confidencialidad');
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // States for the Trilemma Simulator
  const [confidentialityLevel, setConfidentialityLevel] = useState(80);
  const [integrityLevel, setIntegrityLevel] = useState(80);
  const [availabilityLevel, setAvailabilityLevel] = useState(60);

  // Pillar details including web implementation methods
  const pillars = {
    confidencialidad: {
      id: 'confidencialidad',
      title: 'Confidencialidad',
      subtitle: 'Solo quien debe ver, ve.',
      icon: <LockIcon />,
      colorClass: 'pillar-blue',
      concept: 'Garantiza que la información personal o secreta no sea accesible por personas o sistemas no autorizados.',
      metaphor: '🔑 Como el PIN de tu tarjeta bancaria o el candado de un diario íntimo. Solo tú y quien tú autorices tienen acceso.',
      realExample: 'Tus mensajes privados de WhatsApp o el historial médico de una clínica.',
      webImplementation: [
        '🔒 Cifrado HTTPS / SSL-TLS en tránsito',
        '🔑 Cookies con atributos HttpOnly y Secure',
        '🛡️ Control de acceso por roles (RBAC)',
        '🎟️ Tokens JWT para sesiones autenticadas'
      ],
      threat: 'Robo de contraseñas, espionaje de red (sniffing), ataques Man-in-the-Middle y filtraciones de bases de datos.',
    },
    integridad: {
      id: 'integridad',
      title: 'Integridad',
      subtitle: 'Nadie altera nada sin permiso.',
      icon: <ShieldCheckIcon />,
      colorClass: 'pillar-green',
      concept: 'Asegura que los datos se mantengan exactos, completos, auténticos y libres de modificaciones no autorizadas.',
      metaphor: '✉️ Como una carta en un sobre sellado. Si alguien la abre y cambia el texto en el camino, se rompe el sello de integridad.',
      realExample: 'El saldo de tu cuenta de banco: debe reflejar exactamente lo que has gastado o ingresado sin variaciones arbitrarias.',
      webImplementation: [
        '⚙️ Hashes de verificación (SHA-256 / MD5)',
        '📦 Subresource Integrity (SRI) en scripts CDN',
        '📝 Firmas digitales y certificados en API requests',
        '💾 Transacciones ACID con Rollback en bases de datos'
      ],
      threat: 'Inyección de código (SQLi, XSS), alteración de peticiones HTTP (tampering) y virus que corrompen archivos.',
    },
    disponibilidad: {
      id: 'disponibilidad',
      title: 'Disponibilidad',
      subtitle: 'Disponible cuando lo necesitas.',
      icon: <ClockIcon />,
      colorClass: 'pillar-orange',
      concept: 'Garantiza que los sistemas, servicios y datos estén al alcance de los usuarios autorizados de manera constante.',
      metaphor: '🏪 Como un supermercado abierto 24/7. De nada sirve que sea ultra seguro si sus puertas siempre están cerradas.',
      realExample: 'Poder entrar a Netflix el fin de semana o realizar transferencias bancarias de emergencia a medianoche.',
      webImplementation: [
        '🌐 CDNs (Content Delivery Networks) como Cloudflare',
        '⚖️ Balanceadores de Carga (Load Balancers)',
        '⚡ Rate Limiting y WAF para frenar ataques bot',
        '🔄 Replicación de Servidores y Backups Automáticos'
      ],
      threat: 'Ataques de denegación de servicio distribuido (DDoS), caídas de servidores, cortes de fibra óptica y desastres naturales.',
    }
  };

  const TOTAL_BUDGET = 220; // Max combined total allowed without system trade-off consequences
  const currentTotal = confidentialityLevel + integrityLevel + availabilityLevel;

  // Calculate System Trade-off status
  const getTrilemmaStatus = () => {
    if (currentTotal > 240) {
      return {
        type: 'critical',
        badge: '⚠️ Conflicto Físico/Económico',
        title: '¡Sobrecarga de Sistema e Inviabilidad!',
        description: 'Exigir 100% en todo genera un sistema extremadamente lento (debido a capas excesivas de cifrado y verificación), costos desorbitados de infraestructura y alta fricción para el usuario final.'
      };
    } else if (confidentialityLevel >= 80 && integrityLevel >= 80 && availabilityLevel <= 60) {
      return {
        type: 'secure',
        badge: '🏦 Perfil: Banco / Bóveda Ultra Segura',
        title: 'Seguridad Máxima, Menor Latencia / Fricción',
        description: 'Múltiples capas de cifrado, 2FA y validación estricta de hash. A cambio, los inicios de sesión son más lentos y si el servidor se satura, prefieren congelar el servicio antes que arriesgar datos.'
      };
    } else if (availabilityLevel >= 80 && integrityLevel >= 80 && confidentialityLevel <= 60) {
      return {
        type: 'public',
        badge: '🌐 Perfil: Wikipedia / Portal de Noticias',
        title: 'Alta Disponibilidad e Integridad, Baja Privacidad',
        description: 'La información es pública e hiper-rápida de acceder para millones de personas al mismo tiempo. Nadie puede alterar los datos no autorizadamente, pero no hay secretos ni confidencialidad.'
      };
    } else if (availabilityLevel >= 80 && confidentialityLevel >= 80 && integrityLevel <= 60) {
      return {
        type: 'fast-chat',
        badge: '⚡ Perfil: Chat Efímero o Streaming Liviano',
        title: 'Velocidad y Privacidad, Tolerancia a Errores de Integridad',
        description: 'Mensajes o transmisiones de video en vivo cifradas extremo a extremo y ultra rápidas. Si se pierden o alteran algunos paquetes de datos, se ignoran para no interrumpir la transmisión.'
      };
    } else {
      return {
        type: 'balanced',
        badge: '⚖️ Perfil Balanceado Estándar',
        title: 'Equilibrio Operativo Sostenible',
        description: 'Un balance adecuado recomendado para la mayoría de aplicaciones web comerciales cotidianas.'
      };
    }
  };

  const status = getTrilemmaStatus();

  // Presets handler for simulator
  const applyPreset = (c, i, a) => {
    setConfidentialityLevel(c);
    setIntegrityLevel(i);
    setAvailabilityLevel(a);
  };

  const quizQuestions = [
    {
      scenario: 'Un atacante intercepta las comunicaciones y filtra en internet la base de datos de usuarios y contraseñas.',
      options: [
        { key: 'confidencialidad', label: 'Confidencialidad' },
        { key: 'integridad', label: 'Integridad' },
        { key: 'disponibilidad', label: 'Disponibilidad' }
      ],
      correct: 'confidencialidad',
      explanation: '¡Correcto! Se violó la Confidencialidad porque terceras personas no autorizadas accedieron a información privada.'
    },
    {
      scenario: 'Un ataque de denegación de servicio (DDoS) tumba la tienda en línea durante la venta de Black Friday.',
      options: [
        { key: 'confidencialidad', label: 'Confidencialidad' },
        { key: 'integridad', label: 'Integridad' },
        { key: 'disponibilidad', label: 'Disponibilidad' }
      ],
      correct: 'disponibilidad',
      explanation: '¡Muy bien! Falló la Disponibilidad porque el sitio web quedó inalcanzable para los clientes cuando lo necesitaban.'
    },
    {
      scenario: 'Un atacante logra modificar silenciosamente el número de cuenta de destino en una transferencia bancaria en tránsito.',
      options: [
        { key: 'confidencialidad', label: 'Confidencialidad' },
        { key: 'integridad', label: 'Integridad' },
        { key: 'disponibilidad', label: 'Disponibilidad' }
      ],
      correct: 'integridad',
      explanation: '¡Exacto! Se vio afectada la Integridad porque los datos originales fueron alterados sin autorización.'
    }
  ];

  const handleAnswer = (key) => {
    setSelectedAnswer(key);
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex((prev) => prev + 1);
    } else {
      setQuizIndex(0);
    }
  };

  return (
    <div className="infographic-container">
      {/* Dynamic CSS styles embedded directly inside component for seamless standalone execution */}
      <style>{`
        .infographic-container {
          max-width: 1040px;
          margin: 0 auto;
          padding: 32px 20px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: #0f172a;
          background-color: #f8fafc;
          border-radius: 24px;
        }

        .infographic-header {
          text-align: center;
          margin-bottom: 36px;
        }

        .badge-wrapper {
          display: inline-flex;
          padding: 16px;
          background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
          border-radius: 50%;
          color: #ffffff;
          margin-bottom: 16px;
          box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.4);
        }

        .header-icon {
          width: 48px;
          height: 48px;
        }

        .infographic-header h1 {
          font-size: 2.4rem;
          font-weight: 800;
          color: #1e293b;
          margin: 0 0 12px 0;
          letter-spacing: -0.02em;
        }

        .header-subtitle {
          font-size: 1.1rem;
          color: #475569;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .analogy-banner {
          background: linear-gradient(135deg, #e0e7ff 0%, #f1f5f9 100%);
          border-left: 6px solid #6366f1;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 40px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }

        .analogy-banner h2 {
          font-size: 1.3rem;
          color: #312e81;
          margin-top: 0;
          margin-bottom: 10px;
        }

        .analogy-banner p {
          line-height: 1.6;
          color: #334155;
          font-size: 1rem;
          margin: 0;
        }

        .pillars-section {
          margin-bottom: 48px;
        }

        .pillars-section h2 {
          text-align: center;
          font-size: 1.7rem;
          color: #1e293b;
          margin-bottom: 24px;
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
          margin-bottom: 28px;
        }

        .pillar-card {
          background: #ffffff;
          border: 2px solid #e2e8f0;
          border-radius: 18px;
          padding: 24px 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .pillar-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.08);
        }

        .pillar-icon {
          width: 44px;
          height: 44px;
          margin-bottom: 12px;
        }

        .pillar-card h3 {
          font-size: 1.3rem;
          margin: 8px 0 4px 0;
        }

        .pillar-tagline {
          font-size: 0.9rem;
          color: #64748b;
        }

        .pillar-blue { color: #2563eb; }
        .pillar-blue.active {
          border-color: #3b82f6;
          background: #eff6ff;
          box-shadow: 0 8px 20px -4px rgba(59, 130, 246, 0.25);
        }

        .pillar-green { color: #16a34a; }
        .pillar-green.active {
          border-color: #22c55e;
          background: #f0fdf4;
          box-shadow: 0 8px 20px -4px rgba(34, 197, 94, 0.25);
        }

        .pillar-orange { color: #ea580c; }
        .pillar-orange.active {
          border-color: #f97316;
          background: #fff7ed;
          box-shadow: 0 8px 20px -4px rgba(249, 115, 22, 0.25);
        }

        .pillar-detail-card {
          border-radius: 20px;
          padding: 28px;
          border: 2px solid currentColor;
          background: #ffffff;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
        }

        .detail-header {
          border-bottom: 2px solid #f1f5f9;
          padding-bottom: 14px;
          margin-bottom: 20px;
        }

        .detail-header h3 {
          font-size: 1.6rem;
          margin: 0 0 4px 0;
        }

        .detail-subtitle {
          font-size: 1rem;
          color: #64748b;
        }

        .detail-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .detail-block {
          background: #f8fafc;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .detail-block h4 {
          font-size: 0.98rem;
          margin: 0 0 8px 0;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .detail-block p {
          font-size: 0.92rem;
          line-height: 1.5;
          color: #334155;
          margin: 0;
        }

        .web-impl-block {
          background: #f0f9ff;
          border: 1px solid #bae6fd;
        }

        .web-impl-block ul {
          margin: 0;
          padding-left: 18px;
          font-size: 0.9rem;
          color: #0369a1;
          line-height: 1.6;
        }

        .web-impl-block li {
          margin-bottom: 4px;
        }

        .danger-block {
          background: #fef2f2;
          border: 1px solid #fecaca;
        }

        /* Trilemma Simulator Section Styles */
        .simulator-section {
          background: #ffffff;
          border: 2px solid #cbd5e1;
          border-radius: 20px;
          padding: 32px 24px;
          margin-bottom: 48px;
          box-shadow: 0 8px 20px -4px rgba(0,0,0,0.06);
        }

        .simulator-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .simulator-header h2 {
          font-size: 1.7rem;
          color: #0f172a;
          margin: 0 0 8px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .simulator-header p {
          color: #475569;
          font-size: 1rem;
          max-width: 680px;
          margin: 0 auto;
        }

        .preset-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-bottom: 28px;
        }

        .preset-btn {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.88rem;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          transition: all 0.2s;
        }

        .preset-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        .sliders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
          margin-bottom: 28px;
        }

        .slider-card {
          background: #f8fafc;
          padding: 20px;
          border-radius: 14px;
          border: 1px solid #e2e8f0;
        }

        .slider-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .slider-card input[type="range"] {
          width: 100%;
          accent-color: #4f46e5;
          cursor: pointer;
        }

        .status-display-card {
          border-radius: 16px;
          padding: 20px 24px;
          transition: all 0.3s ease;
        }

        .status-display-card.critical {
          background: #fff1f2;
          border: 2px solid #fda4af;
          color: #881337;
        }

        .status-display-card.secure {
          background: #eff6ff;
          border: 2px solid #93c5fd;
          color: #1e3a8a;
        }

        .status-display-card.public {
          background: #f0fdf4;
          border: 2px solid #86efac;
          color: #14532d;
        }

        .status-display-card.fast-chat {
          background: #fff7ed;
          border: 2px solid #fdba74;
          color: #7c2d12;
        }

        .status-display-card.balanced {
          background: #f8fafc;
          border: 2px solid #cbd5e1;
          color: #1e293b;
        }

        .status-badge {
          display: inline-block;
          font-weight: 700;
          font-size: 0.85rem;
          padding: 4px 12px;
          border-radius: 12px;
          background: rgba(255,255,255,0.8);
          margin-bottom: 8px;
        }

        /* Quiz Styles */
        .quiz-section {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 32px 24px;
          margin-bottom: 48px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
        }

        .quiz-container {
          max-width: 650px;
          margin: 0 auto;
          text-align: center;
        }

        .quiz-container h2 {
          font-size: 1.6rem;
          margin-top: 0;
          color: #1e293b;
        }

        .quiz-instruction {
          color: #64748b;
          font-size: 0.95rem;
          margin-bottom: 20px;
        }

        .quiz-card {
          background: #f8fafc;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid #e2e8f0;
        }

        .scenario-text {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 20px;
          line-height: 1.5;
        }

        .options-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .quiz-btn {
          padding: 14px 20px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          background: #ffffff;
          font-size: 1rem;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .quiz-btn:hover:not(:disabled) {
          border-color: #6366f1;
          background: #eeefff;
          color: #4338ca;
        }

        .quiz-btn.correct {
          background: #dcfce7;
          border-color: #22c55e;
          color: #15803d;
        }

        .quiz-btn.incorrect {
          background: #fee2e2;
          border-color: #ef4444;
          color: #b91c1c;
        }

        .feedback-box {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid #cbd5e1;
        }

        .feedback-box p {
          font-size: 0.98rem;
          color: #334155;
          margin-bottom: 16px;
          line-height: 1.5;
        }

        .next-btn {
          background: #4f46e5;
          color: #ffffff;
          border: none;
          padding: 12px 24px;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .next-btn:hover {
          background: #4338ca;
        }

        /* Technical Practical Implementation Section Styles */
        .tech-section {
          margin-bottom: 40px;
        }

        .tech-section h2 {
          text-align: center;
          font-size: 1.7rem;
          color: #0f172a;
          margin-bottom: 24px;
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .tech-card {
          background: #ffffff;
          padding: 24px;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }

        .tech-card h3 {
          margin-top: 0;
          margin-bottom: 12px;
          font-size: 1.2rem;
          color: #1e293b;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .tech-card p {
          font-size: 0.93rem;
          color: #475569;
          line-height: 1.5;
          margin-bottom: 12px;
        }

        .tech-tag {
          display: inline-block;
          font-size: 0.78rem;
          font-family: monospace;
          background: #f1f5f9;
          color: #334155;
          padding: 4px 8px;
          border-radius: 6px;
          margin-right: 6px;
          margin-bottom: 6px;
        }

        @media (max-width: 640px) {
          .infographic-header h1 {
            font-size: 1.8rem;
          }
          .detail-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {}
      <header className="infographic-header">
        <div className="badge-wrapper">
          <ShieldHeaderIcon />
        </div>
        <h1>La Tríada de la Información</h1>
        <p className="header-subtitle">
          Conocida universalmente como la <strong>Tríada C.I.A.</strong> Son los 3 pilares esenciales e interconectados para proteger cualquier activo digital o físico en el mundo moderno.
        </p>
      </header>

      <section className="analogy-banner">
        <h2>💡 Analogía Cotidiana: La Caja Fuerte Bancaria</h2>
        <p>
          Imagina la ciberseguridad como una <strong>caja fuerte</strong> dentro de un banco:
          <br />
          🔐 <strong>Confidencialidad:</strong> Solo tú y el gerente conocen la combinación secreta para abrirla.
          <br />
          ✉️ <strong>Integridad:</strong> Un sello lacrado garantiza que nadie alteró tus documentos guardados.
          <br />
          🏪 <strong>Disponibilidad:</strong> El banco está abierto y disponible cuando necesitas retirar tus pertenencias.
        </p>
      </section>

      {}
      <section className="pillars-section">
        <h2>1. Explora los 3 Pilares</h2>
        <div className="pillars-grid">
          {Object.values(pillars).map((p) => (
            <div
              key={p.id}
              className={`pillar-card ${p.colorClass} ${activePillar === p.id ? 'active' : ''}`}
              onClick={() => setActivePillar(p.id)}
            >
              {p.icon}
              <h3>{p.title}</h3>
              <span className="pillar-tagline">{p.subtitle}</span>
            </div>
          ))}
        </div>

        {/* Detailed Card for Active Pillar */}
        <div className={`pillar-detail-card ${pillars[activePillar].colorClass}`}>
          <div className="detail-header">
            <h3>Pilar: {pillars[activePillar].title}</h3>
            <span className="detail-subtitle">{pillars[activePillar].subtitle}</span>
          </div>

          <div className="detail-content">
            <div className="detail-block">
              <h4>📖 Concepto Principal</h4>
              <p>{pillars[activePillar].concept}</p>
            </div>

            <div className="detail-block">
              <h4>🌱 Metáfora del Mundo Real</h4>
              <p>{pillars[activePillar].metaphor}</p>
            </div>

            <div className="detail-block web-impl-block">
              <h4>
                <CodeIcon /> Método de Aplicación Web
              </h4>
              <ul>
                {pillars[activePillar].webImplementation.map((impl, index) => (
                  <li key={index}>{impl}</li>
                ))}
              </ul>
            </div>

            <div className="detail-block danger-block">
              <h4>⚠️ ¿Qué la Amenaza?</h4>
              <p>{pillars[activePillar].threat}</p>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="simulator-section">
        <div className="simulator-header">
          <h2><CpuIcon /> 2. El Trilema de la Ciberseguridad</h2>
          <p>
            <strong>¿Por qué no podemos tener los 3 pilares al 100% al mismo tiempo?</strong> Aumentar al máximo uno suele requerir sacrificios en rendimiento, costo o comodidad para el usuario. ¡Pruébalo tú mismo!
          </p>
        </div>

        {/* Presets */}
        <div className="preset-buttons">
          <button className="preset-btn" onClick={() => applyPreset(95, 95, 40)}>
            🏦 Banco / Bóveda (Confidencialidad + Integridad)
          </button>
          <button className="preset-btn" onClick={() => applyPreset(30, 95, 95)}>
            🌐 Wikipedia / Noticias (Integridad + Disponibilidad)
          </button>
          <button className="preset-btn" onClick={() => applyPreset(90, 40, 90)}>
            ⚡ Streaming / Video Chat (Confidencialidad + Disponibilidad)
          </button>
          <button className="preset-btn" onClick={() => applyPreset(100, 100, 100)}>
            ⚠️ Intento Imposible (100% en Todo)
          </button>
        </div>

        {/* Sliders */}
        <div className="sliders-grid">
          <div className="slider-card">
            <div className="slider-title-row">
              <span style={{ color: '#2563eb' }}>🔒 Confidencialidad</span>
              <span>{confidentialityLevel}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={confidentialityLevel}
              onChange={(e) => setConfidentialityLevel(Number(e.target.value))}
            />
          </div>

          <div className="slider-card">
            <div className="slider-title-row">
              <span style={{ color: '#16a34a' }}>🛡️ Integridad</span>
              <span>{integrityLevel}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={integrityLevel}
              onChange={(e) => setIntegrityLevel(Number(e.target.value))}
            />
          </div>

          <div className="slider-card">
            <div className="slider-title-row">
              <span style={{ color: '#ea580c' }}>⏱️ Disponibilidad</span>
              <span>{availabilityLevel}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={availabilityLevel}
              onChange={(e) => setAvailabilityLevel(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Dynamic Simulator Output Box */}
        <div className={`status-display-card ${status.type}`}>
          <span className="status-badge">{status.badge}</span>
          <h3 style={{ margin: '4px 0 8px 0', fontSize: '1.2rem' }}>{status.title}</h3>
          <p style={{ margin: 0, lineHeight: 1.5, fontSize: '0.95rem' }}>{status.description}</p>
        </div>
      </section>

      {}
      <section className="quiz-section">
        <div className="quiz-container">
          <h2>🧩 3. Desafío Práctico: ¿Qué pilar falló?</h2>
          <p className="quiz-instruction">
            Analiza el incidente de ciberseguridad y selecciona el pilar comprometido ({quizIndex + 1} de {quizQuestions.length})
          </p>

          <div className="quiz-card">
            <p className="scenario-text">
              "{quizQuestions[quizIndex].scenario}"
            </p>

            <div className="options-grid">
              {quizQuestions[quizIndex].options.map((option) => (
                <button
                  key={option.key}
                  disabled={showFeedback}
                  onClick={() => handleAnswer(option.key)}
                  className={`quiz-btn ${
                    selectedAnswer === option.key
                      ? option.key === quizQuestions[quizIndex].correct
                        ? 'correct'
                        : 'incorrect'
                      : ''
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {showFeedback && (
              <div className="feedback-box">
                <p>{quizQuestions[quizIndex].explanation}</p>
                <button className="next-btn" onClick={nextQuestion}>
                  {quizIndex < quizQuestions.length - 1 ? 'Siguiente Caso ➡️' : 'Reiniciar Desafío 🔄'}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {}
      <section className="tech-section">
        <h2>🛠️ 4. Mecanismos Técnicos: ¿Cómo se aplican?</h2>
        <div className="tech-grid">
          <div className="tech-card">
            <h3>🔐 Cifrado de Datos</h3>
            <p>
              Transforma la información legible en un código incomprensible usando algoritmos matemáticos complejos. Solo quien posea la clave de descifrado puede leerla.
            </p>
            <div>
              <span className="tech-tag">AES-256</span>
              <span className="tech-tag">RSA / ECC</span>
              <span className="tech-tag">HTTPS / TLS</span>
            </div>
          </div>

          <div className="tech-card">
            <h3>🔑 Contraseñas y Hash</h3>
            <p>
              Las contraseñas nunca se guardan en texto plano en la base de datos; se convierten mediante funciones de un solo sentido (Hashing) protegidas con Salt.
            </p>
            <div>
              <span className="tech-tag">Argon2id</span>
              <span className="tech-tag">Bcrypt</span>
              <span className="tech-tag">2FA / TOTP</span>
            </div>
          </div>

          <div className="tech-card">
            <h3>✍️ Firmas y Checksums</h3>
            <p>
              Generan una huella digital única para los archivos. Si un solo carácter cambia en la información, la huella cambia por completo, alertando de una alteración.
            </p>
            <div>
              <span className="tech-tag">SHA-256</span>
              <span className="tech-tag">HMAC</span>
              <span className="tech-tag">Firma Digital</span>
            </div>
          </div>

          <div className="tech-card">
            <h3>☁️ Copias y Redundancia</h3>
            <p>
              Estrategia para evitar interrupciones de servicio. Mantener servidores réplica en distintas regiones geográficas e implementar respaldos continuos.
            </p>
            <div>
              <span className="tech-tag">Backups 3-2-1</span>
              <span className="tech-tag">Multi-Region</span>
              <span className="tech-tag">Failover Auto</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}