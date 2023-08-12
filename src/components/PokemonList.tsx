interface Props {
   name: string;
   id: number;
   image: string;
}

const PokemonList: React.FC<Props> = (props) => {
   const { image, name } = props;
   return (
      <div className="">
         <section className="flex flex-col justify-center items-center ">
            <p className="p-1">{name}</p>
            <img className="w-[150px] h-[150px]" src={image} alt="Pokemon" />
         </section>
      </div>
   );
};

export default PokemonList;
