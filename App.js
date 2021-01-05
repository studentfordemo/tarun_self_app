import React,{Component} from 'react';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
import WelcomeScreen from './screens/WelcomeScreen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Location from "./components/Loc"
function Demo() {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
    >
      <Text>This is top text.</Text>
      <Text>This is bottom text.</Text>
    </SafeAreaView>
  );
}

export default class App extends Component{
  render(){
  return (
    <SafeAreaProvider>
    <AppContainer/>
    </SafeAreaProvider>
  );
}
}


const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: WelcomeScreen},
  Location : {screen:Location}
})

const AppContainer =  createAppContainer(switchNavigator);