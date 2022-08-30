import React from 'react';
// eslint-disable-next-line import/extensions
import ReviewTile from './reviewTile.jsx';
// eslint-disable-next-line import/extensions
import RatingTile from './ratingTile.jsx';
// eslint-disable-next-line import/extensions
import Filter from './filter.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: null,
      tiles: props.reviews,
    };
  }

  componentDidMount() {
  }

  /*
  Relevant - Relevance will be determined by a combination of both the date that the review
  was submitted as well as ‘helpfulness’ feedback received. This combination should weigh the
  two characteristics such that recent reviews appear near the top, but do not outweigh reviews
  that have been found helpful. Similarly, reviews that have been helpful should appear near the
  top,but should yield to more recent reviews if they are older.
  */
  sortByRelevance() {
    const originals = this.state.tiles.results;
    const sorted = this.state.tiles.results;

    sorted.sort((a, b) => a - b);
    console.log('RELEVANCE', sorted);

    this.setState({
      origin: originals,
      tiles: sorted,
    });
  }

  sortByHelpful() {
    const originals = this.state.tiles.results;
    const sorted = this.state.tiles.results;

    sorted.sort((a, b) => b.helpfulness.toString() - a.helpfulness.toString());
    console.log('HELPFUL', sorted);

    this.setState({
      origin: originals,
      tiles: sorted,
    });
  }

  sortByNewest() {
    const originals = this.state.tiles.results;
    const sorted = this.state.tiles.results;

    sorted.sort(((a, b) => new Date(a.date) - new Date(b.date)));
    console.log('NEWEST', sorted);

    this.setState({
      origin: originals,
      tiles: sorted,
    });
  }

  render() {
    return (
      <div className="rar_section">
        <div className="rar_ratingBox"><RatingTile /></div>
        <div className="rar_tileBox">
          <div>
            <Filter
              sortRel={this.sortByRelevance.bind(this)}
              sortHelp={this.sortByHelpful.bind(this)}
              sortNew={this.sortByNewest.bind(this)}
            />
          </div>
          <ReviewTile tiles={this.state.tiles} />
          <div className="rar_reviewButtons">
            <button className="button" type="submit" id="moreReviews">MORE REVIEWS</button>
            <button className="button" type="submit">ADD A REVIEW +</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewList;
