import React from "react";
import plants from "../plantData/plants.json";

const PlantCareGuide = ({ productData }) => {
  const careInfo = plants[productData.name] || {};

  return (
    <div className="flex flex-col gap-3 py-2 px-6  text-sm border rounded-lg shadow-sm bg-green-50">
      <b className="text-lg">🌱 {productData.name}</b>
      <p className="text-gray-700">
        {careInfo.description ||
          productData.description ||
          "A beautiful, easy-to-grow plant that enhances indoor spaces."}
      </p>

      <b className="text-base mt-2">🛠️ Maintenance & Care Guide</b>
      <p>☀️ <span className="font-medium">Light:</span> {careInfo.light || "Prefers bright, indirect light but tolerates low light."}</p>
      <p>💧 <span className="font-medium">Watering:</span> {careInfo.watering || "Water when the top 1–2 inches of soil are dry."}</p>
      <p>🌱 <span className="font-medium">Soil:</span> {careInfo.soil || "Use well-draining potting mix."}</p>
      <p>🌡️ <span className="font-medium">Temperature:</span> {careInfo.temperature || "Thrives at normal room temperatures (15–30°C)."}</p>
    </div>
  );
};

export default PlantCareGuide;
