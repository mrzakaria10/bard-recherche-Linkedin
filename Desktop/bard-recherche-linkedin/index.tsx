import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// --- Types ---
interface Job {
  id: string;
  companyName: string;
  logoUrl: string;
  title: string;
  location: string;
  websiteUrl: string;
  timePosted: string;
  description: string;
  companyDescription?: string;
}

interface ApiJobData {
  title: string;
  companyName: string;
  companyLinkedinUrl: string;
  companyLogo: string;
  location: string;
  descriptionText: string;
  jobFunction: string;
  companyWebsite: string;
  companyDescription: string;
}

type Theme = 'light' | 'dark';

interface ThemeColors {
  headerGradient: string;
  headerGradient2: string;
  headerText: string;
  headerSubtext: string;
  bgMain: string;
  bgCard: string;
  bgCardSecondary: string;
  textMain: string;
  textSub: string;
  brandColor: string;
  borderColor: string;
  shadowColor: string;
}

const themeColors: Record<Theme, ThemeColors> = {
  light: {
    headerGradient: '#0077B5',
    headerGradient2: '#00A0DF',
    headerText: 'white',
    headerSubtext: 'rgba(255, 255, 255, 0.9)',
    bgMain: '#FFFFFF',
    bgCard: 'white',
    bgCardSecondary: '#F8FAFC',
    textMain: '#1F2937',
    textSub: '#6B7280',
    brandColor: '#0077B5',
    borderColor: '#E5E7EB',
    shadowColor: 'rgba(0, 0, 0, 0.08)',
  },
  dark: {
    headerGradient: '#1A1F2E',
    headerGradient2: '#2D3748',
    headerText: 'white',
    headerSubtext: 'rgba(255, 255, 255, 0.8)',
    bgMain: '#0F1419',
    bgCard: '#1A1F2E',
    bgCardSecondary: '#252D3D',
    textMain: '#F3F4F6',
    textSub: '#D1D5DB',
    brandColor: '#60A5FA',
    borderColor: '#374151',
    shadowColor: 'rgba(0, 0, 0, 0.4)',
  }
};

// --- Styles ---
// Using inline styles for React components to ensure containment and ease of reading
// in this specific "no-build-system" environment context, mapping to the CSS variables.

