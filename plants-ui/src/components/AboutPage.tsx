function AboutPage() {
  return (
    <div>
      <div>
        <img src="leaf_wall.png" className="w-full"/>
      </div>
      <div className="mx-auto px-4">
        <h2 className="text-5xl font-bold text-center font-serif mt-8">Sobre nosotros</h2>
        <div className="mt-4 mx-8 text-center text-xl md:mx-12 lg:mx-20 xl:mx-48 2xl:mx-60">
            <p><strong>BotaniQ</strong> nace de la colaboración entre la Universidad de La Habana y el Jardín Botánico Nacional de Cuba, dos instituciones emblemáticas que han unido esfuerzos para ofrecer una plataforma digital innovadora que pone a disposición del público un vasto conocimiento sobre las plantas medicinales de Cuba.</p>
            <p className="mt-10">Nuestro objetivo es proporcionar una fuente confiable y accesible de información sobre las especies mencionadas en el libro <em>"Plantas medicinales, aromáticas o venenosas de Cuba"</em> del reconocido botánico cubano <strong>Tomás Roig y Mesa</strong>. A través de esta alianza, hemos logrado integrar el conocimiento académico y científico con las herramientas tecnológicas modernas, brindando a los usuarios una experiencia única para explorar, conocer y consultar sobre las propiedades, usos y características de las plantas medicinales cubanas.</p>
        </div>
        <hr className="mt-12 border-gray-300 mx-10 md:mx-20 lg:mx-32 xl:mx-44"/>
        <div className="my-10 flex justify-center">
          <img src="uhlogo_b.svg" className="h-20"/>
          <img src="3.png" className="h-20 mx-16"/>
          <img src="jbn_b.svg" className="h-20"/>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
