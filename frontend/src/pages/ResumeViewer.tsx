import React, { useEffect } from 'react';
import { profile } from '@/data/profile';

const ResumeViewer = () => {
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
    
    // Prevent body overflow
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-slate-900">
      <iframe 
        src={profile.resume} 
        className="w-full h-full border-none"
        title={`${profile.name} Resume`}
      />
    </div>
  );
};

export default ResumeViewer;
