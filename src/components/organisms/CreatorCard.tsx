import React, { useState, useEffect } from "react";
import Text from "../atoms/Text";
import { Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Creator } from "../propsModel/Creator";
import { motion } from "framer-motion";
import PokemonFavoriteCard from "./PokemonFavoriteCard";
import { PokemonData } from "../../services/model/PokemonData.type";
import { getPokemonData } from "../../services/pokeApi";
import { BsArrowRepeat } from "react-icons/bs";

interface CreatorCardProps {
  creator: Creator;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ creator }) => {
  const { t } = useTranslation();
  const [isFlipped, setIsFlipped] = useState(false);
  const [favoritePokemon, setFavoritePokemon] = useState<PokemonData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the creator's favorite Pokemon data
  useEffect(() => {
    const fetchPokemon = async () => {
      if (creator.favoritePokemonId && !favoritePokemon) {
        setIsLoading(true);
        try {
          const data = await getPokemonData(creator.favoritePokemonId);
          setFavoritePokemon(data);
        } catch (error) {
          console.error("Error fetching favorite Pokemon:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPokemon();
  }, [creator.favoritePokemonId, favoritePokemon]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full max-w-xs aspect-[3/4] perspective-1000 mx-auto my-4">
      <div className={`relative w-full h-full transition-transform duration-500 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}>
        <div className="absolute w-full h-full backface-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={handleFlip}
            className="relative  bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full"
          >
            <img
              src={creator.avatar}
              alt={creator.name}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <Text variant="h3" size="xl" bold>{creator.name}</Text>
            <Text size="base" color="gray">
              {t(creator.roleKey)} · {creator.age} ans
            </Text>
            <Text size="sm" color="secondary" italic className="mt-2">
              {t(creator.bioKey)}
            </Text>
            
            <div className="mt-auto pt-4 flex flex-col items-center">
              <button
                onClick={handleFlip}
                className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-white transition-colors z-10"
                title={t("See my favorite Pokémon")}
              >
                <BsArrowRepeat className="w-6 h-6" />
              </button>

              
              <div onClick={(e) => e.stopPropagation()}>
                <a
                  href={creator.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${creator.name}'s GitHub`}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-full text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <Github className="w-5 h-5" />
                  <span className="text-sm font-medium">GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          {favoritePokemon && (
            <PokemonFavoriteCard 
              pokemon={favoritePokemon} 
              creatorName={creator.name}
              onFlip={handleFlip}
            />
          )}
          
          {isLoading && (
            <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center justify-center text-center h-full">
              <Text size="base">{t("Loading...")}</Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatorCard;