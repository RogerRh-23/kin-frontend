import { api, API_BASE_URL } from '@/constants/api';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [empleados, setEmpleados] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // base URL moved to constants/api.ts

  // --- FUNCIÓN PARA PEDIR DATOS A PYTHON ---
  const fetchEmpleados = async () => {
    setLoading(true);
    try {
      console.log('Conectando a:', API_BASE_URL);
      const response = await api.get('/empleados/');
      setEmpleados(response.data);
    } catch (error) {
      console.error("Error:", error);
      const message = error instanceof Error ? error.message : String(error);
      alert("Error: " + message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  // --- DISEÑO DE LA TARJETA (CARTA) ---
  const renderItem = ({ item }: { item: any }) => (
    <View className="bg-white rounded-xl p-4 mb-3 flex-row items-center shadow" style={styles.card}>
      <View className="w-11 h-11 rounded-full bg-indigo-600 justify-center items-center mr-4" style={styles.avatar}>
        <Text className="text-white font-bold" style={styles.avatarText}>
          {(item?.nombre?.charAt(0) ?? '') + (item?.apellido_paterno?.charAt(0) ?? '')}
        </Text>
      </View>
      <View className="flex-1" style={styles.info}>
        <Text className="font-semibold text-base text-gray-700" style={styles.nombre}>{(item?.nombre ?? '') + ' ' + (item?.apellido_paterno ?? '')}</Text>
        <Text className="text-sm text-gray-500" style={styles.puesto}>{item?.puesto ?? ''}</Text>
        <Text className="text-xs text-gray-400" style={styles.email}>{item?.email ?? ''}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100" style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header} className="p-5 pt-10 bg-white border-b border-gray-200">
        <Text style={styles.title} className="text-2xl font-bold text-gray-900">Kin ERP 🐉</Text>
        <Text style={styles.subtitle} className="text-sm text-gray-500">Personal Activo</Text>
      </View>

      {loading ? (
        <View className="mt-12 items-center">
          <ActivityIndicator size="large" color="#4F46E5" />
        </View>
      ) : (
        <FlatList
          className="px-4"
          data={empleados}
          keyExtractor={(item, i) => (item?.id ? String(item.id) : String(i))}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          onRefresh={fetchEmpleados}
          refreshing={loading}
          ListEmptyComponent={<Text className="text-center mt-5 text-gray-500">No hay empleados registrados.</Text>}
        />
      )}
    </SafeAreaView>
  );
}

// --- ESTILOS VISUALES ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { padding: 20, paddingTop: 40, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#E5E7EB' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  subtitle: { fontSize: 14, color: '#6B7280' },
  list: { padding: 16 },
  empty: { textAlign: 'center', marginTop: 20, color: '#999' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center', shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  avatar: { width: 45, height: 45, borderRadius: 25, backgroundColor: '#4F46E5', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  avatarText: { color: '#fff', fontWeight: 'bold' },
  info: { flex: 1 },
  nombre: { fontWeight: '700', fontSize: 16, color: '#374151' },
  puesto: { fontSize: 14, color: '#6B7280' },
  email: { fontSize: 12, color: '#9CA3AF' }
});