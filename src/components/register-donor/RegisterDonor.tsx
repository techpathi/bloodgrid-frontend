import React, { useEffect, useState } from 'react';
import './register-donor.scss';
import {
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputStepper,
  Input,
  Container,
  Heading,
  VStack,
  Select,
  Button,
  FormControl,
  FormLabel,
  FormHelperText
} from '@chakra-ui/react';
import { PlacesSearchInput } from '../utilities/places-autocomplete/PlacesAutoComplete';
import ErrorMessage from '../utilities/error-message/ErrorMessage';
import { BiCurrentLocation } from 'react-icons/bi';
import $ from 'jquery';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const RegisterDonor: React.FC = (): JSX.Element => {
  const styles = {
    focusBorderColor: 'red.300',
    selectSize: 'lg'
  };

  const [fullName, setFullName] = useState<string | null>(null);
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string | null>(null);
  const [bloodGroup, setBloodGroup] = useState<string | null>(null);
  const [locationCoords, setLocationCoords] = useState<object | null>(null);
  const [place, setPlace] = useState<object | null>(null);
  const [isPlaceOrLocationValid, setIsPlaceOrLocationValid] =
    useState<boolean>(false);

  useEffect(() => {
    isPlaceOrLocationSelected();
  }, [place, locationCoords]);

  const locationSuccessColor: React.CSSProperties = {
    color: locationCoords !== null ? '#669566' : ''
  };

  const registerDonorSchema = yup.object().shape({
    fullName: yup.string().required().min(3),
    age: yup.string().required(),
    bloodGroup: yup.string().required(),
    gender: yup.string().required()
  });

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(registerDonorSchema)
  });

  const handleFieldChange = (event: any): void => {
    switch (event.target.name) {
      case 'fullName':
        setFullName(event.target.value);
        break;
      case 'gender':
        setGender(event.target.value);
        break;
      case 'bloodGroup':
        setBloodGroup(event.target.value);
        break;
    }
  };

  const updateCurrentLocation = (): void => {
    $('.location-picker').addClass('bounce');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocationCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setTimeout(() => {
            $('.location-picker').removeClass('bounce');
          }, 2000);
        },
        err => {
          if (err.code === 1) {
            alert('Error: Access is denied!');
          } else if (err.code === 2) {
            alert('Error: Position is unavailable!');
          }
          setTimeout(() => {
            $('.location-picker').removeClass('bounce');
          }, 2000);
        }
      );
    }
  };

  const updatePlaceSelection = (place: object): void => {
    setPlace(place);
  };

  const getErrorMessage = (
    errorSource: 'fullName' | 'age' | 'gender' | 'bloodGroup'
  ): any => {
    let message: string = '';
    switch (errorSource) {
      case 'fullName':
        switch (errors?.fullName?.type) {
          case 'required':
            message = 'Full name is required!';
            break;
        }
        break;
      case 'age':
        switch (errors?.age?.type) {
          case 'required':
            message = 'Age is required!';
            break;
          case 'min':
            message = 'You should between 18 and 65 years old!';
            break;
        }
        break;
      case 'gender':
        message =
          errors?.gender?.type === 'required' ? 'Gender is required' : '';
        break;
      case 'bloodGroup':
        message =
          errors?.bloodGroup?.type === 'required'
            ? 'Blood group is required'
            : '';
        break;
    }
    return message !== '' && <ErrorMessage message={message} />;
  };

  const isPlaceOrLocationSelected = (): void => {
    if (locationCoords || place) setIsPlaceOrLocationValid(true);
  };

  const registerDonor = async (formData: object): Promise<void> => {
    const response = await fetch('http://localhost:4000/donors', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      let jsonResponse = await response.json();
      resetDonorForm();
      alert(jsonResponse.message);
    } else {
      alert('Oops! Cannot register donors at this moment!!');
    }
  };

  const resetDonorForm = (): void => {
    setFullName(null);
    setAge('');
    setGender(null);
    setBloodGroup(null);
    setLocationCoords(null);
    setPlace(null);
    setIsPlaceOrLocationValid(false);
  };

  const onSubmit = () => {
    registerDonor({ fullName, age, gender, bloodGroup, locationCoords, place });
  };

  return (
    <Container className='register-donor-container' centerContent>
      <Heading as='h3' size='lg' className='header-text'>
        Let us add you to our list of life saviours
      </Heading>
      <VStack spacing={5}>
        <div className='register-donor-form'>
          <FormControl isInvalid={!!errors?.fullName?.message} isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              {...register('fullName', { required: true })}
              name='fullName'
              focusBorderColor={styles.focusBorderColor}
              isRequired
              onChange={event => handleFieldChange(event)}
            />
            {errors?.fullName && getErrorMessage('fullName')}
            <FormHelperText>
              We would love to know your good name
            </FormHelperText>
          </FormControl>
          <FormControl isInvalid={!!errors?.age?.message} isRequired>
            <FormLabel>Age</FormLabel>
            <NumberInput
              {...register('age', { required: true })}
              min={18}
              max={65}
              name='age'
              isRequired
              focusBorderColor={styles.focusBorderColor}
              onChange={(value: string) => setAge(value)}
            >
              <NumberInputField name='age' />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {errors?.age && getErrorMessage('age')}
            <FormHelperText>
              WHO recommends donors from age 18-65
            </FormHelperText>
          </FormControl>
          <FormControl isInvalid={!!errors?.gender?.message} isRequired>
            <FormLabel>Gender</FormLabel>
            <Select
              {...register('gender', { required: true })}
              size={styles.selectSize}
              focusBorderColor={styles.focusBorderColor}
              name='gender'
              isRequired
              placeholder='Select gender'
              onChange={event => handleFieldChange(event)}
            >
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='neutral'>Prefer not to say</option>
            </Select>
            {errors?.age && getErrorMessage('gender')}
          </FormControl>
          <FormControl isInvalid={!!errors?.bloodGroup?.message} isRequired>
            <FormLabel>Blood Group</FormLabel>
            <Select
              {...register('bloodGroup', { required: true })}
              placeholder='Select  blood group'
              size={styles.selectSize}
              focusBorderColor={styles.focusBorderColor}
              isRequired
              name='bloodGroup'
              onChange={event => handleFieldChange(event)}
            >
              <option value='O+'>O+</option>
              <option value='O-'>O-</option>
              <option value='A+'>A+</option>
              <option value='A-'>A-</option>
              <option value='B+'>B+</option>
              <option value='B-'>B-</option>
              <option value='AB+'>AB+</option>
              <option value='AB-'>AB-</option>
            </Select>
            {errors?.bloodGroup && getErrorMessage('bloodGroup')}
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Current Location</FormLabel>
            <div className='location-block'>
              <div id='place-search-input'>
                <PlacesSearchInput
                  isDisabled={locationCoords !== null}
                  updatePlaceSelection={updatePlaceSelection}
                />
              </div>
              <BiCurrentLocation
                className='location-picker'
                onClick={updateCurrentLocation}
                style={locationSuccessColor}
              />
            </div>
          </FormControl>
        </div>
        <Button
          onClick={handleSubmit(onSubmit)}
          className='action-button'
          colorScheme='red'
          disabled={
            !isPlaceOrLocationValid ||
            !!errors.fullName ||
            !!errors.age ||
            !!errors.gender ||
            !!errors.bloodGroup
          }
        >
          Add me
        </Button>
      </VStack>
    </Container>
  );
};

export default RegisterDonor;
