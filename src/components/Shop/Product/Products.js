import {useSelector, useDispatch} from "react-redux";
import {useEffect, useCallback} from "react";
import {memo} from "react";

import ProductItem from '../ProductItem/ProductItem';
import {loadProducts} from './productSlice';

import classes from './Products.module.css';

const Products = (props) => {
    const products = useSelector(state => state.products.products);
    const status = useSelector(state => state.ui.notification.status);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadProducts());
    }, []);

    const renderProducts = useCallback(        (arr, status) => {
        console.log('render')
        if(status === 'pending'){
            return <p>Loading...</p>
        }
        if(status === 'success' && arr?.length > 0){
            return arr.map(item => {
                return <ProductItem key={item.id} id={item.id} title={item.title} price={item.price} description={item.description} />
            });
        }
        return <p>No product found!</p>
    }, [status]);

    // const renderProducts = (arr, status) => {
    //     console.log('render')
    //     if(status === 'pending'){
    //         return <p>Loading...</p>
    //     }
    //     if(status === 'success' && arr.length > 0){
    //         return arr.map(item => {
    //             return <ProductItem key={item.id} id={item.id} title={item.title} price={item.price} description={item.description} />
    //         });
    //     }
    //     return <p>No product found!</p>
    // };

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
          {renderProducts(products[0], status)}
      </ul>
    </section>
  );
};

// export default Products;

export default memo(Products);
