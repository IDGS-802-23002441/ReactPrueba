import Box from '@mui/material/Box'
import FormularioScore from './components/FormularioScore'
import TablaScore from './components/TablaScore'

// Modulo Halo: registrar puntajes y verlos ordenados de mayor a menor.
function ModuloHalo({ puntajes, onAgregar, onEliminar }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        alignItems: 'start',
        gridTemplateColumns: { xs: '1fr', md: '380px 1fr' },
      }}
    >
      <FormularioScore onAgregar={onAgregar} />
      <TablaScore puntajes={puntajes} onEliminar={onEliminar} />
    </Box>
  )
}

export default ModuloHalo
