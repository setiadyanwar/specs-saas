import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, LayoutGrid, Briefcase, ChevronLeft, ChevronRight, 
  Sparkles, Code, Globe, Terminal, Database, MessageSquare, 
  Cloud, ListTodo, Bot, Palette, Image as ImageIcon,
  Search, User, Calendar, FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const PLUGINS = [
  { id: 1, title: 'Figma Plugin', desc: 'Quickest way with speca figma plugin to start your project', iconUrl: 'https://www.google.com/s2/favicons?sz=128&domain=figma.com' },
  { id: 2, title: 'Framer Code', desc: 'Sync React components directly into your Framer design system', iconUrl: 'https://www.google.com/s2/favicons?sz=128&domain=framer.com' },
  { id: 3, title: 'Webflow Sync', desc: 'Export responsive clean HTML/CSS code directly to Webflow', iconUrl: 'https://www.google.com/s2/favicons?sz=128&domain=webflow.com' },
  { id: 4, title: 'Github Deploy', desc: 'Push and deploy your static build outputs to Github pages', iconUrl: 'https://www.google.com/s2/favicons?sz=128&domain=github.com' },
  { id: 5, title: 'Notion Sync', desc: 'Keep database tables and boards fully integrated with your workspace', iconUrl: 'https://www.google.com/s2/favicons?sz=128&domain=notion.so' },
  { id: 6, title: 'Slack Hook', desc: 'Automate push alerts and active messages to chosen channels', iconUrl: 'https://www.google.com/s2/favicons?sz=128&domain=slack.com' },
  { id: 7, title: 'Vercel CDN', desc: 'Deploy preview links and serverless edge functions easily', iconUrl: 'https://www.google.com/s2/favicons?sz=128&domain=vercel.com' },
  { id: 8, title: 'Linear Tracker', desc: 'Synchronize backlog tasks, issues, and active sprint roadmaps', iconUrl: 'https://www.google.com/s2/favicons?sz=128&domain=linear.app' },
  { id: 9, title: 'Cursor AI', desc: 'Code faster using inline smart artificial intelligence completions', iconUrl: 'https://www.google.com/s2/favicons?sz=128&domain=cursor.sh' },
  { id: 10, title: 'Canva Assets', desc: 'Import customized template vectors, icons, and illustrations', iconUrl: 'https://www.google.com/s2/favicons?sz=128&domain=canva.com' },
  { id: 11, title: 'ChatGPT Assist', desc: 'Engage natural context-aware dialogs with ChatGPT model LLMs', iconUrl: 'https://www.google.com/s2/favicons?sz=128&domain=openai.com' },
  { id: 12, title: 'Midjourney Feed', desc: 'Query and download highly detailed synthetic graphic assets', iconUrl: 'https://www.google.com/s2/favicons?sz=128&domain=midjourney.com' },
];

const SPOTLIGHT_ITEMS = [
  { id: 1, type: 'app', title: 'Figma Plugin', subtitle: 'Design workspace connector', category: 'Applications', iconUrl: 'https://www.google.com/s2/favicons?sz=128&domain=figma.com' },
  { id: 2, type: 'app', title: 'Github Deploy', subtitle: 'Push code to repository', category: 'Applications', iconUrl: 'https://www.google.com/s2/favicons?sz=128&domain=github.com' },
  { id: 3, type: 'message', title: 'Send message to Trev', subtitle: 'Trevor Smith • Yesterday', category: 'Actions', icon: <MessageSquare size={16} /> },
  { id: 4, type: 'message', title: 'Melody Cheung', subtitle: 'Did you send the photoshoot assets?', category: 'Contacts', icon: <User size={16} /> },
  { id: 5, type: 'calendar', title: 'Client Meeting', subtitle: 'Today, 4:00 PM • Calendar', category: 'Help', icon: <Calendar size={16} /> },
  { id: 6, type: 'app', title: 'Slack Hook', subtitle: 'Workspace communication', category: 'Applications', iconUrl: 'https://www.google.com/s2/favicons?sz=128&domain=slack.com' },
  { id: 7, type: 'app', title: 'Cursor AI', subtitle: 'Intelligent code completions', category: 'Applications', iconUrl: 'https://www.google.com/s2/favicons?sz=128&domain=cursor.sh' },
  { id: 8, type: 'document', title: 'Specs. Documentation', subtitle: 'Markdown • 2.4 MB', category: 'Help', icon: <FileText size={16} /> },
];

