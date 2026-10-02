import { useEffect, useState } from 'react'
import Header from './components/Header'
import ModuloHalo from './modules/halo'
import Footer from './components/Footer'
import PwaAviso from './components/PwaAviso'
import Pagina404 from './components/Pagina404'

// La clave conserva el nombre anterior para no perder los puntajes guardados.
const CLAVE_PUNTAJES = 'progresivas-decimo-registros'

// Solo los puntajes pertenecen al modulo Halo; los registros de estudiantes
// que haya guardado la version anterior se descartan al cargar.
const esPuntajeValido = (dato) =>
  dato && dato.puntaje !== undefined && dato.puntaje !== ''

const cargarPuntajesGuardados = () => {
  try {
    const guardados = window.localStorage.getItem(CLAVE_PUNTAJES)
    const lista = guardados ? JSON.parse(guardados) : []
    return Array.isArray(lista) ? lista.filter(esPuntajeValido) : []
  } catch {
    return []
  }
}

// Rutas que muestran la app. Cualquier otra dirección muestra la página 404.
const rutasDeLaApp = [
  import.meta.env.BASE_URL,
  `${import.meta.env.BASE_URL}index.html`,
]

const esRutaDeLaApp = (ruta) => rutasDeLaApp.includes(ruta)

function App() {
  const [puntajes, setPuntajes] = useState(cargarPuntajesGuardados)
  const [rutaDesconocida, setRutaDesconocida] = useState(
    () => !esRutaDeLaApp(window.location.pathname),
  )

  // Guarda los puntajes en el navegador: la app funciona sin conexion
  // y los datos siguen ahi despues de cerrarla.
  useEffect(() => {
    try {
      window.localStorage.setItem(CLAVE_PUNTAJES, JSON.stringify(puntajes))
    } catch {
      // Almacenamiento no disponible (modo privado o sin espacio).
    }
  }, [puntajes])

  // Vuelve a evaluar la ruta al navegar con los botones del navegador.
  useEffect(() => {
    const alCambiarRuta = () =>
      setRutaDesconocida(!esRutaDeLaApp(window.location.pathname))
    window.addEventListener('popstate', alCambiarRuta)
    return () => window.removeEventListener('popstate', alCambiarRuta)
  }, [])

  const volverAlInicio = () => {
    window.history.replaceState(null, '', import.meta.env.BASE_URL)
    setRutaDesconocida(false)
  }

  const agregarPuntaje = (puntaje) => {
    setPuntajes((previos) => [
      ...previos,
      {
        ...puntaje,
        id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      },
    ])
  }

  const eliminarPuntaje = (id) => {
    setPuntajes((previos) => previos.filter((puntaje) => puntaje.id !== id))
  }

  return (
    <>
      <PwaAviso />
      {rutaDesconocida ? (
        <Pagina404 ruta={window.location.pathname} onVolver={volverAlInicio} />
      ) : (
        <>
          <Header titulo="Progresivas Décimo" />
          <ModuloHalo
            puntajes={puntajes}
            onAgregar={agregarPuntaje}
            onEliminar={eliminarPuntaje}
          />
          <Footer />
        </>
      )}
    </>
  )
}

export default App
