import React, { useEffect, useState } from 'react';
import { fetchBicycles } from '../actions/bicycles';
import { putBicycle } from '../actions/bicycles';
import Form from 'react-validation/build/form';
import { useDispatch } from 'react-redux';
import categoryItems from './dropDownItems';
import Dropdown from './Dropdown';
import { logout } from '../actions/auth';
import { useNavigate } from 'react-router-dom';

const Bicycles = () => {
  const dispatch = useDispatch();
  const [bicycles, setBicycles] = useState([]);
  const [currentSelectedBike, setCurrentSelectedBike] = useState(0);
  const navigate = useNavigate();

  const [userId, setUserId] = useState(0);
  const [bikeId, setBikeId] = useState(0);
  const [bikeType, setBikeType] = useState('');
  const [bikeName, setBikeName] = useState('');
  const [bikeSerialNumber, setBikeSerialNumber] = useState('');
  const [tyreSize, setTyreSize] = useState('');
  const [tyreDiameter, setTyreDiameter] = useState('');
  const [driveTrain, setDriveTrain] = useState('');
  const [brakeFrontAndRear, setBrakeFrontAndRear] = useState('');
  const [valveType, setValveType] = useState('');
  const [ageAndCondition, setAgeAndCondition] = useState('');
  const [bikePrice, setBikePrice] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState('');

  useEffect(() => {
    const fetchBikes = async () => {
      const response = await dispatch(fetchBicycles(setBicycles));
      setBicycles(response.data.results);
      setBikeDetails(response.data.results[0]);
    };
    fetchBikes();
  }, []);

  const setBikeDetails = (bike) => {
    //todo: get the defaults from the dropdownItems file
    if (bike.created_at === bike.updated_at) {
      setUserId(bike.user_id);
      setBikeId(bike.id);
      setBikeType('Standard');
      setBikeName('');
      setBikeSerialNumber('');
      setTyreSize('');
      setTyreDiameter('');
      setDriveTrain('');
      setBrakeFrontAndRear('');
      setValveType('');
      setAgeAndCondition('');
      setBikePrice(0);
      setPurchaseDate('');
      return;
    }
    setUserId(bike.user_id);
    setBikeId(bike.id);
    setBikeType(bike.bicycle_type);
    setBikeName(bike.name);
    setBikeSerialNumber(bike.serial_number);
    setTyreSize(bike.tyre_size);
    setTyreDiameter(bike.tyre_diameter);
    setDriveTrain(bike.drivetrain);
    setBrakeFrontAndRear(bike.brake_front_and_rear);
    setValveType(bike.valve_type);
    setAgeAndCondition(bike.age_and_condition);
    setBikePrice(bike.price);
    setPurchaseDate(bike.purchase_date);
  };

  const setBike1 = (e) => {
    setCurrentSelectedBike(0);
    e.preventDefault();
    setBikeDetails(bicycles[0]);
  };

  const setBike2 = (e) => {
    setCurrentSelectedBike(1);
    e.preventDefault();
    setBikeDetails(bicycles[1]);
  };
  const setBike3 = (e) => {
    setCurrentSelectedBike(2);
    e.preventDefault();
    setBikeDetails(bicycles[2]);
  };
  const setBike4 = (e) => {
    setCurrentSelectedBike(3);
    e.preventDefault();
    setBikeDetails(bicycles[3]);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/');
  };

  const onChangeBikeType = (e) => {
    const targetValue = e.target.value;
    setBikeType(targetValue);
  };
  const onChangeBikeName = (e) => {
    const targetValue = e.target.value;
    setBikeName(targetValue);
  };
  const onChangeBikeSerialNumber = (e) => {
    const targetValue = e.target.value;
    setBikeSerialNumber(targetValue);
  };
  const onChangeTyreSize = (e) => {
    const targetValue = e.target.value;
    setTyreSize(targetValue);
  };
  const onChangeTyreDiameter = (e) => {
    const targetValue = e.target.value;
    setTyreDiameter(targetValue);
  };
  const onChangeDriveTrain = (e) => {
    const targetValue = e.target.value;
    setDriveTrain(targetValue);
  };
  const onChangeBrakeFrontAndRear = (e) => {
    const targetValue = e.target.value;
    setBrakeFrontAndRear(targetValue);
  };
  const onChangeValveType = (e) => {
    const targetValue = e.target.value;
    setValveType(targetValue);
  };
  const onChangeAgeAndCondition = (e) => {
    const targetValue = e.target.value;
    setAgeAndCondition(targetValue);
  };
  const onChangeBikePrice = (e) => {
    const targetValue = e.target.value;
    setBikePrice(targetValue);
  };
  const onChangePurchaseDate = (e) => {
    const targetValue = e.target.value;
    setPurchaseDate(`${targetValue}T10:00:00.000Z`);
  };

  const handleBicyclePut = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      putBicycle(userId, bikeId, bikeType, bikeName, bikeSerialNumber, tyreSize, tyreDiameter, driveTrain, brakeFrontAndRear, valveType, ageAndCondition, bikePrice, purchaseDate),
    );
    const bikeArray = bicycles;
    bikeArray[currentSelectedBike] = response.data;
    setBicycles(bikeArray);
    setBikeDetails(response.data);
  };
  return (
    <div>
      <div className="d-flex justify-content-center">
        <button className="btn shadow rounded-pill justify-content-center" onClick={handleLogout}>
          Log out:
        </button>
      </div>
      <div className="d-flex justify-content-center">
        <button onClick={setBike1} type="button" className={currentSelectedBike == 0 ? 'btn btn-outline-primary m-3 rounded-pill' : 'btn btn-primary m-3 rounded-pill'}>
          Bike 1
        </button>
        <button onClick={setBike2} type="button" className={currentSelectedBike == 1 ? 'btn btn-outline-primary m-3 rounded-pill' : 'btn btn-primary m-3 rounded-pill'}>
          Bike 2
        </button>
        <button onClick={setBike3} type="button" className={currentSelectedBike == 2 ? 'btn btn-outline-primary m-3 rounded-pill' : 'btn btn-primary m-3 rounded-pill'}>
          Bike 3
        </button>
        <button onClick={setBike4} type="button" className={currentSelectedBike == 3 ? 'btn btn-outline-primary m-3 rounded-pill' : 'btn btn-primary m-3 rounded-pill'}>
          Bike 4
        </button>
      </div>

      <Form key={bikeId} className="container w-50">
        <div className="row">
          <div className="col-sm ">
            <div className="p-2">
              <label>Type *</label> <br />
              <Dropdown items={categoryItems.type} onChange={onChangeBikeType} default={bikeType} />
            </div>
            <div className="p-2">
              <label>Brand & Model *</label>
              <br />
              <input className="w-100 p-2 rounded" onChange={onChangeBikeName} type="text" defaultValue={bikeName} />
            </div>
            <div className="p-2">
              <label>Tyre Width (mm) *</label>
              <br />
              <Dropdown items={categoryItems.tyreWidth} onChange={onChangeTyreSize} defaultOption={tyreSize} />
            </div>
            <div className="p-2">
              <label>Valve Type *</label>
              <br />
              <Dropdown items={categoryItems.valveType} onChange={onChangeValveType} defaultOption={valveType} />
            </div>
            <div className="p-2">
              <label>Price *</label>
              <br />
              <input className="p-2" type="number" onChange={onChangeBikePrice} defaultValue={bikePrice} />
            </div>
            <div className="p-2">
              <label>Purchase Date *</label>
              <br />
              <input type="date" onChange={onChangePurchaseDate} defaultValue={purchaseDate.split('T')[0]} />
            </div>
          </div>
          <div className="col-sm">
            <div className="p-2">
              <label>Bicycle ID *</label>
              <br />
              <input className="w-100 p-2 rounded" onChange={onChangeBikeSerialNumber} type="text" defaultValue={bikeSerialNumber} />
            </div>
            <div className="p-2">
              <label>Age & Condition *</label>
              <br />
              <Dropdown items={categoryItems.ageAndCondition} onChange={onChangeAgeAndCondition} defaultOption={ageAndCondition} />
            </div>
            <div className="p-2">
              <label>Tyre Diameter (ISO) *</label>
              <br />
              <Dropdown items={categoryItems.tyreDiameter} onChange={onChangeTyreDiameter} defaultOption={tyreDiameter} />
            </div>
            <div className="p-2">
              <label>Front Brake *</label>
              <br />
              <Dropdown items={categoryItems.frontBrake} onChange={onChangeBrakeFrontAndRear} defaultOption={brakeFrontAndRear} />
            </div>
            <div className="p-2">
              <label>Gears & Drivetrain*</label>
              <br />
              <Dropdown items={categoryItems.gearsAndDrivetrain} onChange={onChangeDriveTrain} defaultOption={driveTrain} />
            </div>
          </div>
        </div>
        <button className="btn-primary shadow rounded-pill justify-content-center p-3" onClick={handleBicyclePut}>
          Save:
        </button>
      </Form>
    </div>
  );
};

export default Bicycles;
