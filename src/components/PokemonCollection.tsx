import { Pokemon } from '~/interface';
import PokemonList from './PokemonList';
interface Props {
   pokemons: Pokemon[];
}
const PokemonCollection: React.FC<Props> = (props) => {
   const { pokemons } = props;
   return (
      <section className="flex flex-row flex-wrap gap-8 items-center justify-center p-10">
         {pokemons.map((pokemon) => {
            return (
               <div
                  className=" w-[200px] h-[200px] bg-slate-100 rounded-md"
                  key={pokemon.id}
               >
                  <PokemonList
                     name={pokemon.name}
                     id={pokemon.id}
                     image={pokemon.sprites.front_default}
                  />
               </div>
            );
         })}
      </section>
   );
};

export default PokemonCollection;
