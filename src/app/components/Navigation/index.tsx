/**
 *
 * Navigation
 *
 */
import React, { memo } from 'react';
import { HomeIcon } from '../HomeIcon/Loadable';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

interface Props {}

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

export const Navigation = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const history = useHistory();

  const handleHomeClick = () => {
    history.push('/');
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleHomeClick}
          >
            <HomeIcon />
          </IconButton>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            onClick={handleHomeClick}
          >
            {'welcome to the listings app'}
          </Typography>
          <div className={classes.grow} />
          <div></div>
        </Toolbar>
      </AppBar>
    </div>
  );
});
