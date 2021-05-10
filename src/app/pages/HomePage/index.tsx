import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import { selectHomePage } from './slice/selectors';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

import { Navigation } from '../../components/Navigation/Loadable';
import { Footer } from '../../components/Footer/Loadable';
import { ListingCard } from '../../components/ListingCard/Loadable';

interface Props {}

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    flexGrow: 1,
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  heroImage: {
    maxHeight: '400px',
  },
  featuredImage: {
    maxHeight: '400px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export const HomePage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (homePage.listings.length < 1) {
      fetch('api/data.json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.error) {
            console.log(data.error);
            // Here you should have logic to handle invalid login credentials.
            // This assumes your Rails API will return a JSON object with a key of
            // 'message' if there is an error
          } else {
            var listings = data;
            dispatch(actions.setListings(listings));
          }
        });
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const homePage = useSelector(selectHomePage);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const classes = useStyles();
  const history = useHistory();

  const handleSearchChange = e => {
    setSearch(e.target.value);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      history.push(`listings?query=${search}`);
    }
  };

  let sortedListingsPerTotalVisits = homePage.listings
    .slice()
    .sort(function (a, b) {
      return b.visits.total - a.visits.total;
    });

  let sortedListingsPerLastVisited = homePage.listings
    .slice()
    .sort(function (a, b) {
      var keyA = new Date(a.visits.lastVisited),
        keyB = new Date(b.visits.lastVisited);
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });

  return (
    <React.Fragment>
      <Helmet>
        <title>Home</title>
        <meta
          name="description"
          content="This is a platform to show listings"
        />
      </Helmet>
      <CssBaseline />
      <Navigation />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item xs={undefined} sm={1} md={2} lg={3}></Grid>
            <Grid item xs={12} sm={5} md={4} lg={3}>
              <Typography
                component="h3"
                variant="h3"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                {'Looking for a new home?'}
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="search"
                    name="search"
                    placeholder="search here"
                    autoFocus
                    value={search}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                  />
                </Grid>
              </div>
            </Grid>
            <Grid item xs={undefined} sm={1} md={2} lg={3}></Grid>
          </Grid>
        </div>
        {/* End hero unit */}
        <Container className={classes.cardGrid} maxWidth="lg">
          <Typography
            component="h5"
            variant="h5"
            align="left"
            color="textPrimary"
            gutterBottom
          >
            {'Most Visited'}
          </Typography>
          <Grid container spacing={4}>
            {sortedListingsPerTotalVisits.slice(0, 5).map(listing => (
              <Grid item key={listing.homeImage} xs={12} sm={2} md={2}>
                <ListingCard listing={listing} />
              </Grid>
            ))}
          </Grid>
        </Container>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Typography
            component="h5"
            variant="h5"
            align="left"
            color="textPrimary"
            gutterBottom
          >
            {'Last Visited'}
          </Typography>
          <Grid container spacing={4}>
            {sortedListingsPerTotalVisits.slice(0, 5).map(listing => (
              <Grid item key={listing.homeImage} xs={12} sm={2} md={2}>
                <ListingCard listing={listing} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
});
