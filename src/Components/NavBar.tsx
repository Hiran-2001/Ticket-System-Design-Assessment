import greenImage from "../assets/green-bg.png"
import loginImage from "../assets/login-image.png"

function NavBar({ loginBtn }: { loginBtn?: boolean }) {  
  return (
    <div
        className="bg-cover bg-center h-[190px] w-full flex items-center justify-center"
        style={{ backgroundImage: `url(${greenImage})`, objectFit: 'fill' }}
      >
        {loginBtn && <img className="bg-cover bg-center h-[45px] w-[220px]" src={loginImage} alt="" />}
      </div>
  )
}

export default NavBar