// client/ src/ pages / profile 

// client/src/pages/Profile.tsx
import { useMe } from "../hooks/useMe";
import { isLoggedIn } from "../auth/auth";

export default function Profile() {
  const { me, loading, error } = useMe(isLoggedIn());

  if (loading) {
    return (
      <div className="flex justify-center pt-20">
        <p className="text-lg">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center pt-20">
        <div className="w-[420px] rounded border border-red-300 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  if (!me) return null;

  const fullName = [me.first_name, me.last_name].filter(Boolean).join(" ");

  return (
    <div className="flex justify-center pt-14 px-4">
      <div className="w-[520px] bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>

        <div className="space-y-2">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg">{fullName || "—"}</p>
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
      </div>
    </div>
  );
}
