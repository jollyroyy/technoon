'use client';

import { useEffect, useState, useCallback } from 'react';
import { X } from 'lucide-react';

type Page = 'privacy' | 'terms' | null;

export default function LegalPopup() {
  const [page, setPage] = useState<Page>(null);
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(false);

  const open = useCallback(async (p: Page) => {
    if (!p) return;
    setPage(p);
    setLoading(true);
    try {
      const res = await fetch(`/${p}`);
      const text = await res.text();
      const wrapper = document.createElement('div');
      wrapper.innerHTML = text;
      const main = wrapper.querySelector('.legal-shell') || wrapper.querySelector('main');
      setHtml(main ? main.innerHTML : text);
    } catch {
      setHtml('<p>Failed to load content.</p>');
    }
    setLoading(false);
  }, []);

  const close = useCallback(() => {
    setPage(null);
    setHtml('');
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const trigger = (e.target as HTMLElement).closest('[data-legal]');
      if (!trigger) return;
      e.preventDefault();
      open((trigger as HTMLElement).getAttribute('data-legal') as Page);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [open]);

  useEffect(() => {
    if (!page) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [page, close]);

  if (!page) return null;

  return (
    <div className="legal-overlay" onClick={close}>
      <div className="legal-modal" onClick={(e) => e.stopPropagation()}>
        <div className="legal-modal-head">
          <h3>{page === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}</h3>
          <button className="legal-modal-close" onClick={close} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="legal-modal-body">
          {loading ? <p className="legal-modal-loading">Loading...</p> : null}
          <div
            className="legal-modal-content"
            dangerouslySetInnerHTML={{ __html: html }}
            style={{ display: loading ? 'none' : 'block' }}
          />
        </div>
      </div>
    </div>
  );
}
