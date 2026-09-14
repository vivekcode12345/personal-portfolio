import React from "react";
import { Mail, Phone, MapPin, Send, ChevronRight } from "lucide-react";
import "./Contact.scss";
import { mobileNumber, email } from "../../constants/contactConstants";
import { scrollToSection } from "../../utils/scrollTo";
import { navLinks } from "../../constants/navbarConstants";

const FOOTER_SOCIALS = [
  {
    href: "https://www.linkedin.com/in/vivekcode12345/",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
    ),
  },
  {
    href: "https://github.com/vivekcode12345",
    label: "GitHub",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
    ),
  },
];

/**
 * @author Vivek Verma
 * @description Contact component for the portfolio website. This section includes a form for visitors to get in touch, as well as contact information and social media links.
 * @returns Contact section with a form to get in touch, including contact information and social links.
 * The form submits to Formspree for handling contact messages.
 * 
 */
export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact__bg" aria-hidden="true" />

      <div className="contact-header">
        <span className="contact__kicker">GET IN TOUCH</span>
        <p className="contact-description">
          I’m open to discussing product ideas, collaborations, and internship opportunities.
        </p>
      </div>

      <div className="contact__container">

        <div className="contact__left">
          {/* Availability status pill */}
          <div className="status-pill" role="status" aria-label="Available for internships">
            <span className="pulse-dot" aria-hidden="true" />
            Available for internships
          </div>

          <h2 className="contact__title">
            Let’s build <br />
            something <br />
            <span className="contact__titleAccent">impactful.</span>
          </h2>

          <p className="contact__desc">
            Actively seeking summer internship opportunities. Feel free to reach out with a role, project, or collaboration idea.
          </p>

          <div className="contact__info">
            <a className="contact__email" href={`mailto:${email}`}>
              <Mail className="contact__info-icon" aria-hidden="true" />
              {email}
            </a>
            <a className="contact__phone" href={`tel:${mobileNumber}`}>
              <Phone className="contact__info-icon" aria-hidden="true" />
              {mobileNumber}
            </a>
            <address className="contact__location">
              <MapPin className="contact__info-icon" aria-hidden="true" />
              Ballia, Uttar Pradesh, India
            </address>
          </div>
        </div>

        {/* RIGHT — form card with subtle decorative dots */}
        <div className="contact__card">
          <div className="contact__decor" aria-hidden="true">
            <span className="contact__decor-dot" />
            <span className="contact__decor-dot" />
            <span className="contact__decor-dot" />
          </div>

          <form
            className="contact__form"
            action="https://formspree.io/f/xdaqdlej"
            method="POST"
            aria-label="Contact form"
            onKeyDownCapture={(e) => {
              const isField =
                e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement ||
                e.target instanceof HTMLSelectElement ||
                e.target.isContentEditable;

              if (isField && e.key === " ") e.stopPropagation();
            }}
          >
            {/* optional extras */}
            <input type="hidden" name="_subject" value="Portfolio Contact" />
            <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex="-1" autoComplete="off" />

            <label className="field">
              <span className="field__label">NAME</span>
              <input
                className="field__input"
                name="name"
                placeholder="Your name"
                required
                autoComplete="name"
              />
            </label>

            <label className="field">
              <span className="field__label">EMAIL</span>
              <input
                className="field__input"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </label>

            <label className="field">
              <span className="field__label">MESSAGE</span>
              <textarea
                className="field__textarea"
                name="message"
                placeholder="Reaching out about a job or internship? Share role details + timeline…"
                rows={5}
                required
              />
            </label>

            <button type="submit" className="contact__btn">
              SEND MESSAGE
              <Send className="contact__btn-icon" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>

      {/* FOOTER — full-width dark three-column footer */}
      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__grid">

            {/* Column 1 — Brand + blurb */}
            <div className="site-footer__col">
              <span className="site-footer__brand">
                Vivek <span className="site-footer__brand-accent">Verma</span>
              </span>
              <p className="site-footer__blurb">
                Actively seeking summer internship opportunities. Feel free to reach out with a role, project, or collaboration idea.
              </p>
            </div>

            {/* Column 2 — Quick Links */}
            <div className="site-footer__col">
              <h3 className="site-footer__heading">Quick Links</h3>
              <ul className="site-footer__list">
                <li>
                  <a href="#home" onClick={scrollToSection("home")}>
                    <ChevronRight className="site-footer__chevron" aria-hidden="true" />
                    Home
                  </a>
                </li>
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a href={`#${link.id}`} onClick={scrollToSection(link.id)}>
                      <ChevronRight className="site-footer__chevron" aria-hidden="true" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Contact Info */}
            <div className="site-footer__col">
              <h3 className="site-footer__heading">Contact Info</h3>
              <ul className="site-footer__list">
                <li>
                  <a href={`mailto:${email}`}>
                    <Mail className="site-footer__info-icon" aria-hidden="true" />
                    {email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${mobileNumber}`}>
                    <Phone className="site-footer__info-icon" aria-hidden="true" />
                    {mobileNumber}
                  </a>
                </li>
                <li>
                  <span className="site-footer__info-line">
                    <MapPin className="site-footer__info-icon" aria-hidden="true" />
                    Ballia, Uttar Pradesh, India
                  </span>
                </li>
              </ul>

              <div className="site-footer__socials" aria-label="Social profiles">
                {FOOTER_SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="site-footer__social-btn"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="site-footer__bottom">
            Designed &amp; built by <span className="site-footer__bottom-accent">Vivek Verma</span> &copy; {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </section>
  );
}
