// import {useState} from 'react'

// const AddProc = ({ onAdd }) => {

//     const [date, setDate] = useState("")
//     const [available, setAvail] = useState(false)

//     const onSubmit = (e) => {
//         e.preventDefault()

//         if(!date){
//             alert('Please mention date')
//             return
//         }
        
//         onAdd({date, available })

//         setDate("")
//         setAvail(false)
//     }

//     return (

//         <form className="control-proc" onSubmit={onSubmit}>
//             <div className="form-control form">
//                 <label>Date</label>
//                 <input type="date" 
//                 value={date} 
//                 onChange={(e) => setDate(e.target.value)}/>
//             </div>
//             <div className="form-control form-control-check">
//                 <label>Status</label>
//                 <input type="checkbox" 
//                 checked = {available}
//                 value={available} 
//                 onChange={(e) => setAvail(e.currentTarget.checked)} />
//             </div>
//             <input className="bt btn-block" type="submit" value="Save"/>
//         </form>
//     )
// }

// export default AddProc
