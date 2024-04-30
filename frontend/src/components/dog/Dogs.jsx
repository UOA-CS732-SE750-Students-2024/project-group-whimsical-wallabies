import React from 'react';
import DogCards from './DogCards';

export default function Dogs() {
  const dogs = [
    {
      id: 1,
      name: 'Buddy',
      breed: 'Norwich Terrier',
      dob: '2019-04-20',
      owner: 'John',
      gender: 'Male',
      weight: 5,
      neutered: true,
      image: 'https://images.dog.ceo/breeds/terrier-norwich/n02094258_1003.jpg',
      photos: [],
      about_me: 'Energetic and affectionate companion.',
      interested_in: ['Playing fetch', 'Cuddles']
    },
    {
      id: 2,
      name: 'Max',
      breed: 'Beagle',
      dob: '2020-08-15',
      owner: 'Jane',
      gender: 'Male',
      weight: 10,
      neutered: false,
      image: 'https://images.dog.ceo/breeds/beagle/n02088364_14220.jpg',
      photos: [],
      about_me: 'Loves long walks and howling at the moon.',
      interested_in: ['Chasing squirrels', 'Sniffing around']
    },
    {
      id: 3,
      name: 'Bella',
      breed: 'Golden Retriever',
      dob: '2021-01-05',
      owner: 'Alice',
      gender: 'Female',
      weight: 25,
      neutered: true,
      image: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg',
      photos: [],
      about_me: 'Gentle soul with a love for swimming.',
      interested_in: ['Water games', 'Fetching balls']
    }
  ];

  return (
    <div>
      <h1>Dogs</h1>
      <DogCards items={dogs} />
    </div>
  );
}
