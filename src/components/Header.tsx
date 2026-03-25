import UserInfo from "./homepage/UserInfo";

export default function Header() {
  return (
    <div className="flex flex-row py-2 px-1 border-b-2 border-solid bg-background">
      <UserInfo />
    </div>
  );
}
