import Box from '@mui/material/Box'
import FormularioRegistro from './FormularioRegitro'
import TablaRegistro from './TablaRegistro'

function ModuloRegistro({ registros, onAgregar, onEliminar }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        alignItems: 'start',
        gridTemplateColumns: { xs: '1fr', md: '380px 1fr' },
      }}
    >
      <FormularioRegistro onAgregar={onAgregar} />
      <TablaRegistro registros={registros} onEliminar={onEliminar} />
    </Box>
  )
}

export default ModuloRegistro
