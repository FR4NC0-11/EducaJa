import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EducaJá — seu espaço de estudo",
  description:
    "Escolha sua área de estudo. Aulas de programação e primeiras unidades autorais da 3ª série do Ensino Médio.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