const Desktop = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [time, setTime] = useState('');
  const navigate = useNavigate();

  const [showSpotlight, setShowSpotlight] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const spotlightInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);
  const wheelAccumulatorRef = useRef(0);
  const wheelCooldownRef = useRef(false);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const offset = clientX - startX;
    const totalPages = Math.ceil(PLUGINS.length / 8);
    const isAtStart = currentPage === 0 && offset > 0;
    const isAtEnd = currentPage === totalPages - 1 && offset < 0;
    if (isAtStart || isAtEnd) {
      setDragOffset(offset * 0.3); // Resistance at bounds
    } else {
      setDragOffset(offset);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 120;
    const totalPages = Math.ceil(PLUGINS.length / 8);
    
    if (dragOffset < -threshold && currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    } else if (dragOffset > threshold && currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
    
    setDragOffset(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement || 
        e.target instanceof HTMLTextAreaElement
      ) {
        if (e.key === 'Escape' && showSpotlight) {
          setShowSpotlight(false);
        }
        return;
      }
      
      if (e.key === '/') {
        e.preventDefault();
        setShowSpotlight(true);
      } else if (e.key === 'Escape') {
        setShowSpotlight(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSpotlight]);

  useEffect(() => {
    if (showSpotlight && spotlightInputRef.current) {
      spotlightInputRef.current.focus();
    } else if (!showSpotlight) {
      setSearchQuery('');
    }
  }, [showSpotlight]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleWheel = (e: WheelEvent) => {
      // Handle horizontal trackpad scrolls (2-finger swipe)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault(); // Stop standard browser forward/backward navigation gesture
        
        if (wheelCooldownRef.current) return;

        wheelAccumulatorRef.current += e.deltaX;

        const threshold = 50; // Sensitive, crisp threshold
        const totalPages = Math.ceil(PLUGINS.length / 8);

        if (Math.abs(wheelAccumulatorRef.current) > threshold) {
          wheelCooldownRef.current = true;
          
          if (wheelAccumulatorRef.current > 0 && currentPage < totalPages - 1) {
            setCurrentPage(prev => prev + 1);
          } else if (wheelAccumulatorRef.current < 0 && currentPage > 0) {
            setCurrentPage(prev => prev - 1);
          }

          // Cooldown matching transition animation
          setTimeout(() => {
            wheelCooldownRef.current = false;
            wheelAccumulatorRef.current = 0;
          }, 600);
        }
      }
    };

    viewport.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      viewport.removeEventListener('wheel', handleWheel);
    };
  }, [currentPage]);

  const filteredItems = SPOTLIGHT_ITEMS.filter(item => {
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'All' || item.category === activeTab;
    return matchesQuery && matchesTab;
  });

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ 
      backgroundColor: 'var(--black-50)', 
      height: '100vh', 
      width: '100vw', 
      padding: isFullWidth ? '0' : '8px', 
      boxSizing: 'border-box',
      transition: 'padding 0.3s ease'
    }}>
      <div className="desktop-wrapper" style={{ 
        position: 'relative', 
        height: '100%', 
        width: '100%',
        backgroundImage: 'url("/specaOS-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem 2rem',
        borderRadius: isFullWidth ? '0' : '24px',
        overflow: 'hidden',
        transition: 'border-radius 0.3s ease'
      }}>

      <div className="menu-header" style={{ zIndex: 100, position: 'relative' }}>
        <div className="logo" style={{ color: 'white', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
          <img src="/specs-white.svg" alt="Specs Logo" style={{ width: '20px', height: '20px' }} />
          Specs.
        </div>
        <div className="menu-time" style={{ 
          color: 'white', 
          position: 'absolute', 
          left: '50%', 
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          padding: '0.25rem 0.75rem',
          borderRadius: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          fontSize: '0.875rem'
        }}>
          {time}
        </div>
        <div className="nav-actions" style={{ position: 'relative' }}>
          <div className="user-profile" onClick={() => setShowProfileMenu(!showProfileMenu)} style={{ 
            background: 'rgba(255, 255, 255, 0.15)', 
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            padding: '0.25rem 0.5rem 0.25rem 0.25rem',
            borderRadius: '2rem',
            gap: '0.5rem',
            cursor: 'pointer'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="User Avatar" 
              className="avatar"
              style={{ width: '2rem', height: '2rem' }}
            />
            <div className="user-info" style={{ color: 'white', display: 'flex', flexDirection: 'column', gap: '0' }}>
              <span className="user-name" style={{ fontSize: '0.8rem', lineHeight: '1' }}>Setiadyanwar</span>
              <span className="user-role" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.65rem', textTransform: 'lowercase', marginTop: '0.1rem' }}>owner</span>
            </div>
            <div style={{
              marginLeft: '0.25rem',
              padding: '0.1rem 0.4rem',
              borderRadius: '1rem',
              border: '1px solid rgba(255,255,255,0.4)',
              fontSize: '0.6rem',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              Pro+
            </div>
          </div>

          {showProfileMenu && (
            <>
              <div 
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 40 }} 
                onClick={() => setShowProfileMenu(false)} 
              />
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 0.5rem)',
                right: 0,
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '1rem',
                padding: '0.5rem',
                minWidth: '220px',
                zIndex: 50,
                color: 'white',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                animation: 'dropdownFadeIn 0.2s ease-out',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', borderRadius: '0.5rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Full Width Mode</span>
                  <div 
                    onClick={() => setIsFullWidth(!isFullWidth)}
                    style={{
                      width: '2.5rem',
                      height: '1.25rem',
                      borderRadius: '1rem',
                      background: isFullWidth ? 'var(--blue-500)' : 'rgba(255,255,255,0.2)',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'background 0.3s'
                    }}
                  >
                    <div style={{
                      width: '1rem',
                      height: '1rem',
                      borderRadius: '50%',
                      background: 'white',
                      position: 'absolute',
                      top: '2px',
                      left: isFullWidth ? 'calc(100% - 1.125rem)' : '2px',
                      transition: 'left 0.3s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }} />
                  </div>
                </div>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0.25rem 0' }} />

                <div 
                  onClick={() => navigate('/')}
                  style={{ padding: '0.5rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.875rem', cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  Back to Specs. AI
                </div>

                <div 
                  onClick={() => {
                    setShowAboutModal(true);
                    setShowProfileMenu(false);
                  }}
                  style={{ padding: '0.5rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.875rem', cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  About Specs.
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {showMenu && (
        <>
          {/* Dark Overlay over the desktop */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(5px)',
            zIndex: 5
          }} onClick={() => setShowMenu(false)} />

          <div className="menu-content" style={{ 
            zIndex: 10, 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            padding: 0, 
            paddingBottom: '16vh', 
            position: 'relative'
          }}>
            <h2 className="menu-title" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Let's Start here</h2>
            
            {/* Sliding Viewport container */}
            <div 
              ref={viewportRef}
              onMouseDown={(e) => handleDragStart(e.clientX)}
              onMouseMove={(e) => handleDragMove(e.clientX)}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
              onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
              onTouchEnd={handleDragEnd}
              onDragStart={(e) => e.preventDefault()}
              style={{ 
                overflow: 'hidden', 
                width: '100%', 
                maxWidth: '1200px', 
                margin: '0 auto',
                position: 'relative',
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none'
              }}
            >
              {/* Sliding tray */}
              <div style={{
                display: 'flex',
                width: `${Math.ceil(PLUGINS.length / 8) * 100}%`,
                transform: `translateX(calc(-${currentPage * (100 / Math.ceil(PLUGINS.length / 8))}% + ${dragOffset}px))`,
                transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}>
                {Array.from({ length: Math.ceil(PLUGINS.length / 8) }).map((_, pageIdx) => {
                  const pageItems = PLUGINS.slice(pageIdx * 8, (pageIdx + 1) * 8);
                  return (
                    <div key={pageIdx} style={{
                      width: `${100 / Math.ceil(PLUGINS.length / 8)}%`,
                      padding: '0.5rem 2rem',
                      boxSizing: 'border-box'
                    }}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, minmax(220px, 280px))',
                        gridTemplateRows: 'repeat(2, auto)',
                        gap: '1.25rem',
                        justifyContent: 'center'
                      }}>
                        {pageItems.map((plugin) => (
                          <div className="plugin-card" key={plugin.id} onClick={() => navigate('/')}>
                            <div className="plugin-icon" style={{ backgroundColor: 'white', padding: '0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <img src={plugin.iconUrl} alt={plugin.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                            <div className="plugin-info">
                              <h3>{plugin.title}</h3>
                              <p>{plugin.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pagination dots and controls */}
            {Math.ceil(PLUGINS.length / 8) > 1 && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '1rem', 
                marginTop: '1.5rem',
                zIndex: 20
              }}>
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '2rem',
                    height: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                    opacity: currentPage === 0 ? 0.3 : 1,
                    transition: 'all 0.2s',
                    backdropFilter: 'blur(5px)'
                  }}
                >
                  <ChevronLeft size={16} />
                </button>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {Array.from({ length: Math.ceil(PLUGINS.length / 8) }).map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentPage(idx)}
                      style={{
                        width: idx === currentPage ? '1.5rem' : '0.5rem',
                        height: '0.5rem',
                        borderRadius: '0.25rem',
                        backgroundColor: idx === currentPage ? 'white' : 'rgba(255,255,255,0.3)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  ))}
                </div>

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(Math.ceil(PLUGINS.length / 8) - 1, prev + 1))}
                  disabled={currentPage === Math.ceil(PLUGINS.length / 8) - 1}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '2rem',
                    height: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    cursor: currentPage === Math.ceil(PLUGINS.length / 8) - 1 ? 'not-allowed' : 'pointer',
                    opacity: currentPage === Math.ceil(PLUGINS.length / 8) - 1 ? 0.3 : 1,
                    transition: 'all 0.2s',
                    backdropFilter: 'blur(5px)'
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </>
      )}

      <div className="dock">
        <button className="dock-item" onClick={() => setShowMenu(!showMenu)} style={{ background: showMenu ? 'var(--blue-100)' : 'white' }}>
          <LayoutGrid size={20} />
        </button>
        <button className="dock-item" onClick={() => navigate('/')} style={{ background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Specs AI">
          <img src="/specs-ai.svg" alt="Specs AI Logo" style={{ width: '26px', height: '26px' }} />
        </button>
        <button className="dock-item" style={{ background: 'transparent', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Specs Desktop">
          <img src="/specs-white.svg" alt="Specs Logo" style={{ width: '20px', height: '20px' }} />
        </button>
        <button className="dock-item" style={{ background: 'transparent', color: 'white' }}>
          <Briefcase size={20} />
        </button>
      </div>

      {showAboutModal && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: '1.5rem',
            padding: '2rem',
            width: '420px',
            maxWidth: '90%',
            color: 'white',
            position: 'relative',
            animation: 'modalScaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>
            <button 
              onClick={() => setShowAboutModal(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '2rem',
                height: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              ✕
            </button>

            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '1.25rem',
                width: '3.5rem',
                height: '3.5rem',
                marginBottom: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}>
                <img src="/specs-white.svg" alt="Specs Logo" style={{ width: '32px', height: '32px' }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 800, color: '#ffffff', display: 'block', textShadow: '0 2px 10px rgba(0, 0, 0, 0.15)' }}>Specs OS</h3>
              <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>Version 1.0.0 (Beta)</span>
            </div>

            <div style={{ fontSize: '0.9rem', lineHeight: '1.6', opacity: 0.9, textAlign: 'center', marginBottom: '2rem' }}>
              <p style={{ margin: 0 }}>
                Specs. is a revolutionary cloud SaaS workspace platform disguised as a unified desktop operating system. 
                Designed to streamline productivity, it seamlessly integrates AI assistance, design workflows, 
                custom plugins, and task automations inside a single premium browser interface.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button 
                onClick={() => setShowAboutModal(false)}
                style={{
                  background: 'var(--blue-500)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '2rem',
                  padding: '0.6rem 2.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showSpotlight && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.01)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '15vh',
            zIndex: 1100
          }}
          onClick={() => setShowSpotlight(false)}
        >
          <div 
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(30px) saturate(180%)',
              WebkitBackdropFilter: 'blur(30px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '1.25rem',
              width: '600px',
              maxWidth: '90%',
              height: 'fit-content',
              maxHeight: '420px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              animation: 'modalScaleIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <Search size={22} style={{ color: 'rgba(255, 255, 255, 0.8)', marginRight: '1rem' }} />
              <input 
                ref={spotlightInputRef}
                type="text"
                className="spotlight-input"
                placeholder="Search anything, actions, or contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.25rem',
                  outline: 'none',
                  width: '100%',
                  fontWeight: 400
                }}
              />
            </div>

            <div style={{
              display: 'flex',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              {['All', 'Applications', 'Actions', 'Contacts', 'Help'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: activeTab === tab ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '2rem',
                    padding: '0 1.1rem',
                    height: '2rem',
                    color: activeTab === tab ? 'white' : 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontWeight: 500,
                    lineHeight: 1
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div 
              className="spotlight-results"
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '0.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem'
              }}
            >
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => {
                      if (item.type === 'app') {
                        navigate('/');
                      } else {
                        alert(`Executing: ${item.title}`);
                      }
                      setShowSpotlight(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.75rem',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                      color: 'white'
                    }}
                    className="spotlight-row"
                  >
                    <div style={{
                      width: '2.25rem',
                      height: '2.25rem',
                      borderRadius: '0.5rem',
                      background: item.iconUrl ? 'white' : 'rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1rem',
                      padding: item.iconUrl ? '0.3rem' : 0,
                      boxSizing: 'border-box'
                    }}>
                      {item.iconUrl ? (
                        <img src={item.iconUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      ) : (
                        item.icon
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'white' }}>{item.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.65)', marginTop: '2px' }}>{item.subtitle}</div>
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      color: 'rgba(255, 255, 255, 0.9)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem'
                    }}>
                      {item.category}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{
                  padding: '2rem',
                  textAlign: 'center',
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '0.9rem'
                }}>
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Desktop;
