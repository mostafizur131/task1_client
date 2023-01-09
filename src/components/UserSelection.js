import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

const UserSelection = () => {
  const { user, logOut } = useContext(AuthContext);
  const [userSelect, setUserSelect] = useState([]);

  useEffect(() => {
    fetch(`https://task1-server-chi.vercel.app/selection?email=${user?.email}`)
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          return logOut();
        }
        return res.json();
      })
      .then((data) => setUserSelect(data));
  }, [user?.email, logOut]);
  return (
    <div>
      <div className="flex flex-col w-full max-w-lg p-12 rounded shadow-lg text-gray-100 ">
        <input
          required
          id="name"
          type="text"
          defaultValue={userSelect[0]?.name}
          className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 text-gray-900 focus:border-violet-400 focus:ring-violet-400"
        />

        <input
          required
          id="email"
          type="text"
          defaultValue={userSelect[0]?.email}
          className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 text-gray-900 focus:border-violet-400 focus:ring-violet-400"
        />
        <input
          required
          id="name"
          type="text"
          defaultValue={userSelect[0]?.term}
          className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ring-2 text-gray-900 focus:border-violet-400 focus:ring-violet-400"
        />
      </div>
    </div>
  );
};

export default UserSelection;
