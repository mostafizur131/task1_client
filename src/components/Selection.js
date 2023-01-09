import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";
import UserSelection from "./UserSelection";

const Selection = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("https://task1-server-chi.vercel.app/options")
      .then((res) => res.json())
      .then((data) => setOptions(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const sector = selectedOption;
    const term = "Agree to terms";
    console.log(name, sector, term);
    const userSelection = {
      name,
      sector,
      term,
      email: user?.email,
    };
    fetch("https://task1-server-chi.vercel.app/selection", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userSelection),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Saved successfully");
          form.reset();
        }
      })
      .catch((error) => toast.error(error));
  };

  return (
    <div className="flex items-center justify-center text-center bg-gray-900 text-gray-100 h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-lg p-12 rounded shadow-lg text-gray-100 "
      >
        <h3 className="text-base font-semibold">
          Please enter your name and pick the Sectors you are currently involved
          in.
        </h3>
        <label htmlFor="name" className="self-start text-xl font-semibold">
          Name
        </label>
        <input
          required
          id="name"
          type="text"
          className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 text-gray-900 focus:border-violet-400 focus:ring-violet-400"
        />
        <label
          htmlFor="sectors"
          className="self-start mt-3 text-xl font-semibold"
        >
          Sectors
        </label>
        <select
          required
          value={selectedOption}
          onChange={(event) => setSelectedOption(event.target.value)}
          className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 text-gray-900 focus:border-violet-400 focus:ring-violet-400"
        >
          {options.map((optionGroup, i) => (
            <optgroup label={optionGroup.name} key={i}>
              {optionGroup.options.map((option, i) => (
                <option value={option.name} key={i}>
                  {option.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <div className="flex items-center my-3">
          <input
            type="checkbox"
            name="term"
            id="term"
            required
            className="mr-1 rounded-sm focus:ring-violet-400  focus:ring-2 accent-violet-400"
          />
          <label htmlFor="term" className="text-sm dark:text-gray-400">
            Agree to terms
          </label>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center h-12 px-6 mt-8 text-xl font-semibold rounded bg-violet-400 text-white"
        >
          Save
        </button>
      </form>
      <UserSelection></UserSelection>
    </div>
  );
};

export default Selection;
