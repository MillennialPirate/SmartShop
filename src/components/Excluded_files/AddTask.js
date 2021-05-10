import {useState} from 'react'

const AddTask = ({ onAdd }) => {

    const [text, setText] = useState("")
    const [stock, setStock] = useState(0)
    const [price, setPrice] = useState("")
    const [available, setAvail] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!text){
            alert('Please add a product')
            return
        }
        if(!stock){
            alert('Please mention stock')
            return
        }
        if(!price){
            alert('Please mention the price')
            return
        }
        onAdd({ text, stock, price, available })

        setText("")
        setStock(0)
        setPrice("")
        setAvail(false)
    }

    return (

        <form className="control-item" onSubmit={onSubmit}>
            <div className="form-control form1">
                <label>Product</label>
                <input type="text" 
                placeholder="Product name" 
                value={text} 
                onChange={(e) => setText(e.target.value)} />
            </div>
            <div className="form-control form">
                <label>Stock</label>
                <input type="number" 
                placeholder="Stock"
                value={stock} 
                onChange={(e) => setStock(e.target.value)}/>
            </div>
            <div className="form-control form">
                <label>Price</label>
                <input type="text" placeholder="Price"
                value={price} 
                onChange={(e) => setPrice(e.target.value)}/>
            </div>
            <div className="form-control form1-control-check">
                <label>Available</label>
                <input type="checkbox" 
                checked = {available}
                value={available} 
                onChange={(e) => setAvail(e.currentTarget.checked)} />
            </div>
            <input className="bt btn-block" type="submit" value="Save"/>
        </form>
    )
}

export default AddTask
