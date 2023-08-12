import axios from 'axios';
import { useEffect, useState } from 'react';
import PokemonCollection from './components/PokemonCollection';
import { Pokemon } from './interface';
import { Detail } from './interface';
//--------------InterFace------------
interface Pokemons {
   name: string;
   url: string;
}

const App: React.FC = () => {
   const [pokemons, setPokemons] = useState<Pokemon[]>([]);
   const [nextUrl, setNextUrl] = useState<string>('');
   const [loading, setLoading] = useState<boolean>(true);
   const [viewDetail, setViewDetail] = useState<Detail>({
      id: 0,
      isOpened: false,
   });
   useEffect(() => {
      const getPokemon = async () => {
         // gọi api lấy name và url
         const res = await axios.get(
            ' https://pokeapi.co/api/v2/pokemon?limit=20&offset=20',
         );
         setNextUrl(res.data.next);
         // lấy name để đưa vào api
         res.data.results.forEach(async (pokemon: Pokemons) => {
            const poke = await axios.get(
               `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
            );
            //đưa vào mảng để map()
            setPokemons((p) => [...p, poke.data]);
            setLoading(false);
         });
      };
      getPokemon();
   }, []);
   // khi bấm next page , gọi api tiếp theo .next
   const nextPage = async () => {
      setLoading(true);
      let res = await axios.get(nextUrl);
      setNextUrl(res.data.next);
      res.data.results.forEach(async (pokemon: Pokemons) => {
         const poke = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name} `,
         );
         setPokemons((p) => [...p, poke.data]);
         setLoading(false);
      });
   };
   return (
      <div className="App bg-slate-700 min-h-full ">
         {/* container */}
         <div className=" ">
            {/* pokemon header */}
            <header className=" text-center font-montserrat tracking-[0.25rem]  ">
               <p className="text-[#81b29a] text-5xl">Pokemon</p>{' '}
            </header>
            <PokemonCollection
               pokemons={pokemons}
               setViewDetail={setViewDetail}
               viewDetail={viewDetail}
            />
            {!viewDetail.isOpened && (
               <div className="flex justify-center">
                  <button
                     className="bg-cyan-600 rounded-lg hover:bg-cyan-800"
                     onClick={nextPage}
                  >
                     {loading ? 'Loading...' : 'Load more'}
                  </button>
               </div>
            )}
         </div>
      </div>
   );
};

export default App;
