'use strict';

import { Sizes } from '../models/postModel';
import { Point } from '../utils/interfaces';

enum MainCategories {
  A = 'Other',
  B = 'Clothes',
  C = 'Toys',
}

enum Clothes {
  A = 'One Piece',
  B = 'Knitted',
  C = 'T-Shirts',
  D = 'Sweaters',
  E = 'Shirts',
  F = 'Dresses',
  G = 'Trousers',
  H = 'Jeans',
  I = 'Leggings',
  J = 'Shorts',
}

enum Toys {
  A = 'Soft Toys',
  B = 'Baby Toys',
  C = 'Indoor Toys',
  D = 'Outdoor Toys',
  E = 'Educational',
  F = 'Creative',
  G = 'Arts and Crafts',
  H = 'Sports',
  I = 'Games',
}

enum Other {
  A = 'Bikes',
  B = 'Strollers',
  C = 'Car Seats',
}

function getRandomMainAndSubCategories() {
  const mainCategories = Object.values(MainCategories);
  const randomMainCategory =
    mainCategories[Math.floor(Math.random() * mainCategories.length)];

  let subCategories: string[];
  switch (randomMainCategory) {
    case MainCategories.A:
      subCategories = Object.values(Other);
      break;
    case MainCategories.B:
      subCategories = Object.values(Clothes);
      break;
    case MainCategories.C:
      subCategories = Object.values(Toys);
      break;
    default:
      subCategories = [];
      break;
  }

  const randomSubCategory =
    subCategories[Math.floor(Math.random() * subCategories.length)];

  return [randomMainCategory, randomSubCategory];
}

function getRandomTitle() {
  const titles = [
    'Free Kids Clothes: Cute and Comfy!',
    'Get Ready for Summer with Free Kids Clothes',
    "Gently Used Children's Clothes: Free to a Good Home",
    'Kids Grow So Fast! Take Our Free Clothes!',
    'Free Clothes for Boys and Girls: Assorted Sizes',
    'Score Free Kids Clothes: First Come, First Served',
    'Donate or Take Free Kids Clothes Here!',
    'Outgrown Clothes? Share the Love with Free Kids Clothes',
    'Free Kids Clothes: Quality Clothing at No Cost',
    'Free Kids Clothes: Give Your Wallet a Break',
    "Free Children's Clothes: Reduce, Reuse, Recycle",
    'Score Free Kids Clothes for Your Growing Family',
    'Free Kids Clothes: Help Us Clear Our Closet!',
    'Free Kids Clothes: Perfect for Playtime',
    'Need Kids Clothes? We Have Free Ones!',
    'Free Kids Clothes: All Seasons and Styles',
    "Clean Out Your Kids' Closet with Free Clothes",
    'Free Kids Clothes: No Strings Attached',
    'Free Kids Clothes: Take Only What You Need',
    "Kids Clothes Giveaway: Don't Miss Out!",
  ];

  const randomIndex = Math.floor(Math.random() * titles.length);
  return titles[randomIndex];
}

