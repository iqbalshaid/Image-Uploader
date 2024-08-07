import { useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import DocumentPicker from "react-native-document-picker";
import axios from "axios";

const App = () => {
  const [image, setImage] = useState(null);
  const [stor, setStor] = useState([]);

  const submit = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log("hello12");
      setImage(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Document picking cancelled');
      } else {
        console.error('Error picking document:', err);
      }
    }
   console.log(image);
    const formdatas = new FormData();
    if (image) {
      formdatas.append('image', {
        uri: image[0].uri,
        name: image[0].name,
        type: image[0].type,
      });
    
   

  console.log("husme");
  try{
   await axios.post('http://10.0.2.2:8000/images1', formdatas, {headers: {
    'Content-Type': 'multipart/form-data',
  }}
    )
      Alert.alert("upload image successfully")}
    catch(error){
      Alert.alert("not upload img",error);
    }
    
  }
}

  const fetchData4 = async () => {
    await axios.get('http://10.0.2.2:8000/images1',{headers: {
      'Content-Type': 'multipart/form-data',
    }}).then(response => {
      setStor(response.data.name); // Assuming response.data.names is an array of image names
    }).catch(error => {
      console.log("Failed to fetch images");
    });
  };
console.log(stor);
  useEffect(() => {
    fetchData4();
  }, []);

  return (
    <SafeAreaView>
      <TouchableOpacity style={{ marginTop: 20, marginHorizontal: 10, width: "90%", height: 20, borderRadius: 10, borderColor: "red", backgroundColor: "blue" }}
        onPress={submit}>
        <Text style={{ textAlign: "center", fontSize: 12, fontWeight: "800", color: "white" }}>Pick The Image</Text>
      </TouchableOpacity>

      <ScrollView vertical={true}>
        {stor.length>0 && stor.map((item) => (
          <View key={item}>
            <Image style={{ marginVertical: 20, marginHorizontal: 20, borderRadius: 30 }} source={{ uri: `http://10.0.2.2:8000/images1/${item}` }} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
