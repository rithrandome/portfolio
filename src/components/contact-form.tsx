"use client";

import { useActionState } from "react";
import { sendMessage, type ContactState } from "@/actions/send-message";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "w-full rounded-[10px] border border-line bg-surface px-4 py-3 text-[15px] text-foreground transition-colors placeholder:text-muted/70 focus:border-accent focus:outline-none aria-[invalid=true]:border-red-500/70";

export function ContactForm() {
  // useActionState runs the server action and hands back whatever it returned
  // (success, or the errors to show), plus whether it's still running.
  const [state, formAction, pending] = useActionState(sendMessage, initialState);
  const errors = state.fieldErrors ?? {};
  const values = state.values ?? {};

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex h-full min-h-[320px] flex-col items-start justify-center gap-3 rounded-2xl border border-line bg-surface p-8"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase">Sent</p>
        <p className="text-lg">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" id="name" error={errors.name?.[0]}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            defaultValue={values.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass}
          />
        </Field>
        <Field label="Email" id="email" error={errors.email?.[0]}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Message" id="message" error={errors.message?.[0]}>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={values.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${inputClass} resize-y`}
        />
      </Field>

      {/* Honeypot: hidden from people and screen readers, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 items-center rounded-[10px] border border-accent bg-accent px-6 text-[15px] font-medium text-accent-ink transition-[transform,opacity] hover:-translate-y-px disabled:translate-y-0 disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        {state.status === "error" && state.message && (
          <p role="alert" className="text-[14px] text-red-500">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}

type FieldProps = { label: string; id: string; error?: string; children: React.ReactNode };

function Field({ label, id, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-xs text-muted">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-[13px] text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
