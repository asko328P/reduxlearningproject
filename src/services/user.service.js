import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'https://dev-api.mioo.cc/me/';

const getBicycles = () => {
  const bicyclesGet = async () => {
    const response = await axios.get(`${API_URL}bicycles`, { headers: authHeader });
    return response.data;
  };

  return bicyclesGet();
};
const putBicycle = (user_id, id, bicycle_type, name, serial_number, tyre_size, tyre_diameter, drivetrain, brake_front_and_rear, valve_type, age_and_condition, price, purchase_date) => {
  const bicyclesPut = async () => {
    const response = await axios.put(
      `${API_URL}bicycles`,
      {
        user_id,
        id,
        bicycle_type,
        name,
        serial_number,
        tyre_size,
        tyre_diameter,
        drivetrain,
        brake_front_and_rear,
        valve_type,
        age_and_condition,
        purchase_date,
        price: parseInt(price),
        sol_number: '',
        //todo: got till here, have to add created at time and updated at time,
        created_at: '2022-07-15T13:40:38Z',
        updated_at: '2022-07-15T13:40:38Z',
        lock_id: '',
        lock_model: '',
        insurance_company: '',
        is_active: true,
        bicycle_type_id: 1,
        groupset: '',
        image: null,
        images: [{ url: '' }, { url: '' }, { url: '' }, { url: '' }],
        last_service_at: null,
        upcoming_service_at: null,
      },
      { headers: authHeader },
    );
    return response.data;
  };

  return bicyclesPut();
};

const bicycleServices = {
  getBicycles,
  putBicycle,
};

export default bicycleServices;
