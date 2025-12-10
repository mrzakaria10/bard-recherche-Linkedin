import React, { useState } from 'react';
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
}

// --- Mock Data ---
const BEST_JOBS: Job[] = [
  {
    id: '1',
    companyName: 'TechCorp Global',
    logoUrl: 'https://placehold.co/64/0077B5/white?text=TC',
    title: 'Senior Product Designer',
    location: 'Paris, France (Remote)',
    websiteUrl: 'https://example.com',
    timePosted: '2 hours ago',
    description: 'Lead the design of our next-generation enterprise platform. We are looking for a visionary designer to shape the future of our products.'
  },
  {
    id: '2',
    companyName: 'Innovate AI',
    logoUrl: 'https://placehold.co/64/0a66c2/white?text=AI',
    title: 'Frontend Engineer',
    location: 'Casablanca, Morocco',
    websiteUrl: 'https://example.com',
    timePosted: '5 hours ago',
    description: 'Join our fast-paced AI team building intuitive interfaces for machine learning models. React and TypeScript expertise required.'
  },
  {
    id: '3',
    companyName: 'FinanceFlow',
    logoUrl: 'https://placehold.co/64/313335/white?text=FF',
    title: 'Data Scientist',
    location: 'London, UK',
    websiteUrl: 'https://example.com',
    timePosted: '1 day ago',
    description: 'Analyze complex financial datasets to uncover actionable insights. Experience with Python, SQL, and predictive modeling is essential.'
  }
];

const OTHER_JOBS: Job[] = [
  {
    id: '4',
    companyName: 'StartUp Inc',
    logoUrl: 'https://placehold.co/64/e7a33e/white?text=S',
    title: 'Marketing Manager',
    location: 'New York, USA',
    websiteUrl: 'https://example.com',
    timePosted: '2 days ago',
    description: 'Drive growth and brand awareness for our innovative new product line. You will oversee digital campaigns and social media strategy.'
  },
  {
    id: '5',
    companyName: 'Green Energy',
    logoUrl: 'https://placehold.co/64/83941f/white?text=GE',
    title: 'Project Coordinator',
    location: 'Berlin, Germany',
    websiteUrl: 'https://example.com',
    timePosted: '3 days ago',
    description: 'Coordinate renewable energy projects across Europe. Requires strong organizational skills and a passion for sustainability.'
  },
  {
    id: '6',
    companyName: 'HealthPlus',
    logoUrl: 'https://placehold.co/64/dce6f1/313335?text=H+',
    title: 'UX Researcher',
    location: 'Toronto, Canada',
    websiteUrl: 'https://example.com',
    timePosted: '4 days ago',
    description: 'Conduct user research to improve patient experiences. You will work closely with product teams to translate insights into features.'
  },
  {
    id: '7',
    companyName: 'EduTech',
    logoUrl: 'https://placehold.co/64/86888A/white?text=ET',
    title: 'Content Strategist',
    location: 'Remote',
    websiteUrl: 'https://example.com',
    timePosted: '5 days ago',
    description: 'Shape the voice of our educational platform. You will create compelling content strategies that engage students and educators globally.'
  }
];

// --- Styles ---
// Using inline styles for React components to ensure containment and ease of reading
// in this specific "no-build-system" environment context, mapping to the CSS variables.

