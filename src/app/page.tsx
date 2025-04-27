import HeroSlider from '@/components/home/HeroSlider';
import CategoryGrid from '@/components/home/CategoryGrid';
import BestSellingProduct from '@/components/home/BestSellingProduct';

export default function Home() {
  return (
    <div className="flex flex-col bg-gray-50">
      <HeroSlider />
      <div className="max-w-7xl mx-auto w-full px-2 sm:px-4 py-4 md:py-6">
        <CategoryGrid />
      </div>
      <div className="max-w-7xl mx-auto w-full">
        <BestSellingProduct />
      </div>
    </div>
  );
}