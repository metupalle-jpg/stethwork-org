/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useRef } from 'react';

function Icon({ name, className = 'w-5 h-5' }: { name: string; className?: string }) {
  if (name === 'home') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={`${className} stroke-current`} strokeWidth="2">
        <path d="M3 10.5L12 3l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 9.5V20h14V9.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return null;
}

function hideSocialButtons(iframeEl: HTMLIFrameElement) {
  try {
    const doc = iframeEl.contentDocument || iframeEl.contentWindow?.document;
    if (!doc) return;
    const style = doc.createElement('style');
    style.textContent = `
      button[class*="facebook"], button[class*="Facebook"],
      button[class*="linkedin"], button[class*="LinkedIn"],
      a[class*="facebook"], a[class*="Facebook"],
      a[class*="linkedin"], a[class*="LinkedIn"],
      [data-provider="facebook"], [data-provider="linkedin"],
      .social-login-facebook, .social-login-linkedin,
      button:has(svg[data-testid*="facebook"]), button:has(svg[data-testid*="linkedin"]) {
        display: none !important;
      }
    `;
    doc.head.appendChild(style);
    const allButtons = doc.querySelectorAll('button, a');
    allButtons.forEach((btn: Element) => {
      const text = btn.textContent?.toLowerCase() || '';
      if (text.includes('facebook') || text.includes('linkedin')) {
        (btn as HTMLElement).style.display = 'none';
      }
    });
  } catch (e) {
    console.log('Cannot access iframe content (cross-origin)');
  }
}

export default function JobSeekerRegistrationPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const onLoad = () => {
      hideSocialButtons(iframe);
      setTimeout(() => hideSocialButtons(iframe), 1000);
      setTimeout(() => hideSocialButtons(iframe), 3000);
    };
    iframe.addEventListener('load', onLoad);
    return () => iframe.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* NAV */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
        <a href="/" className="flex items-center">
          <img
            src="https://steth.work/Images/logo/Logo-2%201.png"
            alt="Steth.work logo"
            className="h-16 md:h-20 w-auto object-contain"
          />
        </a>
        <div className="flex gap-4 items-center">
          <a href="/" className="text-sm text-gray-700 hover:text-brandTeal inline-flex items-center gap-1">
            <Icon name="home" className="w-4 h-4" />
            Home
          </a>
          <a href="/jobseeker-registration" className="text-sm px-4 py-2 bg-brandTeal text-white rounded-full hover:bg-brandTeal-600 transition">Join Now</a>
          <a href="/jobseeker-login" className="text-sm px-4 py-2 border border-brandTeal text-brandTeal rounded-full hover:bg-brandTeal hover:text-white transition">Sign In</a>
          <a href="/employer" className="text-sm px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition">For Employers</a>
        </div>
      </nav>

      {/* IFRAME CONTENT */}
      <main className="flex-1 flex justify-center items-start py-8 px-4 md:px-8 lg:px-12 bg-gray-50">
        <iframe
          ref={iframeRef}
          src="/portal/jobseeker-registration#/stethwork/jobseeker-registration"
          className="w-full max-w-5xl border-0 rounded-2xl shadow-lg bg-white"
          style={{ minHeight: '850px' }}
          title="Job Seeker Registration"
        />
      </main>

      {/* FOOTER */}
      <footer className="bg-steth-footer py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img
              src="https://steth.work/Images/logo/Logo-2-2.png"
              alt="Steth.work logo"
              className="h-12 md:h-14 w-auto object-contain"
            />
            <div>
              <p className="text-white font-bold text-xl">Steth.work</p>
              <p className="text-gray-400 text-sm">Healthcare Professional Network</p>
            </div>
          </div>
          <div className="text-gray-400 text-sm">&copy; Copyright 2025 <span className="text-brandTeal">Steth.work</span> All Rights Reserved.</div>
        </div>
      </footer>
    </div>
  );
}
