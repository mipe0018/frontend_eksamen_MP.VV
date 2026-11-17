import "./globals.css";
import Header from "../components/global/Header.jsx";

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
