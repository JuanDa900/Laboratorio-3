import { useState, useEffect } from 'react';

const CATALOGO_BASE = [
  {
    tipo: 'Laptop',
    nombre: 'Laptop Gamer Pro',
    descripcion: 'Procesador Intel i7 de última generación, 16GB RAM y tarjeta gráfica dedicada.',
    imagen: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop',
  },
  {
    tipo: 'Mouse',
    nombre: 'Mouse Ergonómico RGB',
    descripcion: 'Sensor óptico de alta precisión con botones programables y diseño ergonómico.',
    imagen: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop',
  },
  {
    tipo: 'Teclado',
    nombre: 'Teclado Mecánico Switch Blue',
    descripcion: 'Retroiluminación RGB personalizable con switches de respuesta táctil rápida.',
    imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop',
  },
  {
    tipo: 'Monitor',
    nombre: 'Monitor Ultrawide 144Hz',
    descripcion: 'Pantalla curva de 34 pulgadas ideal para multitarea y gaming profesional.',
    imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop',
  },
  {
    tipo: 'Auriculares',
    nombre: 'Auriculares Noise Cancelling',
    descripcion: 'Cancelación activa de ruido, micrófono HD integrado y batería de 40 horas.',
    imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop',
  },
  {
    tipo: 'Cámara',
    nombre: 'Cámara Web 4K Streamer',
    descripcion: 'Resolución Ultra HD con corrección de luz automática y doble micrófono.',
    imagen: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop',
  }
];

export default function Variedades() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos?_limit=8')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos de la API');
        }
        return response.json();
      })
      .then((data) => {
        const productosMapeados = data.map((item, index) => {
          const infoPersonalizada = CATALOGO_BASE[index % CATALOGO_BASE.length];

          return {
            id: item.id, 
            nombre: `${infoPersonalizada.nombre} (Ref. #${item.id})`,
            descripcion: infoPersonalizada.descripcion,
            imagen: infoPersonalizada.imagen,
          };
        });

        setProductos(productosMapeados);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  if (cargando) return <div className="estado">Cargando productos...</div>;
  if (error) return <div className="estado error">Error: {error}</div>;

  return (
    <div className="contenedor-principal">
      <header className="header">
        <h1>Catálogo de Productos</h1>
      </header>

      <main className="grid-productos">
        {productos.map((prod) => (
          <article key={prod.id} className="tarjeta-producto">
            <div className="imagen-contenedor">
              <img src={prod.imagen} alt={prod.nombre} loading="lazy" />
            </div>
            <div className="contenido-producto">
              <h2>{prod.nombre}</h2>
              <p>{prod.descripcion}</p>
              <button className="btn-comprar">Ver detalle</button>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}