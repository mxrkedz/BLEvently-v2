import Hero from "./components/hero";

export default function Home() {
  return (
    <>
      <main className="flex flex-col justify-center items-center bg-[#000000] bg-[radial-gradient(#f1f3f9,#0e1116_2px)] bg-[size:40px_40px]">
        <Hero />
      </main>
    </>
  );
}
