import { Detail, PokemonDetail } from '~/interface';
import PokemonList from './PokemonList';
interface Props {
   pokemons: PokemonDetail[];
   viewDetail: Detail;
   setViewDetail: React.Dispatch<React.SetStateAction<Detail>>;
}
const PokemonCollection: React.FC<Props> = (props) => {
   const { pokemons, viewDetail, setViewDetail } = props;
   const selectPokemon = (id: number) => {
      if (!viewDetail.isOpened) {
         setViewDetail({
            id: id,
            isOpened: true,
         });
      }
   };

   return (
      <div>
         <section
            className={viewDetail.isOpened ? 'container-action  ' : 'container'}
         >
            {viewDetail.isOpened ? (
               <div className="overlay w-[100vw] h-[100vh] overflow-y-hidden "></div>
            ) : (
               <div className=""></div>
            )}
            {pokemons.map((pokemon) => {
               return (
                  <div
                     className="bg-slate-50 m-3"
                     key={pokemon.id}
                     onClick={() => {
                        selectPokemon(pokemon.id);
                     }}
                  >
                     <PokemonList
                        name={pokemon.name}
                        id={pokemon.id}
                        image={pokemon.sprites.front_default}
                        abilities={pokemon.abilities}
                        viewDetail={viewDetail}
                        setViewDetail={setViewDetail}
                     />
                  </div>
               );
            })}
         </section>
      </div>
   );
};

export default PokemonCollection;
