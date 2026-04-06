import { User } from "@/domain/users";
import InfoBlock from "../ui/InfoBlock";
import MemberStatus from "./memberInfo/MemberStatus";

type MemberInfoProps = {
  members: User[] | null;
};

export default function MemberInfo({ members }: MemberInfoProps) {
  return (
    <InfoBlock title="Members">
      <div className="flex flex-row gap-2">
        {members &&
          members.map((m) => (
            <MemberStatus
              key={m.id}
              name={m.userName}
              img_url={m.imgUrl}
              online={true}
            />
          ))}
      </div>
    </InfoBlock>
  );
}
