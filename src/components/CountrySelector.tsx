import React, { Dispatch, SetStateAction } from 'react';
import Country from '@/interfaces/Country';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Image from 'next/image';

interface CountrySelectorProps {
    selectedCountry: string;
    onValueChange: Dispatch<SetStateAction<string>>;
    countryList: Country[];
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ selectedCountry, onValueChange, countryList }) => {
    return (
        <Select value={selectedCountry} onValueChange={onValueChange}>
            <SelectTrigger className="w-full md:w-[300px]">
                {selectedCountry ? <Image src={`/images/flags/${selectedCountry}.png`} alt={selectedCountry} width={16} height={16}></Image> : null}
                <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
                {countryList.map(country => (
                    <SelectItem key={country.countryCode} value={country.countryCode} imageSrc={`/images/flags/${country.countryCode}.png`}>{country.name}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default CountrySelector;

