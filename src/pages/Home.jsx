import React from "react";

import { Link } from "react-router-dom";
import Table from "../components/Table";
import { IoAddOutline } from "react-icons/io5";
const Home = () => {
  return (
    <div className="mx-auto mt-20 w-full max-w-7xl px-4 py-4 shadow-lg rounded-md">
      <h1 className="text-3xl font-semibold mb-6">Invoice App</h1>
      <Link
        to="/create/invoice"
        className="bg-orange-600 text-white border border-orange-600 px-4 py-2  rounded-md hover:bg-white hover:text-orange-600 hover:border-orange-600 transition duration-300"
      >
        Create New Invoice{" "}
        <IoAddOutline size={16} className="ml-2 inline-block" />
      </Link>
      <Table />
    </div>
  );
};

export default Home;