const getStyles = (theme: Theme) => {
  const colors = themeColors[theme];
  return {
  header: {
    position: 'relative' as const,
    width: '100%',
    background: `linear-gradient(135deg, ${colors.headerGradient} 0%, ${colors.headerGradient2} 100%)`,
    padding: '40px 24px',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 4px 20px ${colors.shadowColor}`,
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    width: '100%',
    gap: '20px',
  },
  logo: {
    color: colors.headerText,
    fontSize: '32px',
    display: 'flex',
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.headerText,
    fontSize: '28px',
    fontWeight: 700,
    margin: '0',
    textAlign: 'center' as const,
  },
  headerSubtitle: {
    color: colors.headerSubtext,
    fontSize: '14px',
    margin: '0',
  },
  themeToggle: {
    position: 'absolute' as const,
    top: '16px',
    right: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: '2px solid rgba(255, 255, 255, 0.4)',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    fontSize: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.bgCard,
    borderRadius: '50px',
    padding: '0 20px',
    height: '56px',
    width: '100%',
    maxWidth: '600px',
    transition: 'all 0.3s ease',
    boxShadow: `0 8px 24px ${colors.shadowColor}`,
  },
  searchInput: {
    border: 'none',
    background: 'transparent',
    outline: 'none',
    padding: '0 12px',
    width: '100%',
    fontSize: '16px',
    color: colors.textMain,
  },
  searchButton: {
    backgroundColor: colors.brandColor,
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    padding: '10px 24px',
    fontSize: '15px',
    fontWeight: 600,
    marginLeft: '8px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  
  // Section Headers
  sectionTitle: {
    fontSize: '26px',
    fontWeight: 700,
    color: colors.textMain,
    margin: '32px 0 20px 0',
  },
  
  // Grid Layouts
  gridBest: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  },
  gridOther: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
  },

  // Cards
  cardBest: {
    backgroundColor: colors.bgCard,
    borderRadius: '12px',
    border: `1px solid ${colors.borderColor}`,
    boxShadow: `0 2px 8px ${colors.shadowColor}`,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    height: '100%',
    cursor: 'pointer',
  },
  cardOther: {
    backgroundColor: colors.bgCardSecondary,
    borderRadius: '12px',
    border: `1px solid ${colors.borderColor}`,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    height: '100%',
    cursor: 'pointer',
  },

  // Card Content
  cardHeader: {
    display: 'flex',
    gap: '16px',
    marginBottom: '16px',
    width: '100%',
  },
  companyLogo: {
    width: '64px',
    height: '64px',
    objectFit: 'cover' as const,
    borderRadius: '8px',
  },
  companyInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
  },
  companyName: {
    fontSize: '13px',
    fontWeight: 500,
    color: colors.textSub,
  },
  jobTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: colors.brandColor,
    marginBottom: '2px',
    lineHeight: 1.3,
    cursor: 'pointer',
  },
  jobTitleOther: {
    fontSize: '18px',
    fontWeight: 700,
    color: colors.textMain,
    marginBottom: '2px',
    lineHeight: 1.3,
    cursor: 'pointer',
  },
  location: {
    fontSize: '13px',
    color: colors.textSub,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  websiteLink: {
    fontSize: '13px',
    color: colors.brandColor,
    fontWeight: 600,
    marginTop: '6px',
    textDecoration: 'none',
  },
  description: {
    fontSize: '14px',
    color: colors.textSub,
    margin: '16px 0',
    lineHeight: 1.6,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical' as const,
    overflow: 'hidden',
  },

  // Actions
  primaryButton: {
    backgroundColor: colors.brandColor,
    color: 'white',
    width: '100%',
    padding: '12px 16px',
    borderRadius: '25px',
    fontWeight: 600,
    fontSize: '16px',
    marginTop: 'auto',
    textAlign: 'center' as const,
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    boxShadow: `0 4px 12px ${colors.shadowColor}`,
  },
  ghostButton: {
    backgroundColor: 'transparent',
    color: colors.brandColor,
    border: `2px solid ${colors.brandColor}`,
    width: '100%',
    padding: '10px 16px',
    borderRadius: '25px',
    fontWeight: 600,
    fontSize: '16px',
    marginTop: 'auto',
    textAlign: 'center' as const,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  }
  };
};

// --- Icons ---
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="24px" height="24px" fill="currentColor" style={{color: 'var(--color-text-sub)'}}>
    <path d="M21.41 18.59l-5.27-5.27a8.5 8.5 0 1 0-1.41 1.41l5.27 5.27a1 1 0 0 0 1.41-1.41zM5 10a5 5 0 1 1 5 5 5 5 0 0 1-5-5z"></path>
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style={{opacity: 0.6}}>
    <path d="M8 1a5 5 0 0 0-5 5c0 3.75 5 10 5 10s5-6.25 5-10a5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3z"/>
  </svg>
);

const LinkedInLogoPlaceholder = () => (
   <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="var(--color-brand)">
    <title>LinkedIn</title>
    <g>
      <path d="M34,2.5v29A2.5,2.5,0,0,1,31.5,34H2.5A2.5,2.5,0,0,1,0,31.5V2.5A2.5,2.5,0,0,1,2.5,0h29A2.5,2.5,0,0,1,34,2.5ZM10,13H5V29h5Zm.45-5.5A2.88,2.88,0,0,0,7.59,4.6H7.5a2.9,2.9,0,0,0,0,5.8h0a2.88,2.88,0,0,0,2.95-2.81ZM29,19.28c0-4.81-3.06-6.68-6.1-6.68a5.7,5.7,0,0,0-5.06,2.58H17.7V13H13V29h5V20.49a3.32,3.32,0,0,1,3-3.58h.19c1.59,0,2.77,1.1,2.77,3.52V29h5Z" fill="currentColor"></path>
    </g>
  </svg>
);

// --- Components ---

const Header: React.FC<{ onSearch: (query: string) => void; theme: Theme; onThemeToggle: () => void }> = ({ onSearch, theme, onThemeToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const styles = getStyles(theme);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header style={styles.header}>
      <button 
        style={styles.themeToggle}
        onClick={onThemeToggle}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      <div style={styles.headerContent}>
        <div style={styles.logo} aria-label="LinkedIn Logo">
            <LinkedInLogoPlaceholder />
        </div>
        <h1 style={styles.headerTitle}>Find Your Dream Job</h1>
        <p style={styles.headerSubtitle}>Discover opportunities tailored to you</p>
        <div style={styles.searchContainer}>
          <SearchIcon />
          <input 
            type="text" 
            placeholder="Search by title, skill, or company" 
            style={styles.searchInput}
            aria-label="Search jobs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            style={styles.searchButton}
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </header>
  );
};

const SuccessModal: React.FC<{ modal: ModalState; onClose: () => void; theme: Theme }> = ({ modal, onClose, theme }) => {
  if (!modal.isOpen) return null;

  const colors = themeColors[theme];
  const modalStyles = {
    overlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modal: {
      backgroundColor: colors.bgCard,
      borderRadius: '12px',
      padding: '32px',
      maxWidth: '500px',
      boxShadow: `0 10px 40px ${colors.shadowColor}`,
      textAlign: 'center' as const,
      animation: 'slideUp 0.3s ease-out',
    },
    title: {
      fontSize: '24px',
      fontWeight: 600,
      color: colors.brandColor,
      marginBottom: '16px',
    },
    message: {
      fontSize: '16px',
      color: colors.textMain,
      lineHeight: 1.6,
      marginBottom: '24px',
      minHeight: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: colors.brandColor,
      color: 'white',
      border: 'none',
      borderRadius: '24px',
      padding: '12px 32px',
      fontSize: '16px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    loadingText: {
      fontSize: '14px',
      color: colors.textSub,
      fontStyle: 'italic',
    }
  };

  return (
    <div style={modalStyles.overlay}>
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div style={modalStyles.modal}>
        <h2 style={modalStyles.title}>
          {modal.isGenerating ? '⏳ Processing...' : '✅ Success!'}
        </h2>
        <div style={modalStyles.message}>
          {modal.isGenerating ? (
            <span style={modalStyles.loadingText}>{modal.message}</span>
          ) : (
            <p>{modal.message}</p>
          )}
        </div>
        {!modal.isGenerating && (
          <button
            style={modalStyles.button}
            onClick={onClose}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = `${colors.brandColor}dd`}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = colors.brandColor}
          >
            OK
          </button>
        )}
      </div>
    </div>
  );
};

const BestJobCard: React.FC<{ job: Job; onApply: (job: Job) => void; theme: Theme }> = ({ job, onApply, theme }) => {
  const styles = getStyles(theme);
  return (
    <article style={styles.cardBest}>
      <div style={styles.cardHeader}>
        <img src={job.logoUrl} alt={`${job.companyName} logo`} style={styles.companyLogo} />
        <div style={styles.companyInfo}>
          <h3 style={styles.jobTitle}>{job.title}</h3>
          <span style={styles.companyName}>{job.companyName}</span>
        </div>
      </div>
      
      <div>
         <div style={styles.location}>
          <PinIcon />
          {job.location}
        </div>
        <a href={job.websiteUrl} style={styles.websiteLink} target="_blank" rel="noopener noreferrer">
          Visit Website
        </a>
      </div>

      <p style={styles.description}>
        {job.description}
      </p>

      <div style={{marginTop: 'auto', width: '100%'}}>
         <button 
           style={styles.primaryButton}
           onClick={() => onApply(job)}
           onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-brand-hover)'}
           onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-brand)'}
         >
           Apply Now
         </button>
      </div>
    </article>
  );
};

const OtherJobCard: React.FC<{ job: Job; onApply: (job: Job) => void; theme: Theme }> = ({ job, onApply, theme }) => {
  const styles = getStyles(theme);
  return (
    <article style={styles.cardOther}>
      <div style={styles.cardHeader}>
         <img src={job.logoUrl} alt={`${job.companyName} logo`} style={styles.companyLogo} />
         <div style={styles.companyInfo}>
            <h3 style={styles.jobTitleOther}>{job.title}</h3>
            <span style={styles.companyName}>{job.companyName}</span>
         </div>
      </div>
      
      <div>
        <div style={styles.location}>
            <PinIcon />
            {job.location} • {job.timePosted}
        </div>
        <a href={job.websiteUrl} style={styles.websiteLink} target="_blank" rel="noopener noreferrer">
            Visit Website
        </a>
      </div>

      <p style={styles.description}>
        {job.description}
      </p>

      <div style={{marginTop: 'auto', width: '100%'}}>
        <button 
          style={styles.ghostButton}
          onClick={() => onApply(job)}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(10, 102, 194, 0.1)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          Apply
        </button>
      </div>
    </article>
  );
};

interface ModalState {
  isOpen: boolean;
  title: string;
  message: string;
  isGenerating: boolean;
}

const App = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [bestJobs, setBestJobs] = useState<Job[]>([]);
  const [otherJobs, setOtherJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    title: '',
    message: '',
    isGenerating: false
  });

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const styles = getStyles(theme);

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const convertApiJobToJob = (apiJob: ApiJobData, index: number): Job => {
    return {
      id: `${index}-${Date.now()}`,
      companyName: apiJob.companyName,
      logoUrl: apiJob.companyLogo,
      title: apiJob.title,
      location: apiJob.location,
      websiteUrl: apiJob.companyWebsite,
      timePosted: 'Just now',
      description: apiJob.descriptionText,
      companyDescription: apiJob.companyDescription,
    };
  };

  const generateAIMessage = async (jobTitle: string, companyName: string): Promise<string> => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return `Congratulations! Your application for ${jobTitle} at ${companyName} has been submitted successfully. We'll review your profile and get back to you soon.`;
      }

      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate a professional and encouraging email message for a job application. The job title is "${jobTitle}" at company "${companyName}". 
              
              The message should:
              - Be warm and professional
              - Congratulate on submitting the application
              - Mention the specific job title
              - Express enthusiasm about the opportunity
              - Be 2-3 sentences maximum
              
              Return only the message text, no subject line or extra formatting.`
            }]
          }]
        })
      });

      if (!response.ok) {
        return `Great! Your application for ${jobTitle} at ${companyName} has been submitted successfully. Our team will review it and contact you soon.`;
      }

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      return generatedText || `Your application for ${jobTitle} at ${companyName} has been submitted successfully!`;
    } catch (err) {
      return `Congratulations! Your application for ${jobTitle} at ${companyName} has been submitted successfully. We'll review your profile and get back to you soon.`;
    }
  };

  const handleApply = async (job: Job) => {
    try {
      // Show modal with generating state
      setModal({
        isOpen: true,
        title: job.title,
        message: 'Generating your confirmation message...',
        isGenerating: true
      });

      // Submit application to n8n
      const response = await fetch('http://localhost:5678/webhook-test/c918d23e-9d13-4667-bc41-f23317018908', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: job.title,
          companyName: job.companyName,
          companyDescription: job.companyDescription || '',
          location: job.location,
          descriptionText: job.description,
        }),
      });

      if (!response.ok) {
        throw new Error(`Application submission failed`);
      }

      // Generate AI message
      const aiMessage = await generateAIMessage(job.title, job.companyName);

      // Update modal with AI-generated message
      setModal({
        isOpen: true,
        title: `✨ ${job.title}`,
        message: aiMessage,
        isGenerating: false
      });
    } catch (err) {
      setModal({
        isOpen: true,
        title: 'Application Submitted',
        message: `Your application for ${job.title} at ${job.companyName} has been submitted successfully!`,
        isGenerating: false
      });
    }
  };

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5678/webhook-test/670ed34a-1626-4135-b89a-25b47fb52571', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const jobsArray = Array.isArray(data) ? data : data.data || [];

      if (jobsArray.length === 0) {
        setError('No jobs found. Please try again.');
        setBestJobs([]);
        setOtherJobs([]);
        return;
      }

      // Convert API data to Job format
      const convertedJobs = jobsArray.map((apiJob: ApiJobData, index: number) =>
        convertApiJobToJob(apiJob, index)
      );

      // Split jobs into best and other
      if (convertedJobs.length > 0) {
        setBestJobs(convertedJobs.slice(0, 3));
        setOtherJobs(convertedJobs.slice(3));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching jobs');
      setBestJobs([]);
      setOtherJobs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: styles.bgMain, color: styles.textMain, minHeight: '100vh', transition: 'background-color 0.3s ease, color 0.3s ease' }}>
      <Header onSearch={handleSearch} theme={theme} onThemeToggle={handleThemeToggle} />
      <SuccessModal 
        modal={modal} 
        onClose={() => setModal({ ...modal, isOpen: false })}
        theme={theme}
      />
      <main className="container" style={{ paddingTop: '0px', paddingBottom: '48px', padding: '40px 24px' }}>
        
        {loading && (
          <div style={{textAlign: 'center', padding: '32px', fontSize: '16px', color: styles.textSub}}>
            Loading jobs...
          </div>
        )}

        {error && (
          <div style={{
            padding: '16px',
            marginBottom: '24px',
            backgroundColor: '#fee',
            borderLeft: '4px solid #f55',
            color: '#c33',
            borderRadius: '4px'
          }}>
            {error}
          </div>
        )}

        {!loading && bestJobs.length > 0 && (
          <>
            {/* Section 1: Best Jobs */}
            <section>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                 <h2 style={styles.sectionTitle}>Top job picks for you</h2>
                 <span style={{fontSize: '14px', color: 'var(--color-text-sub)'}}>Based on your profile</span>
              </div>
              <div style={styles.gridBest}>
                {bestJobs.map(job => (
                  <BestJobCard key={job.id} job={job} onApply={handleApply} theme={theme} />
                ))}
              </div>
            </section>

            {/* Section 2: Other Jobs */}
            {otherJobs.length > 0 && (
              <section>
                 <h2 style={styles.sectionTitle}>More jobs for you</h2>
                 <div style={styles.gridOther}>
                   {otherJobs.map(job => (
                     <OtherJobCard key={job.id} job={job} onApply={handleApply} theme={theme} />
                   ))}
                 </div>
                 
                 <div style={{textAlign: 'center', marginTop: '24px'}}>
                   <button style={{
                     ...styles.ghostButton, 
                     border: '1px solid var(--color-text-sub)', 
                     color: 'var(--color-text-sub)',
                     padding: '8px 24px',
                     width: 'auto',
                     marginTop: '0'
                   }}>
                     Show more results
                   </button>
                 </div>
              </section>
            )}
          </>
        )}

        {!loading && bestJobs.length === 0 && !error && (
          <div style={{textAlign: 'center', padding: '64px 24px', color: styles.textSub}}>
            <p style={{fontSize: '18px', marginBottom: '12px'}}>👔 Ready to find your next opportunity?</p>
            <p>Use the search bar above to explore job listings</p>
          </div>
        )}

      </main>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);