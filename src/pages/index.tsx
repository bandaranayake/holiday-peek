import { COUNTRIES } from "@/utils/constants";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COUNTRIES.map((country, index) => (
                <Link
                    key={index}
                    href={`/countries/${country.slug}`}
                    prefetch={false}
                    className="flex items-center p-4 border rounded-lg"
                >
                    <img
                        src={`/images/flags/${country.countryCode}.png`}
                        alt={`${country.name} Flag`}
                        className="w-8 h-8 mr-3"
                    />
                    <span className="text-lg font-medium">{country.name}</span>
                </Link>
            ))}
        </div>
    );
}
