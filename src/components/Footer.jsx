import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

function Footer() {
  const anioActual = new Date().getFullYear()

  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        py: 2,
        textAlign: 'center',
        borderTop: '1px solid #ebbf1f',
        gridColumn: '1 / -1',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {`Módulo Halo - ${anioActual} - Clase de alumnos`}
      </Typography>
    </Box>
  )
}

export default Footer
