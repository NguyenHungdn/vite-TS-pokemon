import axios from 'axios';
import { useEffect, useState } from 'react';
import PokemonCollection from './components/PokemonCollection';
import { Pokemon } from './interface';
//--------------InterFace------------
interface Pokemons {
   name: string;
   url: string;
}
const App: React.FC = () => {
   const [pokemons, setPokemons] = useState<Pokemon[]>([]);
   const [nextUrl, setNextUrl] = useState<string>('');
   useEffect(() => {
      const getPokemon = async () => {
         const res = await axios.get(
            ' https://pokeapi.co/api/v2/pokemon?limit=20&offset=20',
         );
         setNextUrl(res.data.next);
         res.data.results.forEach(async (pokemon: Pokemons) => {
            const poke = await axios.get(
               `http://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
            );

            setPokemons((p) => [...p, poke.data]);
         });
      };
      getPokemon();
   }, []);
   const nextPage = async () => {
      let res = await axios.get(nextUrl);
      setNextUrl(res.data.next);
      res.data.results.forEach(async (pokemon: Pokemons) => {
         const poke = await axios.get(
            `http://pokeapi.co/api/v2/pokemon/${pokemon.name} `,
         );
         setPokemons((p) => [...p, poke.data]);
      });
   };
   return (
      <div className="App bg-slate-700 ">
         {/* container */}
         <div className=" mx-4 py-8 flex flex-col items-center ">
            {/* pokemon header */}
            <header className=" text-center font-montserrat tracking-[0.25rem]  ">
               <p className="text-[#81b29a] text-5xl">Pokemon</p>{' '}
               <PokemonCollection pokemons={pokemons} />
            </header>
            <div>
               <button onClick={nextPage}>Load More</button>
            </div>
         </div>
      </div>
   );
};

export default App;
