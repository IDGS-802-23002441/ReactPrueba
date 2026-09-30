import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import InstallMobileIcon from '@mui/icons-material/InstallMobile'

const estaInstalada = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true

const esIOSSafari = () => {
  const ua = window.navigator.userAgent
  const esIOS =
    /iphone|ipad|ipod/i.test(ua) ||
    (window.navigator.platform === 'MacIntel' &&
      window.navigator.maxTouchPoints > 1)
  const esOtroNavegador = /crios|fxios|edgios|opios/i.test(ua)
  return esIOS && !esOtroNavegador
}

// Muestra el boton de instalar cuando el navegador lo permite
// (Chrome, Edge y Android). En iPhone/iPad muestra las instrucciones,
// porque Safari no dispara el evento beforeinstallprompt.
function InstalarApp() {
  const [eventoInstalacion, setEventoInstalacion] = useState(null)
  const [instalada, setInstalada] = useState(estaInstalada)
  const [ayudaIOSVisible, setAyudaIOSVisible] = useState(false)

  useEffect(() => {
    const alPoderInstalar = (evento) => {
      evento.preventDefault()
      setEventoInstalacion(evento)
    }
    const alInstalar = () => {
      setEventoInstalacion(null)
      setInstalada(true)
    }

    window.addEventListener('beforeinstallprompt', alPoderInstalar)
    window.addEventListener('appinstalled', alInstalar)
    return () => {
      window.removeEventListener('beforeinstallprompt', alPoderInstalar)
      window.removeEventListener('appinstalled', alInstalar)
    }
  }, [])

  if (instalada) return null

  const mostrarAyudaIOS = esIOSSafari()

  if (!eventoInstalacion && !mostrarAyudaIOS) return null

  const manejarClic = async () => {
    if (eventoInstalacion) {
      eventoInstalacion.prompt()
      await eventoInstalacion.userChoice
      setEventoInstalacion(null)
      return
    }
    setAyudaIOSVisible(true)
  }

  return (
    <>
      <Tooltip title="Instalar app">
        <IconButton
          color="inherit"
          onClick={manejarClic}
          aria-label="Instalar aplicación"
        >
          <InstallMobileIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={ayudaIOSVisible} onClose={() => setAyudaIOSVisible(false)}>
        <DialogTitle>Instalar en iPhone o iPad</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Abre esta página en Safari, toca el botón Compartir y elige «Añadir
            a pantalla de inicio».
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAyudaIOSVisible(false)}>Entendido</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default InstalarApp