const styles = {
  header: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    height: 'var(--header-height)',
    backgroundColor: 'var(--color-bg-card)',
    borderBottom: '1px solid var(--color-border)',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: 'var(--container-width)',
    width: '100%',
    margin: '0 auto',
    gap: '24px',
  },
  logo: {
    color: 'var(--color-brand)',
    fontSize: '32px', // Icon size
    display: 'flex',
    alignItems: 'center',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--color-input-bg)',
    borderRadius: '4px',
    padding: '0 8px',
    height: '34px',
    flex: 1,
    maxWidth: '480px',
    transition: 'max-width 0.3s ease',
  },
  searchInput: {
    border: 'none',
    background: 'transparent',
    outline: 'none',
    padding: '0 8px',
    width: '100%',
    fontSize: '14px',
    color: 'var(--color-text-main)',
  },
  searchButton: {
    backgroundColor: 'var(--color-brand)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-pill)',
    padding: '6px 16px',
    fontSize: '14px',
    fontWeight: 600,
    marginLeft: '12px',
    transition: 'background-color 0.2s',
  },
  
  // Section Headers
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: 'var(--color-text-main)',
    margin: '24px 0 16px 0',
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
    backgroundColor: 'var(--color-bg-card)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)', // Premium elevation
    padding: '16px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    height: '100%',
  },
  cardOther: {
    backgroundColor: 'var(--color-bg-card-sec)', // SPECIFIC REQUIREMENT: Different color (#F0F5FA)
    borderRadius: 'var(--radius-md)',
    border: '1px solid transparent', // Cleaner look for secondary
    padding: '16px',
    display: 'flex',
    flexDirection: 'column' as const, // MATCHING STRUCTURE with cardBest
    alignItems: 'flex-start',
    height: '100%',
  },

  // Card Content
  cardHeader: {
    display: 'flex',
    gap: '12px',
    marginBottom: '12px',
    width: '100%',
  },
  companyLogo: {
    width: '56px',
    height: '56px',
    objectFit: 'cover' as const,
    borderRadius: '4px', // Square logo preference from LinkedIn
  },
  companyInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
  },
  companyName: {
    fontSize: '14px',
    fontWeight: 400,
    color: 'var(--color-text-main)',
  },
  jobTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--color-brand)', // Link color style
    marginBottom: '4px',
    lineHeight: 1.4,
    cursor: 'pointer',
  },
  jobTitleOther: {
    fontSize: '18px', // Match jobTitle size
    fontWeight: 600,
    color: 'var(--color-text-main)',
    marginBottom: '4px',
    lineHeight: 1.4,
    cursor: 'pointer',
  },
  location: {
    fontSize: '12px',
    color: 'var(--color-text-sub)',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  websiteLink: {
    fontSize: '12px',
    color: 'var(--color-brand)',
    fontWeight: 600,
    marginTop: '4px',
    textDecoration: 'none',
  },
  description: {
    fontSize: '14px',
    color: 'var(--color-text-sub)',
    margin: '12px 0',
    lineHeight: 1.5,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical' as const,
    overflow: 'hidden',
  },

  // Actions
  primaryButton: {
    backgroundColor: 'var(--color-brand)',
    color: 'white',
    width: '100%',
    padding: '8px 16px',
    borderRadius: 'var(--radius-pill)',
    fontWeight: 600,
    fontSize: '16px',
    marginTop: 'auto', // Push to bottom
    textAlign: 'center' as const,
    transition: 'background-color 0.2s',
  },
  ghostButton: {
    backgroundColor: 'transparent',
    color: 'var(--color-brand)',
    border: '1px solid var(--color-brand)',
    width: '100%', // Full width matching primary
    padding: '8px 16px',
    borderRadius: 'var(--radius-pill)',
    fontWeight: 600,
    fontSize: '16px',
    marginTop: 'auto', // Push to bottom
    textAlign: 'center' as const,
    transition: 'background-color 0.2s',
  }
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

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <div style={styles.logo} aria-label="LinkedIn Logo">
            <LinkedInLogoPlaceholder />
        </div>
        <div style={styles.searchContainer}>
          <SearchIcon />
          <input 
            type="text" 
            placeholder="Search by title, skill, or company" 
            style={styles.searchInput}
            aria-label="Search jobs"
          />
        </div>
        <button style={styles.searchButton}>Search</button>
      </div>
    </header>
  );
};

const BestJobCard: React.FC<{ job: Job }> = ({ job }) => {
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
           onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-brand-hover)'}
           onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-brand)'}
         >
           Apply Now
         </button>
      </div>
    </article>
  );
};

const OtherJobCard: React.FC<{ job: Job }> = ({ job }) => {
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
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(10, 102, 194, 0.1)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          Apply
        </button>
      </div>
    </article>
  );
};

const App = () => {
  return (
    <>
      <Header />
      <main className="container" style={{ paddingTop: '24px', paddingBottom: '48px' }}>
        
        {/* Section 1: Best Jobs */}
        <section>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
             <h2 style={styles.sectionTitle}>Top job picks for you</h2>
             <span style={{fontSize: '14px', color: 'var(--color-text-sub)'}}>Based on your profile</span>
          </div>
          <div style={styles.gridBest}>
            {BEST_JOBS.map(job => (
              <BestJobCard key={job.id} job={job} />
            ))}
          </div>
        </section>

        {/* Section 2: Other Jobs */}
        <section>
           <h2 style={styles.sectionTitle}>More jobs for you</h2>
           <div style={styles.gridOther}>
             {OTHER_JOBS.map(job => (
               <OtherJobCard key={job.id} job={job} />
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

      </main>
    </>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);