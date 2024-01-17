import MultiSelectDropdown from "./MultiSelectDropdown";
import { GENRES, MAX_SEED_LIMIT } from "../constants/Constants";

function Genres({ selectedGenres, setSelectedGenres }) {
    const handleGenreChange = (newSelectedGenres) => {
        setSelectedGenres(newSelectedGenres);
    }

    return (
        <>
            <h3>Seed genres</h3>
            <MultiSelectDropdown onChange={handleGenreChange} items={GENRES} selectedItems={selectedGenres} itemLimit={MAX_SEED_LIMIT} label={"Genres"}/>
        </>
    )
}

export default Genres;