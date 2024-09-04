import { Card } from "@/components/ui/card";
import Holiday from "@/interfaces/Holiday";
import { COUNTRIES } from "@/utils/constants";

type StaticPropsParams = {
  params: {
    id: string,
    slug: string
  };
};

type MainProps = {
  holidays: Holiday[];
};

export async function getStaticPaths() {
  const paths = COUNTRIES.map((country) => ({
    params: { id: country.countryCode, slug: country.slug },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }: StaticPropsParams) {
  const country = COUNTRIES.find(country => country.slug === params.slug);

  const res = await fetch(`http://localhost:3000/data/${country?.countryCode}.json`)
  const holidays = await res.json();

  return { props: { holidays } }
}

export default function CountryPage({ holidays }: MainProps) {
  return (
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
  );
}
