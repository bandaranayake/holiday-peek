"use client";

import { useEffect } from "react";
import { useRouter } from 'next/router';
import { getCountry } from "@/utils/timezone";
import { COUNTRIES } from "@/utils/constants";

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        const userCountryCode = getCountry();
        const country = COUNTRIES.find(country => country.countryCode === userCountryCode);

        if (country) {
            router.push(`country/${country.slug}`);
        }
        else {
            router.push(`country/${COUNTRIES[0].slug}`);
        }
    }, [router]);

    return null;
}
