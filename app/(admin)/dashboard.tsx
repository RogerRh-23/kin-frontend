import { AuthService } from '@/src/features/auth/auth.service';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Definición de los módulos del sistema
const MODULES = [
    {
        id: 'payroll',
        title: 'Nómina',
        icon: 'attach-money',
        color: 'bg-green-100',
        text: 'text-green-800'
    },
    {
        id: 'incidents',
        title: 'Incidencias',
        icon: 'warning',
        color: 'bg-orange-100',
        text: 'text-orange-800'
    },
    {
        id: 'sua',
        title: 'SUA / IMSS',
        icon: 'description',
        color: 'bg-blue-100',
        text: 'text-blue-800'
    },
    {
        id: 'invoicing',
        title: 'Facturación',
        icon: 'receipt',
        color: 'bg-purple-100',
        text: 'text-purple-800'
    },
    {
        id: 'employees',
        title: 'Empleados',
        icon: 'people',
        color: 'bg-indigo-100',
        text: 'text-indigo-800'
    },
    {
        id: 'housing',
        title: 'Housing',
        icon: 'home',
        color: 'bg-teal-100',
        text: 'text-teal-800'
    },
];

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState('Administrador');

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            router.replace('/login');
        } catch (error) {
            Alert.alert('Error', 'No se pudo cerrar sesión correctamente');
        }
    };

    const navigateTo = (route: string) => {
        console.log(`Navegando a módulo: ${route}`);
        // Descomenta esto cuando tengas las carpetas creadas:
        // router.push(`/(admin)/${route}`);
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Contenedor Principal Centrado 
        - En móviles ocupa el 100%.
        - En Desktop se limita a 'max-w-7xl' y se centra para que no se vea estirado.
      */}
            <View className="flex-1 items-center w-full">
                <View className="w-full h-full max-w-7xl">

                    {/*Header Responsive */}
                    <View className="px-6 py-4 flex-row justify-between items-center bg-white shadow-sm lg:rounded-b-2xl lg:mx-6 lg:mt-4">
                        <View>
                            <Text className="text-gray-500 text-xs font-bold uppercase tracking-wider">Bienvenido</Text>
                            <Text className="text-xl font-bold text-gray-800">{user}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={handleLogout}
                            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                        >
                            <MaterialIcons name="logout" size={24} color="#4b5563" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        className="flex-1 px-6 pt-6"
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 40 }}
                    >

                        {/* Sección de Stats (KPIs) */}
                        <View className="mb-8">
                            <Text className="text-lg font-bold text-gray-800 mb-4 ml-1">Resumen Semanal</Text>

                            {/* GRID DE STATS:
                 - flex-col: En celular uno debajo del otro.
                 - md:flex-row: En tablet/PC se ponen en fila.
              */}
                            <View className="flex-col gap-4 md:flex-row">

                                {/* Stat 1 */}
                                <View className="flex-1 bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex-row items-center justify-between">
                                    <View>
                                        <Text className="text-3xl font-bold text-blue-600">14</Text>
                                        <Text className="text-gray-500 text-xs font-medium uppercase mt-1">Incidencias Activas</Text>
                                    </View>
                                    <View className="bg-blue-50 p-3 rounded-full">
                                        <MaterialIcons name="notifications-none" size={24} color="#2563eb" />
                                    </View>
                                </View>

                                {/* Stat 2 */}
                                <View className="flex-1 bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex-row items-center justify-between">
                                    <View>
                                        <Text className="text-3xl font-bold text-gray-800">150</Text>
                                        <Text className="text-gray-500 text-xs font-medium uppercase mt-1">Total Empleados</Text>
                                    </View>
                                    <View className="bg-gray-100 p-3 rounded-full">
                                        <MaterialIcons name="groups" size={24} color="#374151" />
                                    </View>
                                </View>

                                {/* Stat 3 (Visible solo en Desktop/Tablet grande) */}
                                <View className="flex-1 bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex-row items-center justify-between">
                                    <View>
                                        <Text className="text-3xl font-bold text-green-600">98%</Text>
                                        <Text className="text-gray-500 text-xs font-medium uppercase mt-1">Cumplimiento IMSS</Text>
                                    </View>
                                    <View className="bg-green-50 p-3 rounded-full">
                                        <MaterialIcons name="check-circle-outline" size={24} color="#16a34a" />
                                    </View>
                                </View>

                            </View>
                        </View>

                        {/* Grid de Módulos (Menú Principal) */}
                        <Text className="text-lg font-bold text-gray-800 mb-4 ml-1">Aplicaciones</Text>

                        {/* GRID ADAPTATIVO:
               - flex-wrap: Permite que bajen a la siguiente línea.
               - gap-4: Espaciado automático.
            */}
                        <View className="flex-row flex-wrap gap-4">
                            {MODULES.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={() => navigateTo(item.id)}
                                    activeOpacity={0.7}
                                    // CLASES RESPONSIVE MÁGICAS:
                                    // w-full       -> Celular (1 columna)
                                    // sm:w-[48%]   -> Tablet Pequeña (2 columnas)
                                    // md:w-[31%]   -> Tablet Grande (3 columnas)
                                    // lg:w-[23%]   -> Desktop (4 columnas)
                                    className="w-full sm:w-[48%] md:w-[31%] lg:w-[23%] bg-white p-6 rounded-xl shadow-sm border border-gray-100 aspect-square justify-center items-center hover:bg-gray-50"
                                >
                                    <View className={`p-5 rounded-full mb-4 ${item.color} shadow-sm`}>
                                        {/* Hack para tipado de iconos dinámico */}
                                        <MaterialIcons name={item.icon as any} size={36} className={item.text.replace('text-', 'color-')} />
                                    </View>
                                    <Text className="font-bold text-lg text-gray-700">{item.title}</Text>
                                    <Text className="text-gray-400 text-xs mt-1 text-center">Gestionar módulo</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}