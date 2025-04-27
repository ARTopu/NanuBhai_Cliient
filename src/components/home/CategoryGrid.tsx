import {
  ShoppingBag,
  Gift,
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Camera,
  Tag
} from 'lucide-react';

const categories = [
  { id: 1, name: 'Fashion', Icon: ShoppingBag },
  { id: 2, name: 'Phones', Icon: Smartphone },
  { id: 3, name: 'Laptops', Icon: Laptop },
  { id: 4, name: 'Audio', Icon: Headphones },
  { id: 5, name: 'Watches', Icon: Watch },
  { id: 6, name: 'Cameras', Icon: Camera },
  { id: 7, name: 'Gifts', Icon: Gift },
  { id: 8, name: 'Offers', Icon: Tag, highlight: true },
];

const CategoryGrid = () => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
      {categories.map(({ id, name, Icon, highlight }) => (
        <button
          key={id}
          className={`
            aspect-square rounded-lg p-2 flex flex-col items-center justify-center
            transition-all duration-300 hover:scale-105 hover:-translate-y-1
            ${
              highlight
                ? 'bg-white border border-gray-200 shadow-md'
                : 'bg-white border border-gray-200 shadow-md hover:shadow-lg'
            }
          `}
        >
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center mb-1.5
            ${highlight ? 'bg-gray-100' : 'bg-gray-100'}
          `}>
            <Icon
              className="w-4 h-4 text-gray-800"
              strokeWidth={1.5}
            />
          </div>
          <span className="text-xs font-medium text-gray-800">
            {name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryGrid;