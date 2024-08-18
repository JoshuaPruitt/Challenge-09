import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: string;
  lon: string;
}

// TODO: Define a class for the Weather object
class Weather {
  
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  baseUrl: string;
  API_key: string;
  city_name: string;

  constructor(baseUrl: string, API_key: string, city_name: string){
    this.baseUrl = baseUrl;
    this.API_key = API_key;
    this.city_name = city_name;
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/geo/1.0/direct?q=${this.city_name}&limit=${query}&appid=${this.API_key}`
      );

      //parse data then send it to be destructured.
      const locationData = await response.json()
      const mappedLocation = await this.destructureLocationData(locationData.data);
      return mappedLocation;

    } catch (err){
      console.log('ERROR:', err);
      return err;
    } 
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates[]) {
    const locationArr: Coordinates[] = locationData.map((city) => {
      //create object using the Coordinates Interface
      const locationObj: Coordinates = {
        lat: city.lat,
        lon: city.lon,
      };

      return locationObj
    });

    return locationArr;
  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {

  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {

  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {

  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {

  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {

  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    
  }
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();
