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

function TablaRegistro({ registros, onEliminar }) {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 2, alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Estudiantes registrados
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${registros.length} registro(s)`}
        </Typography>
      </Stack>
      <TableContainer component={Paper} elevation={2}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Edad</TableCell>
              <TableCell align="center">Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registros.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <Typography>Aún no hay registros</Typography>
                </TableCell>
              </TableRow>
            ) : (
              registros.map((registro, indice) => (
                <TableRow key={registro.id} hover>
                  <TableCell>{indice + 1}</TableCell>
                  <TableCell>{registro.nombre}</TableCell>
                  <TableCell>{registro.email}</TableCell>
                  <TableCell>{registro.edad}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onEliminar(registro.id)}
                      aria-label="Eliminar Registro"
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

export default TablaRegistro
