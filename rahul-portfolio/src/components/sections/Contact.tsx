'use client';

import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

import { Mail, MapPin, Globe, Send, CheckCircle2, MessageSquare, AlertCircle, X, Sparkles } from 'lucide-react';
import { Section, Heading, Text, Card, Button } from '../ui';
import { artistProfile } from '../../data/portfolio';

const EMAILJS_SERVICE_ID = 'service_f205tpg';
const EMAILJS_TEMPLATE_ID = 'template_k2s1c32';
const EMAILJS_PUBLIC_KEY = 'WsKoldft7wqy7p49u';

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 1.64 1.64 1.64 1.64 0 0 0-1.64-1.64Z" />
    </svg>
  );
}

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formDataCache, setFormDataCache] = useState<{ name: string; email: string; subject: string; message: string } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error'>('success');
  const [sentDetails, setSentDetails] = useState<{ name: string; email: string; subject: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
      }
    };
    if (modalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [modalOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    setFormDataCache({ name, email, subject, message });

    const templateParams = {
      from_name: name,
      name: name,
      from_email: email,
      email: email,
      reply_to: email,
      subject: subject,
      message: message,
      to_name: artistProfile.name,
      to_email: artistProfile.email,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setFormState('success');
      setSentDetails({ name, email, subject });
      setModalType('success');
      setModalOpen(true);
      form.reset();
      setFormDataCache(null);

      setTimeout(() => {
        setFormState('idle');
      }, 5000);
    } catch (err: unknown) {
      console.error('EmailJS error:', err);
      const rawText = typeof err === 'object' && err !== null && 'text' in err 
        ? String((err as { text: unknown }).text) 
        : '';
      
      let friendlyError = '';
      if (rawText.toLowerCase().includes('invalid grant') || rawText.toLowerCase().includes('reconnect')) {
        friendlyError = 'EmailJS Gmail authorization expired. Please reconnect Gmail in EmailJS dashboard, or use the direct email button below.';
      } else {
        friendlyError = rawText || 'Failed to deliver message via EmailJS. Please try again or reach out via direct email.';
      }
      setErrorMessage(friendlyError);
      setFormState('error');
      setModalType('error');
      setModalOpen(true);
    }
  };

  const handleFallbackMailto = () => {
    if (!formDataCache) return;
    const mailtoBody = `Name: ${formDataCache.name}\nEmail: ${formDataCache.email}\n\nMessage:\n${formDataCache.message}`;
    const mailtoLink = `mailto:${artistProfile.email}?subject=${encodeURIComponent(formDataCache.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(mailtoBody)}`;
    window.location.href = mailtoLink;
  };

  const contactLinks = [
    {
      icon: Mail,
      label: 'Direct Email',
      value: artistProfile.email,
      href: `mailto:${artistProfile.email}`,
      hint: 'Send an email directly'
    },
    {
      icon: LinkedinIcon,
      label: 'LinkedIn Profile',
      value: 'linkedin.com/in/rahulm1604',
      href: 'https://linkedin.com/in/rahulm1604',
      hint: 'Professional network & messaging'
    },
    {
      icon: GithubIcon,
      label: 'GitHub Repository',
      value: 'github.com/rahul1604-m',
      href: 'https://github.com/rahul1604-m',
      hint: 'Code repositories & projects'
    },
    {
      icon: Globe,
      label: 'GitHub Pages Portfolio',
      value: 'rahul1604-m.github.io',
      href: 'https://rahul1604-m.github.io',
      hint: 'Hosted live portfolio'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: artistProfile.location,
      href: '#',
      hint: 'Based in Tamil Nadu, India'
    }
  ];

  return (
    <Section id="contact" className="relative">
      <div className="max-w-[1200px] mx-auto mb-16 text-center">
        <Text size="sm" weight="medium" color="accent" className="tracking-[0.2em] uppercase mb-4 flex items-center justify-center gap-2">
          <MessageSquare className="w-4 h-4 text-accent" />
          Get In Touch
        </Text>
        <Heading as="h2" size="h1" weight="bold" animate={false} className="mb-4">
          Contact Me
        </Heading>
        <Text size="lg" color="muted" className="max-w-2xl mx-auto leading-relaxed">
          Open to full-time roles,3D Artist & Autodesk Maya Developer,data analysis contracts, 
          and technology collaborations. Reach out via email or the form below.
        </Text>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 max-w-[1200px] mx-auto items-start">
        {/* Contact Information Cards */}
        <div className="lg:col-span-5 space-y-4">
          <Card variant="outlined" padding="lg" className="bg-bg-elevated/40 border-border/80 backdrop-blur-sm">
            <Heading as="h3" size="h4" weight="bold" animate={false} className="text-text mb-6">
              Contact Channels
            </Heading>

            <div className="space-y-4">
              {contactLinks.map((item) => {
                const ItemIcon = item.icon;
                const isExternal = item.href.startsWith('http');

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className={`flex items-start gap-4 p-3.5 rounded-xl border border-border/50 bg-bg/50 hover:bg-bg-elevated hover:border-accent/40 transition-all duration-200 group ${
                      item.href === '#' ? 'pointer-events-none' : ''
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <ItemIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-text-subtle block mb-0.5">
                        {item.label}
                      </span>
                      <span className="text-sm font-semibold text-text group-hover:text-accent transition-colors truncate block">
                        {item.value}
                      </span>
                      <span className="text-xs text-text-muted block mt-0.5">
                        {item.hint}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <Card variant="outlined" padding="lg" className="bg-bg-elevated/40 border-border/80 backdrop-blur-sm p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <Heading as="h3" size="h4" weight="bold" animate={false} className="text-text">
                  Connect
                </Heading>
                <Text size="xs" color="muted">
                  Send an instant message directly to my inbox via EmailJS
                </Text>
              </div>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-text-subtle uppercase tracking-wider mb-2">
                    Your Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Alex Mercer"
                    className="w-full px-4 py-3 rounded-xl bg-bg/80 border border-border/60 text-text placeholder-text-subtle/40 focus:outline-none focus:border-accent transition-colors text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-text-subtle uppercase tracking-wider mb-2">
                    Your Email <span className="text-accent">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-bg/80 border border-border/60 text-text placeholder-text-subtle/40 focus:outline-none focus:border-accent transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-mono text-text-subtle uppercase tracking-wider mb-2">
                  Subject <span className="text-accent">*</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="3D Maya Project / Full-time Opportunity / Collaboration"
                  className="w-full px-4 py-3 rounded-xl bg-bg/80 border border-border/60 text-text placeholder-text-subtle/40 focus:outline-none focus:border-accent transition-colors text-sm"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-text-subtle uppercase tracking-wider mb-2">
                  Message Details <span className="text-accent">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Describe your project requirements, scope, timeline, or position details..."
                  className="w-full px-4 py-3 rounded-xl bg-bg/80 border border-border/60 text-text placeholder-text-subtle/40 focus:outline-none focus:border-accent transition-colors text-sm resize-none"
                />
              </div>

              {formState === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex flex-col gap-2.5 text-xs text-red-400">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{errorMessage || 'Failed to send message. Please try again or email directly.'}</span>
                  </div>
                  {formDataCache && (
                    <button
                      type="button"
                      onClick={handleFallbackMailto}
                      className="self-start text-[11px] font-semibold text-accent hover:underline flex items-center gap-1.5 mt-1 cursor-pointer bg-accent/15 px-3 py-1.5 rounded-lg border border-accent/25"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Send via Mail App Instead (1-Click Fallback)
                    </button>
                  )}
                </div>
              )}

              {formState === 'success' && (
                <div className="p-3.5 rounded-xl bg-accent/15 border border-accent/30 flex items-start gap-2.5 text-xs text-accent">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Your message has been sent successfully! I will get back to you shortly.</span>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={formState === 'submitting'}
                className="w-full gap-2 cursor-pointer shadow-lg shadow-accent/15"
              >
                {formState === 'submitting' ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-bg border-t-transparent rounded-full animate-spin" />
                    Connecting...
                  </span>
                ) : formState === 'success' ? (
                  <span className="flex items-center gap-2 text-bg font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    Message Sent!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Connect
                  </span>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>

      {/* Response Modal Dialog */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-surface/95 border border-border/80 rounded-2xl shadow-2xl p-6 sm:p-8 text-center overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div
              className={`absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-20 ${
                modalType === 'success' ? 'bg-accent' : 'bg-red-500'
              }`}
            />

            {/* Top Close Button */}
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-2 text-text-subtle hover:text-text rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {modalType === 'success' ? (
              <div className="flex flex-col items-center">
                <div className="relative mb-5">
                  <div className="absolute inset-0 bg-accent/30 rounded-full blur-xl animate-pulse" />
                  <div className="relative w-16 h-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center text-accent">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-mono tracking-wider uppercase mb-3">
                  <Sparkles className="w-3.5 h-3.5" /> Connection Established
                </div>

                <h3 className="text-2xl font-bold text-text tracking-tight mb-2">
                  Message Sent Successfully!
                </h3>

                <p className="text-sm text-text-muted max-w-md mb-6 leading-relaxed">
                  Thank you for reaching out, <span className="text-text font-semibold">{sentDetails?.name || 'there'}</span>! Your message has been transmitted directly to Rahul M (<span className="text-accent font-mono text-xs">rahulmurugam1812@gmail.com</span>). I will get back to you shortly.
                </p>

                {sentDetails?.subject && (
                  <div className="w-full bg-bg/70 border border-border/60 rounded-xl p-3.5 mb-6 text-left text-xs space-y-1">
                    <div className="text-text-subtle font-mono uppercase tracking-wider text-[10px]">Subject</div>
                    <div className="text-text font-medium truncate">{sentDetails.subject}</div>
                  </div>
                )}

                <div className="flex items-center gap-3 w-full">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setModalOpen(false)}
                    className="w-full justify-center cursor-pointer shadow-lg shadow-accent/20"
                  >
                    Done
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="relative mb-5">
                  <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl" />
                  <div className="relative w-16 h-16 rounded-full bg-red-500/15 border-2 border-red-500/40 flex items-center justify-center text-red-400">
                    <AlertCircle className="w-9 h-9" />
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono tracking-wider uppercase mb-3">
                  Delivery Interrupted
                </div>

                <h3 className="text-2xl font-bold text-text tracking-tight mb-2">
                  Unable to Send Message
                </h3>

                <p className="text-sm text-text-muted max-w-md mb-6 leading-relaxed">
                  {errorMessage || 'There was an issue dispatching your message via EmailJS.'}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                  {formDataCache && (
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => {
                        handleFallbackMailto();
                        setModalOpen(false);
                      }}
                      className="w-full justify-center gap-2 cursor-pointer"
                    >
                      <Mail className="w-4 h-4" /> Send via Mail App
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => setModalOpen(false)}
                    className="w-full justify-center cursor-pointer"
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Section>
  );
}
