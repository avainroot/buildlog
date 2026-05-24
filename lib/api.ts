import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import type { WorkEntryModel } from "../app/generated/prisma/models";

export const api = axios.create({ baseURL: "/api" });

export const worksOptions = () =>
  queryOptions({
    queryKey: ["works"],
    queryFn: async () => {
      try {
        const { data } = await api<WorkEntryModel[]>({ url: `/works` });
        return data;
      } catch {
        return null;
      }
    },
  });
