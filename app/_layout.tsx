import Navbar from '@/components/Navbar'; // Asegúrate de que la ruta sea correcta
import '../globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-slate-50">
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* 1. Insertamos la Navbar */}
          <Navbar />

          {/* 2. Contenedor del contenido principal */}
          <main className="flex-1 
            /* Espacio para la Sidebar en Desktop (64 = 16rem = 256px) */
            lg:ml-64 
            /* Espacio para la Bottom Bar en Móvil (para que el contenido no quede debajo) */
            mb-20 lg:mb-0 
            /* Espaciado interno para que el texto no pegue a los bordes */
            p-4 md:p-6 lg:p-10"
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}