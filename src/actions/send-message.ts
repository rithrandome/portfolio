"use server";

import { Resend } from "resend";
import { z } from "zod";

// Server Action behind the contact form. It runs only on the server (a Vercel
// serverless function in production), so the Resend API key never reaches the browser.

const schema = z.object({
  name: z.string().trim().min(1, "Please add your name.").max(100, "That name is a bit long."),
  email: z.email("That doesn't look like a valid email address."),
  message: z
    .string()
    .trim()
    .min(10, "A little more detail would help (10+ characters).")
    .max(5000, "Please keep it under 5,000 characters."),
});

type Field = keyof z.infer<typeof schema>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<Field, string[]>>;
  /** what the visitor typed, so the form can refill itself after a validation error */
  values?: Partial<Record<Field, string>>;
};

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: a field hidden from people. Bots fill every input, so if this one has a
  // value, pretend it worked and send nothing.
  if (formData.get("website")) {
    return { status: "success", message: "Thanks, your message is on its way." };
  }

  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set.");
    return {
      status: "error",
      message: "The form isn't connected yet. Please email me directly instead.",
      values,
    };
  }

  const { name, email, message } = parsed.data;
  const failed: ContactState = {
    status: "error",
    message: "Something went wrong sending that. Please try again, or email me directly.",
    values,
  };

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      // Resend's shared sender works without owning a domain; swap in your own
      // address here once a domain is verified in Resend.
      // `||` rather than `??` so an empty CONTACT_FROM_EMAIL= line also falls back
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to,
      // hitting Reply in your inbox goes straight to the visitor
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: [`Name: ${name}`, `Email: ${email}`, "", message].join("\n"),
    });
    if (error) {
      console.error("Contact form: Resend returned an error", error);
      return failed;
    }
  } catch (err) {
    // network failures and the like throw instead of returning an error
    console.error("Contact form: sending failed", err);
    return failed;
  }

  return { status: "success", message: "Thanks, your message is on its way. I'll get back to you soon." };
}
