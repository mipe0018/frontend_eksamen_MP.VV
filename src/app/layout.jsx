
import "./globals.css";
import Header from "../components/global/Header.jsx";
import Footer from "../components/global/Footer.jsx";

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
