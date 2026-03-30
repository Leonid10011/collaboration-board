import { describe, it, expect } from "vitest";
import { ProjectSchema } from "./project-schema";

const validUuid = "123e4567-e89b-12d3-a456-426614174000";

describe("ProjectSchema", () => {
  it("accepts valid data", () => {
    const data = {
      id: validUuid,
      title: "Test Project",
      ownerId: validUuid,
      description: "A project",
    };
    expect(() => ProjectSchema.parse(data)).not.toThrow();
  });

  it("accepts missing optional id", () => {
    const data = {
      title: "Test Project",
      ownerId: validUuid,
      description: "A project",
    };
    expect(() => ProjectSchema.parse(data)).not.toThrow();
  });

  it("rejects empty title", () => {
    const data = {
      id: validUuid,
      title: "",
      ownerId: validUuid,
      description: "A project",
    };
    expect(() => ProjectSchema.parse(data)).toThrow();
  });

  it("rejects invalid ownerId", () => {
    const data = {
      id: validUuid,
      title: "Test Project",
      ownerId: "not-a-uuid",
      description: "A project",
    };
    expect(() => ProjectSchema.parse(data)).toThrow();
  });

  it("accepts missing description", () => {
    const data = {
      id: validUuid,
      title: "Test Project",
      ownerId: validUuid,
    };
    expect(() => ProjectSchema.parse(data)).not.toThrow();
  });
});
