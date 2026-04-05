import { describe, expect, it } from "vitest";
import { mapTaskDBToTask } from "./task-mapper";

const validUuid = "123e4567-e89b-12d3-a456-426614174000";

describe("mapTaskDBTask", () => {
  it("maps valid database task to domain task", () => {
    const dbTask = {
      id: validUuid,
      project_id: validUuid,
      creator_id: validUuid,
      assignee_id: validUuid,
      title: "Fix login",
      description: "Investigate auth flow",
      status: "in_progress" as const,
      priority: "high" as const,
      created_at: "2026-04-05T10:00:00.000Z",
      updated_at: "2026-04-05T10:05:00.000Z",
    };

    const result = mapTaskDBToTask(dbTask);

    expect(result).toEqual({
      id: validUuid,
      projectId: validUuid,
      creatorId: validUuid,
      assgineeId: validUuid,
      title: "Fix login",
      description: "Investigate auth flow",
      status: "in_progress",
      priority: "high",
    });
  });
  it("keeps nullable assignee and description", () => {
    const dbTask = {
      id: validUuid,
      project_id: validUuid,
      creator_id: validUuid,
      assignee_id: null,
      title: "Fix login",
      description: null,
      status: "backlog" as const,
      priority: "low" as const,
      created_at: "2026-04-05T10:00:00.000Z",
      updated_at: "2026-04-05T10:05:00.000Z",
    };

    const result = mapTaskDBToTask(dbTask);

    expect(result.assgineeId).toBeNull();
    expect(result.description).toBeNull();
  });
  it("throws on invalid database task", () => {
    const dbTask = {
      id: "not-a-uuid",
      project_id: validUuid,
      creator_id: validUuid,
      assignee_id: null,
      title: "Fix login",
      description: "Investigate auth flow",
      status: "backlog" as const,
      priority: "low" as const,
      created_at: "2026-04-05T10:00:00.000Z",
      updated_at: "2026-04-05T10:05:00.000Z",
    };

    expect(() => mapTaskDBToTask(dbTask)).toThrow("Invalid task data from db.");
  });
});
