export const fetchData = async (url) => {
    const mainDB = url;
    try {
        const response = await fetch(mainDB);
        if (response.status === 404) {
            throw `Not found, ERROR ${response.status}`;
        }
        const responseRes = await response.json();
        return responseRes;
    } catch (error) {
        console.error(`Could not get data: ${error}`);
    }
};
