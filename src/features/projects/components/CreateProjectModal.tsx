"use client";

import ModalShell from "../../../components/ui/modal/ModalShell";
import { TextareaField } from "../../../components/ui/composed/TextareaField";

import SearchInputField from "../../../components/ui/composed/SearchInputField";

import { Field, FieldLabel } from "../../../components/ui/field";

import { useState } from "react";
import { MemberBadge } from "../../memberships/components/MemberBadge";

import { showError, showSuccess } from "@/lib/toast";

import { insertProject } from "../actions/create-project";
import { useAuth } from "@/features/auth/AuthContext";
import { ProjectSchema } from "../schema";
import { User } from "@/features/auth/types";
import { Project } from "../types";
import { addMemberToProject } from "../actions/add-member-to-project";

type CreateModalOpenProps = {
  onClose: () => void;
};

export default function CreateModalOpen({ onClose }: CreateModalOpenProps) {
  const { users, user } = useAuth();

  const [projectTitle, setProjectTitle] = useState<string>("New Project");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [addedMembers, setAddedMembers] = useState<User[]>([]);

  const [createError, setCreateError] = useState<string | null>(null);

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleTitleChange = (title: string) => {
    setProjectTitle(title);
  };

  const handleProjectDescriptionChange = (text: string) => {
    setProjectDescription(text);
  };

  const handleAddMember = (user: User) => {
    if (!user.id) return;

    const profileToAdd = users?.find((p) => p.id === user.id);
    if (
      profileToAdd &&
      !addedMembers.some((member) => member.id === profileToAdd.id)
    ) {
      setAddedMembers([...addedMembers, profileToAdd]);
    }
  };

  const handleRemoveMember = (profileId: string) => {
    const newMembers = addedMembers.filter((member) => member.id !== profileId);
    setAddedMembers(newMembers);
  };

  const handleCreateProject = async () => {
    if (isSaving) return;

    setIsSaving(true);
    try {
      setCreateError(null);
      if (!user) return;

      const projectToAdd: Omit<Project, "id"> = {
        ownerId: user.id,
        title: projectTitle,
        description: projectDescription,
      };

      const validatedData = ProjectSchema.parse(projectToAdd);

      const newProjectId = await insertProject(validatedData);

      if (!newProjectId) return;

      // if insert Projects failes, we go to catch clause, otherwise we add members

      addedMembers.forEach(async (m) => {
        addMemberToProject(newProjectId, m.id, "member");
      });

      showSuccess("Project created.");
    } catch (error) {
      setCreateError(`Error creating Project: ${error}`);
      showError(`Error creating Project: ${error}`);
      setIsSaving(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ModalShell
      onConfirm={handleCreateProject}
      onClose={onClose}
      isLoading={isSaving}
    >
      <input
        placeholder={projectTitle}
        className="w-full text-4xl font-bold placeholder-gray-300 mb-8"
        onChange={(e) => handleTitleChange(e.currentTarget.value)}
      />
      <div className="flex flex-col gap-4">
        <TextareaField
          label="Description"
          description="Enter a short description of your Project."
          placeholder="Project Description"
          text={projectDescription}
          onTextChange={handleProjectDescriptionChange}
        />
        <Field>
          <FieldLabel htmlFor="textarea-message">{"Add Members"}</FieldLabel>
          <SearchInputField
            items={users}
            getId={(p) => p.id}
            getTextField={(p) => p.username}
            onSelect={handleAddMember}
          />
        </Field>
        <div className="flex flex-row flex-wrap gap-2">
          {addedMembers.map((m) => (
            <MemberBadge key={m.id} user={m} onDelete={handleRemoveMember} />
          ))}
        </div>
        {createError && <div className="text-red-500 p-2">{createError}</div>}
      </div>
    </ModalShell>
  );
}
