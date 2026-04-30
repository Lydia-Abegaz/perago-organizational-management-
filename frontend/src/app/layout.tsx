import { ColorSchemeScript } from '@mantine/core';
import { Inter } from "next/font/google";
import { Providers } from '../components/Providers';
import "./globals.css";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Perago Organizational Management",
  description: "Modern employee hierarchy and organizational management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
