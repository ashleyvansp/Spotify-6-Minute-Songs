export const AUTHORIZATION_ENDPOINT = "https://accounts.spotify.com/authorize";
export const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
export const TOP_ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50";

export const getTopArtistsEndpoint = "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50";
export const userEndpoint = "https://api.spotify.com/v1/me";
export const createPlaylistEndpoint = "https://api.spotify.com/v1/me/playlists";
export const generateRecommendationsEndpoint = (artistsSubstring, genreSubstring, minDuration, maxDuration) => `https://api.spotify.com/v1/recommendations?limit=50&market=CA${artistsSubstring}${genreSubstring}&min_duration_ms=${minDuration}&max_duration_ms=${maxDuration}`;