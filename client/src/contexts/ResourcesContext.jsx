import { createContext, useContext, useEffect, useState } from "react";
import { mockResources } from "../data/mockResources";
import { useUser } from "@clerk/clerk-react";

const ResourcesContext = createContext();

export function ResourcesProvider({ children }) {
  const { user, isLoaded } = useUser();
  const [resources, setResources] = useState(mockResources);

  // Load resources when auth state is known
  useEffect(() => {
    if (!isLoaded) return;

    // Signed out -> show mock resources (public explore)
    if (!user) {
      setResources(mockResources);
      return;
    }

    // Signed in -> load user scoped
    const key = `resources_${user.id}`;
    const saved = localStorage.getItem(key);
    setResources(saved ? JSON.parse(saved) : mockResources);
  }, [isLoaded, user]);

  // Save only for signed-in users
  useEffect(() => {
    if (!isLoaded || !user) return;
    const key = `resources_${user.id}`;
    localStorage.setItem(key, JSON.stringify(resources));
  }, [resources, isLoaded, user]);

  function addResource(resource) {
    setResources((prev) => [resource, ...prev]);
  }

  function toggleStar(resourceId) {
    if (!user) return;

    setResources((prev) =>
      prev.map((r) => {
        if (r.id !== resourceId) return r;
        const starredBy = Array.isArray(r.starredBy) ? r.starredBy : [];
        const has = starredBy.includes(user.id);

        return {
          ...r,
          starredBy: has
            ? starredBy.filter((id) => id !== user.id)
            : [...starredBy, user.id],
        };
      })
    );
  }

  return (
    <ResourcesContext.Provider value={{ resources, addResource, toggleStar }}>
      {children}
    </ResourcesContext.Provider>
  );
}

export function useResources() {
  return useContext(ResourcesContext);
}
