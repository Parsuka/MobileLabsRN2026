import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TASKS } from '../data/tasks';
import { lightTheme, darkTheme } from '../theme/themes';

const AppContext = createContext();

const STORAGE_KEY = 'lab3_state';

const initialState = {
  score: 0,
  themeMode: 'light',
  stats: {
    taps: 0,
    doubleTaps: 0,
    longPressDone: false,
    dragged: false,
    swipeRight: false,
    swipeLeft: false,
    resized: false,
    themeChanged: false,
  },
};

export function AppProvider({ children }) {
  const [state, setState] = useState(initialState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadState();
  }, []);

  useEffect(() => {
    if (loaded) {
      saveState();
    }
  }, [state, loaded]);

  const loadState = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        setState(JSON.parse(saved));
      }
    } catch (e) {
      console.log('Помилка завантаження:', e);
    } finally {
      setLoaded(true);
    }
  };

  const saveState = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.log('Помилка збереження:', e);
    }
  };

  const registerTap = () => {
    setState(prev => ({
      ...prev,
      score: prev.score + 1,
      stats: {
        ...prev.stats,
        taps: prev.stats.taps + 1,
      },
    }));
  };

  const registerDoubleTap = () => {
    setState(prev => ({
      ...prev,
      score: prev.score + 2,
      stats: {
        ...prev.stats,
        doubleTaps: prev.stats.doubleTaps + 1,
      },
    }));
  };

  const registerLongPress = () => {
    setState(prev => ({
      ...prev,
      score: prev.score + 10,
      stats: {
        ...prev.stats,
        longPressDone: true,
      },
    }));
  };

  const registerDrag = () => {
    setState(prev => ({
      ...prev,
      score: prev.score + 5,
      stats: {
        ...prev.stats,
        dragged: true,
      },
    }));
  };

  const registerSwipeRight = () => {
    setState(prev => ({
      ...prev,
      score: prev.score + 3,
      stats: {
        ...prev.stats,
        swipeRight: true,
      },
    }));
  };

  const registerSwipeLeft = () => {
    setState(prev => ({
      ...prev,
      score: prev.score + 3,
      stats: {
        ...prev.stats,
        swipeLeft: true,
      },
    }));
  };

  const registerResize = () => {
    setState(prev => ({
      ...prev,
      score: prev.score + 4,
      stats: {
        ...prev.stats,
        resized: true,
      },
    }));
  };

  const toggleTheme = () => {
    setState(prev => ({
      ...prev,
      themeMode: prev.themeMode === 'light' ? 'dark' : 'light',
      stats: {
        ...prev.stats,
        themeChanged: true,
      },
    }));
  };

  const resetProgress = async () => {
    setState(initialState);
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.log('Помилка очищення:', e);
    }
  };

  const completedTasks = useMemo(() => {
    return TASKS.map(task => {
      let completed = false;

      switch (task.id) {
        case 'tap10':
          completed = state.stats.taps >= 10;
          break;
        case 'double5':
          completed = state.stats.doubleTaps >= 5;
          break;
        case 'hold3s':
          completed = state.stats.longPressDone;
          break;
        case 'drag':
          completed = state.stats.dragged;
          break;
        case 'swipeRight':
          completed = state.stats.swipeRight;
          break;
        case 'swipeLeft':
          completed = state.stats.swipeLeft;
          break;
        case 'resize':
          completed = state.stats.resized;
          break;
        case 'score100':
          completed = state.score >= 100;
          break;
        case 'themeChange':
          completed = state.stats.themeChanged;
          break;
        default:
          completed = false;
      }

      return { ...task, completed };
    });
  }, [state]);

  const value = {
    state,
    theme: state.themeMode === 'light' ? lightTheme : darkTheme,
    registerTap,
    registerDoubleTap,
    registerLongPress,
    registerDrag,
    registerSwipeRight,
    registerSwipeLeft,
    registerResize,
    toggleTheme,
    resetProgress,
    completedTasks,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}