import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/Screens/Home';
import ProfileSetUp from './src/Screens/ProfileSetUp';
import SplashScreen from 'react-native-splash-screen';
import Login from './src/Screens/Login';
import ForgotPassword from './src/Screens/ForgotPassword';
import Otp from './src/Screens/Otp';
import Store from './src/Redux/store';
import {Provider} from 'react-redux';
const App = props => {
  const [isConnected, setIsConnected] = useState(true);
  let netInfoSubscription = null;
  const Stack = createStackNavigator();
  useEffect(() => {
    manageConnection();
    return () => {
      if (netInfoSubscription) {
        netInfoSubscription();
      }
    };
  }, []);

  const manageConnection = () => {
    retryConnection();
    netInfoSubscription = NetInfo.addEventListener(handleConnectivityChange);
  };

  // Managed internet connection
  const handleConnectivityChange = info => {
    if (info.type === 'none' || !info.isConnected) {
      setIsConnected(false);
    } else {
      setIsConnected(true);
    }
  };

  // Check network connection
  const retryConnection = () => {
    NetInfo.fetch().then(handleConnectivityChange);
  };
  SplashScreen.hide();
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            contentStyle: {
              backgroundColor: '#000',
            },
          }}
          initialRouteName="Login">
          <Stack.Screen
            name={'Home'}
            component={Home}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={'Login'}
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'ProfileSetUp'}
            component={ProfileSetUp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'ForgotPassword'}
            component={ForgotPassword}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'Otp'}
            component={Otp}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
