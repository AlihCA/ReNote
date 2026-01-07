import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

const CollectionsContext = createContext();

export function CollectionsProvider({ children }) {
  const { user, isLoaded } = useUser();

  const [collections, setCollections] = useState([]);

  // Load per-user collections
  useEffect(() => {
    if (!isLoaded || !user) return;

    const key = `collections_${user.id}`;
    const saved = localStorage.getItem(key);

    setCollections(saved ? JSON.parse(saved) : []);
  }, [isLoaded, user]);

  // Save per-user collections
  useEffect(() => {
    if (!isLoaded || !user) return;

    const key = `collections_${user.id}`;
    localStorage.setItem(key, JSON.stringify(collections));
  }, [collections, isLoaded, user]);

  function createCollection(name) {
    setCollections((prev) => [
      ...prev,
      { id: Date.now().toString(), name, resourceIds: [] },
    ]);
  }

  function toggleResource(collectionId, resourceId) {
    setCollections((prev) =>
      prev.map((c) =>
        c.id === collectionId
          ? {
              ...c,
              resourceIds: c.resourceIds.includes(resourceId)
                ? c.resourceIds.filter((id) => id !== resourceId)
                : [...c.resourceIds, resourceId],
            }
          : c
      )
    );
  }

  function renameCollection(collectionId, newName) {
    setCollections((prev) =>
      prev.map((c) => (c.id === collectionId ? { ...c, name: newName } : c))
    );
  }

  function deleteCollection(collectionId) {
    setCollections((prev) => prev.filter((c) => c.id !== collectionId));
  }

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        createCollection,
        toggleResource,
        renameCollection,
        deleteCollection,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
}

export function useCollections() {
  return useContext(CollectionsContext);
}
