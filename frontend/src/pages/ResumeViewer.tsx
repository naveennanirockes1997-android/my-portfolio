import React, { useEffect, useState } from 'react';
import { profile } from '@/data/profile';
import { getApiUrl } from '@/utils/api';

const ResumeViewer = () => {
  const [resumeUrl, setResumeUrl] = useState(profile.resume);

  useEffect(() => {
    // Set Title
    document.title = `${profile.name} - Resume`;

    // Update Favicon - ensures it uses the site favicon even on the PDF viewer page
    const existingLink = document.querySelector("link[rel~='icon']");
    if (existingLink) {
      existingLink.setAttribute('href', '/portfolio-logo.png');
    } else {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = '/portfolio-logo.png';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    
    // Fetch dynamic resume URL from API
    const fetchResume = async () => {
      try {
        const response = await fetch(getApiUrl('/api/profile'));
        if (response.ok) {
          const data = await response.json();
          if (data.resumeUrl) {
            // If it's a backend upload, use the API URL
            const finalUrl = data.resumeUrl.startsWith('/uploads') 
              ? getApiUrl(data.resumeUrl) 
              : data.resumeUrl;
            setResumeUrl(finalUrl);
          }
        }
      } catch (error) {
        console.error("Failed to fetch dynamic resume:", error);
      }
    };

    fetchResume();

    // Prevent body overflow
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-slate-900">
      <iframe 
        src={resumeUrl} 
        className="w-full h-full border-none"
        title={`${profile.name} Resume`}
      />
    </div>
  );
};

export default ResumeViewer;
