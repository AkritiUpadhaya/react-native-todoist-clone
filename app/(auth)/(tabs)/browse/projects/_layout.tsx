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
        presentation:'modal',
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
        name="color-select"
        options={{
          title: 'Color',
          headerTransparent: true,
          presentation:'modal'
        }}
      />
    </Stack>
  );
};
export default ProjectLayout;