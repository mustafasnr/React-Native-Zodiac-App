import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFS from 'react-native-fs';
import firestore from '@react-native-firebase/firestore';
import {
  formattedDate,
  saveListAsJson,
  zodiacData,
  clearFiles,
} from '../utilities/Utility';
const localFilePath = RNFS.DocumentDirectoryPath + `/${formattedDate}.json`;

const HomeScreen = ({navigation}) => {
  const {width} = Dimensions.get('window');
  const boxSize = width / 3.2;

  const [dataList, setDataList] = React.useState([null]);
  const [zodiacDataList, setZodiacList] = React.useState(zodiacData);

  const loadFromFirebase = async () => {
    try {
      const jsonlist = [];
      const query = await firestore()
        .collection('GUNLUK_YORUMLAR')
        .doc(formattedDate)
        .collection('BURCLAR')
        .get();
      query.docs.forEach(element => {
        const data = element.data();
        jsonlist.push({name: data.name, context: data.context});
      });
      if (jsonlist.length !== 12) {
        throw new Error(`Expected 12 items, but got ${jsonlist.length}`);
      }
      setDataList(jsonlist);
      await saveListAsJson(jsonlist, localFilePath);
    } catch (error) {
      console.error('Firestore veri çekme hatası: ', error);
    }
  };

  const loadFromFile = async () => {
    try {
      const jsonContent = await RNFS.readFile(localFilePath, 'utf8');
      const jsonData = JSON.parse(jsonContent);
      setDataList(jsonData);
    } catch (error) {
      console.error('Dosya yükleme hatası: ', error);
    }
  };

  React.useEffect(() => {
    const setData = async () => {
      if (await RNFS.exists(localFilePath)) {
        console.log('dosyadan alındı');
        try {
          await loadFromFile();
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log('interneten çekildi');
        try {
          await loadFromFirebase();
        } catch (error) {
          console.log(error);
        }
      }
    };
    setData();
  }, []);
  clearFiles(RNFS.DocumentDirectoryPath);

  const yonlendir = zodiac_name => {
    try {
      const zodiac_object = zodiacDataList.find(
        item => item.name === zodiac_name,
      );

      filtered_object = null;
      if (dataList.length == 12) {
        filtered_object = dataList.find(
          item => item.name === zodiac_object.filter_name,
        );
      }
      console.log(
        'ALINAN VERİ:',
        zodiac_name,
        filtered_object,
        zodiac_object.name,
      );
      navigation.navigate('ZodiacDetail', {
        signName: zodiac_name,
        iconName: zodiac_object.icon,
        date: zodiac_object.date,
        filtered_data: filtered_object,
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_title}>Günlük Burç Yorumları</Text>
      </View>
      <View style={styles.zodiac_container}>
        {zodiacDataList.map((sign, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.box, {width: boxSize, height: boxSize}]}
            onPress={() => yonlendir(sign.name)}>
            <Icon name={sign.icon} size={boxSize / 1.5} color="#000" />
            <Text style={styles.text}>{sign.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E1', // Krem rengi arka plan
  },
  zodiac_container: {
    flex: 0.9,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'space-evenly',
    flexWrap: 'wrap',
    gap: 5, // Daha fazla boşluk ekledik
  },
  header: {
    flex: 0.1,
    maxHeight: 80,
    justifyContent: 'center',
    alignItems: 'center', // alignContent yerine alignItems kullandık
    backgroundColor: '#E67E22', // Turuncu arka plan
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  header_title: {
    color: '#FFF', // Yazı rengini beyaz yaptık
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Arial', // İstediğiniz fontu burada belirleyebilirsiniz
  },
  box: {
    justifyContent: 'center', // Ortaladı
    alignItems: 'center', // Ortaladı
    borderWidth: 2,
    borderRadius: 25,
    borderColor: '#E59866', // Daha yumuşak turuncu sınır
    backgroundColor: '#FFEBCC', // Kutuların arka plan rengini daha yumuşak krem yaptık
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    padding: 10, // İçerik ve kenar arasında boşluk bıraktık
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E67E22', // Yazı rengini turuncu yaptık
    fontFamily: 'Arial', // İstediğiniz fontu burada belirleyebilirsiniz
  },
});

export default HomeScreen;
