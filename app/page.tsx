import MetaDataProvider from "./providers/MetaDataProvider";

export default function Home() {
  return (
    <div className="">
      <MetaDataProvider
        title="CareerNavigator"
        description="Fullstack Job Searching Site by @RiP3rQ"
      />
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="text-6xl font-bold text-purple-700">CareerNavigator</h1>
      </div>
    </div>
  );
}
