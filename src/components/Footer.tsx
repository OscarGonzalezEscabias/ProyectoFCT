import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 py-10 mt-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-white">TusViajes+</h2>
          <p className="text-sm">© {new Date().getFullYear()} Todos los derechos reservados.</p>
        </div>

        <ul className="flex gap-6 text-sm">
          <li>
            <a href="/about" className="hover:text-white transition">Sobre nosotros</a>
          </li>
          <li>
            <a href="/contact" className="hover:text-white transition">Contacto</a>
          </li>
          <li>
            <a href="/terms" className="hover:text-white transition">Términos</a>
          </li>
        </ul>

        <div className="flex gap-4 text-xl">
          <a href="#" className="hover:text-white transition"><FaGithub /></a>
          <a href="#" className="hover:text-white transition"><FaLinkedin /></a>
          <a href="#" className="hover:text-white transition"><FaGlobe /></a>
        </div>
      </div>
    </footer>
  );
}
