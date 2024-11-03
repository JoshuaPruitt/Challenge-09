import dotenv from 'dotenv';
dotenv.config();

interface Coordinates {
  lat: string;
  lon: string;
}

class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: string;
  windSpeed: string;
  humidity: string;

  constructor(city: string, date: string, icon: string, iconDescription: string, tempF: string, windSpeed: string, humidity: string){
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}

class WeatherService {
  private baseUrl?: string;
  private API_key?: string;
  private city_name?: string;

  constructor(city_name?: string){
    this.baseUrl = process.env.API_BASE_URL || "";
    this.API_key = process.env.API_KEY || "";
    this.city_name = city_name || "";
  }

  private async fetchLocationData(query: string) {
    try {
      const response = await fetch(query);

      //parse data then send it to be destructured.
      const locationData = await response.json()
      return locationData;

    } catch (err){
      console.log('ERROR:', err);
      return err;
    } 
  }

  private destructureLocationData(locationData: any): Coordinates {
      //create object using the Coordinates Interface
      const locationObj: Coordinates = {
        lat: locationData.lat.toString(),
        lon: locationData.lon.toString(),
      };

    return locationObj

  }

  private buildGeocodeQuery(): string {
    return `${this.baseUrl}/geo/1.0/direct?q=${this.city_name}&appid=${this.API_key}`
  }

  private buildWeatherQuery(coordinates: Coordinates): string {
    return `api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.API_key}`
  }

  private async fetchAndDestructureLocationData() {
    //fetch the location data
    const newLocationData = await this.fetchLocationData(this.buildGeocodeQuery());
    //send new data off to be destructured
    const destructuredLocationObj = this.destructureLocationData(newLocationData);
    return destructuredLocationObj
  }

  private async fetchWeatherData(coordinates: Coordinates) {
    try {
      //send coordinates to be inserted into the weather Query
      const location = this.buildWeatherQuery(coordinates)
      const response = await fetch(location);
      //parse the weather data
      const weatherData = await response.json();
      return weatherData

    } catch(err){
      console.log('ERROR:', err)
      return err
    }
  }

  //take the response and 
  // private parseCurrentWeather(response: any) {
    
  // }

//take weather data and map it out
  private buildForecastArray(weatherData: any[]){
    const weatherArr: Weather[] = weatherData.map((weather) => {
      //map out the weather to have correct
      const weatherObj: Weather = {
        city: weather.city.name,
        date: weather.dt_text,
        icon: weather.weather.icon,
        iconDescription: weather.weather.description,
        tempF: weather.main.temp,
        windSpeed: weather.wind.speed,
        humidity: weather.main.humidity
      }

      return weatherObj
    })

    return weatherArr
  }


  async getWeatherForCity(city: string) {
    this.city_name = city
    //send info to be destructured
    const destructuredData = this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(destructuredData);

  }
}

export default new WeatherService();
