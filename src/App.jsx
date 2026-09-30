import { useEffect, useState } from 'react'
import Header from './components/Header'
import ModuloRegistro from './components/ModuloRegistro'
import ModuloScoreboard from './components/ModuloScoreboard'
import Footer from './components/Footer'
import PwaAviso from './components/PwaAviso'
import Pagina404 from './components/Pagina404'

const CLAVE_REGISTROS = 'progresivas-decimo-registros'

// Rutas que muestran la app. Cualquier otra dirección muestra la página 404.
const rutasDeLaApp = [
  import.meta.env.BASE_URL,
  `${import.meta.env.BASE_URL}index.html`,
]

const esRutaDeLaApp = (ruta) => rutasDeLaApp.includes(ruta)

const cargarRegistrosGuardados = () => {
  try {
    const guardados = window.localStorage.getItem(CLAVE_REGISTROS)
    return guardados ? JSON.parse(guardados) : []
  } catch {
    return []
  }
}

function App() {
  const [registros, setRegistros] = useState(cargarRegistrosGuardados)
  const [vista, setVista] = useState('registro')
  const [rutaDesconocida, setRutaDesconocida] = useState(
    () => !esRutaDeLaApp(window.location.pathname),
  )

  // Guarda los registros en el navegador: la app funciona sin conexion
  // y los datos siguen ahi despues de cerrarla.
  useEffect(() => {
    try {
      window.localStorage.setItem(CLAVE_REGISTROS, JSON.stringify(registros))
    } catch {
      // Almacenamiento no disponible (modo privado o sin espacio).
    }
  }, [registros])

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

  const agregarRegistro = (estudiante) => {
    setRegistros((previos) => [
      ...previos,
      {
        ...estudiante,
        id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      },
    ])
  }

  const eliminarRegistro = (id) => {
    setRegistros((previos) =>
      previos.filter((registro) => registro.id !== id),
    )
  }

  return (
    <>
      <PwaAviso />
      {rutaDesconocida ? (
        <Pagina404 ruta={window.location.pathname} onVolver={volverAlInicio} />
      ) : (
        <>
          <Header
            titulo="Progresivas Décimo"
            totalRegistros={registros.length}
            vista={vista}
            onCambiarVista={setVista}
          />
          {vista === 'scoreboard' ? (
            <ModuloScoreboard
              registros={registros}
              onAgregar={agregarRegistro}
              onEliminar={eliminarRegistro}
            />
          ) : (
            <ModuloRegistro registros={registros} onAgregar={agregarRegistro} onEliminar={eliminarRegistro} />
          )}
          <Footer />
        </>
      )}
    </>
  )
}

export default App
