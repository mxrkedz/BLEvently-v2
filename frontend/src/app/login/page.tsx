import Footer from "../components/footer";
import NavBar from "../components/navbar";
import LoginForm from "./components/loginForm";

export default function Login() {
  return (
    <>
      <NavBar />
      <div className="bg-[#0e1116] fixed inset-0 flex items-center justify-center">
        <div className="p-6 rounded-lg">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
