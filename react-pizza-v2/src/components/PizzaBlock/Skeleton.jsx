import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="135" cy="135" r="125" />
    <rect x="0" y="304" rx="10" ry="10" width="280" height="25" />
    <rect x="0" y="342" rx="10" ry="10" width="280" height="70" />
    <rect x="3" y="430" rx="10" ry="10" width="95" height="30" />
    <rect x="167" y="425" rx="20" ry="20" width="113" height="40" />
  </ContentLoader>
);

export default Skeleton;
