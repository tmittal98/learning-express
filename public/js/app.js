//This App is a react component and we are rendering it in the place of the div with the id="app"
const App = () => {

    const [products, setProducts] = React.useState([]);

    //making a state for form
    const [form, setForm] = React.useState({
        name: '',
        price: ''
    });

    React.useEffect(() => {
        fetchProducts()
    }, [])

    function fetchProducts() {
        //fetch is a function to fetch data
        fetch('/api/products')//write end point here in the parameter
            .then((res) => res.json())//res is recienved and we have converted to json and then a promise is returned
            .then(data => {//here we will get the data 
                setProducts(data)
            });
    }
    // This warning will be generated when key is not given
    // react.development.js: 245 Warning: Each child in a list should have a unique "key" prop.
    // Check the render method of`App`.See https://reactjs.org/link/warning-keys for more information.
    // at li
    // at App(<anonymous>:17:31)

    function handleSubmit(e) {
        //e is the event that is recieved
        //this function will stop the default behaviour of the form because when we submit the form the page gets reloaded
        //so to stop this we are using the preventDefault function
        e.preventDefault();

        if (!form.name || !form.price) {
            return;
        }
        //when we do fetch in case of post the 2nd paramenter is there and it is a object
        fetch('/api/products', {
            method: 'POST',
            headers: {
                //we have to tell which type of data we will send we have to tell that
                'Content-Type': 'application/json'
            },
            //if we want to send data then we have to sned the data in body key
            //we have to send JSON string in the body but the form is normal js object so we are using JSON.stringfy() to convert the js object to json string
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(data => {
                fetchProducts();
                setForm({ name: '', price: '' })
            })
    }

    function updateForm(event, field) {
        if (field === 'name') {
            setForm({
                ...form,
                name: event.target.value
            });
        }
        else if (field === 'price') {
            setForm({
                ...form,
                price: event.target.value
            });
        }
    }

    const deleteProduct = (productId) => {
        fetch(`/api/products/${productId}`, {
            method: 'DELETE'
        })
            .then((res) => res.json())
            .then((data) => {
                fetchProducts();
                console.log(data);
            });
    }

    return (
        //when we return anything only one single parent should be returned 
        //either we can put the entire thing in one div or we can also 
        //put the entire thing in empty tags <> </>
        <>
            <div className="card">
                <div className="card-header">
                    Add a product
                </div>
                <div className="card-body">
                    {/* we are passing an event in the form onClick that the function handleSubmit should fire */}
                    <form onClick={handleSubmit}>
                        {/* we have done 2 way binding as the data in input changes we aer updating the state  */}
                        <input type="text" className="form-control mt-3" placeholder="Product name ..." value={form.name} onChange={() => updateForm(event, 'name')} />
                        <input type="text" className="form-control mt-3" placeholder="Product price ..." value={form.price} onChange={() => updateForm(event, 'price')} />
                        <button type="submit" className="btn btn-primary mt-3">Submit</button>
                    </form>
                </div>
            </div>
            <ul className="list-group mt-4">
                {/* we use map in react to run a loop */}
                {
                    products.map((product) => {
                        return (
                            <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{product.name}: </strong>
                                        ${product.price}
                                </div>
                                <button className="btn" onClick={() => deleteProduct(product.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                    </svg>
                                </button>
                            </li>
                        )
                    })
                }

            </ul>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('app'));
