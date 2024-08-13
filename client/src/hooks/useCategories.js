import { useState, useEffect } from "react";
import { getCategories } from "../services/api";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories.data);
        setError(null);
        console.log(fetchedCategories.data);
      } catch (error) {
        setError("Failed to fetch categories");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useCategories;
