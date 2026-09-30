import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

function FormularioRegistro({ onAgregar }) {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [edad, setEdad] = useState('')

  const manejarEnvio = (event) => {
    event.preventDefault()
    onAgregar({ nombre, email, edad })
    setNombre('')
    setEmail('')
    setEdad('')
  }

  const limpiar = () => {
    setNombre('')
    setEmail('')
    setEdad('')
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
        Nuevo estudiante
      </Typography>
      <Box component="form" onSubmit={manejarEnvio} noValidate>
        <Stack spacing={2}>
          <TextField
            name="nombre"
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            fullWidth
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            name="edad"
            label="Edad"
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            slotProps={{ htmlInput: { min: 0 } }}
            fullWidth
          />
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" fullWidth>
              Registrar
            </Button>
            <Button type="button" variant="outlined" fullWidth onClick={limpiar}>
              Limpiar
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  )
}

export default FormularioRegistro
