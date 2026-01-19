// client/src/pages/VehicleDetails.tsx
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { fetchAutoById } from "../api/autos.api";
import { createPart } from "../api/parts.api";
import {
  fetchMaintenance,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
} from "../api/maintenance.api";
import { fetchMaintenanceMeta } from "../api/meta.api";
import type {
  Auto,
  VehicleMaintenanceNested,
  VehicleMaintenanceCreateRequest,
  PartCreateRequest,
} from "../types";
import Modal from "../components/Modal";
import MyButton from "../components/button";


export default function VehicleDetails() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const vinId = useMemo(() => Number(params.id), [params.id]);
  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));
  const openFromRoute = location.pathname.endsWith("/add-maintenance");

  const [auto, setAuto] = useState<Auto | null>(null);
  const [maintenance, setMaintenance] = useState<VehicleMaintenanceNested[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [meta, setMeta] = useState<{ maintTypes: string[]; statuses: string[] } | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [partModalOpen, setPartModalOpen] = useState(false);
  const [partForMaintenanceId, setPartForMaintenanceId] = useState<number | null>(null);

  const [partForm, setPartForm] = useState<Omit<PartCreateRequest, "maintenance_id">>({
    part_name: "",
    part_number: "",
    part_type: "",
    brand: "",
    quantity: 1,
    unit_cost: 0,
    supplier_name: "",
    purchase_date: "",
    under_warranty: false,
    warranty_expiration: "",
    created_by: "demo-user",
    notes: "",
  });

  const [partSaving, setPartSaving] = useState(false);
  const [partError, setPartError] = useState("");


  const [form, setForm] = useState<VehicleMaintenanceCreateRequest>({
    vehicle_id: vinId,
    status: "runs & drives",
    odometerreading: 0,
    createdby: "demo-user",
    isactive: true,
    warrantystatus: false,
    mainttype: "preventive",
    description: "",
  });

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null); // ✅ B: per-row delete disable
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");

  // modal open/close follows route
  useEffect(() => {
    setModalOpen(openFromRoute);
  }, [openFromRoute]);

  // load meta once
  useEffect(() => {
    (async () => {
      try {
        const metaResult = await fetchMaintenanceMeta();
        setMeta(metaResult.data);
      } catch (err) {
        console.error("Failed to load maintenance meta", err);
      }
    })();
  }, []);

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
        fetchMaintenance(vinId), // server filters/sorts
      ]);

      setAuto(autoResult.data);
      setMaintenance(maintenanceResult.data);
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

  // load page data when vin changes
  useEffect(() => {
    setForm((prev) => ({ ...prev, vehicle_id: vinId }));
    loadPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vinId]);

  // normalize form values once meta loads
  useEffect(() => {
    if (!meta) return;

    setForm((prev) => ({
      ...prev,
      mainttype: meta.maintTypes.includes(prev.mainttype ?? "")
        ? prev.mainttype
        : meta.maintTypes[0],
      status: meta.statuses.includes(prev.status ?? "")
        ? prev.status
        : meta.statuses[0],
    }));
  }, [meta]);

  function openModal() {
    if (!isLoggedIn) return;

    setEditingId(null);
    setSuccess("");
    setFormError("");

    setForm((prev) => ({
      ...prev,
      vehicle_id: vinId,
      mainttype: meta?.maintTypes?.[0] ?? prev.mainttype,
      status: meta?.statuses?.[0] ?? prev.status,
      odometerreading: 0,
      description: "",
    }));

    navigate(`/vehicle/${vinId}/add-maintenance`);
  }

  function closeModal() {
    setFormError("");
    setEditingId(null);
    navigate(`/vehicle/${vinId}`);
  }

  async function handleSaveMaintenance() {
    setFormError("");
    setSuccess("");

    if (!form.status) return setFormError("Status is required.");
    if (form.odometerreading < 0) return setFormError("Odometer reading must be 0 or more.");
    if (!meta) return setFormError("Metadata not loaded yet.");

    try {
      setSaving(true);

      // EDIT
      if (editingId) {
        const updated = await updateMaintenance(editingId, {
          mainttype: form.mainttype,
          status: form.status,
          odometerreading: form.odometerreading,
          description: form.description,
        });

        setMaintenance((prev) =>
          prev.map((x) => (x.maintenance_id === editingId ? updated.data : x))
        );

        setSuccess("Maintenance updated.");
        closeModal();
        return;
      }

      // ADD
      const created = await createMaintenance(form);
      setMaintenance((prev) => [created.data, ...prev]);
      setSuccess("Maintenance added.");
      closeModal();
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.join?.(", ") ||
        err?.message ||
        "Failed to save maintenance";
      setFormError(msg);
      console.error("saveMaintenance error:", err);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteMaintenance(id: number) {
    if (!confirm("Delete this maintenance entry?")) return;

    const snapshot = maintenance;
    setMaintenance((prev) => prev.filter((x) => x.maintenance_id !== id));

    try {
      setDeletingId(id); // ✅ B: disable only this row
      await deleteMaintenance(id);
      setSuccess("Maintenance deleted.");
    } catch (err) {
      setMaintenance(snapshot); // rollback
      console.error("deleteMaintenance error:", err);
      setSuccess("");
      alert("Delete failed. Restored previous list.");
    } finally {
      setDeletingId(null);
    }
  }

  function startEdit(m: VehicleMaintenanceNested) {
    setEditingId(m.maintenance_id);
    setFormError("");
    setSuccess("");

    setForm((prev) => ({
      ...prev,
      vehicle_id: vinId,
      mainttype: m.mainttype ?? prev.mainttype,
      status: m.status ?? prev.status,
      odometerreading: m.odometerreading ?? 0,
      description: m.description ?? "",
    }));

    navigate(`/vehicle/${vinId}/add-maintenance`);
  }
  function openPartModal(maintenanceId: number) {
    if (!isLoggedIn) return;
    setPartError("");
    setPartForMaintenanceId(maintenanceId);
    setPartModalOpen(true);
  }

  function closePartModal() {
    setPartError("");
    setPartForMaintenanceId(null);
    setPartModalOpen(false);
  }

  async function handleSavePart() {
    setPartError("");

    if (!partForMaintenanceId) {
      return setPartError("No maintenance selected.");
    }
    if (!partForm.part_name?.trim()) {
      return setPartError("Part name is required.");
    }
    if ((partForm.quantity ?? 0) < 0) {
      return setPartError("Quantity must be 0 or more.");
    }
    if ((partForm.unit_cost ?? 0) < 0) {
      return setPartError("Unit cost must be 0 or more.");
    }

    try {
      setPartSaving(true);

      await createPart({
        maintenance_id: partForMaintenanceId, // ✅ key wiring
        ...partForm,
        // normalize empty strings to undefined (optional but cleaner)
        purchase_date: partForm.purchase_date || undefined,
        warranty_expiration: partForm.warranty_expiration || undefined,
      });

      setSuccess("Part added.");
      closePartModal();
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.join?.(", ") ||
        err?.message ||
        "Failed to add part";
      setPartError(msg);
      console.error("createPart error:", err);
    } finally {
      setPartSaving(false);
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
          <span className="font-medium">Miles:</span> {auto.miles.toLocaleString()}
        </div>
        <div>
          <span className="font-medium">Vehicle ID:</span> {auto.vin_id}
        </div>
      </div>

      {success && (
        <div className="mt-4 rounded border border-green-300 bg-green-50 p-2 text-green-800">
          {success}
        </div>
      )}

      <div className="mt-6 bg-white rounded shadow p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Maintenance History</h2>
          {isLoggedIn ? (
            <button
              className="px-3 py-2 rounded bg-gray-800 text-white disabled:opacity-50"
              onClick={openModal}
              disabled={!meta || saving} // ✅ B: prevent opening while saving / meta missing
            >
              Add Maintenance
            </button>
          ) : (
            <button
              className="px-3 py-2 rounded bg-gray-300 text-gray-600 cursor-not-allowed"
              title="Log in to add maintenance"
              disabled
            >
              Add Maintenance
            </button>
          )}
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

                {/* ✅ C: Dates left, actions right */}
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div className="text-xs text-gray-500 space-y-1">
                    {/* ✅ A: Created date */}
                    {m.createddate && (
                      <div>
                        Created: {new Date(m.createddate).toLocaleString()}
                      </div>
                    )}

                    {/* ✅ A: Updated date only if different */}
                    {m.updateddate && m.updateddate !== m.createddate && (
                      <div className="text-gray-400">
                        Updated: {new Date(m.updateddate).toLocaleString()}
                      </div>
                    )}
                  </div>

                  {/* ✅ Auth gated + ✅ B disabled during delete/save */}
                  {isLoggedIn && (
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 rounded border disabled:opacity-50"
                        onClick={() => startEdit(m)}
                        disabled={saving || deletingId === m.maintenance_id || partSaving}
                      >
                        Edit
                      </button>

                      <button
                        className="px-3 py-1 rounded border disabled:opacity-50"
                        onClick={() => openPartModal(m.maintenance_id)}
                        disabled={saving || deletingId === m.maintenance_id || partSaving}
                      >
                        Add Part
                      </button>

                      <button
                        className="px-3 py-1 rounded border border-red-300 text-red-700 disabled:opacity-50"
                        onClick={() => handleDeleteMaintenance(m.maintenance_id)}
                        disabled={saving || deletingId === m.maintenance_id || partSaving}
                      >
                        {deletingId === m.maintenance_id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal open={partModalOpen} title="Add Part" onClose={closePartModal}>
        {partError && (
          <div className="mb-3 rounded border border-red-300 bg-red-50 p-2 text-red-700">
            {partError}
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label className="block font-medium">Part Name</label>
            <input
              className="w-full border rounded p-2"
              value={partForm.part_name ?? ""}
              onChange={(e) => setPartForm((p) => ({ ...p, part_name: e.target.value }))}
              disabled={partSaving}
            />
          </div>

          <div>
            <label className="block font-medium">Quantity</label>
            <input
              type="number"
              className="w-full border rounded p-2"
              value={partForm.quantity ?? 0}
              onChange={(e) =>
                setPartForm((p) => ({ ...p, quantity: Number(e.target.value) }))
              }
              disabled={partSaving}
            />
          </div>

          <div>
            <label className="block font-medium">Unit Cost</label>
            <input
              type="number"
              className="w-full border rounded p-2"
              value={partForm.unit_cost ?? 0}
              onChange={(e) =>
                setPartForm((p) => ({ ...p, unit_cost: Number(e.target.value) }))
              }
              disabled={partSaving}
            />
          </div>

          <div>
            <label className="block font-medium">Under Warranty</label>
            <input
              type="checkbox"
              className="mr-2"
              checked={Boolean(partForm.under_warranty)}
              onChange={(e) =>
                setPartForm((p) => ({ ...p, under_warranty: e.target.checked }))
              }
              disabled={partSaving}
            />
            <span className="text-sm text-gray-700">Yes</span>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              className="px-3 py-2 rounded border disabled:opacity-50"
              onClick={closePartModal}
              disabled={partSaving}
            >
              Cancel
            </button>

            <MyButton
              label={partSaving ? "Saving..." : "Save Part"}
              onClick={handleSavePart}
              disabled={partSaving}
            />
          </div>
        </div>
      </Modal>

    </div>
  );
}


