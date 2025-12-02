import { favoritePostsVar } from '../apollo/client';
import { useReactiveVar } from '@apollo/client';


export const useFavorites = () => {
const favorites = useReactiveVar(favoritePostsVar);


const isFavorite = (id) => favorites.includes(id);
const toggleFavorite = (id) => {
const cur = favoritePostsVar();
if (cur.includes(id)) favoritePostsVar(cur.filter(x => x !== id));
else favoritePostsVar([...cur, id]);
};


return { favorites, isFavorite, toggleFavorite };
};