import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { id: 1, name: 'Cake Mold', image: '/images/categories/categoryimg.jpg' },
  { id: 2, name: 'Fondants', image: '/images/categories/categoryimg.jpg' },
  { id: 3, name: 'Nozzles', image: '/images/categories/categoryimg.jpg' },
  { id: 4, name: 'Cake Board', image: '/images/categories/categoryimg.jpg' },
  { id: 5, name: 'Baking Tools', image: '/images/categories/categoryimg.jpg' },
  { id: 6, name: 'Cake Toppers', image: '/images/categories/categoryimg.jpg' },
  { id: 7, name: 'Ingredients', image: '/images/categories/categoryimg.jpg' },
  { id: 8, name: 'Decorations', image: '/images/categories/categoryimg.jpg' },
];

const CategoryGrid = () => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
      {categories.map((category) => (
        <Link
          href={`/categories/${category.id}`}
          key={category.id}
          className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-primary
            transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-md hover:shadow-lg"
        >
          <div className="relative w-full h-full">
            {/* Category image */}
            <Image
              src={category.image}
              alt={`${category.name} category`}
              fill
              className="object-cover"
            />

            {/* Category name overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-white bg-opacity-90 p-1">
              <span className="text-xs font-medium text-black !text-black text-center block" style={{ color: 'black' }}>
                {category.name}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;