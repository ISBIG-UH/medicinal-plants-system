import { FaLeaf } from 'react-icons/fa';
import { Divider } from '../../components';

const AboutPage: React.FC = () => {
    return (
        <div className="h-full">
            <div>
                <img src="leafs_header.png" className="w-full" />
            </div>
            <div className="mx-auto px-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-center font-montserrat mt-8">
                    Sobre nosotros
                </h2>
                <div className="mt-4 mx-8 text-center text-xl md:mx-12 lg:mx-20 xl:mx-48 2xl:mx-60">
                    <p className="font-quicksand">
                        <strong className="font-montserrat">BotaniQ</strong>{' '}
                        nace de la colaboración entre la Universidad de La
                        Habana y el Jardín Botánico Nacional de Cuba, dos
                        instituciones emblemáticas que han unido esfuerzos para
                        ofrecer una plataforma digital que pone a disposición
                        del público un vasto conocimiento sobre las plantas
                        medicinales de Cuba.
                    </p>
                    <p className="mt-10 font-quicksand">
                        Nuestro objetivo es proporcionar una fuente confiable y
                        accesible de información sobre la base de las especies
                        mencionadas en el libro{' '}
                        <em>
                            "Plantas medicinales, aromáticas o venenosas de
                            Cuba"
                        </em>{' '}
                        del reconocido botánico cubano{' '}
                        <strong>Tomás Roig y Mesa</strong>. A través de esta
                        alianza, hemos logrado integrar el conocimiento
                        académico y científico con las herramientas tecnológicas
                        modernas, brindando a los usuarios una experiencia única
                        para explorar, conocer y consultar sobre las
                        propiedades, usos y características de las plantas
                        medicinales, aromáticas o venenosas cubanas.
                    </p>
                </div>
                <Divider className="mt-12 mx-10 sm:mx-28 md:mx-40 lg:mx-52 xl:mx-64">
                    <FaLeaf />
                </Divider>
                <div className="my-10 md:mx-40 lg:mx-56 flex justify-around ">
                    <img src="3.png" className="h-14 lg:h-20" />
                    <img src="uhlogo_b.svg" className="h-14 lg:h-20" />
                    <img src="jbn_b.svg" className="h-14 lg:h-20" />
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
