"use client";

import { useState, type ReactElement } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, getUsers, removeUser } from "#/lib/actions/user";

export default function Home(): ReactElement {
  // States:
  const [username, setUsername] = useState<string>("");

  // Tanstack:
  const queryClient = useQueryClient();

  const { status, data } = useQuery({
    queryKey: ["getUsers"],
    queryFn: () => getUsers()
  });

  const create = useMutation({
    mutationFn: async(username: string) => await createUser({ name: username }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["getUsers"] })
  });

  const remove = useMutation({
    mutationFn: (userID: string) => removeUser(userID),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["getUsers"] })
  });

  // Render:
  return (
    <main className="w-96">
      {status === "success" ? (
        <div>
          {data.map(user => (
            <div key={user.id} className="flex justify-between my-2">
              <p className="text-2xl">{user.name}</p>
              <button onClick={() => remove.mutate(user.id)} className="bg-red-900 rounded px-2">remove</button>
            </div>
          ))}

          <p className="text-gray-400">{data.length} user(s) found</p>
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