import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { FooterWrapper } from '@/components/footer-wrapper';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QCAP Analytics Dashboard',
  description: 'Analytics dashboard for QCAP',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <FooterWrapper />
          <Toaster richColors position='top-right' />
        </ThemeProvider>
      </body>
    </html>
  );
}

// src/App.js
// import React from 'react';
// import MainView from './MainView';
// import { QubicConnectProvider } from './connect/QubicConnectContext';
// import { ConfigProvider } from './contexts/ConfigContext';
// import { QxProvider } from './contexts/QxContext';
// import { SnackbarProvider } from './contexts/SnackbarContext';

// function App() {
//   return (
//     <ConfigProvider>
//       <QubicConnectProvider>
//         <QxProvider>
//           <SnackbarProvider>
//             <MainView />
//           </SnackbarProvider>
//         </QxProvider>
//       </QubicConnectProvider>
//     </ConfigProvider>
//   );
// }

// export default App;
