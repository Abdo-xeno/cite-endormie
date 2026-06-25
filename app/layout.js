import "./globals.css";
import Atmosphere from "../components/Atmosphere";
import CursorLight from "../components/CursorLight";
import ScrollProgress from "../components/ScrollProgress";
import { TeamProvider } from "../components/TeamProvider";
import TyranPresence from "../components/TyranPresence";

export const metadata = {
  title: "La Cité Endormie — Escape Game",
  description:
    "Un escape game pédagogique sur la responsabilité citoyenne, l'éveil des cœurs et la métaphore moderne du sommeil numérique.",
  keywords: ["escape game", "Cité Endormie", "responsabilité", "citoyenneté", "Islam"],
};

export const viewport = {
  themeColor: "#0a1a2a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grain">
        <TeamProvider>
          <Atmosphere />
          <TyranPresence />
          <ScrollProgress />
          {children}
          <CursorLight />
        </TeamProvider>
      </body>
    </html>
  );
}
