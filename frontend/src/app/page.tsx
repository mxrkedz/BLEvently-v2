import Footer from "./components/footer";
import Hero from "./components/hero";
import NavBar from "./components/navbar";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex flex-col justify-center items-center bg-[#0e1116] bg-[radial-gradient(#f1f3f9,#0e1116_2px)] bg-[size:40px_40px]">
        <Hero />
      </main>
      <Footer />
    </>
  );
}
