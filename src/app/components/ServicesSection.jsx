import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await fetch("/api/service");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);
  console.log(services);
  return (
    <div className="grid mt-10  overflow-hidden grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-center items-center gap-3">
      {services.map((service) => {
        return (
          <div
            key={service._id}
            className="md:w-[380px] md:h-[320px] border rounded-2xl border-gray-200 p-5 "
          >
            <img
              src={service.img}
              className="md:w-[320px] md:h-[210px] object-center"
              alt=""
            />
            <div className="flex justify-between items-center ">
              <div>
                <h1 className="font-semibold text-2xl">{service.title}</h1>
                <p className="text-red text-xl">Price:${service.price}</p>
              </div>
              <Link href={`/services/${service._id}`}>
                <FaArrowRightLong className="text-red text-2xl" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServicesSection;
