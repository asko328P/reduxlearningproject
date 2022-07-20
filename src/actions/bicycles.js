import { SET_MESSAGE } from './types';
import BicycleService from '../services/user.service';

export const fetchBicycles = (setBicycles) => {
  return async (dispatch) => {
    try {
      const response = await BicycleService.getBicycles();
      if (response && response.success && response.data && response.data.results) {
        setBicycles(response.data.results);
        dispatch({ type: SET_MESSAGE, payload: 'Successfully fetched bicycle data' });
        return response;
      }
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
    }
  };
};
export const putBicycle = (userId, bikeId, bikeType, bikeName, bikeSerialNumber, tyreSize, tyreDiameter, driveTrain, brakeFrontAndRear, valveType, ageAndCondition, bikePrice, purchaseDate) => {
  return async (dispatch) => {
    try {
      const response = await BicycleService.putBicycle(
        userId,
        bikeId,
        bikeType,
        bikeName,
        bikeSerialNumber,
        tyreSize,
        tyreDiameter,
        driveTrain,
        brakeFrontAndRear,
        valveType,
        ageAndCondition,
        bikePrice,
        purchaseDate,
      );

      if (response && response.success && response.data) {
        dispatch({ type: SET_MESSAGE, payload: 'Successfully fetched bicycle data' });
        return response;
      }
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
    }
  };
};
