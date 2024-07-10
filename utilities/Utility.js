import RNFS from 'react-native-fs';
export const formattedDate = new Date().toISOString().slice(0, 10);

export const saveListAsJson = async (list,path) => {
    const json = JSON.stringify(list, null, 2);

    try {
      await RNFS.writeFile(path, json, 'utf8');
      console.log('Dosya başarıyla kaydedildi:', path);
    } catch (error) {
      console.log('Dosya kaydedilirken hata oluştu:', error);
    }
};

export const clearFiles = async (path) => {
  try {
    // Dizindeki tüm dosyaları listele
    const files = await RNFS.readDir(path);

    // Her dosya için kontrol yap
    for (const file of files) {
      if (file.name !== `${formattedDate}.json`) {
        await RNFS.unlink(file.path);
        console.log(`${file.name} dosyası silindi.`);
      } else {
        console.log(`${file.path} dosyası korundu.`);
      }
    }
    console.log('İşlem tamamlandı.');
  } catch (error) {
    console.error('Hata:', error);
  }
};

export const zodiacData = [
    { name: 'Koç', icon: 'zodiac-aries' ,date:"21 Mart - 19 Nisan", filter_name:"koc"},
    { name: 'Boğa', icon: 'zodiac-taurus' ,date:"20 Nisan - 20 Mayıs", filter_name:"boga"},
    { name: 'İkizler', icon: 'zodiac-gemini',date:"21 Mayıs - 20 Haziran", filter_name:"ikizler"},
    { name: 'Yengeç', icon: 'zodiac-cancer',date:"21 Haziran - 22 Temmuz", filter_name:"yengec"},
    { name: 'Aslan', icon: 'zodiac-leo',date:"23 Temmuz - 22 Ağustos" , filter_name:"aslan"},
    { name: 'Başak', icon: 'zodiac-virgo',date:"23 Ağustos - 22 Eylül" , filter_name:"basak"},
    { name: 'Terazi', icon: 'zodiac-libra',date:"23 Eylül - 22 Ekim" , filter_name:"terazi"},
    { name: 'Akrep', icon: 'zodiac-scorpio',date:"23 Ekim - 21 Kasım" , filter_name:"akrep"},
    { name: 'Yay', icon: 'zodiac-sagittarius',date:"22 Kasım - 21 Aralık" , filter_name:"yay"},
    { name: 'Oğlak', icon: 'zodiac-capricorn',date:"22 Aralık - 19 Ocak" , filter_name:"oglak"},
    { name: 'Kova', icon: 'zodiac-aquarius',date:"20 Ocak - 18 Şubat" , filter_name:"kova"},
    { name: 'Balık', icon: 'zodiac-pisces',date:"19 Şubat - 20 Mart" , filter_name:"balik"},
  ];