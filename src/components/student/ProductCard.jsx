import { MdShoppingCart } from "react-icons/md"

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur border border-green-500/20 hover:border-green-500/50 p-4 md:p-5 rounded-xl shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:scale-105 group">
      {/* Image */}
      <div className="relative mb-4 overflow-hidden rounded-lg bg-zinc-900/50 p-3">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-40 object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-white text-sm md:text-base line-clamp-2">
          {product.title}
        </h3>

        {/* Price & Button */}
        <div className="flex items-center justify-between">
          <p className="text-lime-400 font-bold text-base md:text-lg">
            {product.price} Coin
          </p>
          <button
            onClick={() => onAddToCart(product)}
            className="p-2 bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-white rounded-lg transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50"
          >
            <MdShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
