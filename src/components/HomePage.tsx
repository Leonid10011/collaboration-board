import UserInfo from "./homepage/UserInfo";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">
        Welcome to the Collaboration Board!
      </h1>
      <UserInfo />
      <p className="mt-4 text-lg text-gray-600">
        This is the home page. Use the navigation to explore the app.
      </p>
    </div>
  );
}
