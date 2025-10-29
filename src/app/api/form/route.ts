export const runtime = "nodejs";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const SMTP_USER = process.env.SMTP_USER!;
const SMTP_PASS = process.env.SMTP_PASS!;
const TO_EMAIL = process.env.TO_EMAIL || "bonard@lumea-services.fr";
const FROM_EMAIL =
  process.env.FROM_EMAIL || `Formulaire Luméa <no-reply@lumea-services.fr>`;

export async function POST(req: Request) {
  console.log("✅ Route /api/form appelée (POST)");

  try {
    const formData = await req.formData();

    const formType = (formData.get("formType") as string) || "contact";
    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const phone = (formData.get("phone") as string) || "";
    const subject =
      (formData.get("subject") as string) ||
      (formType === "recrutement" ? "Candidature" : "Nouveau message");
    const message = (formData.get("message") as string) || "";

    const file = formData.get("file") as File | null;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const html = `
      <p><b>Type :</b> ${formType}</p>
      <p><b>Nom :</b> ${name}</p>
      <p><b>Email :</b> ${email}</p>
      ${phone ? `<p><b>Téléphone :</b> ${phone}</p>` : ""}
      <p><b>Message :</b></p>
      <pre style="white-space:pre-wrap">${message}</pre>
    `;

    const attachments = [];
    if (file && typeof file.arrayBuffer === "function") {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer,
        contentType: file.type || "application/octet-stream",
      });
    }

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email || FROM_EMAIL,
      subject: `[Luméa Services] ${subject}`,
      html,
      attachments,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("❌ MAIL ERROR:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "unknown" },
      { status: 500 }
    );
  }
}
