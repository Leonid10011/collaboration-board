import type { TaskDB } from "@/db/supabase/task-db";
import type { CreateTaskInput, Task } from "@/domain/tasks";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockFrom, mockMapTaskDBToTask } = vi.hoisted(() => ({
  mockFrom: vi.fn(),
  mockMapTaskDBToTask: vi.fn(),
}));

vi.mock("@/db/supabase/supabase-client", () => ({
  createSupabaseBrowserClient: () => ({
    from: mockFrom,
  }),
}));

vi.mock("@/db/supabase/task-mapper", () => ({
  mapTaskDBToTask: mockMapTaskDBToTask,
}));

import {
  deleteTaskRepo,
  getTasksByProjectId,
  insertTaskRepo,
  updateTaskRepo,
} from "./repository-tasks";

const validUuid = "123e4567-e89b-12d3-a456-426614174000";

const dbTask = {
  id: validUuid,
  project_id: validUuid,
  creator_id: validUuid,
  assignee_id: validUuid,
  title: "Fix login flow",
  description: "Investigate Supabase callback",
  status: "backlog",
  priority: "medium",
  created_at: "2026-04-05T10:00:00.000Z",
  updated_at: "2026-04-05T10:05:00.000Z",
} satisfies TaskDB;

const mappedTask = {
  id: validUuid,
  projectId: validUuid,
  creatorId: validUuid,
  assgineeId: validUuid,
  title: "Fix login flow",
  description: "Investigate Supabase callback",
  status: "backlog",
  priority: "medium",
} satisfies Task;

function mockGetTasksQuery(result: { data: TaskDB[] | null; error: unknown }) {
  const returns = vi.fn().mockResolvedValue(result);
  const limit = vi.fn().mockReturnValue({ returns });
  const secondOrder = vi.fn().mockReturnValue({ limit });
  const firstOrder = vi.fn().mockReturnValue({ order: secondOrder });
  const eq = vi.fn().mockReturnValue({ order: firstOrder });
  const select = vi.fn().mockReturnValue({ eq });

  mockFrom.mockReturnValue({ select });

  return { select, eq, firstOrder, secondOrder, limit, returns };
}

function mockInsertQuery(result: { data: TaskDB | null; error: unknown }) {
  const single = vi.fn().mockResolvedValue(result);
  const returns = vi.fn().mockReturnValue({ single });
  const select = vi.fn().mockReturnValue({ returns });
  const insert = vi.fn().mockReturnValue({ select });

  mockFrom.mockReturnValue({ insert });

  return { insert, select, returns, single };
}

function mockUpdateQuery(result: { data: TaskDB | null; error: unknown }) {
  const single = vi.fn().mockResolvedValue(result);
  const returns = vi.fn().mockReturnValue({ single });
  const select = vi.fn().mockReturnValue({ returns });
  const eq = vi.fn().mockReturnValue({ select });
  const update = vi.fn().mockReturnValue({ eq });

  mockFrom.mockReturnValue({ update });

  return { update, eq, select, returns, single };
}

function mockDeleteQuery(result: { error: unknown }) {
  const eq = vi.fn().mockResolvedValue(result);
  const deleteFn = vi.fn().mockReturnValue({ eq });

  mockFrom.mockReturnValue({ delete: deleteFn });

  return { deleteFn, eq };
}

describe("repository-tasks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFrom.mockReset();
    mockMapTaskDBToTask.mockReset();
  });

  it("returns mapped tasks for a project", async () => {
    const { eq } = mockGetTasksQuery({
      data: [dbTask],
      error: null,
    });
    mockMapTaskDBToTask.mockReturnValue(mappedTask);

    const result = await getTasksByProjectId(validUuid);

    expect(result).toEqual([mappedTask]);
    expect(mockFrom).toHaveBeenCalledWith("tasks");
    expect(eq).toHaveBeenCalledWith("project_id", validUuid);
    expect(mockMapTaskDBToTask).toHaveBeenCalledWith(dbTask);
  });

  it("throws a formatted error when loading tasks fails", async () => {
    mockGetTasksQuery({
      data: null,
      error: {
        code: "PGRST116",
        message: "Project tasks could not be loaded",
      },
    });

    await expect(getTasksByProjectId(validUuid)).rejects.toThrow(
      "Error fetching task data from db: code=PGRST116 | message=Project tasks could not be loaded",
    );
  });

  it("maps create input to the database payload on insert", async () => {
    const { insert } = mockInsertQuery({
      data: dbTask,
      error: null,
    });
    mockMapTaskDBToTask.mockReturnValue(mappedTask);

    const input: CreateTaskInput = {
      projectId: validUuid,
      creatorId: validUuid,
      assgineeId: undefined,
      title: "Fix login flow",
      description: undefined,
      status: "backlog",
      priority: "medium",
    };

    const result = await insertTaskRepo(input);

    expect(insert).toHaveBeenCalledWith({
      project_id: validUuid,
      creator_id: validUuid,
      assignee_id: null,
      title: "Fix login flow",
      description: null,
      status: "backlog",
      priority: "medium",
    });
    expect(result).toEqual(mappedTask);
  });

  it("only sends defined update fields and keeps null values", async () => {
    const { update, eq } = mockUpdateQuery({
      data: dbTask,
      error: null,
    });
    mockMapTaskDBToTask.mockReturnValue(mappedTask);

    const result = await updateTaskRepo(validUuid, {
      status: "done",
      priority: "high",
      assgineeId: null,
    });

    expect(update).toHaveBeenCalledWith({
      status: "done",
      priority: "high",
      assignee_id: null,
    });
    expect(eq).toHaveBeenCalledWith("id", validUuid);
    expect(result).toEqual(mappedTask);
  });

  it("throws a formatted error when deleting fails", async () => {
    mockDeleteQuery({
      error: {
        message: "Delete failed",
        details: "Task row not found",
      },
    });

    await expect(deleteTaskRepo(validUuid)).rejects.toThrow(
      "Error deleting task: message=Delete failed | details=Task row not found",
    );
  });
});
