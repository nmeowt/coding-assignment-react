import { memo } from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material';

interface IHeaderProps {
  title: string;
}

function Header({ title }: IHeaderProps) {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" component="div" >
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default memo(Header);

