"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { COUNTRIES } from "@/utils/constants";
import CountrySelector from "@/components/CountrySelector";
import { Button } from "@/components/ui/button";
import { Moon as MoonIcon, Sun as SunIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/router';

const Header: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();

    const { theme, setTheme } = useTheme();
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const slug = pathname?.split("/").filter(Boolean)?.[1] || "";

        let country = COUNTRIES.find(country => country.slug === slug);

        if (country) {
            setSelectedCountry(country.countryCode);
        }
    }, [pathname]);

    const handleSelectChange = (countryCode: string) => {
        const country = COUNTRIES.find(country => country.countryCode === countryCode);

        if (country) {
            router.push(`/country/${country.slug}`);
        }
    };

    if (!mounted) {
        return null;
    }

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8" suppressHydrationWarning>
            <h1 className="text-3xl font-bold tracking-tight">Holiday Peek</h1>
            <div className="w-full md:w-auto flex items-center space-x-2">
                <CountrySelector
                    selectedCountry={selectedCountry}
                    onValueChange={handleSelectChange}
                    countryList={COUNTRIES}
                />
                {theme === "light" ? (
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setTheme("dark")}
                    >
                        <SunIcon size={16} />
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setTheme("light")}
                    >
                        <MoonIcon size={16} />
                    </Button>
                )}
            </div>
        </div>
    );
}

export default Header;