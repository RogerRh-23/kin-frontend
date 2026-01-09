import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUserProfile();
    }, []);

    const loadUserProfile = async () => {
        try {
            // 1. Recuperar la llave del bolsillo
            const token = await AsyncStorage.getItem('userToken');

            if (!token) {
                // Si no hay token, te regreso al login
                router.replace('/(tabs)');
                return;
            }

            // 2. Usar la llave para pedir datos al Backend
            const response = await fetch('http://localhost:8000/users/me', {
                headers: {
                    'Authorization': `Bearer ${token}` // <--- Aquí mostramos el gafete
                }
            });

            if (!response.ok) throw new Error("Token vencido");

            const data = await response.json();
            setUser(data);

        } catch (error) {
            console.log(error);
            router.replace('/(tabs)'); // Si falla, de vuelta al login
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('userToken');
        router.replace('/(tabs)');
    };

    if (loading) return <View className="flex-1 justify-center items-center"><ActivityIndicator size="large" color="#4F46E5" /></View>;

    return (
        <View className="flex-1 justify-center items-center bg-background p-6">
            <View className="bg-surface p-8 rounded-2xl shadow-lg w-full items-center">
                <Text className="text-4xl mb-4">👋</Text>
                <Text className="text-2xl font-bold text-kin-dark mb-2">Bienvenido</Text>

                {/* Aquí mostramos los datos reales que vienen de Python */}
                <Text className="text-xl text-primary font-bold mb-6">
                    {user?.user || "Usuario Desconocido"}
                </Text>

                <View className="bg-green-100 px-4 py-2 rounded-full mb-8">
                    <Text className="text-green-800 font-medium">Estado: Activo ✅</Text>
                </View>

                <TouchableOpacity
                    onPress={handleLogout}
                    className="bg-red-50 px-6 py-3 rounded-xl border border-red-100"
                >
                    <Text className="text-red-500 font-bold">Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}