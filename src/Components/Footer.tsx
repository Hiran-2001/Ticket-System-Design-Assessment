import greenImage from "../assets/green-bg.png";

function Footer() {
  return (
    <div
      className="bg-cover bg-center h-32 sm:h-40 lg:h-48 w-full flex items-center justify-center"
      style={{ backgroundImage: `url(${greenImage})`, backgroundSize: 'cover' }}
    >
    </div>
  );
}

export default Footer;