function getRandomDescription() {
  const descriptions = [
    "Our free kids clothes are perfect for parents who want to save money without sacrificing quality. We have a wide range of sizes and styles, from baby clothes to kids' clothing for older children. Come by and pick out what you need – it's all free!",
    "Looking for affordable kids clothes? Look no further! We're giving away free kids clothes in great condition. Our selection includes everything from t-shirts and jeans to dresses and shoes. Come browse our selection and take what you need.",
    "We know how quickly kids grow out of their clothes – that's why we're giving away our gently used children's clothes for free. Our clothes are still in great condition and ready for a new home. Come take a look and see if there's something your child can wear!",
    'Free kids clothes available now! We have clothes for boys and girls of all ages and sizes. Our selection includes everything from summer clothes to winter coats. Come take a look and see what you can find!',
    "Outgrown your kids' clothes? Don't throw them away – bring them to us and take home some new-to-you clothes for free! We have a variety of styles and sizes available for boys and girls. Help us reduce waste and give back to the community.",
    'Need clothes for your growing family? Come check out our selection of free kids clothes. We have clothes for infants, toddlers, and older children. Our clothes are gently used but still in great condition. Take what you need!',
    'Looking for free kids clothes? We have a variety of sizes and styles available for boys and girls. Our selection includes everything from casual wear to formal wear. Come browse our collection and see what you can find!',
    "Are you tired of spending a fortune on kids clothes? We're here to help! We have a great selection of free kids clothes available now. Our clothes are still in great condition and ready for a new home. Come take a look!",
    "Donate or take free kids clothes here! We believe in giving back to the community and helping those in need. If you have clothes to donate, bring them by – and if you need clothes for your kids, take what you need. It's all free!",
    'Get ready for summer with our free kids clothes! We have a great selection of shorts, t-shirts, and summer dresses for boys and girls. Our clothes are gently used but still in great condition. Come take a look and see what you can find!',
  ];

  const randomIndex = Math.floor(Math.random() * descriptions.length);
  return descriptions[randomIndex];
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

function getRandomSize(): string {
  const sizes = Object.values(Sizes); // Get an array of all the size values
  const randomIndex = Math.floor(Math.random() * sizes.length); // Get a random index in the array
  return sizes[randomIndex]; // Return the size at the random index
}

function getRandomUser(): string {
  const users = [
    '644acb016a4541fb49c4c2ad',
    '644acb0c6a4541fb49c4c2af',
    '644acb186a4541fb49c4c2b1',
    '644acb2c6a4541fb49c4c2b3',
    '644acb376a4541fb49c4c2b5',
    '64500ae2032e065dc8b21180',
  ];
  const randomIndex = Math.floor(Math.random() * users.length); // Get a random index in the array
  return users[randomIndex]; // Return the size at the random index
}

function getRandomCategories() {
  const categories = [
    't-shirt',
    'shorts',
    'pants',
    'sweater',
    'jeans',
    'jacket',
    'shoes',
  ];

  const numCategories = Math.floor(Math.random() * 5) + 1; // generate a random number between 1 and 5
  const selectedCategories = [];

  for (let i = 0; i < numCategories; i++) {
    const randomIndex = Math.floor(Math.random() * categories.length);
    selectedCategories.push(categories[randomIndex]);
  }

  return selectedCategories;
}

function getRandomCondition() {
  const conditions = ['used', 'fair', 'good', 'new'];

  const randomIndex = Math.floor(Math.random() * conditions.length);
  return conditions[randomIndex];
}

function getRandomDate() {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const today = new Date();

  const randomTime =
    sixMonthsAgo.getTime() +
    Math.random() * (today.getTime() - sixMonthsAgo.getTime());
  const randomDate = new Date(randomTime);

  return randomDate;
}

function getRandomCoordinatesInSweden(): [number, number] {
  // Define the bounds of the area we want to generate coordinates in
  const latMin = 55.2371;
  const latMax = 69.0605;
  const lonMin = 10.5986;
  const lonMax = 24.1935;

  // Generate random latitude and longitude within the bounds
  const lat = Math.random() * (latMax - latMin) + latMin;
  const lon = Math.random() * (lonMax - lonMin) + lonMin;

  // Return the coordinates as an array with longitude first
  return [lon, lat];
}

const createPostost = (id: number) => {
  const item = getRandomMainAndSubCategories();
  return {
    title: id,
    // title: getRandomTitle(),
    description: getRandomDescription(),
    itemCount: getRandomNumber(),
    size: getRandomSize(),
    mainCategory: item[0],
    subCategories: item[1],
    condition: getRandomCondition(),
    createdAt: getRandomDate(),
    images: [],
    user: getRandomUser(),
    location: {
      type: Point.Point,
      coordinates: getRandomCoordinatesInSweden(),
    },
  };
};

export const posts = Array(100)
  .fill(null)
  .map((_, i) => createPostost(i));
