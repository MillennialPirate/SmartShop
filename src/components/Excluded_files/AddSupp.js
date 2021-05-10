// import {useState} from 'react'

// const AddSupp = ({onAdd}) => {

//     const [code, setCode] = useState("")
//     const [stock, setStock] = useState(0)

//     const onSubmit = (e) => {
//         e.preventDefault()

//         if(!code){
//             alert('Please select an item code')
//             return
//         }
//         if(!stock){
//             alert('Please mention stock')
//             return
//         }
//         onAdd({ code, stock })

//         setCode("")
//         setStock(0)
//     }

//     return (
//         // <form className="control-item" onSubmit={onSubmit}>
//         //     <div className="form-control form1">
//         //         <label>Item Code</label>
//         //         <input type="text" 
//         //         placeholder="Item ID" 
//         //         value={code} 
//         //         onChange={(e) => setCode(e.target.value)} />
//         //     </div>
//         //     <div className="form-control form">
//         //         <label>Stock</label>
//         //         <input type="number" 
//         //         placeholder="Stock"
//         //         value={stock} 
//         //         onChange={(e) => setStock(e.target.value)}/>
//         //     </div>
//         //     <input className="bt btn-block1" type="submit" value="Save"/>
//         // </form>
//     )
// }

// export default AddSupp
