"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes"
import { Card } from "@/components/ui/card";
import { COUNTRIES } from "@/utils/constants";
import Holiday from "@/interfaces/Holiday";
import CountrySelector from "@/components/CountrySelector";
import { getCountry } from "@/utils/timezone";
import DialogAttribution from "@/components/DialogAttribution";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export default function Main() {
  const { theme, setTheme } = useTheme()

  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    const userCountryCode = getCountry();
    if (userCountryCode && COUNTRIES.some(country => country.countryCode === userCountryCode)) {
      setSelectedCountry(userCountryCode);
    }
    else {
      setSelectedCountry(COUNTRIES[0].countryCode);
    }
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetch(`data/${selectedCountry}.json`)
        .then(response => response.json())
        .then((data: Holiday[]) => setHolidays(data))
        .catch(error => console.error('Error fetching holidays:', error));
    }
  }, [selectedCountry]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 md:px-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Holiday Peek</h1>
        <div className="w-full md:w-auto flex items-center space-x-2">
          <CountrySelector selectedCountry={selectedCountry} onValueChange={setSelectedCountry} countryList={COUNTRIES} />
          {theme === "light" ?
            <Button variant="outline" size="icon">
              <SunIcon className="h-4 w-4" onClick={() => setTheme("dark")} />
            </Button>
            :
            <Button variant="outline" size="icon">
              <MoonIcon className="h-4 w-4" onClick={() => setTheme("light")} />
            </Button>
          }
        </div>
      </div>
      <div className="grid gap-2">
        {holidays.map((holiday, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{holiday.name}</h3>
              <p className="text-muted-foreground">{holiday.date}</p>
            </div>
            <p className="text-muted-foreground">{holiday.localName}</p>
          </Card>
        ))}
      </div>
      <footer className="mt-12 pt-4 text-sm text-muted-foreground">
        <div className="container max-w-6xl mx-auto flex justify-between">
          <p>&copy; 2024 HolidayPeek. All rights reserved.</p>
          <nav className="flex gap-4">
            <Link href="https://github.com/bandaranayake/holiday-peek" target="_blank" className="hover:underline" prefetch={false}>
              Contribute
            </Link>
            <DialogAttribution />
          </nav>
        </div>
      </footer>

    </div>
  )
}
