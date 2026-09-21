import { useState, useEffect } from 'react';

// 1. Definir el type basado en las columnas de tu base de datos
type ItemData = {
  id: number | string;       // El identificador único
  titulo: string;            // Campo título
  descripcion: string;       // Campo descripción
};

function SkillsList() {
  // 2. Indicarle a useState que el estado es un arreglo de ItemData
  const [items, setItems] = useState<ItemData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('https://r4-7v1k.onrender.com/api/listado', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify({...}) si necesitas enviar datos
    })
      .then((response) => response.json())
      .then((data: ItemData[]) => { // Tipamos la respuesta de la API
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar los datos:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div>
      <h2>Lista de Registros</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h3>{item.titulo}</h3>
            <p>{item.descripcion}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SkillsList;