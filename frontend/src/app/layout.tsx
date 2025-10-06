import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "E-commerce CRUD",
  description: "Assignment 1 - CRUD API + UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
