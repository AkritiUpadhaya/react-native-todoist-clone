import { router, Stack } from 'expo-router';
import { Button } from 'react-native';

const ProjectLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: { backgroundColor:'#fff' },
        headerTintColor: 'white',
        headerTitleStyle: { color: '#000' },
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'New Project',
          headerTransparent: true,
          headerLeft: () => (
            <Button title="Cancel" onPress={() => router.dismiss()} color={'black'} />
          ),
        }}
      />
      <Stack.Screen
        name="colors"
        options={{
          title: 'Color',
          headerTransparent: true,
          headerLeft: () => (
            <Button title="Back" onPress={() => router.back()} color={'black'} />
          ),
        }}
      />
    </Stack>
  );
};
export default ProjectLayout;