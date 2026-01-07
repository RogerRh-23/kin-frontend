import { Redirect } from 'expo-router';

export default function Index() {
    // Redirige automáticamente al login al abrir la app
    return <Redirect href="/login" />;
}