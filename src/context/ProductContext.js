import { Children, createContext, useContext, useEffect, useState } from "react";
import axios  from 'axios';
import BASE_URL from "../api/api";


export const ProductContext = createContext();


const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([])
    const [orders, setOrders] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('')
    const [cart, setCart] = useState([]);
    const [productInCart, setProductInCart] = useState([])
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await axios.get(`${BASE_URL}/products`);
                // console.log("Fetched Products: ", result.data);
                setProducts(result.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        const fetchCategory = async () => {
            try {
                const result = await axios.get(`${BASE_URL}/categories`);
                // console.log("Fetched category : ", result.data);
                setCategories(result.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        const fetchOrders = async () => {
            try {
                const result = await axios.get(`${BASE_URL}/orders`);
                // console.log("Fetched order : ", result.data);
                setOrders(result.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        fetchOrders();
        fetchCategory();
        fetchProducts();
    }, [])


    const addToCart = (productId) => {
        if(cart.includes(productId)) return;
        setCart([...cart, productId])
        // console.log("Cart: " + cart);
    }



    const getCategoryName = (cateId) => {
        const category = categories.find(c => c.id = cateId);
        return category ? category.name : "Category unknown"
    }

    return(
        <ProductContext.Provider value={{ orders, setOrders, quantities, setQuantities, products, categories, searchTerm, selectedCategory, setSearchTerm, setSelectedCategory, cart, setCart, addToCart, productInCart, setProductInCart, setProducts}}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider;
