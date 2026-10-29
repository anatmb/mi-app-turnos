type EmailMessage = { to: string; subject: string; html: string };

export async function sendEmail(message: EmailMessage) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...message, from }),
  });

  if (!response.ok) {
    console.error("No se pudo enviar el correo:", await response.text());
    return false;
  }

  return true;
}
