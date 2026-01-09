// Ejemplo de la función de envío en el Frontend
const handleSubmit = async (formData: any) => {
    const response = await fetch('http://localhost:8000/employees/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}` // Si ya activaste seguridad
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        alert("¡Empleado guardado en PostgreSQL!");
    } else {
        const error = await response.json();
        alert("Error: " + error.detail);
    }
};