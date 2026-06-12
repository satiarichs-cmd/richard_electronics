const Cart = ({ cart }) => {

    return (
        <div className="container text-white">

            <h2>Cart</h2>

            {cart.length === 0 && <p>No items</p>}

            {cart.map((item, i) => (
                <div className="card p-3 mb-2" key={i}>
                    <h5>{item.product_name}</h5>
                    <p>Qty: {item.quantity}</p>
                </div>
            ))}

        </div>
    );
};

export default Cart;