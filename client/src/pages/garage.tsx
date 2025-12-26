// client/src/pages/Garage.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAutos } from "../api/autos.api";
import type { Auto } from "../types";

export default function Garage() {
  const [autos, setAutos] = useState<Auto[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const result = await fetchAutos();
        setAutos(result.data);
      } catch (err: any) {
        setError(err?.message ?? "Failed to load vehicles");
      }
    })();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">My Garage</h1>
        <Link to="/add-vehicle" className="underline">
          Add Vehicle
        </Link>
      </div>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {!error && autos.length === 0 && (
        <p className="mt-4">No vehicles yet.</p>
      )}

      <ul className="mt-4 space-y-2">
        {autos.map((auto) => (
          <li
            key={auto.vin_id}
            className="bg-white p-3 rounded shadow"
          >
            <Link to={`/vehicle/${auto.vin_id}`} className="underline">
              {auto.vehicle_year} {auto.make} {auto.model} (
              {auto.miles.toLocaleString()} mi)
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
