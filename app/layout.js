import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/providers/ThemeProvider';
import ToasterProvider from '@/components/ToasterProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SecureAuth - Cybersecurity Authentication System',
  description: 'A prototype system demonstrating secure user authentication with password strength analysis and CAPTCHA verification',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <ToasterProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}