import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import { db } from '../data/db';
import { CustomMember, Member } from '../types/Member';

export const useAddNewCustomMember = (
  options?: UseMutationOptions<
    string,
    Error,
    Parameters<typeof db.addNewCustomMember>[0]
  >
) => {
  const queryClient = useQueryClient();

  return useMutation<
    string,
    Error,
    Parameters<typeof db.addNewCustomMember>[0]
  >({
    mutationFn: db.addNewCustomMember,
    onSuccess: (...args) => {
      // Invalidate the custom members query to refetch the data
      queryClient.refetchQueries({
        queryKey: ['customMembers'],
      });

      if (options?.onSuccess) {
        options.onSuccess(...args);
      }
    },
  });
};

export const useCustomMembers = () => {
  return useQuery({
    queryKey: ['customMembers'],
    queryFn: db.readCustomMembers,
  });
};

export const useCustomMember = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['customMember', id],
    queryFn: () => db.readCustomMember({ id }),
    enabled,
  });
};

export const useRemoveCustomMember = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Parameters<typeof db.removeCustomMember>[0]>({
    mutationFn: db.removeCustomMember,
    onSuccess: () => {
      // Invalidate the custom members query to refetch the data
      queryClient.refetchQueries({
        queryKey: ['customMembers'],
      });
    },
  });
};

export const useCreateParty = () => {
  return useMutation<void, Error, Parameters<typeof db.createParty>[0]>({
    mutationFn: db.createParty,
  });
};

export const useParty = ({ partyId }: { partyId: string }) => {
  return useQuery({
    queryKey: ['party', partyId],
    queryFn: () => db.readParty({ partyId }),
  });
};

export const useParties = () => {
  return useQuery({
    queryKey: ['parties'],
    queryFn: db.readParties,
  });
};

export const useFirstParty = () => {
  return useQuery({
    queryKey: ['firstParty'],
    queryFn: db.readFirstParty,
  });
};

export const useAddMember = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Parameters<typeof db.addMember>[0]>({
    mutationFn: db.addMember,
    onSuccess(_, variables) {
      queryClient.refetchQueries({
        queryKey: ['party', variables.partyId],
      });
    },
  });
};

export const useAddMembers = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Parameters<typeof db.addMembers>[0]>({
    mutationFn: db.addMembers,
    onSuccess(_, variables) {
      queryClient.refetchQueries({
        queryKey: ['party', variables.partyId],
      });
    },
  });
};

export const useRemoveMember = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Parameters<typeof db.removeMember>[0]>({
    mutationFn: db.removeMember,
    onSuccess(_, variables) {
      queryClient.refetchQueries({
        queryKey: ['party', variables.partyId],
      });
    },
  });
};

export const useShowWelcomeMessage = () => {
  return useQuery({
    queryKey: ['showWelcomeMessage'],
    queryFn: db.readShowWelcomeMessage,
  });
};

export const useSaveShowWelcomeMessage = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    Parameters<typeof db.saveShowWelcomeMessage>[0]
  >({
    mutationFn: db.saveShowWelcomeMessage,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['showWelcomeMessage'],
      });
    },
  });
};

export type UseSaveShowWelcomeMessage = (
  values: Parameters<typeof db.saveShowWelcomeMessage>[0]
) => void;

export const useAllowCustomMembers = () => {
  return useQuery({
    queryKey: ['allowCustomMembers'],
    queryFn: db.readAllowCustomMembers,
  });
};

export const useSaveAllowCustomMembers = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    Parameters<typeof db.saveAllowCustomMembers>[0]
  >({
    mutationFn: db.saveAllowCustomMembers,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['allowCustomMembers'],
      });
    },
  });
};

export type UseSaveAllowCustomMembers = (
  values: Parameters<typeof db.saveAllowCustomMembers>[0]
) => void;
