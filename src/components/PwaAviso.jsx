import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useRegisterSW } from 'virtual:pwa-register/react'

// Registra el service worker (generado en el build por vite-plugin-pwa)
// y avisa cuando la app quedo lista para funcionar sin conexion.
function PwaAviso() {
  const {
    offlineReady: [listoOffline, setListoOffline],
  } = useRegisterSW({
    onRegisterError(error) {
      console.error('No se pudo registrar el service worker:', error)
    },
  })

  const cerrar = () => setListoOffline(false)

  return (
    <Snackbar
      open={listoOffline}
      autoHideDuration={6000}
      onClose={cerrar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={cerrar} severity="success" variant="filled">
        La app ya funciona sin conexión
      </Alert>
    </Snackbar>
  )
}

export default PwaAviso
