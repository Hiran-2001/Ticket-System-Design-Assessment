import greenImage from "../assets/green-bg.png";
import loginImage from "../assets/login-image.png";

function NavBar({ loginBtn }: { loginBtn?: boolean }) {
  return (
    <div
      className="bg-cover bg-center h-32 sm:h-40 lg:h-48 w-full flex items-center justify-center"
      style={{ backgroundImage: `url(${greenImage})`, backgroundSize: 'cover' }}
    >
      {loginBtn && (
        <img
          className="h-8 sm:h-10 lg:h-12 w-auto max-w-[180px] sm:max-w-[200px] lg:max-w-[220px] object-contain"
          src={loginImage}
          alt="Login Button"
        />
      )}
    </div>
  );
}

export default NavBar;