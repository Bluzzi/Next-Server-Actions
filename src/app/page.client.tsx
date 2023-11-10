"use client";

import { useState, type ReactElement } from "react";
import { useCreateUser, useGetUsers, useRemoveUser } from "#/lib/actions/user";

export function HomeClient(): ReactElement {
  const [username, setUsername] = useState<string>("");

  const usersQuery = useGetUsers();

  const create = useCreateUser();
  const remove = useRemoveUser();

  return (
    <main className="w-96">
      {usersQuery.status === "success" ? (
        <div>
          {usersQuery.data.map(user => (
            <div key={user.id} className="flex justify-between my-2">
              <p className="text-2xl">{user.name}</p>
              <button onClick={() => remove.mutate(user.id)} className="bg-red-900 rounded px-2">remove</button>
            </div>
          ))}

          <p className="text-gray-400">{usersQuery.data.length} user(s) found</p>
        </div>
      ) : (
        <p>loading...</p>
      )}

      <div>
        <input
          className="mt-5 rounded text-center w-full h-8 text-black"
          type="text" name="name" placeholder="Username"
          value={username} onChange={event => setUsername(event.target.value)}
          onKeyDown={event => {
            if (event.key === "Enter") {
              create.mutate(username);
              setUsername("");
            }
          }}
        />
      </div>
    </main>
  );
}