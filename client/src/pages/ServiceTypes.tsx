import { useEffect, useMemo, useState } from "react";
import type { ServiceType, ServiceTypeCreateRequest } from "../types";
import {
  fetchServiceTypes,
  createServiceType,
  updateServiceType,
  deactivateServiceType,
} from "../api/serviceTypes.api";
import { useMeContext } from "../auth/MeProvider";

export default function ServiceTypes() {
  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));

  const [items, setItems] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showInactive, setShowInactive] = useState(false);
  const { me } = useMeContext();
  const createdby = me?.email || "demo-user";

  const filtered = useMemo(() => {
    if (showInactive) return items;
    return items.filter((x) => x.isactive !== false);
  }, [items, showInactive]);

  const [form, setForm] = useState<ServiceTypeCreateRequest>({
    servicename: "",
    servicecategory: "",
    description: "",
    isactive: true,
  });

  const [adding, setAdding] = useState(false);

  // inline editing
  const [editingId, setEditingId] = useState<number | null>(null);
  const [edit, setEdit] = useState<Partial<ServiceTypeCreateRequest>>({});

  async function load() {
    setError("");
    setSuccess("");
    try {
      setLoading(true);
      const result = await fetchServiceTypes(); // no active filter: show all
      setItems(result.data);
    } catch (err: any) {
      const msg =
        err?.response?.data?.errors?.join?.(", ") ||
        err?.message ||
        "Failed to load service types";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd() {
    setError("");
    setSuccess("");

    if (!isLoggedIn) return setError("Log in to add service types.");
    if (!form.servicename.trim()) return setError("Service name is required.");
    if (!form.servicecategory.trim()) return setError("Category is required.");

    try {
      setAdding(true);

      const result = await createServiceType({
        ...form,
        servicename: form.servicename.trim(),
        servicecategory: form.servicecategory.trim(),
        description: form.description?.trim() || undefined,
        isactive: form.isactive ?? true,
        createdby, // ✅ from useMeContext()
      });

      setItems((prev) => [result.data, ...prev]);
      setSuccess("Service type created.");
      setForm({
        servicename: "",
        servicecategory: "",
        description: "",
        isactive: true,
      });
    } catch (err: any) {
      const msg =
        err?.response?.data?.errors?.join?.(", ") ||
        err?.message ||
        "Failed to create service type";
      setError(msg);
    } finally {
      setAdding(false);
    }
  }


  function startEditRow(st: ServiceType) {
    if (!isLoggedIn) return;
    setSuccess("");
    setError("");
    setEditingId(st.servicetype_id);
    setEdit({
      servicename: st.servicename,
      servicecategory: st.servicecategory,
      description: st.description ?? "",
      isactive: st.isactive ?? true,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEdit({});
  }

  async function saveEdit(id: number) {
    setError("");
    setSuccess("");

    if (!isLoggedIn) return setError("Log in to edit service types.");
    if (!edit.servicename?.trim()) return setError("Service name is required.");
    if (!edit.servicecategory?.trim()) return setError("Category is required.");

    try {
      setSavingId(id);
      const updated = await updateServiceType(id, {
        servicename: edit.servicename.trim(),
        servicecategory: edit.servicecategory.trim(),
        description: edit.description?.trim() || undefined,
        isactive: edit.isactive ?? true,
      });

      setItems((prev) =>
        prev.map((x) => (x.servicetype_id === id ? updated.data : x))
      );
      setSuccess("Service type updated.");
      cancelEdit();
    } catch (err: any) {
      const msg =
        err?.response?.data?.errors?.join?.(", ") ||
        err?.message ||
        "Failed to update service type";
      setError(msg);
    } finally {
      setSavingId(null);
    }
  }

  async function handleDeactivate(id: number) {
    setError("");
    setSuccess("");

    if (!isLoggedIn) return setError("Log in to deactivate service types.");
    if (!confirm("Deactivate this service type?")) return;

    try {
      setSavingId(id);
      const updated = await deactivateServiceType(id);

      // server returns the updated record if you kept select; if not, reload
      if (updated?.data) {
        setItems((prev) =>
          prev.map((x) => (x.servicetype_id === id ? updated.data : x))
        );
      } else {
        await load();
      }

      setSuccess("Service type deactivated.");
    } catch (err: any) {
      const msg =
        err?.response?.data?.errors?.join?.(", ") ||
        err?.message ||
        "Failed to deactivate service type";
      setError(msg);
    } finally {
      setSavingId(null);
    }
  }

  if (loading) return <div className="p-4">Loading service types…</div>;

  return (
    <div className="p-4 max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Service Types</h1>

        <label className="text-sm text-gray-600 flex items-center gap-2">
          <input
            type="checkbox"
            checked={showInactive}
            onChange={(e) => setShowInactive(e.target.checked)}
          />
          Show inactive
        </label>
      </div>

      {error && (
        <div className="rounded border border-red-300 bg-red-50 p-3 text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded border border-green-300 bg-green-50 p-3 text-green-800">
          {success}
        </div>
      )}

      {/* Add form */}
      <div className="bg-white rounded shadow p-4 space-y-3">
        <h2 className="text-lg font-bold">Add Service Type</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block font-medium">Service Name</label>
            <input
              className="w-full border rounded p-2"
              value={form.servicename}
              onChange={(e) => setForm((p) => ({ ...p, servicename: e.target.value }))}
              disabled={!isLoggedIn || adding}
            />
          </div>

          <div>
            <label className="block font-medium">Category</label>
            <input
              className="w-full border rounded p-2"
              value={form.servicecategory}
              onChange={(e) =>
                setForm((p) => ({ ...p, servicecategory: e.target.value }))
              }
              disabled={!isLoggedIn || adding}
            />
          </div>
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            className="w-full border rounded p-2"
            value={form.description ?? ""}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            disabled={!isLoggedIn || adding}
          />
        </div>

        <label className="text-sm text-gray-700 flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isactive ?? true}
            onChange={(e) => setForm((p) => ({ ...p, isactive: e.target.checked }))}
            disabled={!isLoggedIn || adding}
          />
          Active
        </label>

        <button
          className="px-3 py-2 rounded bg-gray-800 text-white disabled:opacity-50"
          onClick={handleAdd}
          disabled={!isLoggedIn || adding}
        >
          {adding ? "Adding..." : "Add Service Type"}
        </button>

        {!isLoggedIn && (
          <div className="text-sm text-gray-500">
            Log in to add/edit service types.
          </div>
        )}
      </div>

      {/* List */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-bold">All Service Types</h2>

        {filtered.length === 0 ? (
          <p className="mt-3 text-gray-600">No service types found.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {filtered.map((st) => {
              const isEditing = editingId === st.servicetype_id;

              return (
                <li key={st.servicetype_id} className="border rounded p-3">
                  {!isEditing ? (
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-medium">
                          {st.servicename}{" "}
                          <span className="text-sm text-gray-500">
                            ({st.servicecategory})
                          </span>
                        </div>
                        {st.description && (
                          <div className="text-sm text-gray-700 mt-1">
                            {st.description}
                          </div>
                        )}
                        {st.isactive === false && (
                          <div className="text-xs text-gray-500 mt-1">
                            Inactive
                          </div>
                        )}
                      </div>

                      {isLoggedIn && (
                        <div className="flex gap-2">
                          <button
                            className="px-3 py-1 rounded border"
                            onClick={() => startEditRow(st)}
                          >
                            Edit
                          </button>

                          {st.isactive !== false && (
                            <button
                              className="px-3 py-1 rounded border border-red-300 text-red-700 disabled:opacity-50"
                              onClick={() => handleDeactivate(st.servicetype_id)}
                              disabled={savingId === st.servicetype_id}
                            >
                              {savingId === st.servicetype_id ? "Working..." : "Deactivate"}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-medium">Service Name</label>
                          <input
                            className="w-full border rounded p-2"
                            value={edit.servicename ?? ""}
                            onChange={(e) =>
                              setEdit((p) => ({ ...p, servicename: e.target.value }))
                            }
                            disabled={savingId === st.servicetype_id}
                          />
                        </div>

                        <div>
                          <label className="block font-medium">Category</label>
                          <input
                            className="w-full border rounded p-2"
                            value={edit.servicecategory ?? ""}
                            onChange={(e) =>
                              setEdit((p) => ({
                                ...p,
                                servicecategory: e.target.value,
                              }))
                            }
                            disabled={savingId === st.servicetype_id}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-medium">Description</label>
                        <textarea
                          className="w-full border rounded p-2"
                          value={edit.description ?? ""}
                          onChange={(e) =>
                            setEdit((p) => ({ ...p, description: e.target.value }))
                          }
                          disabled={savingId === st.servicetype_id}
                        />
                      </div>

                      <label className="text-sm text-gray-700 flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={Boolean(edit.isactive)}
                          onChange={(e) =>
                            setEdit((p) => ({ ...p, isactive: e.target.checked }))
                          }
                          disabled={savingId === st.servicetype_id}
                        />
                        Active
                      </label>

                      <div className="flex justify-end gap-2">
                        <button
                          className="px-3 py-2 rounded border"
                          onClick={cancelEdit}
                          disabled={savingId === st.servicetype_id}
                        >
                          Cancel
                        </button>

                        <button
                          className="px-3 py-2 rounded bg-gray-800 text-white disabled:opacity-50"
                          onClick={() => saveEdit(st.servicetype_id)}
                          disabled={savingId === st.servicetype_id}
                        >
                          {savingId === st.servicetype_id ? "Saving..." : "Save"}
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
