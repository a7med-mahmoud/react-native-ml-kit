import React, { useState } from 'react';
import { Text, Button, StyleSheet, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import BarcodeScanning from '@react-native-ml-kit/barcode-scanning';

const App = () => {
  const [barcodes, setBarcodes] = useState([]);

  const handlePress = async () => {
    setBarcodes([]);
    const image = await ImagePicker.openPicker({ mediaType: 'photo' });
    const result = await BarcodeScanning.scan('file://' + image.path);
    setBarcodes(result);
  };

  return (
    <View style={styles.container}>
      <Button title="Choose an Image" onPress={handlePress} />

      {barcodes.length > 0 && <Text style={styles.heading}>Barcodes</Text>}
      {barcodes.map(label => (
        <View style={styles.label} key={label}>
          <Text>
            {label.value} - {label.format}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    backgroundColor: '#ffff55',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    width: '90%',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
  },
});

export default App;
