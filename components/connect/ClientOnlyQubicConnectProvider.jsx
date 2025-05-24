'use client';
import dynamic from 'next/dynamic';

// Dynamically load the ThemeProvider with no SSR
const DynamicThemeProvider = dynamic(
  () => import('./QubicConnectContext').then((mod) => mod.ThemeProvider),
  { ssr: false }
);

const ClientOnlyQubicConnectProvider = ({ children }) => {
  return <DynamicThemeProvider>{children}</DynamicThemeProvider>;
};

export default ClientOnlyQubicConnectProvider;
