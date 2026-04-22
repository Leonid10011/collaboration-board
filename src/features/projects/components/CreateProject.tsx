"use client";

import InfoBlock from "@/components/ui/composed/InfoBlock";
import { SurfaceRow } from "@/components/ui/surface/SurfaceItem";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateModalOpen from "./CreateProjectModal";

export default function CreateProject() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <InfoBlock title="Actions">
        <SurfaceRow className="text-sm" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} />
          <span>Create Project</span>
        </SurfaceRow>
      </InfoBlock>
      {isModalOpen && <CreateModalOpen onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
