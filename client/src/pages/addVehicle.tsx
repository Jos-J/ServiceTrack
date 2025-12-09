// src/pages/AddVehicle.tsx
import MyButton from "../components/button";

export default function AddVehicle() {
  const handleSave = () => {
    alert("vehicle saved!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Add Vehicle</h1>

      {/* Your form inputs would go here */}

      <MyButton label="Save" onClick={handleSave} />
    </div>
  );
}
