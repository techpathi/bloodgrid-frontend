import React from 'react';
import './landing-page.scss';
import { Button } from '@chakra-ui/button';
import { BiDonateBlood, BiSearch } from 'react-icons/bi';
import { useHistory } from 'react-router-dom';
import { firebaseApp } from '../../firebase/Config';

const LandingPage: React.FC = (): JSX.Element => {
  const history = useHistory();
  return (
    <div className='landing-container'>
      <div className='top-container'>
        <div>
          <div className='logo-block'>BLOODGRID</div>
          <p className='hero-text'>
            Welcome {firebaseApp.auth().currentUser?.displayName}
            <br />
            Find blood donors around you just like you find a cab!
          </p>
        </div>
      </div>
      <div className='middle-container'>
        <div>
          <Button
            colorScheme='red'
            className='action-button'
            variant='outline'
            rightIcon={<BiDonateBlood />}
            onClick={() => history.push('/register-donor')}
          >
            I am here to donate
          </Button>
          <br />
          <Button
            colorScheme='red'
            className='action-button'
            variant='outline'
            rightIcon={<BiSearch />}
            onClick={() => history.push('/search')}
          >
            I am looking for donor
          </Button>
        </div>
      </div>
      <div className='bottom-container'>
        <p className='hero-text'>How bloodgrid works</p>
      </div>
    </div>
  );
};

export default LandingPage;
