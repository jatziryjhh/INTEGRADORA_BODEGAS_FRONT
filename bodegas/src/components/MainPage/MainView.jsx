import React, { useState } from "react";
import { X, Menu } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import blur from "./img/blur.png";
import camera from "./img/camera.png";
import clean from "./img/clean.png";
import drop from "./img/drop.png";

export default function MainView() {
  const [menuOpen, setMenuOpen] = useState(false);
  const images = [
    "https://blog.akzent.mx/hubfs/claves-en-la-digitalizacion-de-bodegas-industriales-akzent-blog-espan__ol_720.jpg",
    "https://img10.naventcdn.com/avisos/18/01/42/83/36/34/360x266/1442368434.jpg?isFirstImage=true",
    "https://eldiarioinmobiliario.cl/wp-content/uploads/2024/03/CENTRO-DE-BODEGAS_EDI.png",
    "https://u-storage.com.mx/blog/wp-content/uploads/2018/09/Sucursal-DelValle4-800x433.jpg",
    "https://bodegachica.cl/wp-content/uploads/2021/10/funcionesbodega.jpg",
    "https://www.partidalogistics.com/wp-content/uploads/2024/11/bonded-warehouse.jpg",
    "https://safestorage.com.mx/wp-content/uploads/2020/07/SAFE-STORAGE-SAA138-2020-27.jpg",
    "https://assets.easybroker.com/property_images/4436926/74164840/EB-QA6926.jpeg?version=1713743343",
    "https://u-storage.com.mx/images/bodegas-arriba-y-abajo.webp",
    "https://www.df.cl/noticias/site/artic/20190624/imag/foto_0000000220190624174510.jpg",
  ];
  return (
    <div className="w-full font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black p-4 text-white flex justify-between items-center">
        <h1 className="font-bold text-lg">BODEGAS SIGEBO</h1>

        {/* Menú en pantallas grandes */}
        <nav className="hidden md:flex space-x-4">
          <a href="/login" className="hover:underline">
            Iniciar sesión
          </a>

          {/* Definir las rutas dentro del componente */}

          <a href="#contact-link" className="hover:underline">
            Contacto
          </a>
        </nav>

        {/* Botón de menú en móviles */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={28} />
        </button>

        {/* Menú lateral en móviles */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-black p-6 shadow-lg transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <button
            className="absolute top-4 right-4"
            onClick={() => setMenuOpen(false)}
          >
            <X size={28} />
          </button>
          <nav className="mt-10 flex flex-col space-y-4">
            <a href="#" className="hover:underline">
              Inicio
            </a>
            <a href="#" className="hover:underline">
              Iniciar Sesión
            </a>
            <a href="#" className="hover:underline">
              Contacto
            </a>
          </nav>
        </div>
      </header>
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Imagen de fondo */}
        <img
          src="https://containerliving.mx/wp-content/uploads/bb-plugin/cache/Minibodega-amarilla-scaled-landscape.jpg"
          alt="Bodega"
          className="w-full h-full object-cover"
        />

        {/* Contenido */}
        <div className="absolute text-center text-white px-6 ">
          <h1 className="text-5xl md:text-6xl font-bold">RENTA DE BODEGAS</h1>
          <p className="text-lg md:text-1xl mt-6">
            Renta de Bodegas en Cuernavaca, ven y conoce nuestras instalaciones
          </p>
          <p className="text-lg md:text-1xl mt-1">
            las mejores bodegas de todo el estado.
          </p>
        </div>

        {/* Efecto de borde picudo */}
        <div
          className="absolute bottom-0 left-0 w-full h-54 bg-white"
          style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
        ></div>
      </section>

      {/* Servicios */}
      <section className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Contenedor de textos */}
        <div className="text-center md:text-left">
          <h2
            className="text-orange-500 font-bold text-3xl relative mx-auto md:ml-60 mt-6 mb-4 
      after:block after:h-[1.5px] after:w-1/5 after:absolute after:left-0 md:after:mt-1"
          >
            Servicios
          </h2>
          <p className="text-gray-700 max-w-full sm:max-w-[300px] md:max-w-[500px] lg:max-w-[600px] my-2 text-justify">
            Almacena tus bienes temporalmente, en un lugar seguro y accesible
            con las mejores tarifas del mercado. accesible con las mejores
            tarifas del mercado. accesible con las mejores tarifas del mercado.
            accesible con las mejores tarifas del mercado. accesible con las
            mejores tarifas del mercado. accesible con las mejores tarifas del
            mercado. accesible con las mejores tarifas del mercado. accesible
            con las mejores tarifas del mercado. accesible con las mejores
            tarifas del mercado. accesible con las mejores tarifas del mercado.
          </p>
          <p className="text-gray-700 my-2 text-justify mb-15"></p>
        </div>

        {/* Contenedor de imágenes con efecto zoom-in */}
        <div className="grid gap-6">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://www.craneww.com/site/assets/files/2720/warehouse_racks.1200x800.jpg"
              alt="Servicios"
              className="w-full h-auto object-cover transform transition duration-500 hover:scale-110"
            />
          </div>
        </div>
      </section>

      <img src={blur} alt="Bodega" className="w-full h-auto object-cover  " />
      {/* Características */}
      <section className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="text-center">
          <img
            src={camera}
            alt="Feature 1"
            className="w-40 h-35 mx-auto mb-2"
          />
          <p>
            La seguridad en una bodega es un aspecto clave para garantizar la
            integridad de los bienes almacenados.
          </p>
          <p>
            Una bodega en venta debe contar con sistemas modernos de vigilancia,
            tales como cámaras de circuito cerrado, sensores de movimiento y
            control de acceso restringido. Estos elementos no solo disuaden a
            posibles intrusos, sino que también permiten un monitoreo en tiempo
            real de las instalaciones.
          </p>
        </div>

        <div className="text-center">
          <img src={drop} alt="Feature 2" className="w-40 h-35 mx-auto mb-2" />
          <p>
            Para garantizar condiciones óptimas, es recomendable que la bodega
            cuente con sistemas de ventilación adecuados.
          </p>
          <p>
            La circulación de aire evita la acumulación de humedad y ayuda a
            mantener un ambiente estable dentro del almacén. Además, la
            instalación de deshumidificadores puede ser una excelente solución
            en zonas donde la humedad relativa es alta.
          </p>
        </div>

        <div className="text-center">
          <img src={clean} alt="Feature 3" className="w-40 h-35 mx-auto mb-2" />
          <p>
            Nuestro plan de limpieza estructurado incluye la eliminación regular
            de desechos y la desinfección de áreas de almacenamiento y tránsito.
            Barrer, aspirar y trapear los pisos evita la acumulación de polvo y
            partículas que puedan afectar la calidad de los productos.
          </p>
        </div>
      </section>

      {/* Testimonios */}
      <section className="p-13 text-center bg-gray-100">
        <div className="text-center">
          <p className="text-3xl font-bold mb-6">
            ¡Conoce las opiniones de nuestros clientes!
          </p>

          <div className="w-90 mx-auto">
            <p>
              Las bodegas están en muy buenas condiciones, toda el área es
              bastante amplia y lo más importante, son seguras. La atención y
              organización de primera.
            </p>
            <strong>Eduardo</strong>
          </div>
        </div>
      </section>
      {/* Galería */}
      <section className="p-8">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          modules={[Autoplay, Navigation, Pagination]}
          className="w-full"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`Bodega ${index + 1}`}
                className="w-full h-60 object-cover rounded-lg shadow-lg transition-transform duration-500 hover:scale-105"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Ubicación */}
      <section className="text-center p-8">
        <h2 className="text-orange-500 font-bold text-4xl mb-15">
          ¡Ven a conocernos!
        </h2>

        <div className="w-full max-w-4xl mx-auto mt-4 mb-20">
          <iframe
            className="w-full h-96 rounded-lg shadow-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60240.290885546634!2d-99.2572227!3d18.9186118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cddf99525bb5bb%3A0xb34d4fa19655cd52!2sCuernavaca%2C%20Mor.!5e0!3m2!1ses-419!2smx!4v1710192834860!5m2!1ses-419!2smx"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      <footer className="bg-gray-500   text-center py-6">
        {/* Imagen de redes sociales */}
        <div className="flex justify-center mb-4">
          <img
            src="https://cdn.iconscout.com/icon/free/png-256/free-instagram-216-721958.png?f=webp"
            alt="Redes Sociales"
            className="w-12 h-auto rounded-lg  "
          />
          <img
            src="https://static.vecteezy.com/system/resources/previews/018/930/698/non_2x/facebook-logo-facebook-icon-transparent-free-png.png"
            alt="Redes Sociales"
            className="w-12 h-auto rounded-lg  "
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/174/174883.png"
            alt="Redes Sociales"
            className="w-12 h-auto rounded-lg"
          />
        </div>

        <section id="contact-link">
          <p className="text-lg font-semibold">
            © 2025 Bodegas SIGEBO - Todos los derechos reservados.
          </p>
        </section>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="hover:text-orange-500 transition"></a>
        </div>
      </footer>
    </div>
  );
}
