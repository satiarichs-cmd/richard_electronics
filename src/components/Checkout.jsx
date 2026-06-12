const Checkout = ({ cart }) => {

    const total = cart.reduce(
        (sum, item) => sum + item.product_cost * item.quantity,
        0
    );

    return (
        <div className="container text-white">

            <h2>Checkout</h2>

            <h4>Total: Ksh {total}</h4>

            <input className="form-control" placeholder="Phone" />

            <button className="btn btn-success mt-3">
                Pay with M-Pesa
            </button>

        </div>
    );
};

export default Checkout;