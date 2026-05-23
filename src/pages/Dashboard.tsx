import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { 
  Plus, Settings, User, Box, 
  LayoutGrid, Zap, 
  Code, Image as ImageIcon, PanelLeft,
  Sun, Moon
} from 'lucide-react';
import { PromptInput } from '../components/PromptInput';

function Dashboard() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={`app-container ${isDark ? 'dark' : ''}`}>
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <img src={isDark ? "/specs-white.svg" : "/specs-fill.svg"} alt="Specs Logo" style={{ width: '24px', height: '24px' }} />
            <span className="logo-text" style={{ fontWeight: 700 }}>Specs.</span>
          </div>
          {!isSidebarCollapsed && (
            <button className="sidebar-toggle-btn" onClick={() => setIsSidebarCollapsed(true)}>
              <PanelLeft size={20} color="var(--text-tertiary)" />
            </button>
          )}
        </div>

        <button className="new-chat-btn">
          <Plus size={18} />
          <span className="new-chat-text">New chat</span>
        </button>

        <div className="history-section">
          <div>
            <div className="history-group-title">2 days ago</div>
            <div className="history-item">Bantu menyelesaikan Tugas...</div>
            <div className="history-item">Bantu menyelesaikan Tugas...</div>
            <div className="history-item">Bantu menyelesaikan Tugas...</div>
          </div>
          <div>
            <div className="history-group-title">4 days ago</div>
            <div className="history-item">Bantu menyelesaikan Tugas...</div>
            <div className="history-item">Bantu menyelesaikan Tugas...</div>
            <div className="history-item">Bantu menyelesaikan Tugas...</div>
            <div className="history-item">Bantu menyelesaikan Tugas...</div>
            <div className="history-item">Bantu menyelesaikan Tugas...</div>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="footer-item">
            <Box size={18} />
            <span className="footer-text">Integrations</span>
          </div>
          <div className="footer-item">
            <User size={18} />
            <span className="footer-text">Account Management</span>
          </div>
          <div className="footer-item">
            <Settings size={18} />
            <span className="footer-text">Settings</span>
          </div>
          
          <button className="app-launcher-btn" onClick={() => navigate('/home')}>
            <LayoutGrid size={24} />
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className={`main-area ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <nav className="top-nav">
          <div className="nav-title-group">
            {isSidebarCollapsed && (
              <button className="sidebar-toggle-btn" onClick={() => setIsSidebarCollapsed(false)}>
                <PanelLeft size={20} color="var(--text-secondary)" />
              </button>
            )}
            <div className="nav-title">Dashboard</div>
          </div>
          <div className="nav-actions">
            <div className="user-profile">
              <img 
                src="https://ui-avatars.com/api/?name=Setiady+Anwar&background=f0f6fe&color=0b62d2" 
                alt="User Avatar" 
                className="avatar" 
              />
              <div className="user-info">
                <span className="user-name">Setiadyanwar</span>
                <span className="user-role">Owner</span>
              </div>
            </div>
            
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDark ? <Sun size={20} color="var(--text-secondary)" /> : <Moon size={20} color="var(--text-secondary)" />}
            </button>
          </div>
        </nav>

        <div className="content-center">
          <div className="hero-section">
            <div className="hero-text">
              <h1>
                Create Great Things. 
                <span className="beta-badge">Beta</span>
              </h1>
              <p>Make more assets and promise with Specs. AI</p>
            </div>
            {/* Abstract Graphic */}
            <img 
              src={isDark ? "/star-dark.svg" : "/star.svg"} 
              alt="Abstract Star" 
              className="hero-graphic" 
            />
          </div>

          <PromptInput onSearch={(query, model, type) => console.log('Search:', { query, model, type })} />

          <div className="quick-actions">
            <button className="action-chip">
              <LayoutGrid size={16} /> Create Slide
            </button>
            <button className="action-chip">
              <Zap size={16} /> Brainstorm
            </button>
            <button className="action-chip">
              <Code size={16} /> Write Code
            </button>
            <button className="action-chip">
              <ImageIcon size={16} /> Design
            </button>
            <button className="action-chip">
              More
            </button>
          </div>
        </div>

        <div className="footer-credits">
          Made with ❤️ by setiadyanwar @2026
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
