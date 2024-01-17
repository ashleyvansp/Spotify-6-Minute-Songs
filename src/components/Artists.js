import axios from "axios";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { MAX_SEED_LIMIT } from "../constants/Constants";
import { getTopArtistsEndpoint } from "../constants/ApiEndpoints";

function setTopArtistsFromSpotify(token, setArtistNamesToIds) {
    console.log(' token in artists' + token);
    axios.get(getTopArtistsEndpoint,
        {
            headers: {
                Authorization: "Bearer " + token
            }
        }
    ).then((response) => {
        if (response.total === 0) {
            alert("No top artists retrieved from Spotify.");
            return;
        }
        const topArtists = response.data.items.reduce((acc, item) => ({...acc, [item.name]: item.id}), {})
        setArtistNamesToIds(topArtists);
    })
    .catch((error) => {
        alert("Error generating top artists: " + error);
    })
}

function Artists({token, artistNamesToIds, setArtistNamesToIds, selectedArtists, setSelectedArtists}) {

    const handleGenerateSeedArtists = () => {
        setTopArtistsFromSpotify(token, setArtistNamesToIds);
    }

    const handleSelectedArtistsChange = (newSelectedArtists) => {
        setSelectedArtists(newSelectedArtists);
    }

    return (
        <>
            <h3>Seed artists</h3>
            {Object.keys(artistNamesToIds).length === 0
                ? <button onClick={handleGenerateSeedArtists}>Generate seed artists</button>
                : <MultiSelectDropdown onChange={handleSelectedArtistsChange} items={Object.keys(artistNamesToIds)} selectedItems={selectedArtists} itemLimit={MAX_SEED_LIMIT} label={"Artists"}/>
            }
        </>
    )
}

export default Artists;