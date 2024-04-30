import PropTypes from 'prop-types';
import React from 'react';
import DogCardItem from './DogCardItem';

export default function DogCards({ items }) {
  if (items && items.length > 0) {
    return (
      <div>
        <h1>Dog Cards</h1>
        <ul>
          {items.map((dog) => (
            <DogCardItem
              key={dog.id}
              id={dog.id}
              image={dog.image}
              name={dog.name}
              gender={dog.gender}
              owner={dog.owner}
              about_me={dog.about_me}
            />
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <h1>No Dogs Found</h1>
      </div>
    );
  }
}

DogCards.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
      about_me: PropTypes.string.isRequired
    })
  ).isRequired
};
