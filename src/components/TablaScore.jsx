import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'

const modulos = import.meta.glob('../assets/2*.png', { eager: true, import: 'default' })
const gamerpics = Object.values(modulos)

const elegirGamerpic = (id) => {
  if (gamerpics.length === 0) return undefined
  let suma = 0
  for (let i = 0; i < id.length; i += 1) suma += id.charCodeAt(i)
  return gamerpics[suma % gamerpics.length]
}

function TablaScore({ registros, onEliminar }) {
  const ranking = registros
    .filter((registro) => registro.puntaje !== undefined && registro.puntaje !== '')
    .sort((a, b) => Number(b.puntaje) - Number(a.puntaje))

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 2, alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Scoreboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${ranking.length} jugador(es)`}
        </Typography>
      </Stack>
      <TableContainer component={Paper} elevation={2}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Jugador</TableCell>
              <TableCell align="right">Puntaje</TableCell>
              <TableCell align="center">Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ranking.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                  <Typography>Aún no hay puntajes</Typography>
                </TableCell>
              </TableRow>
            ) : (
              ranking.map((registro, indice) => (
                <TableRow key={registro.id} hover>
                  <TableCell>{indice + 1}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                      <Avatar
                        src={elegirGamerpic(registro.id)}
                        alt={`Gamerpic de ${registro.nombre}`}
                        sx={{ width: 32, height: 32 }}
                      />
                      <span>{registro.nombre}</span>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">{registro.puntaje}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onEliminar(registro.id)}
                      aria-label="Eliminar Puntaje"
                    >
                      <PersonRemoveIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default TablaScore
