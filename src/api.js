const API_ENDPOINT = "https://en.wikipedia.org/w/api.php?action=query&list=search&origin=*&format=json&srlimit=10";

function createGet(fetch) {
    return phrase => fetch(`${API_ENDPOINT}&srsearch=${phrase}`).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error(response);
        }
    })
}

export function createApi(fetch) {
    const get = createGet(fetch);

    return {
       getWikiResults: get
    }
}