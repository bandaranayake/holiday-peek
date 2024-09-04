import { AppProps } from 'next/app';
import Head from 'next/head';
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Holiday Peek - Discover public holidays worldwide</title>
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
                <meta name="description" content="Explore public holidays, national holidays, and important dates for countries around the world. Stay updated with HolidayPeek, your global holiday guide." />
            </Head>
            <div className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="w-full max-w-6xl mx-auto px-4 py-12 md:px-6">
                        <Header />
                        <Component {...pageProps} />
                        <Footer />
                    </div>
                </ThemeProvider>
            </div>
        </>
    )
}