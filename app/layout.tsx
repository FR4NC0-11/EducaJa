import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EducaJá — programação e tecnologia",
  description:
    "Comece pelo básico: aulas de programação, criação de sites, banco de dados e Internet das Coisas.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
