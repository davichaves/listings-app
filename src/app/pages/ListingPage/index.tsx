/**
 *
 * Listing
 *
 */
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import { useInjectReducer } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from '../HomePage/slice';
import { Listing } from '../HomePage/slice/types';
import { selectHomePage } from '../HomePage/slice/selectors';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import { Navigation } from '../../components/Navigation/Loadable';
import { Footer } from '../../components/Footer/Loadable';

interface Props {}

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  mainGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing(8),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export const ListingPage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    if (homePage.listings.length < 1) {
      fetch('../api/data.json', {
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

  let { id } = useParams<{ id: string }>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const homePage = useSelector(selectHomePage);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  const classes = useStyles();
  const history = useHistory();

  var listing: Listing = {
    overview: {
      price: '',
      beds: 0,
      baths: 0,
      neighborhood: '',
      address: '',
      city: '',
      zipcode: 0,
      available: false,
    },
    facts: {
      type: '',
      yearBuilt: 0,
      heating: '',
      parking: '',
      lot: '',
      stories: 0,
    },
    others: {
      anualTax: 0,
      hasGarage: false,
      pool: false,
      virtualTourLink: '',
      parcelNumber: 0,
      lastSold: '',
    },
    visits: {
      total: 0,
      lastVisited: '',
    },
    homeImage: '',
    id: 0,
    images: [],
  };

  for (var i = 0; i < homePage.listings.length; i++) {
    if (homePage.listings[i].id.toString() === id) {
      listing = homePage.listings[i];
    }
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>Listing</title>
        <meta name="description" content="specific listing" />
      </Helmet>
      <CssBaseline />
      <Navigation />
      <main>
        <div className={classes.root}>
          <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={8}>
                <Grid container item xs={12} spacing={3}>
                  <Grid item xs={12}>
                    <Image src={`../${listing.homeImage}`} />
                  </Grid>
                </Grid>
                <Grid container item xs={12} spacing={3}>
                  {listing.images.map(image => (
                    <Grid item xs={6}>
                      <Image
                        src={`../${image}`}
                        onClick={() => setIsOpen(true)}
                      ></Image>
                    </Grid>
                  ))}
                  {isOpen && (
                    <Lightbox
                      mainSrc={`../${listing.images[photoIndex]}`}
                      nextSrc={`../${
                        listing.images[(photoIndex + 1) % listing.images.length]
                      }`}
                      prevSrc={`../${
                        listing.images[
                          (photoIndex + listing.images.length - 1) %
                            listing.images.length
                        ]
                      }`}
                      onCloseRequest={() => setIsOpen(false)}
                      onMovePrevRequest={() =>
                        setPhotoIndex(
                          (photoIndex + listing.images.length - 1) %
                            listing.images.length,
                        )
                      }
                      onMoveNextRequest={() =>
                        setPhotoIndex(photoIndex + (1 % listing.images.length))
                      }
                    />
                  )}
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={0} className={classes.sidebarAboutBox}>
                  <Typography variant="h4">
                    {`Property Information:`}
                  </Typography>
                  <br />
                  <Typography variant="h5">{`Overview:`}</Typography>
                  <hr />
                  <Typography variant="h6">
                    {`Price: $${listing.overview.price.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ',',
                    )}`}
                  </Typography>
                  <Typography variant="h6">
                    {`Neighborhood: ${listing.overview.neighborhood}`}
                  </Typography>
                  <Typography variant="h6">
                    {`Beds: ${listing.overview.beds}  Baths: ${listing.overview.baths}`}
                  </Typography>
                  <Typography variant="h6">
                    {`Address: ${listing.overview.address}`}
                  </Typography>
                  <Typography variant="h6">
                    {`City: ${listing.overview.city}`}
                  </Typography>
                  <Typography variant="h6">
                    {`ZIP Code: ${listing.overview.zipcode}`}
                  </Typography>
                  <Typography variant="h6">
                    {`Available: `}
                    {listing.overview.available ? '✅' : '❌'}
                  </Typography>
                  <br />
                  <Typography variant="h5">{`Facts and Features:`}</Typography>
                  <hr />
                  <Typography variant="h6">
                    {`Type: ${listing.facts.type}`}
                  </Typography>
                  <Typography variant="h6">
                    {`Year: ${listing.facts.yearBuilt}`}
                  </Typography>
                  <Typography variant="h6">
                    {`Heating: ${listing.facts.heating}`}
                  </Typography>
                  <Typography variant="h6">
                    {`Parking: ${listing.facts.parking}`}
                  </Typography>
                  <Typography variant="h6">
                    {`Lot: ${listing.facts.lot}`}
                  </Typography>
                  <Typography variant="h6">
                    {`Stories: ${listing.facts.stories}`}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
});

const Image = styled.img`
  width: 60%;
  margin: auto;
  display: block;
`;
