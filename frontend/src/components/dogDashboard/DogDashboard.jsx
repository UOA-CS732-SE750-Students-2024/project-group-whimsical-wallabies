import Grid from '@mui/material/Grid';

import React from 'react';
import DogCards from '../dogCards/DogCards';

export default function DogDashboard() {
  const dogs = [
    {
      ownerID: '1',
      id: 1,
      name: 'Buddy',
      breed: 'Norwich Terrier',
      dob: '2019-04-20',
      gender: 'Male',
      weight: 5,
      neutered: true,
      image: 'https://images.dog.ceo/breeds/terrier-norwich/n02094258_1003.jpg',
      photos: [],
      about_me: 'Energetic and affectionate companion.',
      interested_in: ['Playing fetch', 'Cuddles']
    },
    {
      ownerID: '1',
      id: 2,
      name: 'Max',
      breed: 'Beagle',
      dob: '2020-08-15',
      gender: 'Male',
      weight: 10,
      neutered: false,
      image: 'https://images.dog.ceo/breeds/beagle/n02088364_14220.jpg',
      photos: [],
      about_me: 'Loves long walks and howling at the moon.',
      interested_in: ['Chasing squirrels', 'Sniffing around']
    },
    {
      ownerID: '1',
      id: 3,
      name: 'Bella',
      breed: 'Golden Retriever',
      dob: '2021-01-05',
      gender: 'Female',
      weight: 25,
      neutered: true,
      image: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg',
      photos: [],
      about_me: 'Gentle soul with a love for swimming.',
      interested_in: ['Water games', 'Fetching balls']
    },
    {
      ownerID: '2',
      id: 1,
      name: 'Rocky',
      breed: 'German Shepherd',
      dob: '2018-11-10',
      gender: 'Male',
      weight: 30,
      neutered: true,
      image: 'https://images.dog.ceo/breeds/germanshepherd/n02106662_808.jpg',
      photos: [],
      about_me: 'Loyal and protective, enjoys long runs and playtime.',
      interested_in: ['Running', 'Training sessions']
    },
    {
      ownerID: '2',
      id: 2,
      name: 'Luna',
      breed: 'Labrador Retriever',
      dob: '2020-05-20',
      gender: 'Female',
      weight: 22,
      neutered: false,
      image: 'https://images.dog.ceo/breeds/labrador/n02099712_4759.jpg',
      photos: [],
      about_me: 'Friendly and playful, loves to fetch and swim.',
      interested_in: ['Fetching', 'Swimming']
    },
    {
      ownerID: '2',
      id: 3,
      name: 'Shadow',
      breed: 'Siberian Husky',
      dob: '2019-03-15',
      gender: 'Male',
      weight: 25,
      neutered: true,
      image: 'https://images.dog.ceo/breeds/husky/n02110185_388.jpg',
      photos: [],
      about_me: 'Energetic and adventurous, enjoys running and exploring.',
      interested_in: ['Running', 'Exploring']
    }
  ];

  return (
    <div>
      <h1>Dog Dashboard</h1>
      <Grid container justify="center" spacing={3}>
        <DogCards items={dogs} />
      </Grid>
    </div>
  );
}
