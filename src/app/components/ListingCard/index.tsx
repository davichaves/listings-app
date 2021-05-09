/**
 *
 * ListingCard
 *
 */
import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { Listing } from '../../pages/HomePage/slice/types';

interface Props {
  listing: Listing;
}

const useStyles = makeStyles(theme => ({
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

export function ListingCard(props: Props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={props.listing.homeImage}
        title="Image title"
      />
      <CardContent className={classes.cardContent}>
        <Typography>
          {`$ ${props.listing.overview.price.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ',',
          )}`}
        </Typography>
        <Typography>{`total views: ${props.listing.visits.total
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</Typography>
      </CardContent>
    </Card>
  );
}
