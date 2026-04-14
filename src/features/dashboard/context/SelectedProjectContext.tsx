import { createContext, useContext, useState } from "react";

type SelectedProjectContextType = {
  projectId: string | null;
  projectTitle: string | null;
  changeSelectedProject: (id: string, title: string) => void;
};

export const SelectedProjectContext =
  createContext<SelectedProjectContextType | null>(null);

type SelectedProjectProviderType = {
  children: React.ReactNode;
};

export const useSelectedProject = () => {
  const context = useContext(SelectedProjectContext);

  if (!context) {
    throw new Error("useSelectedProject must be within a ProjectProvider.");
  }

  return context;
};

export function SelectedProjectProvider({
  children,
}: SelectedProjectProviderType) {
  const [projectId, setProjectId] = useState<string | null>(null);
  const [projectTitle, setProjectTitle] = useState<string | null>(null);

  const changeSelectedProject = (id: string, title: string) => {
    setProjectId(id);
    setProjectTitle(title);
  };

  return (
    <SelectedProjectContext.Provider
      value={{ projectId, projectTitle, changeSelectedProject }}
    >
      {children}
    </SelectedProjectContext.Provider>
  );
}
