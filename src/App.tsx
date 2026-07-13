import { useState, useEffect } from 'react'
import {
  FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp,
  FaExternalLinkAlt, FaTerminal, FaArrowRight
} from 'react-icons/fa'
import { SiPython, SiReact, SiTypescript, SiFastapi, SiLangchain, SiNodedotjs } from 'react-icons/si'

const NAV_LINKS = ['Work', 'Stack', 'About', 'Contact']

const PROJECTS = [
  {
  id: 'edurag',
  label: 'Featured · Live',
  title: 'EduRAG Assistant',
  description: 'Full-stack, multi-tenant agentic RAG application for document intelligence. A LangGraph-based system classifies intent, retrieves relevant context, and routes to Q&A, summarization, quiz generation, or topic extraction — with a relevance-gated grounding check that blocks hallucinated answers before generation. JWT authentication with per-user Chroma isolation, a live usage dashboard, and persistent storage on Railway via volumes. Instrumented with Langfuse for full observability and a regression eval harness, and exposed as an MCP server for use with Claude Desktop and other MCP clients. Built solo from system design to production deployment.',
  stack: ['Python', 'FastAPI', 'LangGraph', 'LangChain', 'Groq API', 'ChromaDB', 'HuggingFace', 'MCP', 'Langfuse', 'JWT Auth', 'SQLAlchemy', 'React', 'TypeScript'],
  github: 'https://github.com/Fahad-12345/EduRAG-Assistant',
  live: 'https://edu-rag-assistant.vercel.app',
  featured: true,
  image: '/projects/EduRAG.png',
},
  {
    id: 'ppe',
    label: 'Computer Vision',
    title: 'AI PPE Safety Monitor',
    description: 'Real-time industrial safety system using a custom-trained YOLOv8n model on 1,132 construction site images. Detects helmet and vest violations from live camera feed with Flask dashboard, incident logging, and audio alerts.',
    stack: ['Python', 'YOLOv8', 'OpenCV', 'Flask', 'SQLite'],
    github: 'https://github.com/Fahad-12345/AI-Smart-Surveillance-System',
    live: null,
    featured: false,
    image: '/projects/ai-surveillance.png',
  },
  {
    id: 'complicheck',
    label: 'Security',
    title: 'CompliCheck',
    description: 'Automated privacy and security risk scanner. Detects privacy policy presence, cookie banners, security headers (HSTS, CSP, X-Frame-Options), and third-party trackers. Generates downloadable HTML audit reports.',
    stack: ['Python', 'Selenium', 'BeautifulSoup'],
    github: 'https://github.com/Fahad-12345/privacy-security-audit-tool',
    live: null,
    featured: false,
    image: '/projects/complicheck.png',
  },
  {
    id: 'quiz',
    label: 'AI Tool',
    title: 'AI Quiz Generator',
    description: 'Automatically extracts multiple-choice questions from PDF, DOCX, and PPTX files. Generates formatted, downloadable quiz reports. Frontend deployed live on Vercel.',
    stack: ['TypeScript', 'Fastify', 'Node.js'],
    github: 'https://github.com/Fahad-12345/ai-quiz-generator',
    live: null,
    featured: false,
    image: '/projects/ai-quiz-generator.png',
  },
  {
    id: 'climate',
    label: 'Data Science',
    title: 'Climate Anomaly Detection',
    description: 'Detects and visualizes temperature anomalies across countries using historical datasets from 1940 to present. Identifies deviations from baseline climate conditions with clear visual output.',
    stack: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
    github: 'https://github.com/Fahad-12345/anomaly-detection-python-pandas',
    live: null,
    featured: false,
    image: '/projects/anamoly-detection.png',
  },
]

const STACK = [
  {
    category: 'AI & LLM',
    items: ['LangChain', 'RAG Pipelines', 'Groq API', 'HuggingFace', 'ChromaDB', 'YOLOv8', 'Prompt Engineering', 'Vector Search'],
  },
  {
    category: 'Backend',
    items: ['Python', 'FastAPI', 'Node.js', 'Apache Kafka', 'PySpark', 'AWS (RDS, DMS)', 'REST APIs', 'ETL Pipelines'],
  },
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vite', 'Angular', 'Axios'],
  },
  {
    category: 'Data & Infra',
    items: ['PostgreSQL', 'MongoDB', 'ChromaDB', 'Docker', 'Git', 'Railway', 'Vercel'],
  },
]

