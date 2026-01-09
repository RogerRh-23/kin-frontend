import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@kin.com'); // Pre-llenado para probar rápido
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);

  // --- LÓGICA DE CONEXIÓN ---
  const handleLogin = async () => {
    setLoading(true);
    try {
      // 1. URL (Localhost funciona porque estás en Web)
      const apiUrl = 'http://localhost:8000/auth/token';

      // 2. Preparar los datos (Formato UrlEncoded manual para evitar problemas)
      const formBody = new URLSearchParams();
      formBody.append('username', email);
      formBody.append('password', password);

      // 3. ¡Disparar con FETCH! 🔫
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: formBody.toString(), // Convertimos los datos a texto
      });

      // 4. Verificar si funcionó
      if (!response.ok) {
        // Si el servidor responde 400, 401 o 500, lanzamos error manual
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error en el servidor');
      }

      // 5. ¡Éxito!
      const data = await response.json();
      console.log("Token recibido:", data.access_token);

      await AsyncStorage.setItem('userToken', data.access_token); // Guardamos el token
      router.replace('/(tabs)/dashboard');

    } catch (error: any) {
      console.error(error);
      Alert.alert("Error", error.message || "No se pudo conectar 🔴");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-background px-6">
      <View className="w-full max-w-sm bg-surface p-8 rounded-2xl shadow-lg border border-gray-100">

        {/* LOGO / TÍTULO */}
        <Text className="text-3xl font-bold text-kin-dark text-center mb-2">Kin ERP</Text>
        <Text className="text-text-secondary text-center mb-8">Inicia sesión para continuar</Text>

        {/* INPUT EMAIL */}
        <View className="mb-4">
          <Text className="text-text-main font-medium mb-1 ml-1">Correo Electrónico</Text>
          <TextInput
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-text-main focus:border-primary focus:border-2"
            placeholder="ejemplo@kin.com"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>

        {/* INPUT PASSWORD */}
        <View className="mb-8">
          <Text className="text-text-main font-medium mb-1 ml-1">Contraseña</Text>
          <TextInput
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-text-main focus:border-primary focus:border-2"
            placeholder="••••••••"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* BOTÓN LOGIN */}
        <TouchableOpacity
          className={`w-full py-4 rounded-xl flex-row justify-center items-center ${loading ? 'bg-primary-light' : 'bg-primary active:bg-primary-active'}`}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#4F46E5" />
          ) : (
            <Text className="text-white font-bold text-lg">Ingresar</Text>
          )}
        </TouchableOpacity>

      </View>
    </View>
  );
}