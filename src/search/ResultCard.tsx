import { format } from 'date-fns';

import Result from '../types/Result';

const ResultCard = ({ field_main_image, title, published_at, url }: Result) => {
  const getPublished = () => {
    const published = new Date(published_at[0] * 1000);
    const htmlTime = `${format(published, 'Y-MM-dd')}T${format(published, 'HH:mm')}`;
    const visibleTime = format(published, 'd.M.Y H:mm');

    return (
      <time dateTime={htmlTime} className="news-listing__datetime news-listing__datetime--published">
        <span className="visually-hidden">{visibleTime}</span>
      </time>
    );
  };

  return (
    <div>
      <div className="news-listing__content">
        <h4>
          <a href={url[0]}>{title}</a>
        </h4>
        {published_at && published_at.length && getPublished()}
      </div>
      {field_main_image && field_main_image.length && (
        <div className="news-listing__img">
          {/* @TODO: get image alt value from Drupal */}
          <img src={field_main_image[0]} alt="" />
        </div>
      )}
    </div>
  );
};

export default ResultCard;
