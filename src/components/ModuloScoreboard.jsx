import Box from '@mui/material/Box'
import FormularioScore from './FormularioScore'
import TablaScore from './TablaScore'

function ModuloScoreboard({ registros, onAgregar, onEliminar }) {
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
      <TablaScore registros={registros} onEliminar={onEliminar} />
    </Box>
  )
}

export default ModuloScoreboard
