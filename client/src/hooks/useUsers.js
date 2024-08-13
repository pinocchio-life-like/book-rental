import { useState, useEffect } from "react";
import { fetchUsers } from "../services/api";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (err) {
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { users, loading, error };
};

export default useUsers;
