import React from 'react';
import GlobalAlert, {
  CustomAlertConsumer,
} from './components/global/alert/GlobalAlert';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {Provider} from 'react-redux';
import {store} from './app/store';
import AppNavigator from './navigators/app-navigator/AppNavigator';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GlobalAlert>
          <CustomAlertConsumer>
            {alert => {
              customAlert = alert;
              return (
                <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
                  <NavigationContainer>
                    <AppNavigator />
                  </NavigationContainer>
                </SafeAreaView>
              );
            }}
          </CustomAlertConsumer>
        </GlobalAlert>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
