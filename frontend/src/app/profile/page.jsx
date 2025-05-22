"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState("Profile Information");

  const [profile, setProfile] = useState({
    firstName: "Aman",
    lastName: "Tiwari",
    gender: "Male",
    email: "aman@example.com",
    phone: "9031359720",
  });

  const [editingProfile, setEditingProfile] = useState(false);
  const [addresses, setAddresses] = useState([
    { id: 1, type: "Home", address: "123, Greater Noida, UP, India", phone: "9031359720" },
    { id: 2, type: "Work", address: "456, Noida, UP, India", phone: "9876543210" },
  ]);

  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [newAddress, setNewAddress] = useState({ type: "", address: "", phone: "" });

  // Handle Profile Edit & Save
  const handleProfileEdit = () => setEditingProfile(true);
  const handleProfileSave = () => setEditingProfile(false);
  const handleProfileDelete = () => {
    if (confirm("Are you sure you want to delete your profile?")) {
      setProfile({ firstName: "", lastName: "", gender: "", email: "", phone: "" });
    }
  };

  // Handle Address Edit, Save, Delete
  const handleAddressEdit = (id) => setEditingAddressId(id);
  const handleAddressSave = () => setEditingAddressId(null);
  const handleAddressDelete = (id) => setAddresses(addresses.filter((addr) => addr.id !== id));

  // Handle Address Add
  const handleAddAddress = () => {
    if (newAddress.type && newAddress.address && newAddress.phone) {
      setAddresses([...addresses, { id: Date.now(), ...newAddress }]);
      setNewAddress({ type: "", address: "", phone: "" });
    }
  };

  return (
    <div className="flex">
      {/* Sidebar Menu */}
      <div className="w-64 bg-gray-900 text-white p-4 h-screen flex flex-col">
        <h2 className="text-lg font-bold mb-4">Hello, Aman Tiwari</h2>
        <div className="mb-4">
          <h3 className="font-semibold text-gray-300">ACCOUNT SETTINGS</h3>
          <ul>
            <li
              className={`cursor-pointer p-2 rounded-md ${selectedItem === "Profile Information" ? "bg-gray-700" : "hover:bg-gray-700"}`}
              onClick={() => setSelectedItem("Profile Information")}
            >
              Profile Information
            </li>
            <li
              className={`cursor-pointer p-2 rounded-md ${selectedItem === "Manage Addresses" ? "bg-gray-700" : "hover:bg-gray-700"}`}
              onClick={() => setSelectedItem("Manage Addresses")}
            >
              Manage Addresses
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-gray-300">SUPPORT</h3>
          <ul>
            <li className="cursor-pointer p-2 hover:bg-gray-700 rounded-md" onClick={() => router.push("/orders")}>
              Track Order
            </li>
            <li className="cursor-pointer p-2 hover:bg-gray-700 rounded-md" onClick={() => router.push("/Contact")}>
              Help Center
            </li>
          </ul>
        </div>
        <button className="p-2 bg-red-600 hover:bg-red-700 text-white w-full rounded-md mt-4" onClick={() => router.push("/signin")}>
          Logout
        </button>
      </div>
      {/* Content Section */}
      <div className="flex-1 p-6">
        {selectedItem === "Profile Information" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
            {editingProfile ? (
              <div>
                {Object.keys(profile).map((key) => (
                  <input
                    key={key}
                    type="text"
                    className="block border p-2 mb-2 w-full"
                    value={profile[key]}
                    onChange={(e) =>
                      setProfile({ ...profile, [key]: e.target.value })
                    }
                  />
                ))}
                <button className="text-green-500" onClick={handleProfileSave}>
                  Save
                </button>
              </div>
            ) : (
              <div>
                {Object.entries(profile).map(([key, value]) => (
                  <p key={key}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}</p>
                ))}
                <button className="text-blue-500" onClick={handleProfileEdit}>
                  Edit
                </button>
                <button className="ml-2 text-red-500" onClick={handleProfileDelete}>
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
        {selectedItem === "Manage Addresses" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Manage Addresses</h2>
            {addresses.map((addr) => (
              <div key={addr.id} className="mb-2 p-2 border rounded">
                {editingAddressId === addr.id ? (
                  <div>
                    <input
                      type="text"
                      className="block border p-2 mb-2 w-full"
                      value={addr.address}
                      onChange={(e) =>
                        setAddresses(addresses.map((a) => (a.id === addr.id ? { ...a, address: e.target.value } : a)))
                      }
                    />
                    <input
                      type="text"
                      className="block border p-2 mb-2 w-full"
                      value={addr.phone}
                      onChange={(e) =>
                        setAddresses(addresses.map((a) => (a.id === addr.id ? { ...a, phone: e.target.value } : a)))
                      }
                    />
                    <button className="text-green-500" onClick={handleAddressSave}> {/* ✅ Fix */}
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    <p>{addr.type}: {addr.address}</p>
                    <p>Phone: {addr.phone}</p>
                    <button className="text-blue-500" onClick={() => handleAddressEdit(addr.id)}>
                      Edit
                    </button>
                    <button className="ml-2 text-red-500" onClick={() => handleAddressDelete(addr.id)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
            <h3 className="mt-4">Add New Address</h3>
            {Object.keys(newAddress).map((key) => (
              <input
                key={key}
                type="text"
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                className="block border p-2 mb-2 w-full"
                value={newAddress[key]}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, [key]: e.target.value })
                }
              />
            ))}
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleAddAddress}>
              Add Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
