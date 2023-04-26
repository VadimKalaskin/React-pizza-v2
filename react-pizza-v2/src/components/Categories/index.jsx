import React from 'react';

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const onClickCategory = (index) => {
    setActiveIndex(index);
  };

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li
            key={i}
            className={activeIndex === i ? 'active' : ''}
            onClick={() => {
              onClickCategory(i);
            }}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;