import { WorkEntryModel } from "@/app/generated/prisma/models";
import { api } from "@/lib/api";
import { WorkEntryInput } from "@/lib/schemas";
import { useWorksStore } from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useWorks = () => {
  const closeForm = useWorksStore((state) => state.closeForm);
  const queryClient = useQueryClient();

  const { mutate: addWork, isPending: addPending } = useMutation({
    mutationFn: (data: WorkEntryInput) => {
      return api.post<WorkEntryModel>(`/works`, data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["works"] });
      closeForm();
    },
  });

  const { mutate: deleteWork, isPending: deletePending } = useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return api.delete<WorkEntryModel>(`/works/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["works"] });
    },
  });

  const { mutate: saveWork, isPending: savePending } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: WorkEntryInput }) => {
      return api.patch<WorkEntryModel>(`/works/${id}`, data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["works"] });
      closeForm();
    },
  });

  return {
    work: {
      add: addWork,
      delete: deleteWork,
      save: saveWork,
    },
    addPending,
    deletePending,
    savePending,
  };
};

export default useWorks;
