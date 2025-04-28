import HeroSlider from '@/components/home/HeroSlider';
import CategoryGrid from '@/components/home/CategoryGrid';
import BestSellingProduct from '@/components/home/BestSellingProduct';
import DiscountProducts from '@/components/home/DiscountProducts';
import ImportedProducts from '@/components/home/ImportedProducts';
import BakingTools from '@/components/home/BakingTools';

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
      <div className="max-w-7xl mx-auto w-full">
        <DiscountProducts />
      </div>
      <div className="max-w-7xl mx-auto w-full">
        <ImportedProducts />
      </div>
      <div className="max-w-7xl mx-auto w-full">
        <BakingTools />
      </div>
    </div>
  );
}