import React from "react";

const page = ({ params }) => {
  const { id } = params;

  return (
    <div>
      <div className="text-6xl">{id}</div>
    </div>
  );
};

export default page;
