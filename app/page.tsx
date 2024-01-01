import MetaDataProvider from "./providers/MetaDataProvider";

export default function Home() {
  return (
    <div className="">
      <MetaDataProvider
        title="CareerNavigator"
        description="Fullstack Job Searching Site by @RiP3rQ"
      />
      <div className="w-full min-h-[90vh] flex items-center justify-center flex-col">
        <h1 className="text-6xl font-bold text-purple-700 mb-2">
          CareerNavigator
        </h1>
        <h5>Landing page in construction</h5>
      </div>
    </div>
  );
}
