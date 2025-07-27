import greenImage from "../assets/green-bg.png"

function Footer() {
  return (
    <div
        className="bg-cover bg-center h-[190px] w-full flex items-center justify-center"
        style={{ backgroundImage: `url(${greenImage})`, objectFit: 'fill' }}
      >
      </div>
  )
}

export default Footer