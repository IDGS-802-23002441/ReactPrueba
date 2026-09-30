import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import AssistWalkerIcon from '@mui/icons-material/AssistWalker'

// Se muestra cuando la dirección abierta no es una ruta de la app.
// El service worker sirve la app en rutas desconocidas, por eso la
// deteccion se hace aqui y no solo con el 404.html del hosting.
function Pagina404({ ruta, onVolver }) {
  useEffect(() => {
    const tituloAnterior = document.title
    document.title = 'Página no encontrada - Progresivas Décimo'
    return () => {
      document.title = tituloAnterior
    }
  }, [])

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        bgcolor: 'grey.100',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 480,
          p: 4,
          textAlign: 'center',
          borderTop: '4px solid #ebbf1f',
        }}
      >
        <Typography
          aria-hidden="true"
          sx={{
            fontSize: { xs: 72, sm: 96 },
            fontWeight: 800,
            lineHeight: 1,
            color: 'primary.main',
          }}
        >
          404
        </Typography>
        <Typography variant="h6" component="h1" sx={{ mt: 2, mb: 1, fontWeight: 700 }}>
          Página no encontrada
        </Typography>
        <Typography variant="body2" color="text.secondary">
          La dirección que abriste no existe o cambió de lugar.
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, overflowWrap: 'anywhere' }}
        >
          <code>{ruta}</code>
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<AssistWalkerIcon />}
          onClick={onVolver}
          sx={{ mt: 3 }}
        >
          Volver al inicio
        </Button>
      </Paper>
    </Box>
  )
}

export default Pagina404
