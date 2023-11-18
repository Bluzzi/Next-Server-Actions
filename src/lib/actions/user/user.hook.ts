import type { UseQueryOptions } from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, getUsers, removeUser } from ".";

// Queries:
export function getUsersQuery() {
  return { queryKey: ["getUsers"], queryFn: () => getUsers() } satisfies UseQueryOptions;
}

export function useGetUsers() {
  return useQuery(getUsersQuery());
}

// Mutations:
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async(username: string) => await createUser({ name: username }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["getUsers"] })
  });
}

export function useRemoveUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userID: string) => removeUser(userID),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["getUsers"] })
  });
}