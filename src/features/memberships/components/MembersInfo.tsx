import InfoBlock from "../../../components/ui/composed/InfoBlock";
import MemberStatus from "./MemberStatus";
import { ProjectMember } from "../types";

type MemberInfoProps = {
  members: ProjectMember[] | null;
};

export default function MemberInfo({ members }: MemberInfoProps) {
  return (
    <InfoBlock title="Members">
      <div className="flex flex-row gap-2">
        {members &&
          members.map((m) => (
            <MemberStatus
              key={m.id}
              name={m.username}
              img_url={m.imgUrl}
              online={true}
            />
          ))}
      </div>
    </InfoBlock>
  );
}
