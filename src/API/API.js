import * as axios from "axios"
//Еhe method of accessing the API using axios. Since we load only flights, then there is only one request. Token provided by RapidAPI
export const api = {
    async getFlights(date) {
        const response = await axios.get(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/RU/RUB/en-GB/SVO-sky/JFK-sky/${date}`,
            {
                headers: {
                    'x-rapidapi-key': '8aea38b1famsh56ee2685ad98f4ep17ef9bjsnb520d01d099b',
                    'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
                }
            }).catch((error) => {
            if (error.response) {
                return error.response
            }
        })
        return response.data
    }
}


