import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import geoData from "../data/geoBoundaries-BGD-ADM1_simplified.json";
import axios from "axios";

// Approximate district centers
const districtCenters = {
  Dhaka: [23.8103, 90.4125],
  Chittagong: [22.3569, 91.7832],
  Khulna: [22.8456, 89.5403],
  Rajshahi: [24.3745, 88.6042],
  Barisal: [22.701, 90.3535],
  Sylhet: [24.8949, 91.8687],
  Rangpur: [25.7439, 89.2752],
};

// Color scale function
const getColor = (count) => {
  if (count === 0) return "#ccc";
  if (count < 2) return "#ffeda0";
  if (count < 5) return "#feb24c";
  if (count < 10) return "#fd8d3c";
  return "#f03b20";
};

export default function EmployeeMap() {
  const [employees, setEmployees] = useState([]);
  const [geoJsonKey, setGeoJsonKey] = useState(0); // force GeoJSON re-render

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/employees");
      if (res.data.success) setEmployees(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Auto-refresh every 3 seconds
  useEffect(() => {
    fetchEmployees(); // initial fetch
    const interval = setInterval(() => {
      fetchEmployees();
      setGeoJsonKey((prev) => prev + 1); // force re-render
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Count employees per district
  const counts = {};
  Object.keys(districtCenters).forEach((d) => (counts[d] = 0));
  employees.forEach((emp) => {
    if (counts.hasOwnProperty(emp.district)) counts[emp.district] += 1;
  });

  // GeoJSON style
  const geoStyle = (feature) => {
    const district = feature.properties.shapeName;
    const count = counts[district] || 0;
    return {
      fillColor: getColor(count),
      weight: 1,
      color: "#333",
      fillOpacity: 0.7,
    };
  };

  // Legend component
  const Legend = () => {
    const grades = [0, 1, 5, 10];
    return (
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 10,
          padding: "10px",
          background: "white",
          border: "1px solid #ccc",
          zIndex: 1000,
        }}
      >
        <h4 className="font-bold mb-1">Employee Count</h4>
        {grades.map((g, i) => {
          const from = g;
          const to = grades[i + 1] ? grades[i + 1] - 1 : "+";
          const color = getColor(from + 1);
          return (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  background: color,
                  marginRight: 5,
                }}
              ></div>
              <span>
                {from} {to !== "+" ? `- ${to}` : "+"}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative">
      <MapContainer
        center={[23.685, 90.356]}
        zoom={7}
        className="h-[600px] w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoJSON key={geoJsonKey} data={geoData} style={geoStyle} />

        {/* District names and employee counts */}
        {Object.keys(districtCenters).map((district) => (
          <Marker
            key={district}
            position={districtCenters[district]}
            icon={L.divIcon({
              className: "district-label",
              html: `<div style="background:white;padding:2px 5px;border:1px solid #333;border-radius:3px;font-size:12px;text-align:center; width: max-content;">
                      ${district} : ${counts[district]} Employee
                     </div>`,
            })}
          />
        ))}
      </MapContainer>
      <Legend />
    </div>
  );
}
