import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import AssistWalkerIcon from '@mui/icons-material/AssistWalker'
import InstalarApp from './InstalarApp'

function Header({ titulo, totalRegistros, vista, onCambiarVista }) {
  const enHalo = vista === 'scoreboard'

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar sx={{ gap: 1.5 }}>
        <AssistWalkerIcon />
        <Typography
          variant="h6"
          noWrap
          sx={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {titulo}
        </Typography>
        <Typography
          variant="body2"
          sx={{ display: { xs: 'none', sm: 'block' }, whiteSpace: 'nowrap' }}
        >
          {`${totalRegistros} registro(s)`}
        </Typography>
        <InstalarApp />
        <Button
          variant="outlined"
          color="inherit"
          sx={{ whiteSpace: 'nowrap' }}
          onClick={() => onCambiarVista(enHalo ? 'registro' : 'scoreboard')}
        >
          {enHalo ? 'Volver' : 'Módulo Halo'}
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
