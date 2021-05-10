/**
 *
 * Listings
 *
 */
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from '../HomePage/slice';
import { selectHomePage } from '../HomePage/slice/selectors';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';

import { Navigation } from '../../components/Navigation/Loadable';
import { Footer } from '../../components/Footer/Loadable';
import { ListingCard } from '../../components/ListingCard/Loadable';
import { ListingCardHorizontal } from '../../components/ListingCardHorizontal/Loadable';

interface Props {}

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
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

export const Listings = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });

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

  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const listingsPerPage = 4;
  const totalPages = Math.ceil(homePage.listings.length / listingsPerPage);

  const indexOfLastPost = page * listingsPerPage;
  const indexOfFirstPost = indexOfLastPost - listingsPerPage;
  const currentListings = homePage.listings.slice(
    indexOfFirstPost,
    indexOfLastPost,
  );

  const classes = useStyles();
  const history = useHistory();

  return (
    <React.Fragment>
      <Helmet>
        <title>Listings</title>
        <meta
          name="description"
          content="This is a platform to show listings"
        />
      </Helmet>
      <CssBaseline />
      <Navigation />
      <main>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Typography
            component="h5"
            variant="h5"
            align="left"
            color="textPrimary"
            gutterBottom
          >
            {'Your favorite homes'}
          </Typography>
          <Grid container spacing={4}>
            {homePage.listings.slice(0, 5).map(listing => (
              <Grid item key={listing.homeImage} xs={12} sm={2} md={2}>
                <ListingCard listing={listing} />
              </Grid>
            ))}
          </Grid>
        </Container>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Typography
            component="h4"
            variant="h4"
            align="left"
            color="textPrimary"
            gutterBottom
          >
            {'List of Homes'}
          </Typography>
          <Grid container spacing={4}>
            {currentListings.map(listing => (
              <Grid item key={listing.homeImage} xs={12} sm={12} md={12}>
                <ListingCardHorizontal listing={listing} />
              </Grid>
            ))}
          </Grid>
          <PaginationDiv>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChange}
            />
          </PaginationDiv>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
});

const PaginationDiv = styled.div`
  margin: auto;
  width: 20%;
  padding: 10px;
`;
