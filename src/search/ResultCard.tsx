import { fromUnixTime } from 'date-fns';
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

import Result from '../types/Result';

const ResultCard = ({
  alt,
  field_main_image_caption,
  field_main_image,
  field_photographer,
  title,
  published_at,
  url,
}: Result) => {
  const getPublished = () => {
    if (!published_at || !published_at.length) {
      return null;
    }

    const timeZone = 'Europe/Helsinki';
    const published = fromUnixTime(published_at[0]);
    const utcTime = zonedTimeToUtc(published, timeZone);
    const zonedTime = utcToZonedTime(utcTime, timeZone);

    const htmlTime = `${format(zonedTime, 'Y-MM-dd', { timeZone: timeZone })}T${format(zonedTime, 'HH:mm', {
      timeZone: timeZone,
    })}`;
    const visibleTime = format(zonedTime, 'd.M.Y H:mm', { timeZone: timeZone });

    return (
      <time dateTime={htmlTime} className="news-listing__datetime news-listing__datetime--published">
        <span className="visually-hidden">{visibleTime}</span>
      </time>
    );
  };

  const getAlt = () => {
    if (field_main_image_caption && field_main_image_caption.length) {
      return field_main_image_caption[0];
    }
    if (alt && alt.length) {
      return alt[0];
    }

    return '';
  };

  const getImage = () => {
    if (!field_main_image || !field_main_image.length) {
      return null;
    }

    return (
      <img
        src={field_main_image[0]}
        alt={getAlt()}
        data-photographer={field_photographer && field_photographer.length ? field_photographer[0] : null}
      />
    );
  };

  return (
    <li className="news-listing__item">
      <div className="news-listing__content news-listing__content--with-image" role="article">
        <h3 className="news-listing__title">
          <a href={url[0]} className="news-listing__link">
            {title}
          </a>
        </h3>
        {getPublished()}
      </div>
      {field_main_image && field_main_image.length && <div className="news-listing__img">{getImage()}</div>}
    </li>
  );
};

export default ResultCard;
