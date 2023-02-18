import {cloneElement, ReactElement} from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  HomeScreen,
  ReportScreen,
  SocialScreen,
  ProfileScreen,
} from 'screens/main';

import {NAVIGATION_PATH} from 'utils/constants';

import {HomeIcon, ReportIcon, SocialIcon, MyPageIcon} from 'components/icons';
import {COLORS, TYPOGRAPHY} from 'styles/theme';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        navigationKey={NAVIGATION_PATH.HOME}
        name="홈"
        component={HomeScreen}
        options={{
          tabBarLabel: props => <TabBarLabel {...props} label="홈" />,
          tabBarIcon: props => <TabBarIcon {...props} icon={<HomeIcon />} />,
        }}
      />
      <Tab.Screen
        navigationKey={NAVIGATION_PATH.REPORT}
        name="리포트"
        component={ReportScreen}
        options={{
          tabBarLabel: props => <TabBarLabel {...props} label="리포트" />,
          tabBarIcon: props => <TabBarIcon {...props} icon={<ReportIcon />} />,
        }}
      />
      <Tab.Screen
        navigationKey={NAVIGATION_PATH.SOCIAL}
        name="소셜"
        component={SocialScreen}
        options={{
          tabBarLabel: props => <TabBarLabel {...props} label="소셜" />,
          tabBarIcon: props => <TabBarIcon {...props} icon={<SocialIcon />} />,
        }}
      />
      <Tab.Screen
        navigationKey={NAVIGATION_PATH.PROFILE}
        name="프로필"
        component={ProfileScreen}
        options={{
          tabBarLabel: props => <TabBarLabel {...props} label="프로필" />,
          tabBarIcon: props => <TabBarIcon {...props} icon={<MyPageIcon />} />,
        }}
      />
    </Tab.Navigator>
  );
}

function TabBarLabel({focused, label}: {focused: boolean; label: string}) {
  return (
    <Text
      style={[
        {color: focused ? COLORS.black : COLORS.gray500},
        TYPOGRAPHY.body03,
      ]}>
      {label}
    </Text>
  );
}

function TabBarIcon({focused, icon}: {focused: boolean; icon: ReactElement}) {
  return cloneElement(icon, {fill: focused ? COLORS.black : COLORS.gray500});
}
