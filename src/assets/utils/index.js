/* eslint-disable no-useless-escape */
import morning from "../../assets/morning.svg";
import sunrise from "../../assets/sunrise.svg";
import flexible from "../../assets/flexible.svg";

export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const allTimeType = [
  {
    imgSrc: `${morning}`,
    type: "button",
    label: "Morning",
    subLabel: "Before 10am",
  },
  {
    imgSrc: `${sunrise}`,
    type: "button",
    label: "Afternoon",
    subLabel: "After 2pm",
  },
  {
    imgSrc: `${flexible}`,
    type: "button",
    label: "Flexible",
    subLabel: "Morning or Afternoon",
  },
];

export const allPlans = [
  {
    title: "Mighty Hercules",
    slug: "mighty_hercules",
    originalPrice: "$110",
    discountedPrice: "NOW $77.50",
    features: [
      "2 Men",
      "Truck 20 - 25 m³",
      "HOME",
      "1-2 Bedrooms",
      "Outdoor and plants",
      "Garage Items",
      "OFFICES",
      "7-9 Employees",
      "Work stations",
      "Computers",
      "Mighty Hercules Package",
    ],
    buttonText: "BOOK NOW",
  },
  {
    title: "Incredible Hulk",
    slug: "incredible_hulk",
    originalPrice: "$120",
    discountedPrice: "NOW $80",
    features: [
      "2 Men",
      "Truck 40 - 45 m³",
      "HOME",
      "2-3 Bedrooms",
      "Outdoor and plants",
      "Garage Items",
      "OFFICES",
      "10-12 Employees",
      "Work stations",
      "Computers",
      "Incredible Hulk Package",
    ],
    buttonText: "BOOK NOW",
  },
  {
    title: "King Kong",
    slug: "king_kong",
    originalPrice: "$130",
    discountedPrice: "NOW $85",
    features: [
      "2 Men",
      "Large Truck 50 - 65 m³",
      "HOME",
      "4-5 Bedrooms",
      "Outdoor and plants",
      "Garage Items",
      "OFFICES",
      "15 Employees",
      "Work stations",
      "Computers",
      "King Kong Package",
    ],
    buttonText: "BOOK NOW",
  },
  {
    title: "Super King Kong",
    slug: "super_king_kong",
    originalPrice: "$160",
    discountedPrice: "NOW $110",
    features: [
      "3 Men",
      "Large Truck 50 - 65 m³",
      "HOME",
      "4-5 Bedrooms",
      "Outdoor and plants",
      "Garage Items",
      "OFFICES",
      "15 Employees",
      "Work stations",
      "Computers",
      "Super King Kong Package",
    ],
    buttonText: "BOOK NOW",
  },
];

export const accessOptions = [
  "Stairs",
  "Lift",
  "Driveway",
  "Street Parking",
  "Narrow Streets",
  "Ramp",
  "Steep Driveway",
];

export const truckDoorDistanceOptions = [
  "0-15m",
  "15-50m",
  "50-150m",
  "Over 150m",
];

export const initialOversizedItems = [
  {
    id: 1,
    label: "Piano",
    count: 0,
  },
  {
    id: 2,
    label: "Gym equipment",
    count: 0,
  },
  {
    id: 3,
    label: "Pool table",
    count: 0,
  },
  {
    id: 4,
    label: "Safe or Vault ",
    count: 0,
  },
  {
    id: 5,
    label: "Large or bulky furniture",
    count: 0,
  },
  {
    id: 6,
    label: "Large appliances",
    count: 0,
  },
  {
    id: 7,
    label: "Large electronics",
    count: 0,
  },
  {
    id: 8,
    label: "Large outdoor equipment",
    count: 0,
  },
  {
    id: 9,
    label: "Antique or delicate furniture",
    count: 0,
  },
  {
    id: 9,
    label: "Others",
    count: 0,
  },
];

export const furnitureOptions = [
  {
    id: "lightlyFurnished",
    label: "Lightly furnished",
    description:
      "You're a minimalist and you only have a small number of items in each room",
  },
  {
    id: "moderatelyFurnished",
    label: "Moderately furnished",
    description:
      "You have an average amount of furniture and decorative items in each room",
  },
  {
    id: "heavilyFurnished",
    label: "Heavily furnished",
    description:
      "You find it hard to throw things out. You have a lot of furniture and decorations in each room.",
  },
];