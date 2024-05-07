import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import DogModel from './models/Dog.js';
import PhotoModel from './models/Photo.js';
import UserModel from './models/User.js';

const dogNames = [
  'Buddy',
  'Max',
  'Charlie',
  'Cooper',
  'Rocky',
  'Jack',
  'Toby',
  'Duke',
  'Bear',
  'Oliver',
  'Milo',
  'Leo',
  'Zeus',
  'Oscar',
  'Winston'
];

const dogBreeds = ['Golden Retriever', 'Poodle', 'Shih Tzu', 'maltease', 'Shiba Inu'];

const dogBios = [
  'I love long walks in the park.',
  'I enjoy playing fetch.',
  'I am a champion at belly rubs.',
  'I have a passion for treats.',
  'I am always up for an adventure.',
  'I am a cuddle expert.',
  'I have a nose for sniffing out fun.',
  'I am a loyal companion.',
  'I am a master at catching frisbees.',
  'I am a professional squirrel chaser.',
  'I am a water-loving dog.',
  'I am a ball of energy.',
  'I am a gentle giant.',
  'I am a mischief maker.',
  'I am a social butterfly.'
];

async function setupData() {
  try {
    // Create users
    const users = await UserModel.create([
      {
        aboutMe: "I'm a dog enthusiast!",
        username: 'doglover1',
        password: await bcrypt.hash('password1', 12),
        email: 'doglover1@example.com',
        address: '34 Princes Street, Auckland CBD, Auckland 1010, New Zealand',
        latitude: -36.8520062,
        longitude: 174.7686103,
        phone: '123-456-7890',
        photoProfile: ''
      },
      {
        aboutMe: 'Dogs are my life!',
        username: 'puppyfanatic',
        password: await bcrypt.hash('password2', 12),
        email: 'puppyfanatic@example.com',
        address: 'Grafton, Auckland 1023, New Zealand',
        latitude: -36.8617676,
        longitude: 174.7696216,
        phone: '987-654-3210',
        photoProfile: ''
      },
      {
        aboutMe: 'Dog person through and through!',
        username: 'caninelover',
        password: await bcrypt.hash('password3', 12),
        email: 'caninelover@example.com',
        address: 'Building 109/5 Alfred Street, Auckland CBD, Auckland 1010, New Zealand',
        latitude: -36.8512138,
        longitude: 174.7693122,
        phone: '555-123-4567',
        photoProfile: ''
      },
      {
        aboutMe: 'All dogs, all the time!',
        username: 'woofwoof',
        password: await bcrypt.hash('password4', 12),
        email: 'woofwoof@example.com',
        address: '314-390 Khyber Pass Road, Newmarket, Auckland 1023, New Zealand',
        latitude: -36.8659909,
        longitude: 174.773442,
        phone: '555-987-6543',
        photoProfile: ''
      },
      {
        aboutMe: 'Dog lover extraordinaire!',
        username: 'barkbuddy',
        password: await bcrypt.hash('password5', 12),
        email: 'barkbuddy@example.com',
        address: 'The Clock Tower 22 Princes Street, Auckland CBD, Auckland 1010, New Zealand',
        latitude: -36.8503035,
        longitude: 174.7694042,
        phone: '555-246-1357',
        photoProfile: ''
      }
    ]);

    // Create dogs for each user
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const dogs = [];
      for (let j = 0; j < 3; j++) {
        const dog = await DogModel.create({
          name: dogNames[i * 3 + j],
          breed: dogBreeds[i],
          dob: new Date(),
          owner: user._id,
          gender: j % 2 === 0 ? 'Male' : 'Female',
          weight: Math.floor(Math.random() * 6) + 10, // Random weight between 10 and 15
          bio: dogBios[i * 3 + j],
          neutered: j % 2 === 0 ? true : false,
          profilePicture: `dog${j + 1}.jpg`
        });
        dogs.push(dog);
      }

      // Create photos for each dog
      for (let k = 0; k < dogs.length; k++) {
        const dog = dogs[k];
        for (let l = 0; l < 5; l++) {
          await PhotoModel.create({
            dog: dog._id,
            url: `media/dogs/dog${k + 1}_photo${l + 1}.jpg`
          });
        }
      }
    }

    console.log('Initial data setup completed.');
  } catch (error) {
    console.error('Error setting up initial data:', error);
  }
}

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/732-project', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.once('open', async () => {
  console.log('Connected to MongoDB.');

  try {
    // Clear existing data
    await DogModel.deleteMany();
    await UserModel.deleteMany();
    await PhotoModel.deleteMany();

    // Add new data
    await setupData();
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
