import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import type {
  WorkEntryModel,
  WorkTypeModel,
} from "../app/generated/prisma/models";
import { API_BASE_URL as baseURL } from "./constants";
import { WorkEntry } from "@/types";

export const api = axios.create({
  baseURL,
});

export const worksOptions = () =>
  queryOptions({
    queryKey: ["works"],
    queryFn: async () => {
      try {
        const { data } = await api<WorkEntry[]>({ url: `/works` });
        return data;
      } catch (e) {
        console.error("Error fetching works:", e);
        return null;
      }
    },
  });

export const worksTypeOptions = () =>
  queryOptions({
    queryKey: ["worksType"],
    queryFn: async () => {
      try {
        const { data } = await api<WorkTypeModel[]>({ url: `/works/type` });
        return data;
      } catch (e) {
        console.error("Error fetching works type:", e);
        return null;
      }
    },
  });
