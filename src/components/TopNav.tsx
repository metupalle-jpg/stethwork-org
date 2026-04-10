'use client';

import { useEffect, useState } from 'react';

type TopNavProps = {
  showMarketingActions?: boolean;
};

function HomeIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${className} stroke-current`} strokeWidth="2">
      <path d="M3 10.5L12 3l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 9.5V20h14V9.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TopNav({ showMarketingActions = true }: TopNavProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const readAuthState = () => {
      try {
        setIsLoggedIn(Boolean(window.localStorage.getItem('ez_session')));
      } catch {
        setIsLoggedIn(false);
      }
    };

    readAuthState();

    const onStorage = () => readAuthState();
    const onVisibility = () => readAuthState();

    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', onVisibility);
    document.addEventListener('visibilitychange', onVisibility);

    const interval = window.setInterval(readAuthState, 1500);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', onVisibility);
      document.removeEventListener('visibilitychange', onVisibility);
      window.clearInterval(interval);
    };
  }, []);

  const shouldShowActions = showMarketingActions && !isLoggedIn;

  return (
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
          <HomeIcon className="w-4 h-4" />
          Home
        </a>

        {shouldShowActions ? (
          <>
            <a href="/jobseeker-registration" className="text-sm px-4 py-2 bg-brandTeal text-white rounded-full hover:bg-brandTeal-600 transition">Join Now</a>
            <a href="/jobseeker-login" className="text-sm px-4 py-2 border border-brandTeal text-brandTeal rounded-full hover:bg-brandTeal hover:text-white transition">Sign In</a>
            <a href="/employer" className="text-sm px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition">For Employers</a>
          </>
        ) : null}
      </div>
    </nav>
  );
}
