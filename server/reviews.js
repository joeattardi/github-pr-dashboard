exports.countReviews = function countReviews(reviews, state) {
  let count = 0
  reviews.forEach(review => {
    if (review.state == state) {
      count++;
    }
  });

  return count;
}

