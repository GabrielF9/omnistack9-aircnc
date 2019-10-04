import React, { useState, useEffect } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';

import SpotList from '../components/SpotList';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    });
  }, []);

  return (
    <SafeAreaView  style={styles.container}>
      <Image style={styles.logo} source={logo} />
      
      <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10
  }
});