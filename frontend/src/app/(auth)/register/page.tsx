import NavBar from "../../components/navbar";
import RegisterForm from "./components/registerForm";

export default function Register() {
  return (
    <>
      <NavBar />
      <div className="bg-[#0e1116] fixed inset-0 flex items-center justify-center">
        <div className="bg-[#0e1116] p-6 rounded-lg">
          <RegisterForm />
        </div>
      </div>
    </>
  );
}
