"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { COUNTRIES } from "@/utils/constants";
import CountrySelector from "@/components/CountrySelector";
import { Button } from "@/components/ui/button";
import { Moon as MoonIcon, Sun as SunIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/router';
import Link from "next/link";

const Header: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();

    const { theme, setTheme } = useTheme();
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [showSelector, setShowSelector] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const cleanPath = pathname.split('?')[0].split('#')[0].trim();
        const isHomepage = cleanPath === '/';

        if (isHomepage) {
            setShowSelector(false);
        }
        else {
            setShowSelector(true);
        }

        const slug = pathname?.split("/").filter(Boolean)?.[1] || "";

        let country = COUNTRIES.find(country => country.slug === slug);

        if (country) {
            setSelectedCountry(country.countryCode);
        }
    }, [pathname]);

    const handleSelectChange = (countryCode: string) => {
        const country = COUNTRIES.find(country => country.countryCode === countryCode);

        if (country) {
            router.push(`/countries/${country.slug}`);
        }
    };

    if (!mounted) {
        return null;
    }

    const getModeButton = (theme: string | undefined): JSX.Element => {
        if (theme === "light") {
            return <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme("dark")}
            >
                <SunIcon size={16} />
            </Button>
        } else {
            return <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme("light")}
            >
                <MoonIcon size={16} />
            </Button>
        }
    }

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8" suppressHydrationWarning>
            <h1 className="text-3xl font-bold tracking-tight"><Link href="/" prefetch={false}>Holiday Peek</Link></h1>
            <div className="w-full md:w-auto flex items-center space-x-2">
                {showSelector ? <CountrySelector
                    selectedCountry={selectedCountry}
                    onValueChange={handleSelectChange}
                    countryList={COUNTRIES}
                /> : null}
                {getModeButton(theme)}
            </div>
        </div>
    );
}

export default Header;