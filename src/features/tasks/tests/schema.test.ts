import { TaskPriority, TaskStatus } from "@/domain/tasks";
import { describe, it, expect } from "vitest";
import { TaskSchema, TaskSchemaDB, UpdateTaskSchema } from "../schema";

const validUuid = "123e4567-e89b-12d3-a456-426614174000";

describe("TaskSchema", () => {
  it("accepts valid data", () => {
    const data = {
      projectId: validUuid,
      creatorId: validUuid,
      assgineeId: validUuid,
      title: "Test Title",
      description: "Test Description",
      status: "in_progress" as TaskStatus,
      priority: "low" as TaskPriority,
    };

    expect(() => TaskSchema.parse(data)).not.toThrow();
  });

  it("rejects invalid projectId", () => {
    const data = {
      projectId: validUuid + "abc",
      creatorId: validUuid,
      assgineeId: validUuid,
      title: "Test Title",
      description: "Test Description",
      status: "in_progress" as TaskStatus,
      priority: "low" as TaskPriority,
    };

    expect(() => TaskSchema.parse(data)).toThrow();
  });

  it("rejects invalid creatorId", () => {
    const data = {
      projectId: validUuid,
      creatorId: validUuid + "abc",
      assgineeId: validUuid,
      title: "Test Title",
      description: "Test Description",
      status: "in_progress" as TaskStatus,
      priority: "low" as TaskPriority,
    };

    expect(() => TaskSchema.parse(data)).toThrow();
  });

  it("rejects invalid assigneeId", () => {
    const data = {
      projectId: validUuid,
      creatorId: validUuid,
      assgineeId: validUuid + "abc",
      title: "Test Title",
      description: "Test Description",
      status: "in_progress" as TaskStatus,
      priority: "low" as TaskPriority,
    };

    expect(() => TaskSchema.parse(data)).toThrow();
  });

  it("rejects empty title", () => {
    const data = {
      projectId: validUuid,
      creatorId: validUuid,
      assgineeId: validUuid,
      title: "",
      description: "Test Description",
      status: "in_progress" as TaskStatus,
      priority: "low" as TaskPriority,
    };

    expect(() => TaskSchema.parse(data)).toThrow();
  });

  it("accepts null assignee", () => {
    const data = {
      projectId: validUuid,
      creatorId: validUuid,
      assgineeId: null,
      title: "Test Title",
      description: "Test Description",
      status: "in_progress" as TaskStatus,
      priority: "low" as TaskPriority,
    };

    expect(() => TaskSchema.parse(data)).not.toThrow();
  });

  it("accepts missing description", () => {
    const data = {
      projectId: validUuid,
      creatorId: validUuid,
      assgineeId: validUuid,
      title: "Test Title",
      description: null,
      status: "in_progress" as TaskStatus,
      priority: "low" as TaskPriority,
    };

    expect(() => TaskSchema.parse(data)).not.toThrow();
  });

  it("rejects wrong status", () => {
    const data = {
      projectId: validUuid,
      creatorId: validUuid,
      assgineeId: validUuid,
      title: "Test Title",
      description: "Test Description",
      status: "wrong_status" as TaskStatus,
      priority: "low" as TaskPriority,
    };

    expect(() => TaskSchema.parse(data)).toThrow();
  });

  it("rejects wrong priority", () => {
    const data = {
      projectId: validUuid,
      creatorId: validUuid,
      assgineeId: validUuid,
      title: "Test Title",
      description: "Test Description",
      status: "in_progress" as TaskStatus,
      priority: "wrong_priority" as TaskPriority,
    };

    expect(() => TaskSchema.parse(data)).toThrow();
  });

  it("rejects null status", () => {
    const data = {
      projectId: validUuid,
      creatorId: validUuid,
      assgineeId: validUuid,
      title: "Test Title",
      description: "Test Description",
      status: null,
      priority: "low" as TaskPriority,
    };

    expect(() => TaskSchema.parse(data)).toThrow();
  });

  it("rejects null priority", () => {
    const data = {
      projectId: validUuid,
      creatorId: validUuid,
      assgineeId: validUuid,
      title: "Test Title",
      description: "Test Description",
      status: "backlog" as TaskStatus,
      priority: null,
    };

    expect(() => TaskSchema.parse(data)).toThrow();
  });
});

