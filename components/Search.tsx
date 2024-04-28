"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Search = () => {
  const [category, setCategory] = useState("");

  const router = useRouter();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const queryString = [category && `category=${encodeURIComponent(category)}`]
      .filter(Boolean)
      .join("&");

    router.push(`/?${queryString}`);
  };

  return (
    <div className="row wrapper mt-5">
      <div className="col-10 col-lg-5">
        <form className="shadow rounded" onSubmit={submitHandler}>
          <h2 className="mb-3">Search Rooms</h2>

          <div className="form-group mt-3">
            <label htmlFor="room_type_field" className="mb-1">
              {" "}
              Room Type{" "}
            </label>
            <select
              className="form-select"
              id="room_type_field"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {[
                "Single",
                "Deluxe",
                "Quad",
                "Triple",
                "Twins",
                "King",
                "Connected",
              ].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn form-btn w-100 py-2">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};
export default Search;
