import axios from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const BASE_URL = import.meta.env.VITE_API_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authenticatedRequest = async (
  method: string,
  url: string,
  data = {}
) => {
  const token = localStorage.getItem('authToken');

  const config = {
    method,
    url: `${BASE_URL}${url}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const dateFormatter = (dateString: string) => {
  const date = new Date(dateString);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
};