describe("UpdateTaskSchema", () => {
  it("accepts empty object", () => {
    expect(() => UpdateTaskSchema.parse({})).not.toThrow();
  });

  it("accepts valid partial update with title", () => {
    expect(() =>
      UpdateTaskSchema.parse({
        title: "Updated task title",
      }),
    ).not.toThrow();
  });

  it("accepts valid partial update with status", () => {
    expect(() =>
      UpdateTaskSchema.parse({
        status: "done" as TaskStatus,
      }),
    ).not.toThrow();
  });

  it("accepts valid partial update with priority", () => {
    expect(() =>
      UpdateTaskSchema.parse({
        priority: "high" as TaskPriority,
      }),
    ).not.toThrow();
  });

  it("accepts valid partial update with ids", () => {
    expect(() =>
      UpdateTaskSchema.parse({
        projectId: validUuid,
        creatorId: validUuid,
        assgineeId: validUuid,
      }),
    ).not.toThrow();
  });

  it("rejects empty title", () => {
    expect(() =>
      UpdateTaskSchema.parse({
        title: "",
      }),
    ).toThrow();
  });

  it("rejects invalid status", () => {
    expect(() =>
      UpdateTaskSchema.parse({
        status: "wrong_status" as TaskStatus,
      }),
    ).toThrow();
  });

  it("rejects invalid priority", () => {
    expect(() =>
      UpdateTaskSchema.parse({
        priority: "wrong_priority" as TaskPriority,
      }),
    ).toThrow();
  });

  it("rejects invalid projectId", () => {
    expect(() =>
      UpdateTaskSchema.parse({
        projectId: "not-a-uuid",
      }),
    ).toThrow();
  });
});

describe("TaskSchemaDB", () => {
  it("accepts valid database data", () => {
    const data = {
      id: validUuid,
      project_id: validUuid,
      creator_id: validUuid,
      assignee_id: null,
      title: "Database task",
      description: "Stored in Supabase",
      status: "backlog" as TaskStatus,
      priority: "medium" as TaskPriority,
      created_at: new Date(),
      updated_at: new Date(),
    };

    expect(() => TaskSchemaDB.parse(data)).not.toThrow();
  });

  it("accepts ISO date strings", () => {
    const data = {
      id: validUuid,
      project_id: validUuid,
      creator_id: validUuid,
      assignee_id: validUuid,
      title: "Database task",
      description: null,
      status: "done" as TaskStatus,
      priority: "high" as TaskPriority,
      created_at: "2026-04-05T10:00:00.000Z",
      updated_at: "2026-04-05T10:05:00.000Z",
    };

    expect(() => TaskSchemaDB.parse(data)).not.toThrow();
  });

  it("rejects invalid project_id", () => {
    const data = {
      id: validUuid,
      project_id: "not-a-uuid",
      creator_id: validUuid,
      assignee_id: validUuid,
      title: "Database task",
      description: "Stored in Supabase",
      status: "backlog" as TaskStatus,
      priority: "medium" as TaskPriority,
      created_at: new Date(),
      updated_at: new Date(),
    };

    expect(() => TaskSchemaDB.parse(data)).toThrow();
  });

  it("rejects invalid status", () => {
    const data = {
      id: validUuid,
      project_id: validUuid,
      creator_id: validUuid,
      assignee_id: validUuid,
      title: "Database task",
      description: "Stored in Supabase",
      status: "invalid_status" as TaskStatus,
      priority: "medium" as TaskPriority,
      created_at: new Date(),
      updated_at: new Date(),
    };

    expect(() => TaskSchemaDB.parse(data)).toThrow();
  });

  it("rejects invalid created_at", () => {
    const data = {
      id: validUuid,
      project_id: validUuid,
      creator_id: validUuid,
      assignee_id: validUuid,
      title: "Database task",
      description: "Stored in Supabase",
      status: "backlog" as TaskStatus,
      priority: "medium" as TaskPriority,
      created_at: "not-a-date",
      updated_at: new Date(),
    };

    expect(() => TaskSchemaDB.parse(data)).toThrow();
  });
});
