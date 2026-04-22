import { Project, ProjectDB } from "./types";

export function mapProjectDBToDomain(db: ProjectDB): Project {
  return {
    id: db.id,
    ownerId: db.owner_id,
    title: db.title,
  };
}
