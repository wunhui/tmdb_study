
const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;
console.log(token)
export const TryRequestGet = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`, 
            },
        })
        return response;
    } catch (error) {
        console.error('Error fetching genres:', error);
    }
}


export const TryRequestPost = async (url, body) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                "Content-Type": 'application/json;charset=utf-8',
                Authorization: `Bearer ${token}`, 
            },
            body: JSON.stringify(body)
        })
        return response;
    } catch (error) {
        console.error('Error fetching genres:', error);
    }
}


export const TryRequestDelete = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                accept: 'application/json',
                "Content-Type": 'application/json;charset=utf-8',
                Authorization: `Bearer ${token}`, 
            }
        })
        return response;
    } catch (error) {
        console.error('Error fetching genres:', error);
    }
}