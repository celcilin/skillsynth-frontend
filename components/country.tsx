import { useEffect, useState } from "react";
import countries from "world-countries";

export default function CountrySelect({ value, onChange }) {
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );

  useEffect(() => {
    // Load client-side to avoid SSR hydration mismatches
    setOptions(
      countries.map((country) => ({
        value: country.cca2,
        label: country.name.common,
      }))
    );
  }, []);

  return (
    <select
      className="w-full rounded-md bg-white/5 px-3 py-1.5 text-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" className="text-white bg-black">
        Select a country
      </option>
      {options.map((c) => (
        <option key={c.value} value={c.value} className="text-white bg-black">
          {c.label}
        </option>
      ))}
    </select>
  );
}
