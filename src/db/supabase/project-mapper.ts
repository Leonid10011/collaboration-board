import { Project } from "@/domain/projects";
import { ProjectDB } from "./project-db";

export function mapProjectDBToDomain(db: ProjectDB): Project {
  return {
    id: db.id,
    ownerId: db.owner_id,
    title: db.title,
  };
}
