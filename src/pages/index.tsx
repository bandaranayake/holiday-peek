import { COUNTRIES } from "@/utils/constants";
import Image from "next/image";
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
                    <Image
                        src={`/images/flags/${country.countryCode}.png`}
                        alt={`${country.name} Flag`}
                        width={32}
                        height={32}
                        className="mr-3"
                    />
                    <span className="text-lg font-medium">{country.name}</span>
                </Link>
            ))}
        </div>
    );
}
