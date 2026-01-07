import { AuthService } from '@/src/features/auth/auth.service';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView as RNSSafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Atención', 'Por favor ingresa usuario y contraseña');
            return;
        }

        setIsLoading(true);

        try {
            // 2. Llamada al Backend (FastAPI)
            console.log('Intentando login a: ${api.defaults.baseURL}');
            const response = await AuthService.login(email, password);

            console.log('Login Exitoso:', response);

            // await saveToken(response.access_token);

            // 3. Redireccionar al Dashboard (usamos replace para que no pueda volver atrás)
            router.replace('/(admin)/dashboard');

        } catch (error: any) {
            console.error('Error de Login: ', error);
            let mensaje = 'Ocurrió un error inesperado. Intenta nuevamente.';
            if (error.response) {
                mensaje = error.response.data.detail || 'Credenciales incorrectas';
            } else if (error.request) {
                mensaje = 'No se pudo conectar al servidor. Verifica tu conexión.';
            }
            Alert.alert('Error de Inicio de Sesión', mensaje);
        } finally {
            setIsLoading(false);
        }
    };

    // Use the runtime css interop wrappers registered by react-native-css-interop/nativewind.
    // `RNSSafeAreaView` and `KeyboardAvoidingView` accept `className` at runtime.
    const SafeArea = RNSSafeAreaView;
    const KAV = KeyboardAvoidingView;

    return (
        <SafeArea className="flex-1 bg-gray-50">
            <StatusBar style="dark" />

            <KAV
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1 justify-center px-8"
            >
                {/* --- Header / Logo --- */}
                <View className="mb-10 items-center">
                    <View className="h-20 w-20 bg-blue-600 rounded-2xl mb-4 items-center justify-center shadow-lg">
                        <Text className="text-white text-3xl font-bold">K</Text>
                    </View>
                    <Text className="text-3xl font-bold text-gray-800">Bienvenido</Text>
                    <Text className="text-gray-500 mt-2 text-center">
                        Sistema de Gestión Integral
                    </Text>
                </View>

                {/* --- Formulario --- */}
                <View className="space-y-4">
                    <View>
                        <Text className="text-gray-600 mb-2 font-medium ml-1">Correo o Usuario</Text>
                        <TextInput
                            className="w-full bg-white border border-gray-200 rounded-xl p-4 text-gray-700"
                            placeholder="admin@empresa.com"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View>
                        <Text className="text-gray-600 mb-2 font-medium ml-1">Contraseña</Text>
                        <TextInput
                            className="w-full bg-white border border-gray-200 rounded-xl p-4 text-gray-700"
                            placeholder="••••••••"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    {/* --- Botón de Acción --- */}
                    <TouchableOpacity
                        onPress={handleLogin}
                        disabled={isLoading}
                        className={`mt-6 w-full py-4 rounded-xl shadow-sm items-center ${isLoading ? 'bg-blue-400' : 'bg-blue-600 active:bg-blue-700'
                            }`}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text className="text-white font-bold text-lg">Ingresar</Text>
                        )}
                    </TouchableOpacity>
                </View>

                {/* --- Footer --- */}
                <View className="mt-10 items-center">
                    <Text className="text-gray-400 text-sm">Versión 1.0.0 (Industrial)</Text>
                </View>

            </KAV>
        </SafeArea>
    );
}