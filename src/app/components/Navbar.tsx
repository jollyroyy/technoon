'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Layout, Bot, BarChart2, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setMobileOpen(false);

  return (
    <>
      <nav className={`site-navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#hero" className="nav-logo" aria-label="Technoon.ai home">
            <Image
              src="/logo.png"
              alt="Technoon.ai"
              width={1536}
              height={1024}
              priority
              style={{ height: '104px', width: 'auto' }}
            />
          </a>

          <div className="nav-links">
            <div className="nav-dropdown">
              <button className="nav-dropdown-trigger">
                Services <ChevronDown size={16} className="nav-dropdown-chevron" />
              </button>
              <div className="nav-dropdown-menu">
                <a href="#solutions" className="dropdown-item">
                  <Layout size={20} className="dropdown-icon" />
                  <div>
                    <span>Launch-Ready Website</span>
                    <p>14-day fixed timeline</p>
                  </div>
                </a>
                <a href="#solutions" className="dropdown-item">
                  <Bot size={20} className="dropdown-icon" />
                  <div>
                    <span>AI Receptionist</span>
                    <p>WhatsApp + web lead handler</p>
                  </div>
                </a>
                <a href="#solutions" className="dropdown-item">
                  <BarChart2 size={20} className="dropdown-icon" />
                  <div>
                    <span>Lead Follow-up Automation</span>
                    <p>Speed-to-lead workflows</p>
                  </div>
                </a>
              </div>
            </div>

            <a href="#technoonhr">TechnoonHR</a>
            <a href="#pricing">Pricing</a>
            <a href="#process">How We Work</a>
          </div>

          <div className="nav-actions">
            <a className="btn btn-primary" href="https://cal.com/technoon/audit">Book Free Audit</a>
          </div>

          <button
            className={`nav-hamburger${mobileOpen ? ' open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`nav-mobile${mobileOpen ? ' open' : ''}`}>
        <div className="nav-mobile-category">Services</div>
        <a href="#solutions" onClick={close} className="nav-mobile-sub">&mdash; Launch-Ready Website</a>
        <a href="#solutions" onClick={close} className="nav-mobile-sub">&mdash; AI Receptionist</a>
        <a href="#solutions" onClick={close} className="nav-mobile-sub">&mdash; Lead Follow-up Automation</a>

        <a href="#technoonhr" onClick={close}>TechnoonHR</a>
        <a href="#pricing" onClick={close}>Pricing</a>
        <a href="#process" onClick={close}>How We Work</a>
        <a href="https://cal.com/technoon/audit" className="btn btn-primary" onClick={close}>Book Free Audit</a>
      </div>
    </>
  );
}
