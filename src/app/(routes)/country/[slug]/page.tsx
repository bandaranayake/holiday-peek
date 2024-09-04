"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Card } from "@/components/ui/card";
import { COUNTRIES } from "@/utils/constants";
import Holiday from "@/interfaces/Holiday";
import CountrySelector from "@/components/CountrySelector";
import { getCountry } from "@/utils/timezone";
import DialogAttribution from "@/components/DialogAttribution";
import { Button } from "@/components/ui/button";
import { Moon as MoonIcon, Sun as SunIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Main() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    const slug = segments[1] || "";

    let country;
    country = COUNTRIES.find(country => country.slug === slug);

    if (country) {
      setSelectedCountry(country.countryCode);
    } else {
      const userCountryCode = getCountry();
      country = COUNTRIES.find(country => country.countryCode === userCountryCode);

      if (country) {
        window.history.pushState(null, "", country.slug);
        setSelectedCountry(country.countryCode);
      }
      else {
        window.history.pushState(null, "", COUNTRIES[0].name);
        setSelectedCountry(COUNTRIES[0].countryCode);
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (selectedCountry) {
      fetch(`../data/${selectedCountry}.json`)
        .then((response) => response.json())
        .then((data: Holiday[]) => setHolidays(data))
        .catch((error) => console.error("Error fetching holidays:", error));
    }
  }, [selectedCountry]);

  const handleSelectChange = (countryCode: string) => {
    const country = COUNTRIES.find(country => country.countryCode === countryCode);

    if (country) {
      window.history.pushState(null, "", country.slug)
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 md:px-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
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
      <div className="grid gap-2">
        {holidays.map((holiday, index) => (
          <Card key={index} className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <h3 className="text-xl font-semibold">{holiday.name}</h3>
              <p className="text-muted-foreground sm:ml-4">{holiday.date}</p>
            </div>
            <p className="text-muted-foreground">{holiday.localName}</p>
          </Card>
        ))}
      </div>

      <footer className="mt-12 pt-4 text-sm text-muted-foreground">
        <div className="container max-w-6xl mx-auto px-2 flex flex-col-reverse items-center justify-between sm:flex-row">
          <p className="mt-2">&copy; 2024 HolidayPeek. All rights reserved.</p>
          <nav className="flex gap-4 mt-2 sm:mt-0">
            <Link
              href="https://github.com/bandaranayake/holiday-peek"
              target="_blank"
              className="hover:underline"
              prefetch={false}
            >
              Contribute
            </Link>
            <DialogAttribution />
          </nav>
        </div>
      </footer>
    </div>
  );
}
