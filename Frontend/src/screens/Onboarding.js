import React,{useState,useEffect} from 'react'
import { View, Text,Image,StyleSheet  } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider';
import FirstImage from "../assets/images/1.svg";
import Ion from 'react-native-vector-icons/Ionicons';
import SecondImage from "../assets/images/2.svg";
import ThirdImage from "../assets/images/3.svg";

const slides = [
  {
    key: 1,
    title: 'Welcome to Kirayo! ',
    text: 'Rent anything from\nanywhere at any time.',
    image: FirstImage,
  },
  {
    key: 2,
    title: 'Save money!',
    text: 'Become a part of the\nshared economy model.',
    image: SecondImage,
  },
  {
    key: 3,
    title: 'Let\'s Rent',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: ThirdImage,
  }
];

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //[...]
});




const Onboarding = ({navigation}) => {

  const [showRealApp, setShowRealApp] = useState(false)

  _renderItem = ({ item }) => {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: 'center',backgroundColor: "#E6EEF0", marginTop: -90}}>
        {item.key == 1 && (<FirstImage height={200} width={200} />)}
        {item.key == 2 && (<SecondImage height={250} width={250} />)}
        {item.key == 3 && (<ThirdImage height={400} width={200}  />)}
        <Text style={{color: "#475FCB", fontWeight: "bold", margin: 15, fontSize: 24}}>{item.title} </Text>
        {(item.key!=3) && (
        <Text style={{color: "#EC8932", fontWeight: "bold", fontSize: 20}}>{item.text}</Text>)}
      </View>
    );
  } 
  const onDone = () => {
    setShowRealApp(true)
    navigation.navigate("Login")
  }

  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ion
          name="arrow-forward"
          color="#475FCB"
          size={24}
        />
      </View>
    );
  };
  const _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ion
          name="md-checkmark"
          color="#475FCB"
          size={24}
        />
      </View>
    );
  };

  return (
      <AppIntroSlider activeDotStyle={{backgroundColor: "#475FCB",width: 25, height: 8,marginLeft: -2}} renderDoneButton={_renderDoneButton} renderNextButton={_renderNextButton} dotStyle={{backgroundColor: "#746767",height: 8,width: 20,marginLeft: -2}}  renderItem={_renderItem} data={slides} onDone={onDone} />
  )
}

export default Onboarding