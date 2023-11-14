import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import ThemeRegistry from "./components/theme/theme-registry";
import AppBar from "@/app/components/ui/app-bar";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Darick's Trivia App",
  description: "Trivia app created by Darick McBride",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ThemeRegistry options={{ key: "mui" }}>
          <AppBar>{children}</AppBar>
        </ThemeRegistry>
      </body>
    </html>
  );
}
