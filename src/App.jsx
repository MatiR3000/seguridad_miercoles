import React, { useState } from 'react';
import './App.css';

// Íconos SVG integrados para que no necesites instalar nada extra
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

export default function App() {
  const [activePillar, setActivePillar] = useState('confidencialidad');
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Información interactiva sobre la Tríada CIA
  const pillars = {
    confidencialidad: {
      id: 'confidencialidad',
      title: 'Confidencialidad',
      subtitle: 'Solo quien debe ver, ve.',
      icon: <LockIcon />,
      colorClass: 'pillar-blue',
      concept: 'Garantiza que la información personal o secreta no sea accesible por personas no autorizadas.',
      metaphor: '🔑 Como el PIN de tu tarjeta bancaria o el candado de un diario íntimo. Solo tú y quien tú autorices tienen acceso.',
      realExample: 'Tus mensajes privados de WhatsApp o el historial médico de una clínica.',
      threat: 'Robo de contraseñas, espionaje, filtración de datos privados.',
    },
    integridad: {
      id: 'integridad',
      title: 'Integridad',
      icon: <ShieldCheckIcon />,
      subtitle: 'Nadie altera nada sin permiso.',
      colorClass: 'pillar-green',
      concept: 'Asegura que los datos se mantengan exactos, completos y sin modificaciones maliciosas.',
      metaphor: '✉️ Como una carta en un sobre sellado. Si alguien la abre y cambia el texto en el camino, se rompe la integridad.',
      realExample: 'El saldo de tu cuenta de banco: debe reflejar exactamente lo que has gastado o ingresado.',
      threat: 'Modificación de notas escolares, alteración de transferencias o virus que dañan archivos.',
    },
    disponibilidad: {
      id: 'disponibilidad',
      title: 'Disponibilidad',
      icon: <ClockIcon />,
      subtitle: 'Disponible cuando lo necesitas.',
      colorClass: 'pillar-orange',
      concept: 'Garantiza que los sistemas e información estén al alcance de los usuarios cuando se necesiten.',
      metaphor: '🏪 Como un supermercado abierto. De nada sirve que sea seguro si sus puertas nunca abren.',
      realExample: 'Poder entrar a Netflix el fin de semana o hacer una transferencia bancaria a medianoche.',
      threat: 'Ataques que saturan servidores (DDoS), cortes de luz o fallas en el servicio de internet.',
    }
  };

  const quizQuestions = [
    {
      scenario: 'Un hacker filtra en internet las fotos privadas de una persona.',
      options: [
        { key: 'confidencialidad', label: 'Confidencialidad' },
        { key: 'integridad', label: 'Integridad' },
        { key: 'disponibilidad', label: 'Disponibilidad' }
      ],
      correct: 'confidencialidad',
      explanation: '¡Correcto! Se violó la Confidencialidad porque personas no autorizadas accedieron a información privada.'
    },
    {
      scenario: 'Intentas entrar a tu cuenta del banco para hacer un pago urgente, pero la plataforma está caída todo el día.',
      options: [
        { key: 'confidencialidad', label: 'Confidencialidad' },
        { key: 'integridad', label: 'Integridad' },
        { key: 'disponibilidad', label: 'Disponibilidad' }
      ],
      correct: 'disponibilidad',
      explanation: '¡Muy bien! Falló la Disponibilidad porque el servicio no estuvo accesible cuando lo requerías.'
    },
    {
      scenario: 'Un estudiante altera el sistema del colegio y cambia su nota de reprobado a aprobado.',
      options: [
        { key: 'confidencialidad', label: 'Confidencialidad' },
        { key: 'integridad', label: 'Integridad' },
        { key: 'disponibilidad', label: 'Disponibilidad' }
      ],
      correct: 'integridad',
      explanation: '¡Exacto! Se afectó la Integridad porque la información original fue modificada sin autorización.'
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
      {}
      <header className="infographic-header">
        <div className="badge-wrapper">
          <ShieldHeaderIcon />
        </div>
        <h1>La Tríada de la Información</h1>
        <p className="header-subtitle">
          También conocida como la <strong>Tríada C.I.A.</strong> Son los 3 pilares indispensables para proteger la información en el mundo digital y físico.
        </p>
      </header>

      {}
      <section className="analogy-banner">
        <h2>💡 Ejemplo sencillo: La Caja Fuerte</h2>
        <p>
          Imagina la seguridad como una <strong>caja fuerte en un banco</strong>:
          <br />
          1. <strong>Confidencialidad:</strong> Solo tú conoces la clave para abrirla.
          <br />
          2. <strong>Integridad:</strong> Nadie puede cambiar tus billetes por papel periódico.
          <br />
          3. <strong>Disponibilidad:</strong> El banco está abierto cuando necesitas retirar tu dinero.
        </p>
      </section>

      {}
      <section className="pillars-section">
        <h2>Selecciona un pilar para explorar sus detalles</h2>
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

        {/* Tarjeta de detalle interactiva */}
        <div className={`pillar-detail-card ${pillars[activePillar].colorClass}`}>
          <div className="detail-header">
            <h3>Pilar: {pillars[activePillar].title}</h3>
            <span className="detail-subtitle">{pillars[activePillar].subtitle}</span>
          </div>

          <div className="detail-content">
            <div className="detail-block">
              <h4>📖 Concepto</h4>
              <p>{pillars[activePillar].concept}</p>
            </div>

            <div className="detail-block">
              <h4>🌱 En la Vida Real</h4>
              <p>{pillars[activePillar].metaphor}</p>
            </div>

            <div className="detail-block">
              <h4>📱 En el Mundo Digital</h4>
              <p>{pillars[activePillar].realExample}</p>
            </div>

            <div className="detail-block danger-block">
              <h4>⚠️ ¿Qué la amenaza?</h4>
              <p>{pillars[activePillar].threat}</p>
            </div>
          </div>
        </div>
      </section>
      {}
      <section className="quiz-section">
        <div className="quiz-container">
          <h2>🧩 Desafío: ¿Qué pilar falló?</h2>
          <p className="quiz-instruction">
            Caso {quizIndex + 1} de {quizQuestions.length}
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
      <footer className="summary-footer">
        <h2>🛡️ ¿Cómo aplicarlo en tu día a día?</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <h4>🔒 Confidencialidad</h4>
            <p>Usa contraseñas seguras y no las compartas con nadie.</p>
          </div>
          <div className="tip-card">
            <h4>✅ Integridad</h4>
            <p>No hagas clic en enlaces sospechosos ni descargues archivos de fuentes desconocidas.</p>
          </div>
          <div className="tip-card">
            <h4>⏱️ Disponibilidad</h4>
            <p>Guarda copias de seguridad (backups) de tus archivos importantes en la nube o un disco externo.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
