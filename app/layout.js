import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Arnav Gupta - AI/ML Engineer',
  description: 'AI/ML Engineer | Building Intelligent Systems at Scale. 3+ years of production-ready ML solutions.',
  keywords: 'AI, ML, Machine Learning, Generative AI, Cloud Computing, Python, TensorFlow, AWS',
  authors: [{ name: 'Arnav Gupta' }],
  openGraph: {
    title: 'Arnav Gupta - AI/ML Engineer',
    description: 'Building Intelligent Systems at Scale',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0B0F1A" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                let theme = localStorage.getItem('theme');
                if (!theme) {
                  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  theme = prefersDark ? 'dark' : 'light';
                }
                document.documentElement.setAttribute('data-theme', theme);
                document.documentElement.classList.toggle('dark', theme === 'dark');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.className} overflow-x-hidden transition-colors duration-300`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
