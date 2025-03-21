export default function Home() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] w-full gap-4 p-4">
        <div className="bg-purple-500 p-4 rounded-md">Item 1</div>
        <div className="bg-white p-4 rounded-md">Item 2</div>
        <div className="bg-white p-4 rounded-md">Item 3</div>
        <div className="bg-white p-4 rounded-md">Item 4</div>
    </div>
  );
}
