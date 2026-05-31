"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";

/**
 * Contact
 *
 * Two ways to reach out:
 * 1. A form that pre-fills a `mailto:` link from the user's input. No backend
 *    is involved — on submit we build an encoded mailto URL and open the user's
 *    email client with subject and body already filled in.
 * 2. An inline Calendly embed to book a call directly.
 */
export function Contact() {
  const t = useTranslations("contact");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Compose an RFC 6068 mailto: link. Each field is URL-encoded so line
    // breaks and special characters survive the transfer to the mail client.
    const mailSubject = subject || `${t("title")} — ${name}`;
    const body = `${message}\n\n— ${name} (${email})`;
    const href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      mailSubject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
  };

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 py-32 sm:py-40">
      <Reveal>
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.5em] text-cyan-300/80">
          {t("kicker")}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-balance text-3xl font-bold leading-tight text-white sm:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-6 max-w-xl text-pretty text-base text-white/60 sm:text-lg">
          {t("subtitle")}
        </p>
      </Reveal>

      <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label={t("form.name")}
                value={name}
                onChange={setName}
                autoComplete="name"
                required
              />
              <Field
                label={t("form.email")}
                value={email}
                onChange={setEmail}
                type="email"
                autoComplete="email"
                required
              />
            </div>
            <Field
              label={t("form.subject")}
              value={subject}
              onChange={setSubject}
            />
            <label className="flex flex-col gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                {t("form.message")}
              </span>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
                rows={5}
                className="resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-cyan-300/60"
              />
            </label>

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-cyan-300 px-8 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-[#05060a] transition-transform hover:scale-[1.02]"
            >
              {t("form.submit")}
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex h-full flex-col gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">
                {t("booking.title")}
              </h3>
              <p className="mt-1 text-sm text-white/50">
                {t("booking.description")}
              </p>
            </div>
            <div className="flex-1 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              {/* Calendly inline embed. Lazy-loaded by the browser. */}
              <iframe
                title="Calendly"
                src={siteConfig.calendlyUrl}
                className="h-full min-h-[520px] w-full"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Field — small controlled text input used by the contact form.
 */
function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email";
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-xs uppercase tracking-widest text-white/40">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        autoComplete={autoComplete}
        className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-cyan-300/60"
      />
    </label>
  );
}
