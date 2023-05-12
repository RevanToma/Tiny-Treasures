import { baseUrl, homeUrl } from './serverUrls';

interface ImgUrls {
  clothesMain: string;
  homeMain: string;
  clothes: string;
  categories: {
    [key: string]: string[];
  };
  icons: {
    [key: string]: string;
  };
}

export const imgUrls: ImgUrls = {
  clothesMain: `${baseUrl}/photos/clothes-main.png`,
  homeMain: `${baseUrl}/photos/home/hero.png`,
  clothes: `${baseUrl}/photos`,

  categories: {
    clothes: [
      `${homeUrl}/clothes-1.png`,
      `${homeUrl}/clothes-2.png`,
      `${homeUrl}/clothes-3.png`,
    ],
    toys: [
      `${homeUrl}/toys-1.png`,
      `${homeUrl}/toys-2.png`,
      `${homeUrl}/toys-3.png`,
    ],
    other: [
      `${homeUrl}/other-1.png`,
      `${homeUrl}/other-2.png`,
      `${homeUrl}/other-3.png`,
    ],
  },

  icons: {
    logoBig: `${baseUrl}/photos/logo-1.png`,
    logoSmall: `${baseUrl}/photos/logo-small.png`,
    google: `${baseUrl}/photos/google.png`,
    sendMessage: `${baseUrl}/photos/send-message-icon.svg`,
  },
};
