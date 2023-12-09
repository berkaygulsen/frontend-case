import config from "../config";
import { useHttpClient } from "../http/useHttpClient";
import { useError } from "../context/ErrorContext/error.hooks";
import { useState } from "react";

export type Item = string;

export type JSONServerResponseType = {
  metadata: {
    collectionId: string;
    createdAt: string;
    id: string;
    name: string;
    private: boolean;
  };
  record: {
    data: Item[];
  };
};

export const useSearchService = () => {
  const baseUrl = `${config.apiUrl}/65732a9e0574da7622d21d08`;
  const { error, setError, removeError } = useError();
  const [loading, setLoading] = useState(false);
  const { httpGet } = useHttpClient();
  const getItems = async () => {
    const url = `${baseUrl}`;
    try {
      setLoading(true);
      const { record } = await httpGet<JSONServerResponseType>({ url });
      setLoading(false);
      if (error) {
        removeError();
      }
      return record.data;
    } catch (err) {
      setLoading(false);
      setError("Error while fetching items");
    }
  };

  return {
    getItems,
    loading,
  };
};
