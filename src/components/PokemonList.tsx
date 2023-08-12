import { useEffect, useState } from 'react';
import { Detail } from '~/interface';

interface Props {
   viewDetail: Detail;
   setViewDetail: React.Dispatch<React.SetStateAction<Detail>>;
   abilities:
      | {
           name: string;
           ability: string;
        }[]
      | undefined;
   name: string;
   id: number;
   image: string;
}

const PokemonList: React.FC<Props> = (props) => {
   const { id, image, name, abilities, viewDetail, setViewDetail } = props;
   const [isSelected, setIsSelected] = useState(false);

   useEffect(() => {
      setIsSelected(id === viewDetail?.id);
   }, [viewDetail]);

   const closeDetail = () => {
      setViewDetail({
         id: 0,
         isOpened: false,
      });
   };
   return (
      <div className="">
         {isSelected ? (
            <section className="absolute top-[30%] left-[41%]  bg-white rounded-lg ">
               <div className="detail-container">
                  <p className="text-3xl" onClick={closeDetail}>
                     X
                  </p>
                  <div className="flex items-center flex-col">
                     <img
                        className="h-[300px] w-[300px]"
                        src={image}
                        alt="Pokemon"
                     />
                     <p className="pb-4">{name}</p>
                  </div>
                  {/* abilities */}
                  <div>
                     <p>Abilities:</p>
                     <div className="pb-3">
                        {abilities?.map((ab: any, index: any) => {
                           return <div key={index}>{ab.ability.name}</div>;
                        })}
                     </div>
                  </div>
               </div>
            </section>
         ) : (
            <section className="flex flex-col justify-center items-center  rounded-2xl">
               <p className="">{name}</p>
               <img className="w-[150px] h-[150px]" src={image} alt="Pokemon" />
            </section>
         )}
      </div>
   );
};

export default PokemonList;
