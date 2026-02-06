// client/src/pages/AddVehicle.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../components/button";
import { createAuto } from "../api/autos.api";
import type { AutoCreateRequest } from "../types";

export default function AddVehicle() {
  const navigate = useNavigate();

  const [form, setForm] = useState<AutoCreateRequest>({
    vin: "",
    make: "",
    model: "",
    vehicle_year: new Date().getFullYear(),
    miles: 0,
    owner_id: 1, // TEMP until auth exists
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update<K extends keyof AutoCreateRequest>(
    key: K,
    value: AutoCreateRequest[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const handleSave = async () => {
    setError("");

    // basic validation
    if (form.vin.length !== 17) {
      setError("VIN must be exactly 17 characters.");
      return;
    }
    if (!form.make || !form.model) {
      setError("Make and Model are required.");
      return;
    }

    try {
      setSaving(true);
      await createAuto(form);
      navigate("/garage");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.join?.(", ") ||
        err?.message ||
        "Failed to save vehicle";
      setError(msg);
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Add Vehicle</h1>

      {error && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block font-medium">VIN</label>
          <input
            className="w-full border p-2 rounded"
            value={form.vin}
            maxLength={17}
            onChange={(e) => update("vin", e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Make</label>
          <input
            className="w-full border p-2 rounded"
            value={form.make}
            onChange={(e) => update("make", e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Model</label>
          <input
            className="w-full border p-2 rounded"
            value={form.model}
            onChange={(e) => update("model", e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Year</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={form.vehicle_year}
            onChange={(e) =>
              update("vehicle_year", Number(e.target.value))
            }
          />
        </div>

        <div>
          <label className="block font-medium">Miles</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={form.miles}
            onChange={(e) => update("miles", Number(e.target.value))}
          />
        </div>
      </div>

      <div className="mt-6">
        <MyButton
          label={saving ? "Saving..." : "Save"}
          onClick={handleSave}
          disabled={saving}
        />
      </div>
    </div>
  );
}

