import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import profileImage from '/public/assets/profile.png'
import cvImage from '/public/assets/CV.png'

// Import images
import frame142 from './images/Frame-142.png';
import frame143 from './images/Frame-143.png';
import havahills from './images/HAVAHILLS-ESTATE.png';
import highgrove from './images/HIGHGROVE.png';
import livingWater from './images/LIVING-WATER.png';
import lws from './images/LWS.png';
import luxuryFinish from './images/Luxury-Finish.png';
import marketingLws from './images/MARKETING-POST-LWS.png';
import pleromaBare from './images/PLEROMA--Bare-Finish.png';
import pleromaStandard from './images/PLEROMA--Standard-Finish.png';
import simplicity from './images/SIMPLICITY.png';
import serenity from './images/Serenity.png';
import serenityComp from './images/Serenity-Sample-Computation.png';
import simplicityComp from './images/Simplicity---Sample-Computation.png';
import waivedFee from './images/WAIVED-MISC.-FEE.png';
import frontPoster from './images/fRONT-POSTER.png';

function App() {
  const containerRef = useRef(null)
  const cursorDotRef = useRef(null)
  const cursorCrosshairRef = useRef(null)
  const cursorLinesRef = useRef(null)
  const cursorCoordsRef = useRef(null)
  const designGridRef = useRef(null);
  const [hoveredLink, setHoveredLink] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [currentRole, setCurrentRole] = useState(0)
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHoveringGrid, setIsHoveringGrid] = useState(false);

  const roles = [
    "Creative Designer",
    "Full Stack Dev",
    "UI/UX Designer",
    "Video Editor",
    "Photographer"
  ]

  useEffect(() => {
    // Preload design work images
    designWorks.forEach(design => {
      const img = new Image();
      img.src = design.image;
    });
  }, []);

  // Handle cursor movement and interaction
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      setCursorPosition({ x: clientX, y: clientY })

      const transformValue = `translate(${clientX}px, ${clientY}px)`

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = transformValue
        if (hoveredLink) {
          cursorDotRef.current.style.width = '8px'
          cursorDotRef.current.style.height = '8px'
        } else {
          cursorDotRef.current.style.width = '4px'
          cursorDotRef.current.style.height = '4px'
        }
      }

      if (cursorCrosshairRef.current) {
        cursorCrosshairRef.current.style.transform = transformValue
      }

      if (cursorLinesRef.current) {
        cursorLinesRef.current.style.setProperty('--x', `${clientX}px`)
        cursorLinesRef.current.style.setProperty('--y', `${clientY}px`)
      }

      if (cursorCoordsRef.current) {
        cursorCoordsRef.current.style.transform = transformValue
        cursorCoordsRef.current.textContent = `${clientX}, ${clientY}`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [hoveredLink])

  // Handle horizontal scrolling with wheel
  useEffect(() => {
    const container = containerRef.current
    let scrolling = false
    let lastScrollTime = Date.now()
    
    const handleWheel = (e) => {
      if (container) {
        e.preventDefault()
        
        const now = Date.now()
        const timeDiff = now - lastScrollTime
        
        // Adjust scroll speed and smoothness
        const scrollSpeed = 2.5
        const delta = Math.abs(e.deltaY) < Math.abs(e.deltaX) ? e.deltaX : e.deltaY
        const targetScroll = container.scrollLeft + (delta * scrollSpeed)
        
        // Apply smooth scrolling with easing
        if (!scrolling && timeDiff > 50) {
          scrolling = true
          lastScrollTime = now
          
          container.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
          })
          
          setTimeout(() => {
            scrolling = false
          }, 50)
        }
      }
    }

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
      if (container && !scrolling) {
        const scrollAmount = window.innerWidth
        let targetScroll = container.scrollLeft
        
        switch (e.key) {
          case 'ArrowRight':
            targetScroll += scrollAmount
            break
          case 'ArrowLeft':
            targetScroll -= scrollAmount
            break
          default:
            return
        }
        
        scrolling = true
        container.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        })
        
        setTimeout(() => {
          scrolling = false
        }, 500)
      }
    }

    if (container) {
      document.addEventListener('wheel', (e) => e.preventDefault(), { passive: false })
      container.addEventListener('wheel', handleWheel, { passive: false })
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      if (container) {
        document.removeEventListener('wheel', (e) => e.preventDefault())
        container.removeEventListener('wheel', handleWheel)
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [])

  // Handle role rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleInfiniteScroll = () => {
      const container = designGridRef.current;
      if (!container) return;

      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 100) {
        // When near bottom, scroll back to top smoothly
        container.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    };

    const container = designGridRef.current;
    if (container) {
      container.addEventListener('scroll', handleInfiniteScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleInfiniteScroll);
      }
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      if (isHoveringGrid && designGridRef.current) {
        e.preventDefault();
        designGridRef.current.scrollTop += e.deltaY;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isHoveringGrid]);

  // Development Projects data
  const devProjects = [
    {
      title: "E-Commerce Platform",
      description: "A modern shopping experience with React, Node.js, and Stripe integration. Features real-time inventory and seamless checkout.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      tags: ["React", "Node.js", "Stripe", "MongoDB"],
      type: "Web App"
    },
    {
      title: "AI Analytics Dashboard",
      description: "Real-time analytics platform powered by machine learning algorithms. Visualizes complex data patterns with interactive charts.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      tags: ["Python", "TensorFlow", "D3.js", "Flask"],
      type: "Web App"
    },
    {
      title: "Fitness Tracker",
      description: "Cross-platform fitness tracking application built with React Native. Features workout planning and progress tracking.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      tags: ["React Native", "Firebase", "Redux"],
      type: "Mobile App"
    },
    {
      title: "Food Delivery App",
      description: "Mobile application for food ordering and delivery tracking with real-time updates and payment integration.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      tags: ["Flutter", "Firebase", "Google Maps"],
      type: "Mobile App"
    }
  ]

  // Design Works data
  const designWorks = [
    {
      title: "Frame 142",
      type: "Marketing Design",
      image: frame142
    },
    {
      title: "Frame 143",
      type: "Marketing Design",
      image: frame143
    },
    {
      title: "Havahills Estate",
      type: "Real Estate Marketing",
      image: havahills
    },
    {
      title: "Highgrove",
      type: "Real Estate Marketing",
      image: highgrove
    },
    {
      title: "Living Water",
      type: "Real Estate Marketing",
      image: livingWater
    },
    {
      title: "Living Water Services",
      type: "Marketing Post",
      image: lws
    },
    {
      title: "Luxury Finish",
      type: "Real Estate Marketing",
      image: luxuryFinish
    },
    {
      title: "LWS Marketing",
      type: "Social Media",
      image: marketingLws
    },
    {
      title: "Pleroma - Bare Finish",
      type: "Real Estate Marketing",
      image: pleromaBare
    },
    {
      title: "Pleroma - Standard Finish",
      type: "Real Estate Marketing",
      image: pleromaStandard
    },
    {
      title: "Simplicity",
      type: "Real Estate Marketing",
      image: simplicity
    },
    {
      title: "Serenity",
      type: "Real Estate Marketing",
      image: serenity
    },
    {
      title: "Serenity Computation",
      type: "Marketing Material",
      image: serenityComp
    },
    {
      title: "Simplicity Computation",
      type: "Marketing Material",
      image: simplicityComp
    },
    {
      title: "Waived Misc Fee",
      type: "Marketing Material",
      image: waivedFee
    },
    {
      title: "Front Poster",
      type: "Marketing Material",
      image: frontPoster
    }
  ]

  return (
    <div className="bg-black">
      {/* Enhanced Background */}
      <div className="grid-background" />
      <div className="background-gradient" />
      <div className="floating-circle" />
      <div className="floating-circle" />

      {/* Custom Cursor */}
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorCrosshairRef} className="cursor-crosshair" />
      <div ref={cursorLinesRef} className="cursor-lines" />
      <div ref={cursorCoordsRef} className="cursor-coordinates">
        <span>X: {cursorPosition.x}</span>
        <span>Y: {cursorPosition.y}</span>
      </div>

      {/* Edge Details */}
      <div className="edge-details edge-top-left">
        <div className="edge-dot"></div>
        <div className="edge-line"></div>
        <div className="edge-coordinates">
          <span>X:</span>{cursorPosition.x}
          <span>Y:</span>{cursorPosition.y}
        </div>
      </div>

      <div className="edge-details edge-top-right">
        <div className="edge-line"></div>
        <div>Design + Development</div>
      </div>

      <div className="edge-details edge-bottom-left">
        <div className="edge-dot"></div>
        <div className="edge-line"></div>
        <div>Portfolio 2024</div>
      </div>

      <div className="edge-details edge-bottom-right">
        <div className="edge-line"></div>
        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll / Drag
        </motion.div>
      </div>

      {/* Main Content */}
      <div ref={containerRef} className="horizontal-container">
        <div className="horizontal-scroll">
          {/* Hero Section */}
          <section className="scroll-section">
            <div className="section-content">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              >
                <motion.span
                  className="text-2xl font-light opacity-60 mb-4 block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Gabriel Enciso
                </motion.span>
                <h1 className="heading-xl static-text">
                  Hello,
                  <br />
                  I'm a
                </h1>
                <div className="animated-text-container">
                  {roles.map((role, index) => (
                    <motion.h1
                      key={role}
                      className={`heading-xl animated-text ${index === currentRole ? 'text-animate-up' : ''}`}
                      initial={false}
                    >
                      {role}
                    </motion.h1>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* About Section */}
          <section className="scroll-section">
            <div className="section-content">
              <motion.h2 
                className="heading-lg mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                About
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-2xl"
              >
                <p>
                I'm a Full-stack Developer and Graphic/UI designer with a passion for crafting seamless, visually stunning, and user-friendly digital experiences. Combining my expertise in both development and design, I deliver solutions that balance functionality and aesthetics.
                </p><br/>
                <p>
                Currently building dynamic web applications, enhancing user interfaces, and exploring the intersection of creative design and emerging web technologies.
                </p>
                <div className="skills-list">
                  <ul>
                    <li>HTML & CSS</li>
                    <li>Javascript(ES6+)</li>
                    <li>Node.js</li>
                    <li>Tailwind CSS</li>
                    <li>React</li>
                    <li>Vite</li>
                    <li>Vue</li>
                    <li>Firebase</li>
                    <li>Supabase</li>
                    <li>Mongo DB</li>
                  </ul>
                  <ul>
                    <li>Photoshop</li>
                    <li>Illustrator</li>
                    <li>Figma</li>
                    <li>Premiere Pro</li>
                    <li>After Effects</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Development Projects Section */}
          <section className="scroll-section">
            <div className="section-content">
              <motion.h2 
                className="heading-lg side-title"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Applications
                <br />
                Web & Mobile
              </motion.h2>
              <div className="projects-grid">
                {devProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    className="project-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredLink(true)}
                    onMouseLeave={() => setHoveredLink(false)}
                  >
                    <img src={project.image} alt={project.title} />
                    <div className="project-info">
                      <span className="text-xs text-blue-400 mb-1">{project.type}</span>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="text-xs px-2 py-1 rounded-full border border-white/10 bg-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Design Section */}
          <section className="scroll-section">
            <div className="section-content">
              <h2 className="text-3xl font-bold mb-8">Graphic Design Projects</h2>
              <div className="design-grid-container">
                <div className="design-grid">
                  {[...designWorks, ...designWorks].map((design, index) => (
                    <motion.div
                      key={`design-${index}`}
                      className="design-card"
                      initial={{ opacity: 1, y: 0 }}
                      onMouseEnter={() => setHoveredLink(true)}
                      onMouseLeave={() => setHoveredLink(false)}
                    >
                      <img 
                        src={design.image} 
                        alt={design.title}
                        loading="eager"
                      />
                      <div className="design-overlay">
                        <span className="text-xs text-blue-400 mb-1">{design.type}</span>
                        <h3>{design.title}</h3>
                        <p>{design.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="scroll-section">
            <div className="section-content">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <motion.div 
                  className="profile-container"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.img 
                  src={profileImage}
                  alt="Gabriel Enciso"
                  className="profile-image"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                  <div className="profile-border" />
                </motion.div>

                <motion.h2
                  className="heading-lg mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Let's Connect
                </motion.h2>
                <p className="text-lg opacity-70 max-w-xl">
                  Feel free to reach out for collaborations, opportunities, or just a friendly chat.
                </p>
                <div className="flex items-center gap-6 mt-4">
                  <motion.a
                    href="https://www.facebook.com/Gabriyel.Enciso/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-link text-lg"
                    onMouseEnter={() => setHoveredLink(true)}
                    onMouseLeave={() => setHoveredLink(false)}
                    whileHover={{ y: -2 }}
                  >
                    Facebook
                  </motion.a>
                  <motion.a
                    href="https://www.instagram.com/maybe.gab/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-link text-lg"
                    onMouseEnter={() => setHoveredLink(true)}
                    onMouseLeave={() => setHoveredLink(false)}
                    whileHover={{ y: -2 }}
                  >
                    Instagram
                  </motion.a>
                  <motion.a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=gabenciso119@gmail.com&su=Web app development / Graphic Design"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-link text-lg"
                    onMouseEnter={() => setHoveredLink(true)}
                    onMouseLeave={() => setHoveredLink(false)}
                    whileHover={{ y: -2 }}
                  >
                    Gmail
                  </motion.a>
                  <motion.a
                    href={cvImage}
                    download="Gabriel_Enciso_CV.png"
                    className="download-cv"
                    onMouseEnter={() => setHoveredLink(true)}
                    onMouseLeave={() => setHoveredLink(false)}
                    whileHover={{ y: -2 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    CV
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default App
