import type { Metadata } from "next";
import { Box } from "@mui/material";
import { Roboto } from "next/font/google";
import ThemeRegistry from "@/app/components/theme/ThemeRegistry";
import AppBar from "@/app/components/ui/AppBar";
import DataProvider from "@/app/providers";
import DataFetch from "@/app/components/DataFetch";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Darick's Trivia App",
  description: "Trivia app created by Darick McBride",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ThemeRegistry>
          <DataProvider>
            <DataFetch>
              <Box sx={{ display: "flex" }}>
                <AppBar />
                <Suspense fallback={<p>Loading </p>}>
                  <Box component="main" sx={{ mt: 10, width: "100%" }}>
                    {children}
                  </Box>
                </Suspense>
              </Box>
            </DataFetch>
          </DataProvider>
        </ThemeRegistry>
        <Analytics />
      </body>
    </html>
  );
}
