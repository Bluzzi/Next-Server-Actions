import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, getUsers, removeUser } from ".";

export function useGetUsers() {
  return useQuery({
    queryKey: ["getUsers"],
    queryFn: () => getUsers()
  });
}

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