const EXPERIENCE = [
  {
    role: 'Full-Stack AI Developer',
    company: 'Independent Projects',
    period: 'Nov 2024 – Present',
    location: 'Remote',
    active: true,
    points: [
      'Built 5 AI systems independently — RAG pipeline, computer vision safety monitor, security scanner, quiz generator, and anomaly detection tool',
      'Full ownership from system design through backend, frontend, and deployment; shipped EduRAG Assistant to production on Railway and Vercel',
      'Stack: Python, FastAPI, LangChain, Groq API, ChromaDB, React, TypeScript',
    ],
  },
  {
    role: 'Jr. Software Engineer',
    company: 'Deline Media Pakistan',
    period: 'Aug 2023 – Oct 2024',
    location: 'Lahore, Pakistan',
    active: false,
    points: [
      'Worked on Ovada, a US-based Electronic Health Records platform — built REST APIs, implemented CDC using AWS DMS and Apache Kafka',
      'Developed PySpark ETL jobs for MySQL-to-PostgreSQL data pipelines',
      'Contributed to a 4% revenue increase and 36% reduction in server throughput',
    ],
  },
]

function Dot({ active }: { active: boolean }) {
  return (
    <div style={{
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: active ? 'var(--green)' : 'var(--border-hover)',
      flexShrink: 0,
      marginTop: 6,
      boxShadow: active ? '0 0 8px var(--green)' : 'none',
    }} />
  )
}

function Tag({ text }: { text: string }) {
  return (
    <span style={{
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--text-secondary)',
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid var(--border)',
      borderRadius: 4,
      padding: '2px 8px',
      whiteSpace: 'nowrap',
    }}>
      {text}
    </span>
  )
}

