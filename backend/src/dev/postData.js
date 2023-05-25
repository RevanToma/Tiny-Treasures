'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.posts = void 0;
const postModel_1 = require("../models/postModel");
const interfaces_1 = require("../utils/interfaces");
var MainCategories;
(function (MainCategories) {
    MainCategories["A"] = "other";
    MainCategories["B"] = "clothes";
    MainCategories["C"] = "toys";
})(MainCategories || (MainCategories = {}));
var Clothes;
(function (Clothes) {
    Clothes["A"] = "One Piece";
    Clothes["B"] = "Knitted";
    Clothes["C"] = "T-Shirts";
    Clothes["D"] = "Sweaters";
    Clothes["E"] = "Shirts";
    Clothes["F"] = "Dresses";
    Clothes["G"] = "Trousers";
    Clothes["H"] = "Jeans";
    Clothes["I"] = "Leggings";
    Clothes["J"] = "Shorts";
})(Clothes || (Clothes = {}));
var Toys;
(function (Toys) {
    Toys["A"] = "Soft Toys";
    Toys["B"] = "Baby Toys";
    Toys["C"] = "Indoor Toys";
    Toys["D"] = "Outdoor Toys";
    Toys["E"] = "Educational";
    Toys["F"] = "Creative";
    Toys["G"] = "Arts and Crafts";
    Toys["H"] = "Sports";
    Toys["I"] = "Games";
})(Toys || (Toys = {}));
var Other;
(function (Other) {
    Other["A"] = "Bikes";
    Other["B"] = "Strollers";
    Other["C"] = "Car Seats";
})(Other || (Other = {}));
var Ages;
(function (Ages) {
    Ages["A"] = "0-3";
    Ages["B"] = "4-7";
    Ages["C"] = "8-11";
})(Ages || (Ages = {}));
function getRandomAge() {
    const ages = Object.values(Ages);
    const randomIndex = Math.floor(Math.random() * ages.length);
    return ages[randomIndex];
}
function getRandomMainAndSubCategories() {
    let size = null;
    let age = null;
    const mainCategories = Object.values(MainCategories);
    const randomMainCategory = mainCategories[Math.floor(Math.random() * mainCategories.length)];
    let subCategories;
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
    const randomSubCategory = subCategories[Math.floor(Math.random() * subCategories.length)];
    if (randomMainCategory === 'clothes') {
        size = getRandomSize();
    }
    else {
        age = getRandomAge();
    }
    return [randomMainCategory, randomSubCategory, size, age];
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
function getRandomSize() {
    const sizes = Object.values(postModel_1.Sizes); // Get an array of all the size values
    const randomIndex = Math.floor(Math.random() * sizes.length); // Get a random index in the array
    return sizes[randomIndex]; // Return the size at the random index
}
function getRandomUser() {
    const users = [
        '644798e9c829c53744a8ae49',
        '6447e5dd3f1fca8a6a257d86',
        '6447e8696312cbecc42ebaab',
        '6453a8a08fc1c78e99917273',
        '645560a6c623997f87a6d6dc',
        '6458d83df06dbba0902f6ee3',
        '64590464f048c99344368a06',
        '645cecee057875b7c81ffd00',
        '645ceef9057875b7c81ffd03',
        '645cefab057875b7c81ffd06',
        '645cf8d9057875b7c81ffd08',
        '645e67da61a101be69c00017',
        '645e68b061a101be69c0001a',
    ];
    const randomIndex = Math.floor(Math.random() * users.length); // Get a random index in the array
    return users[randomIndex]; // Return the size at the random index
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
    const randomTime = sixMonthsAgo.getTime() +
        Math.random() * (today.getTime() - sixMonthsAgo.getTime());
    const randomDate = new Date(randomTime);
    return randomDate;
}
function getRandomCoordinatesInSweden() {
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
const images = [
    'http://localhost:8000/photos/posts/user-644acb016a4541fb49c4c2ad-1683236062245.jpeg',
    'http://localhost:8000/photos/posts/user-644acb016a4541fb49c4c2ad-1683236062248.jpeg',
    'http://localhost:8000/photos/posts/user-644acb016a4541fb49c4c2ad-1683236062249.jpeg',
    'http://localhost:8000/photos/posts/user-644acb016a4541fb49c4c2ad-1683236062251.jpeg',
    'http://localhost:8000/photos/posts/user-644acb016a4541fb49c4c2ad-1683236062253.jpeg',
];
const createPostost = (id) => {
    const item = getRandomMainAndSubCategories();
    const post = {
        title: getRandomTitle(),
        description: getRandomDescription(),
        group: item[0],
        typeOfItems: item[1] ? [item[1]] : [],
        itemCount: getRandomNumber(),
        condition: getRandomCondition(),
        createdAt: getRandomDate(),
        images,
        user: getRandomUser(),
        // user: '6457cd486cd32551062a6ca2',
        location: {
            type: interfaces_1.Point.Point,
            coordinates: getRandomCoordinatesInSweden(),
        },
    };
    if (item[0] === 'clothes') {
        post.sizes = item[2] ? [item[2]] : [];
    }
    else {
        post.age = item[3];
    }
    return post;
};
exports.posts = Array(200)
    .fill(null)
    .map((_, i) => createPostost(i));
