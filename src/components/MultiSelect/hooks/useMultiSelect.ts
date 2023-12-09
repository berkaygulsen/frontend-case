import { useSearchService } from "../../../services/search.service";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../../util/useLocalStorage";

type ItemWithId = { title: string; id: number };

export const useMultiSelect = () => {
  const { getItems, loading } = useSearchService();
  const storage = useLocalStorage();

  const [items, setItems] = useState<ItemWithId[]>([]);
  const [selectedItems, setSelectedItems] = useState<ItemWithId[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllItems = async () => {
    if (!loading) {
      const res = await getItems();
      // IMPORTANT: needed to fix the data because the data is corrupted with "&amp;" instead of "&" - Berkay Gülşen
      // Also, needed to fix it here instead of rendering process, because the user can use "&" in the search input - Berkay Gülşen
      const fixedRes = res?.map((item) => item.replace("&amp;", "&"));
      const itemsWithIds = fixedRes?.map(
        (item, index) => ({ title: item, id: index } as ItemWithId)
      );
      if (!itemsWithIds) return;
      setItems(itemsWithIds);
    }
  };

  const updateSelectedItems = (checked: boolean, item: ItemWithId) => {
    if (checked) {
      const val = [...selectedItems, item];
      setSelectedItems(val);
      storage.set("selectedItems", val);
    } else {
      const val = selectedItems.filter((i) => i.id !== item.id);
      setSelectedItems(val);
      storage.set("selectedItems", val);
    }
  };

  useEffect(() => {
    const storedItems = storage.get("selectedItems");
    if (storedItems) setSelectedItems(storedItems);
  }, []);

  const onFilterItems = () => {
    if (searchTerm) {
      return items
        .filter(
          (item) =>
            !selectedItems.some((selectedItem) => selectedItem.id === item.id)
        )
        .filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    return items.filter(
      (item) =>
        !selectedItems.some((selectedItem) => selectedItem.id === item.id)
    );
  };

  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  // make sure to call getAllItems only once
  useEffect(() => {
    getAllItems();
  }, []);

  return {
    items,
    updateSearchTerm,
    updateSelectedItems,
    selectedItems,
    onFilterItems,
    searchTerm,
    loading,
  };
};
