'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Layout, Bot, BarChart2, Cpu, MessageSquare, ChevronDown } from 'lucide-react';

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
              style={{ height: '72px', width: 'auto' }}
            />
          </a>

          <div className="nav-links">
            <div className="nav-dropdown">
              <button className="nav-dropdown-trigger">
                Products &amp; Services <ChevronDown size={16} className="nav-dropdown-chevron" />
              </button>
              <div className="nav-dropdown-menu">
                <a href="#solutions" className="dropdown-item">
                  <Layout size={20} className="dropdown-icon" />
                  <div>
                    <span>AI Optimized Website Building</span>
                    <p>Conversion-focused web experiences</p>
                  </div>
                </a>
                <a href="#solutions" className="dropdown-item">
                  <Bot size={20} className="dropdown-icon" />
                  <div>
                    <span>AI Agent Building</span>
                    <p>Custom 24/7 business assistants</p>
                  </div>
                </a>
                <a href="#contact" className="dropdown-item">
                  <BarChart2 size={20} className="dropdown-icon" />
                  <div>
                    <span>Free AI Audits</span>
                    <p>Get a comprehensive systems check</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="nav-dropdown">
              <button className="nav-dropdown-trigger">
                In-House SaaS <ChevronDown size={16} className="nav-dropdown-chevron" />
              </button>
              <div className="nav-dropdown-menu">
                <a href="#industries" className="dropdown-item">
                  <Cpu size={20} className="dropdown-icon" />
                  <div>
                    <span>AI Logistics Manager</span>
                    <p>Automate freight operations</p>
                  </div>
                </a>
                <a href="#industries" className="dropdown-item">
                  <MessageSquare size={20} className="dropdown-icon" />
                  <div>
                    <span>Coach AI CRM</span>
                    <p>Automated booking &amp; nurture</p>
                  </div>
                </a>
              </div>
            </div>

            <a href="#process">Process</a>
            <a href="#results">Results</a>
          </div>

          <div className="nav-actions">
            <a className="btn btn-primary" href="#contact">Book Free Audit</a>
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
        <div className="nav-mobile-category">Products &amp; Services</div>
        <a href="#solutions" onClick={close} className="nav-mobile-sub">&mdash; AI Optimized Websites</a>
        <a href="#solutions" onClick={close} className="nav-mobile-sub">&mdash; AI Agent Building</a>
        <a href="#contact" onClick={close} className="nav-mobile-sub">&mdash; Free AI Audits</a>

        <div className="nav-mobile-category">In-House SaaS</div>
        <a href="#industries" onClick={close} className="nav-mobile-sub">&mdash; AI Logistics Manager</a>
        <a href="#industries" onClick={close} className="nav-mobile-sub">&mdash; Coach AI CRM</a>

        <a href="#process" onClick={close}>Process</a>
        <a href="#results" onClick={close}>Results</a>
        <a href="#contact" className="btn btn-primary" onClick={close}>Book Free Audit</a>
      </div>
    </>
  );
}
