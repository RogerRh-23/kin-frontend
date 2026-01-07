import { Drawer } from 'expo-router/drawer';
import { useWindowDimensions } from 'react-native';

export default function AdminLayout() {
    const { width } = useWindowDimensions();
    const isLargeScreen = width >= 768; // 768px es el breakpoint 'md' (Tablet/Desktop)

    return (
        <Drawer
            screenOptions={{
                headerShown: true, // Mostrar header
                drawerType: isLargeScreen ? 'permanent' : 'front', // Fijo en PC, Oculto en Celular
                drawerStyle: isLargeScreen ? { width: 240 } : undefined, // Ancho fijo en PC
            }}
        >
            <Drawer.Screen
                name="dashboard"
                options={{
                    drawerLabel: 'Inicio',
                    title: 'Panel General'
                }}
            />
        </Drawer>
    );
}