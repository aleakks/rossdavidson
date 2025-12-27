export const dynamic = "force-dynamic";
export const runtime = "edge";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-black">
      <h1 className="text-6xl font-black">HELLO WORLD</h1>
      <p className="text-2xl mt-4">If you can see this, the layout is fine.</p>
    </div>
  );
}
