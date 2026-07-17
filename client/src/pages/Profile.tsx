import { useEffect, useState } from "react";
import { updateMyUserProfile, type UpdateMePayload } from "../api/users.api";
import { useMeContext } from "../auth/MeProvider";

export default function Profile() {
  const { me, loading, refreshMe, setMe } = useMeContext();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<UpdateMePayload>({});
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // preload form when me changes
    if (me) {
      setForm({
        first_name: me.first_name ?? "",
        last_name: me.last_name ?? "",
        phone_number: me.phone_number ?? "",
        email: me.email ?? "",
        mechanic_rating: me.mechanic_rating ?? "",
      });
    }
  }, [me]);

  if (loading && !me) {
    return <div className="flex justify-center pt-20">Loading profile...</div>;
  }

  if (!me) {
    return <div className="flex justify-center pt-20">No profile loaded.</div>;
  }

  const fullName = [me.first_name, me.last_name].filter(Boolean).join(" ") || "—";

  async function onSave() {
    setError("");
    setSaving(true);
    try {
      const result = await updateMyUserProfile({
        first_name: form.first_name,
        last_name: form.last_name,
        phone_number: form.phone_number,
        email: form.email,
        mechanic_rating: form.mechanic_rating,
      });

      // update local immediately + refresh
      setMe(result.data);
      await refreshMe();

      setEditing(false);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to update profile";
      setError(msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex justify-center pt-14 px-4">
      <div className="w-[560px] bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">My Profile</h1>
          {!editing ? (
            <button
              className="px-3 py-2 rounded bg-gray-800 text-white hover:opacity-90"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => {
                  setEditing(false);
                  setError("");
                  // reset to current me
                  setForm({
                    first_name: me.first_name ?? "",
                    last_name: me.last_name ?? "",
                    phone_number: me.phone_number ?? "",
                    email: me.email ?? "",
                    mechanic_rating: me.mechanic_rating ?? "",
                  });
                }}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                className="px-3 py-2 rounded bg-green-700 text-white hover:opacity-90"
                onClick={onSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-4 rounded border border-red-300 bg-red-50 p-2 text-red-700">
            {error}
          </div>
        )}

        {!editing ? (
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-lg">{fullName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg">{me.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-lg">{me.phone_number || "—"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Mechanic Rating</p>
              <p className="text-lg">{me.mechanic_rating || "—"}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <Input label="First name" value={form.first_name ?? ""} onChange={(v) => setForm(f => ({ ...f, first_name: v }))} />
            <Input label="Last name" value={form.last_name ?? ""} onChange={(v) => setForm(f => ({ ...f, last_name: v }))} />
            <Input label="Email" value={form.email ?? ""} onChange={(v) => setForm(f => ({ ...f, email: v }))} />
            <Input label="Phone" value={form.phone_number ?? ""} onChange={(v) => setForm(f => ({ ...f, phone_number: v }))} />
            <Input label="Mechanic rating" value={form.mechanic_rating ?? ""} onChange={(v) => setForm(f => ({ ...f, mechanic_rating: v }))} />
          </div>
        )}
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm text-gray-600">{label}</span>
      <input
        className="mt-1 w-full border rounded p-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
