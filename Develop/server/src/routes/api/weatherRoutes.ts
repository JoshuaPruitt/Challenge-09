import { Router, type Request, type Response } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  try {
    const weatherData = WeatherService.getWeatherForCity(req)

  } catch(err){
    console.log('ERROR:', err);
    res.status(500).json(err);
  }
  // TODO: save city to search history
});

// TODO: GET search history
// router.get('/history', async (req: Request, res: Response) => {

// });

// * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (req: Request, res: Response) => {
  
// });

export default router;
