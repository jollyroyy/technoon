'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Layout, Bot, BarChart2, Smartphone, Megaphone, Boxes, ChevronDown, Mail, Users, Clock, IndianRupee, Shield } from 'lucide-react';

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
              className="nav-logo-img"
            />
          </a>

          <div className="nav-links">
            <div className="nav-dropdown">
              <button className="nav-dropdown-trigger">
                Products <ChevronDown size={16} className="nav-dropdown-chevron" />
              </button>
              <div className="nav-dropdown-menu">
                <div className="dropdown-group-label">HR & People</div>
                <a href="https://noon-hr.vercel.app" target="_blank" rel="noopener noreferrer" className="dropdown-item">
                  <Users size={20} className="dropdown-icon" />
                  <div>
                    <span>Noon HR</span>
                    <p>All-in-one HR & payroll platform</p>
                  </div>
                </a>
                <a href="#technoonhr" className="dropdown-item sub-item">
                  <Clock size={16} className="dropdown-icon" />
                  <div>
                    <span>Attendance & Leave</span>
                    <p>Real-time tracking, approvals, calendar</p>
                  </div>
                </a>
                <a href="#technoonhr" className="dropdown-item sub-item">
                  <IndianRupee size={16} className="dropdown-icon" />
                  <div>
                    <span>Payroll & Compliance</span>
                    <p>Auto-calculations, tax filings, PDPL-ready</p>
                  </div>
                </a>
                <a href="#technoonhr" className="dropdown-item sub-item">
                  <Shield size={16} className="dropdown-icon" />
                  <div>
                    <span>Employee Portal</span>
                    <p>Self-service · documents · role-based access</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="nav-dropdown">
              <button className="nav-dropdown-trigger">
                Services <ChevronDown size={16} className="nav-dropdown-chevron" />
              </button>
              <div className="nav-dropdown-menu">
                <div className="dropdown-group-label">Websites & Apps</div>
                <a href="#solutions" className="dropdown-item">
                  <Layout size={20} className="dropdown-icon" />
                  <div>
                    <span>Conversion Websites</span>
                    <p>Live in days, fixed price</p>
                  </div>
                </a>
                <a href="#solutions" className="dropdown-item">
                  <Smartphone size={20} className="dropdown-icon" />
                  <div>
                    <span>App Development</span>
                    <p>React Native · AI-powered · MVPs</p>
                  </div>
                </a>
                <div className="dropdown-divider" />
                <div className="dropdown-group-label">AI-Powered Services</div>
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
                <div className="dropdown-divider" />
                <div className="dropdown-group-label">Marketing & Software</div>
                <a href="#solutions" className="dropdown-item">
                  <Megaphone size={20} className="dropdown-icon" />
                  <div>
                    <span>Digital Marketing</span>
                    <p>SEO · SEM · PPC · brand promotion</p>
                  </div>
                </a>
                <a href="#solutions" className="dropdown-item">
                  <Boxes size={20} className="dropdown-icon" />
                  <div>
                    <span>Business Software</span>
                    <p>CRM · ERP · custom SaaS</p>
                  </div>
                </a>
              </div>
            </div>

            <a href="#work">Work</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>

          <div className="nav-actions">
            <a href="mailto:info@technoon.ai" className="nav-email">
              <Mail size={13} />
              info@technoon.ai
            </a>
            <button className="btn btn-primary" data-cal-link="technoon/audit">Book Free Audit</button>
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
        <div className="nav-mobile-category">Products</div>
        <a href="https://noon-hr.vercel.app" target="_blank" rel="noopener noreferrer" onClick={close} className="nav-mobile-product">&diams; Noon HR — All-in-one HR & payroll</a>
        <a href="#technoonhr" onClick={close} className="nav-mobile-sub">&mdash; Attendance & Leave</a>
        <a href="#technoonhr" onClick={close} className="nav-mobile-sub">&mdash; Payroll & Compliance</a>
        <a href="#technoonhr" onClick={close} className="nav-mobile-sub">&mdash; Employee Portal</a>

        <div className="nav-mobile-category">Websites & Apps</div>
        <a href="#solutions" onClick={close} className="nav-mobile-sub">&mdash; Conversion Websites</a>
        <a href="#solutions" onClick={close} className="nav-mobile-sub">&mdash; App Development</a>
        <div className="nav-mobile-category">AI-Powered Services</div>
        <a href="#solutions" onClick={close} className="nav-mobile-sub">&mdash; AI Receptionist</a>
        <a href="#solutions" onClick={close} className="nav-mobile-sub">&mdash; Lead Follow-up Automation</a>
        <div className="nav-mobile-category">Marketing & Software</div>
        <a href="#solutions" onClick={close} className="nav-mobile-sub">&mdash; Digital Marketing</a>
        <a href="#solutions" onClick={close} className="nav-mobile-sub">&mdash; Business Software</a>

        <a href="#work" onClick={close}>Featured Work</a>
        <a href="#pricing" onClick={close}>Pricing</a>
        <a href="#faq" onClick={close}>FAQ</a>
        <button className="btn btn-primary" data-cal-link="technoon/audit" onClick={close}>Book Free Audit</button>
      </div>
    </>
  );
}
