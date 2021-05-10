/**
 *
 * ListingCardHorizontal
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { Listing } from '../../pages/HomePage/slice/types';

interface Props {
  listing: Listing;
}

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 0.6,
  },
  cardImages: {
    flex: 0.4,
  },
  cardMedia: {
    width: 160,
  },
});

export function ListingCardHorizontal(props: Props) {
  const classes = useStyles();

  return (
    <CardActionArea component="a" href="#">
      <Card className={classes.card}>
        <div style={{ width: '25%' }}>
          <Box component="span" display="block" p={1} m={1}>
            <ImageCard src={props.listing.homeImage}></ImageCard>
          </Box>
          <Box component="span" display="block" p={1} m={1}>
            <Price>
              {`Price: $ ${props.listing.overview.price.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ',',
              )}`}
            </Price>
          </Box>
        </div>
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography variant="h6">
              {`Neighborhood: ${props.listing.overview.neighborhood}`}
            </Typography>
            <Typography variant="h6">
              {`Beds: ${props.listing.overview.beds}  Baths: ${props.listing.overview.baths}`}
            </Typography>
            <Typography variant="h6">
              {`Address: ${props.listing.overview.address}`}
            </Typography>
            <Typography variant="h6">
              {`City: ${props.listing.overview.city}`}
            </Typography>
            <Typography variant="h6">
              {`ZIP Code: ${props.listing.overview.zipcode}`}
            </Typography>
            <Typography variant="h6">
              {`Available: `}
              {props.listing.overview.available ? '✅' : '❌'}
            </Typography>
          </CardContent>
        </div>
        <div className={classes.cardImages}>
          <CardContent>
            {props.listing.images.slice(0, 4).map(image => (
              <SmallImage src={image}></SmallImage>
            ))}
          </CardContent>
        </div>
      </Card>
    </CardActionArea>
  );
}

const ImageCard = styled.img`
  width: 100%;
`;

const SmallImage = styled.img`
  width: 33%;
  margin-left: 3%;
`;

const Price = styled.h2`
  text-align: center;
  font-weight: normal;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  margin: 0;
`;
