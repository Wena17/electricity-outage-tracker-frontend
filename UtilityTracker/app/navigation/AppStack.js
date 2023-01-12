import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import ConnectDeviceScreen from '../screens/ConnectDeviceScreen';
import DrawerNavigation from './DrawerNavigation';
import TabBar from './TabBar';
import AlternativePowerSource from '../screens/AlternativePowerSource';
import AddAlternativeScreen from '../screens/AddAlternativeScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SearchLocationScreen from '../screens/SearchLocationScreen';
import AddModal from '../screens/AddModal';
import ViewModal from '../screens/ViewModal';
import ViewAlternativePowerScreen from '../screens/ViewAlternativePowerScreen';
import RestorationDetails from '../screens/RestoratioDetails';
import NotifView from '../screens/NotifView';
import HistoryView from '../screens/HistoryView';
//Provider screeen
import ProTabBar from './ProTabBar';
import ProAddScheduleOutages from '../providerScreen/ProAddScheduleOutages';
import ProEditProfileScreen from '../providerScreen/ProEditProfileScreen';

const Stack = createStackNavigator();

const Navigation = (props) => {
  
  return (
    <NavigationContainer>
      <StatusBar/>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Welcome' component={WelcomeScreen}/>
        <Stack.Screen name='Login' >
          {(p) => <LoginScreen model={props.model} onUpdate={props.onUpdate} /> }
        </Stack.Screen>
        <Stack.Screen name='Signup' >
          {(p) => <SignupScreen  model={props.model} onUpdate={props.onUpdate} /> }
        </Stack.Screen>
        <Stack.Screen name='ConnectDevice' > 
          {(p) => <ConnectDeviceScreen  model={props.model} onUpdate={props.onUpdate} /> }
        </Stack.Screen>
        <Stack.Screen name='ConfirmEmail' component={ConfirmEmailScreen} />
        <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
        <Stack.Screen name='NewPassword' component={NewPasswordScreen}/>
        <Stack.Screen name='Home1' > 
          {(p) => <TabBar model={props.model} onUpdate={props.onUpdate} />}
        </Stack.Screen>
        <Stack.Screen name='AddModal' initialParams={{ post: null }} >
          {(p) => <AddModal model={props.model} onUpdate={props.onUpdate} />}
        </Stack.Screen>
        <Stack.Screen name='ViewModal' >      
          {(p) => <ViewModal model={props.model} onUpdate={props.onUpdate} />}
        </Stack.Screen>
        <Stack.Screen name='AddAlternativePowerSource'>
          {(p) => <AddAlternativeScreen model={props.model} onUpdate={props.onUpdate} />}
        </Stack.Screen>
        <Stack.Screen name='ViewAlternativePower' component={ViewAlternativePowerScreen} />     
        <Stack.Screen name='EditProfile'>      
          {(p) => <EditProfileScreen model={props.model} onUpdate={props.onUpdate} />}
        </Stack.Screen>
        <Stack.Screen name='Search' component={SearchLocationScreen}  />        
        <Stack.Screen name='Restoration' component={RestorationDetails}  />        
        <Stack.Screen name='NotifView' >
          {(p) => <NotifView model={props.model} onUpdate={props.onUpdate} />}
        </Stack.Screen>
        <Stack.Screen name='HistoryView' >
          {(p) => <HistoryView model={props.model} onUpdate={props.onUpdate} />}
        </Stack.Screen>
        
        <Stack.Screen name='ProviderHome'>
          {(p) => <ProTabBar model={props.model} onUpdate={props.onUpdate} />}
        </Stack.Screen>
        <Stack.Screen name='AddScheduleOutage'> 
          {(p) => <ProAddScheduleOutages model={props.model} onUpdate={props.onUpdate} />}
        </Stack.Screen>
        <Stack.Screen name='ProEditProfile'> 
          {(p) => <ProEditProfileScreen model={props.model} onUpdate={props.onUpdate} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;