function Label({ text, green }: { text: string; green?: boolean }) {
  return (
    <span style={{
      fontFamily: 'var(--mono)',
      fontSize: 11,
      fontWeight: 500,
      color: green ? 'var(--green)' : 'var(--text-muted)',
      background: green ? 'var(--green-bg)' : 'transparent',
      border: `1px solid ${green ? 'var(--green-border)' : 'var(--border)'}`,
      borderRadius: 4,
      padding: '2px 8px',
      letterSpacing: '0.03em',
    }}>
      {text}
    </span>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [typedText, setTypedText] = useState('')
  const fullText = 'building AI products that ship.'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 45)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Nav */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        background: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'all 0.2s ease',
      }}>
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 24px',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FaTerminal style={{ color: 'var(--green)', fontSize: 14 }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>
              fahad@dev
            </span>
          </div>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            {NAV_LINKS.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                style={{
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  transition: 'color 0.15s',
                  fontWeight: 500,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {link}
              </a>
            ))}
            <a
              href="mailto:fahadirfan007@gmail.com"
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: 'var(--green)',
                border: '1px solid var(--green-border)',
                borderRadius: 6,
                padding: '6px 14px',
                background: 'var(--green-bg)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(34,197,94,0.14)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--green-bg)')}
            >
              Hire me
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 24px 80px' }}>
        <div style={{ maxWidth: 720 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)' }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--green)', letterSpacing: '0.05em' }}>
              AVAILABLE FOR REMOTE ROLES
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(38px, 6vw, 64px)',
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            marginBottom: 20,
          }}>
            Fahad Irfan.<br />
            <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>
              {typedText}
              <span style={{ animation: 'blink 1s step-end infinite', color: 'var(--green)' }}>|</span>
            </span>
          </h1>

          <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>

          <p style={{
            fontSize: 17,
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            maxWidth: 580,
            marginBottom: 40,
          }}>
            Full-Stack AI Developer building production AI systems — RAG pipelines, 
            LLM-powered applications, and end-to-end platforms using Python, FastAPI, 
            React, and LangChain. Previously backend engineer at a US-based healthtech 
            startup (Kafka, AWS, ETL pipelines).
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 56 }}>
            <a
              href="#work"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'var(--green)',
                color: '#000',
                fontWeight: 600,
                fontSize: 14,
                padding: '10px 22px',
                borderRadius: 8,
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              See my work <FaArrowRight style={{ fontSize: 12 }} />
            </a>
            <a
              href="https://edu-rag-assistant.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                border: '1px solid var(--border-hover)',
                color: 'var(--text-primary)',
                fontWeight: 500,
                fontSize: 14,
                padding: '10px 22px',
                borderRadius: 8,
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--green)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
            >
              Live demo <FaExternalLinkAlt style={{ fontSize: 11 }} />
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {[
              { value: '5+', label: 'projects built' },
              { value: 'PKT', label: 'UTC+5 timezone' },
              { value: 'Live', label: 'design → deploy' },
            ].map(stat => (
              <div key={stat.label}>
                <p style={{ fontSize: 26, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--mono)', marginBottom: 2 }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech icons strip */}
      <section style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '20px 0',
        overflow: 'hidden',
      }}>
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 40,
          flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--mono)', whiteSpace: 'nowrap' }}>DAILY STACK</span>
          {[
            { icon: SiPython, label: 'Python' },
            { icon: SiFastapi, label: 'FastAPI' },
            { icon: SiLangchain, label: 'LangChain' },
            { icon: SiReact, label: 'React' },
            { icon: SiTypescript, label: 'TypeScript' },
            { icon: SiNodedotjs , label: 'Nodejs' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
              <Icon style={{ fontSize: 18 }} />
              <span style={{ fontSize: 13, fontWeight: 500 }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Work / Projects */}
      <section id="work" style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--green)', letterSpacing: '0.05em', marginBottom: 10 }}>
            WORK
          </p>
          <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 8 }}>
            Built and shipped independently.
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 500, fontSize: 15 }}>
            Every project was designed, built, and deployed solo — from architecture to production.
          </p>
        </div>

        {/* Featured project */}
        {PROJECTS.filter(p => p.featured).map(project => (
          <div
            key={project.id}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--green-border)',
              borderRadius: 16,
              overflow: 'hidden',
              marginBottom: 24,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 0,
            }}
          >
            <div style={{ padding: '40px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <Label text={project.label} green />
                <h3 style={{ fontSize: 24, fontWeight: 600, marginTop: 16, marginBottom: 12, letterSpacing: '-0.01em' }}>
                  {project.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20, fontSize: 14 }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
                  {project.stack.map(s => <Tag key={s} text={s} />)}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 7,
                      background: 'var(--green)',
                      color: '#000',
                      fontWeight: 600,
                      fontSize: 13,
                      padding: '9px 18px',
                      borderRadius: 7,
                      transition: 'opacity 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    <FaExternalLinkAlt style={{ fontSize: 10 }} /> Live demo
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    border: '1px solid var(--border-hover)',
                    color: 'var(--text-secondary)',
                    fontWeight: 500,
                    fontSize: 13,
                    padding: '9px 18px',
                    borderRadius: 7,
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green)'; e.currentTarget.style.color = 'var(--green)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                >
                  <FaGithub style={{ fontSize: 14 }} /> GitHub
                </a>
              </div>
            </div>
            <div style={{
              background: '#080808',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
              borderLeft: '1px solid var(--border)',
            }}>
              <img
                src={project.image}
                alt={project.title}
                style={{ width: '100%', maxHeight: 280, objectFit: 'contain', borderRadius: 8 }}
              />
            </div>
          </div>
        ))}

        {/* Other projects grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 16,
        }}>
          {PROJECTS.filter(p => !p.featured).map(project => (
            <div
              key={project.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                overflow: 'hidden',
                transition: 'border-color 0.15s',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-hover)')}
              onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)')}
            >
              <div style={{ height: 160, background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, borderBottom: '1px solid var(--border)' }}>
                <img src={project.image} alt={project.title} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
              </div>
              <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Label text={project.label} />
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: '10px 0 8px', letterSpacing: '-0.01em' }}>
                  {project.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6, flex: 1, marginBottom: 16 }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
                  {project.stack.map(s => <Tag key={s} text={s} />)}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 13,
                      color: 'var(--text-secondary)',
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--green)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    <FaGithub /> GitHub
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: 13,
                        color: 'var(--green)',
                      }}
                    >
                      <FaExternalLinkAlt style={{ fontSize: 10 }} /> Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section id="stack" style={{
        borderTop: '1px solid var(--border)',
        maxWidth: 1100,
        margin: '0 auto',
        padding: '80px 24px',
      }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--green)', letterSpacing: '0.05em', marginBottom: 10 }}>
          STACK
        </p>
        <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 40 }}>
          Tools I work with daily.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {STACK.map(group => (
            <div
              key={group.category}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: 24,
              }}
            >
              <p style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                color: 'var(--green)',
                letterSpacing: '0.08em',
                marginBottom: 16,
                fontWeight: 500,
              }}>
                {group.category.toUpperCase()}
              </p>
              <ul style={{ listStyle: 'none' }}>
                {group.items.map(item => (
                  <li
                    key={item}
                    style={{
                      fontSize: 13,
                      color: 'var(--text-secondary)',
                      padding: '5px 0',
                      borderBottom: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--border-hover)', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* About / Experience */}
      <section id="about" style={{
        borderTop: '1px solid var(--border)',
        maxWidth: 1100,
        margin: '0 auto',
        padding: '80px 24px',
      }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--green)', letterSpacing: '0.05em', marginBottom: 10 }}>
          ABOUT
        </p>
        <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 40 }}>
          Background.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          <div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16, fontSize: 15 }}>
              I'm a Full-Stack AI Developer focused on building AI products end-to-end — 
              from system design to production. I care about the full picture: clean 
              architecture, fast APIs, usable frontends, and deployments that actually 
              hold up.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 15 }}>
              I work best in small, fast-moving teams where I can own features end-to-end.
              I'm comfortable jumping between backend logic, LLM pipelines, and frontend
              interfaces depending on what the product needs.
            </p>
            <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {['Remote only', 'Pakistan (PKT)', 'MS Electrical Engineering', 'Available now'].map(tag => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border)',
                    borderRadius: 4,
                    padding: '4px 10px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-muted)', marginBottom: 20, letterSpacing: '0.05em' }}>
              EXPERIENCE
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {EXPERIENCE.map((exp, i) => (
                <div key={i} style={{ display: 'flex', gap: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
                    <Dot active={exp.active} />
                    {i < EXPERIENCE.length - 1 && (
                      <div style={{ width: 1, flex: 1, background: 'var(--border)', marginTop: 6 }} />
                    )}
                  </div>
                  <div style={{ flex: 1, paddingBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                      <p style={{ fontWeight: 600, fontSize: 14 }}>{exp.role}</p>
                      <span style={{
                        fontFamily: 'var(--mono)',
                        fontSize: 11,
                        color: 'var(--text-muted)',
                        whiteSpace: 'nowrap',
                      }}>{exp.period}</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 10 }}>
                      {exp.company} · {exp.location}
                    </p>
                    <ul style={{ listStyle: 'none' }}>
                      {exp.points.map((point, j) => (
                        <li key={j} style={{
                          fontSize: 13,
                          color: 'var(--text-secondary)',
                          lineHeight: 1.6,
                          marginBottom: 6,
                          paddingLeft: 14,
                          position: 'relative',
                        }}>
                          <span style={{
                            position: 'absolute',
                            left: 0,
                            color: 'var(--green)',
                          }}>›</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{
        borderTop: '1px solid var(--border)',
        maxWidth: 1100,
        margin: '0 auto',
        padding: '80px 24px 100px',
      }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--green-border)',
          borderRadius: 16,
          padding: '56px 48px',
        }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--green)', letterSpacing: '0.05em', marginBottom: 12 }}>
            CONTACT
          </p>
          <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 8 }}>
            Let's build something.
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 480, marginBottom: 40, lineHeight: 1.7 }}>
            Looking for a product-focused startup where I can own features end-to-end.
            Open to full-stack, backend, or AI engineering roles. Remote only.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { icon: FaEnvelope, label: 'Email', value: 'fahadirfan007@gmail.com', href: 'mailto:fahadirfan007@gmail.com' },
              { icon: FaGithub, label: 'GitHub', value: 'Fahad-12345', href: 'https://github.com/Fahad-12345' },
              { icon: FaLinkedin, label: 'LinkedIn', value: 'View profile', href: 'https://www.linkedin.com/in/fahad-irfan-83940b162/' },
              { icon: FaWhatsapp, label: 'WhatsApp', value: '+92 311 5566699', href: 'https://wa.me/923115566699' },
            ].map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '18px 20px',
                  transition: 'border-color 0.15s, background 0.15s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--green-border)'
                  ;(e.currentTarget as HTMLAnchorElement).style.background = 'var(--green-bg)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)'
                  ;(e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.03)'
                }}
              >
                <Icon style={{ fontSize: 18, color: 'var(--green)', marginBottom: 10 }} />
                <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4, fontFamily: 'var(--mono)' }}>{label}</p>
                <p style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '24px',
        textAlign: 'center',
      }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-muted)' }}>
          Fahad Irfan · Full-Stack AI Developer · Pakistan ·{' '}
          <span style={{ color: 'var(--green)' }}>fahadirfan007@gmail.com</span>
        </p>
      </footer>

    </div>
  )
}
