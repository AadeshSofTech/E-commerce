import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortBy, setSortBy] = useState('relevant')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const handleSort = (e) => {
    setSortBy(e.target.value);
    let sortedProducts = [...filterProducts];

    switch (e.target.value) {
      case 'low-to-high':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'high-to-low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        // For 'relevant', maintain the original order
        sortedProducts = applyFilter();
        break;
    }

    setFilterProducts(sortedProducts);
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    // Apply category filter
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item =>
        category.includes(item.category.toUpperCase())
      )
    }

    // Apply subcategory filter
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item =>
        subCategory.includes(item.subCategory)
      )
    }

    // Apply current sort if not 'relevant'
    if (sortBy === 'low-to-high') {
      productsCopy.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-to-low') {
      productsCopy.sort((a, b) => b.price - a.price);
    }

    return productsCopy;
  }

  useEffect(() => {
    const filteredProducts = applyFilter();
    setFilterProducts(filteredProducts);
  }, [category, subCategory, products, search, showSearch])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="" />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium '>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-lite text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' onChange={toggleCategory} value={'MEN'} checked={category.includes('MEN')} /> Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' onChange={toggleCategory} value={'WOMEN'} checked={category.includes('WOMEN')} /> Women
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' onChange={toggleCategory} value={'KIDS'} checked={category.includes('KIDS')} /> Kids
            </p>
          </div>
        </div>

        {/* subcategory filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5  ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium '>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-lite text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' onChange={toggleSubCategory} value={'Topwear'} checked={subCategory.includes('Topwear')} /> Topwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' onChange={toggleSubCategory} value={'Bottomwear'} checked={subCategory.includes('Bottomwear')} /> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' onChange={toggleSubCategory} value={'Winterwear'} checked={subCategory.includes('Winterwear')} /> Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4 '>
          <Title text1={'All'} text2={'COLLECTIONS'} />
          {/* PRODUCT SORT */}
          <select
            className='border-2 border-gray-300 text-sm px-2'
            value={sortBy}
            onChange={handleSort}
          >
            <option value="relevant">Sort by : Relevant</option>
            <option value="low-to-high">Sort by : Low to High</option>
            <option value="high-to-low">Sort by : High to Low</option>
          </select>
        </div>

        {/* Map product */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No products found matching your filters</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Collection
