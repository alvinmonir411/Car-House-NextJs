"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const page = ({ params }) => {
  const { id } = params;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/api/service/${id}`);
        if (!res.ok) throw new Error("Failed to fetch service");
        const data = await res.json();
        setService(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading service...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl">
        Error: {error}
      </div>
    );

  if (!service)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        No service found.
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10"
    >
      <h1 className="text-4xl font-bold mb-4">{service.title}</h1>

      <img
        src={service.img}
        alt={service.title}
        className="w-full h-64 object-cover rounded-md mb-6"
      />

      <p className="text-gray-700 mb-6">{service.description}</p>

      <div className="text-2xl font-semibold text-green-600 mb-6">
        Price: ${service.price}
      </div>

      <div className="mb-6 text-sm text-gray-500">
        Service ID: {service.service_id}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Facilities</h2>
        <ul className="space-y-4">
          {service.facility.map((item, idx) => (
            <li key={idx} className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.details}</p>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default page;
