This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Correos de recuperación y recordatorios

Para enviar enlaces de recuperación y recordatorios automáticos, configurá estas variables en el entorno de despliegue:

- `RESEND_API_KEY`: clave de API de Resend.
- `EMAIL_FROM`: remitente verificado en Resend (por ejemplo, `TurnoYa <turnos@tudominio.com>`).
- `APP_URL`: URL pública de la aplicación, sin barra final.
- `CRON_SECRET`: valor secreto que protege el proceso programado.

La tarea de Vercel consulta cada minuto los turnos que ocurren dentro de dos horas. Los pacientes deben ingresar un correo para recibir este aviso. Al desplegar, aplicá las migraciones de Prisma con `npx prisma migrate deploy`.

# mi-app-turnos
