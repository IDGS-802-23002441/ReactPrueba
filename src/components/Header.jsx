import { AppBar, Toolbar, Typography } from '@mui/material'
import AssistWalkerIcon from '@mui/icons-material/AssistWalker'
import InstalarApp from './InstalarApp'

function Header({ titulo }) {
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
        <InstalarApp />
      </Toolbar>
    </AppBar>
  )
}

export default Header
