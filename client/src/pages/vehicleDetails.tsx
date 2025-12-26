// client/src/pages/VehicleDetails.tsx
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { fetchAutoById } from "../api/autos.api";
import { fetchMaintenance, createMaintenance } from "../api/maintenance.api";
import type { Auto, VehicleMaintenanceNested, VehicleMaintenanceCreateRequest } from "../types";
import Modal from "../components/Modal";
import MyButton from "../components/button";

const MAINT_TYPES = ["preventive", "corrective", "inspection", "customization"] as const;
const STATUS_VALUES = ["inop", "turns over", "runs & drives"] as const;


export default function VehicleDetails() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const vinId = useMemo(() => Number(params.id), [params.id]);
  const openFromRoute = location.pathname.endsWith("/add-maintenance");

  const [auto, setAuto] = useState<Auto | null>(null);
  const [maintenance, setMaintenance] = useState<VehicleMaintenanceNested[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  // modal form state
  const [form, setForm] = useState<VehicleMaintenanceCreateRequest>({
    vehicle_id: vinId,
    status: "inop",
    odometerreading: 0,
    createdby: "demo-user",
    isactive: true,
    warrantystatus: false,
    // optional fields:
    mainttype: "preventive",
    description: "",
  });

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");



  // keep modal state in sync with the route
  useEffect(() => {
    setModalOpen(openFromRoute);
  }, [openFromRoute]);

  async function loadPage() {
    setError("");

    if (!Number.isFinite(vinId)) {
      setError("Invalid vehicle id in URL.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const [autoResult, maintenanceResult] = await Promise.all([
        fetchAutoById(vinId),
        fetchMaintenance(),
      ]);

      setAuto(autoResult.data);

      const filtered = maintenanceResult.data.filter((m) => m.vehicle_id === vinId);
      setMaintenance(filtered);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to load vehicle details";
      setError(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // update form vehicle_id if vinId changes
    setForm((prev) => ({ ...prev, vehicle_id: vinId }));
    loadPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vinId]);

  function openModal() {
    // route-backed open (nice UX + deep link)
    navigate(`/vehicle/${vinId}/add-maintenance`);
  }

  function closeModal() {
    setFormError("");
    navigate(`/vehicle/${vinId}`); // removes /add-maintenance
  }

  async function handleSaveMaintenance() {
    setFormError("");

    if (!form.status) return setFormError("Status is required.");
    if (form.odometerreading < 0)
      return setFormError("Odometer reading must be 0 or more.");

    try {
      setSaving(true);
      await createMaintenance(form);

      // refresh list
      const maintenanceResult = await fetchMaintenance();
      const filtered = maintenanceResult.data.filter((m) => m.vehicle_id === vinId);
      setMaintenance(filtered);

      closeModal();
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.join?.(", ") ||
        err?.message ||
        "Failed to add maintenance";
      setFormError(msg);
      console.error("createMaintenance error:", err);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-4">Loading vehicle…</div>;

  if (error) {
    return (
      <div className="p-4">
        <div className="rounded border border-red-300 bg-red-50 p-3 text-red-700">
          {error}
        </div>
        <div className="mt-4">
          <Link className="underline" to="/garage">
            Back to Garage
          </Link>
        </div>
      </div>
    );
  }

  if (!auto) return <div className="p-4">Vehicle not found.</div>;

  return (
    <div className="p-4 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {auto.vehicle_year} {auto.make} {auto.model}
        </h1>
        <Link className="underline" to="/garage">
          Back to Garage
        </Link>
      </div>

      <div className="mt-4 bg-white rounded shadow p-4 space-y-2">
        <div>
          <span className="font-medium">VIN:</span> {auto.vin}
        </div>
        <div>
          <span className="font-medium">Miles:</span>{" "}
          {auto.miles.toLocaleString()}
        </div>
        <div>
          <span className="font-medium">Vehicle ID:</span> {auto.vin_id}
        </div>
      </div>

      <div className="mt-6 bg-white rounded shadow p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Maintenance History</h2>

          <button
            className="px-3 py-2 rounded bg-gray-800 text-white"
            onClick={openModal}
          >
            Add Maintenance
          </button>
        </div>

        {maintenance.length === 0 ? (
          <p className="mt-3 text-gray-600">No maintenance records for this vehicle.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {maintenance.map((m) => (
              <li key={m.maintenance_id} className="border rounded p-3">
                <div className="font-medium">
                  {m.mainttype ?? "Maintenance"} — {m.status}
                </div>
                <div className="text-sm text-gray-600">
                  Odometer: {m.odometerreading.toLocaleString()} mi
                </div>
                {m.description && <div className="mt-1">{m.description}</div>}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal open={modalOpen} title="Add Maintenance" onClose={closeModal}>
        {formError && (
          <div className="mb-3 rounded border border-red-300 bg-red-50 p-2 text-red-700">
            {formError}
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label className="block font-medium">Type</label>
            <select
              className="w-full border rounded p-2"
              value={form.mainttype ?? "preventive"}
              onChange={(e) =>
                setForm((p) => ({ ...p, mainttype: e.target.value }))
              }
            >
              {MAINT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium">Status</label>
            <select
              className="w-full border rounded p-2"
              value={form.status}
              onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
            >
              {STATUS_VALUES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>


          <div>
            <label className="block font-medium">Odometer Reading</label>
            <input
              type="number"
              className="w-full border rounded p-2"
              value={form.odometerreading}
              onChange={(e) =>
                setForm((p) => ({ ...p, odometerreading: Number(e.target.value) }))
              }
            />
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <textarea
              className="w-full border rounded p-2"
              value={form.description ?? ""}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="Notes..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button className="px-3 py-2 rounded border" onClick={closeModal}>
              Cancel
            </button>
            <MyButton
              label={saving ? "Saving..." : "Save"}
              onClick={handleSaveMaintenance}
              disabled={saving}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

