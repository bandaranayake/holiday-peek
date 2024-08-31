"use client"

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { COUNTRIES } from "@/utils/constants";
import Holiday from "@/interfaces/Holiday";
import CountrySelector from "@/components/CountrySelector";
import { getCountry } from "@/utils/timezone";

export default function Main() {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    const userCountryCode = getCountry();
    if (userCountryCode && COUNTRIES.some(country => country.countryCode === userCountryCode)) {
      setSelectedCountry(userCountryCode);
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
        <div className="w-full md:w-auto">
          <CountrySelector selectedCountry={selectedCountry} onValueChange={setSelectedCountry} countryList={COUNTRIES} />
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
      <footer className="mt-12 text-center text-muted-foreground">
        <p>&copy; 2024 HolidayPeek. All rights reserved.</p>
      </footer>
    </div>
  )
}
