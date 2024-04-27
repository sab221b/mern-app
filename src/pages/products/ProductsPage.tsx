import { useSelector } from 'react-redux';
import { ReduxState } from '../../store/reducers/productSlice';

function Products() {
  const products = useSelector((state: ReduxState) => {
   return state.app.productData.products
  });

  return (
    <div className="products">
      {!products?.length && <div>No products to display</div>}
    </div>
  );
}

export default Products;
