'use client';

import Image from 'next/image';

export default function FooterLogo() {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.__lenis) {
      window.__lenis.scrollTo('#hero', { immediate: true });
    } else {
      document.getElementById('hero')?.scrollIntoView();
    }
  };

  return (
    <a href="#hero" onClick={handleClick} aria-label="Technoon.ai home">
      <Image src="/logo.webp" alt="Technoon.ai" width={1536} height={1024} className="footer-logo-img" />
    </a>
  );
}
