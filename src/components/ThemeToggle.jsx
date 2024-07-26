/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/themeSlice';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

  return (
    <button onClick={() => dispatch(toggleTheme())}>
      Switch to {isDarkTheme ? 'Light' : 'Dark'} Theme
    </button>
  );
};

export default ThemeToggle;