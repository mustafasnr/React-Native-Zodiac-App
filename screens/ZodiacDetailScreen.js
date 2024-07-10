import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
const ZodiacDetails = ({ route, navigation }) => {
  const { signName,iconName,date,filtered_data} = route.params;
  
  const isDataValid = signName && iconName && date && filtered_data && filtered_data.context;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <IonIcon name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isDataValid ? `${signName} Burcu Yorumu` : 'Hata'}</Text>
      </View>
      <View style={styles.content}>
        {isDataValid ? (
          <>
            <Icon name={iconName} size={100} color="#E59866" />
            <Text style={styles.text}>{date}</Text>
            <Text style={styles.description}>{filtered_data.context}</Text>
          </>
        ) : (
          <View style={styles.errorContainer}>
            <IonIcon name="alert-circle-outline" size={64} color="red" />
            <Text style={styles.errorText}>Veri yüklenemedi.</Text>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.backButtonText}>Geri Dön</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E1', // Ana sayfa ile uyumlu krem rengi arka plan
  },
  header: {
    flex: 0.1,
    maxHeight: 80,
    flexDirection: 'row', // Geri butonu ve başlığı yatayda hizalar
    alignItems: 'center', // Dikeyde ortalar
    backgroundColor: '#E67E22', // Ana sayfa ile uyumlu turuncu arka plan
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 20,
    color: '#FFF',
    flex: 1,
  },
  backButton: {
    marginRight: 10, // Geri butonu ile başlık arasında boşluk bırakır
  },
  header_title: {
    color: '#FFF', // Yazı rengini beyaz yaptık
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Arial', // İstediğiniz fontu burada belirleyebilirsiniz
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // İçerik ve kenar arasında boşluk bıraktık
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E67E22', // Yazı rengini turuncu yaptık
    marginVertical: 10,
    fontFamily: 'Arial', // İstediğiniz fontu burada belirleyebilirsiniz
  },
  description: {
    fontSize: 18,
    color: '#6C3483', // Yazı rengini koyu mor yaptık
    textAlign: 'center', // Yazıları ortaladık
    marginVertical: 10,
    fontFamily: 'Arial', // İstediğiniz fontu burada belirleyebilirsiniz
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 24,
    color: 'red',
    marginVertical: 16,
    textAlign: 'center',
  },
  backButtonText: {
    fontSize: 18,
    color: '#E59866',
    textAlign: 'center',
  },
});

export default ZodiacDetails;