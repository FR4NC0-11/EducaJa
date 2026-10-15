import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EducaJá — seu próximo passo começa aqui",
  description: "Aprenda programação com diagnóstico, explicações claras e trilhas no seu ritmo.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
