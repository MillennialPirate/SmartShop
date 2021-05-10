
const EmptyPage = ({text, pic, area}) => {
    
    return (
        <div className={`${area === 1 ? 'style1' : 'style2'}`}>
            <h5>{text}</h5>
            <img className={`${area === 1 ? 'img1' : 'img'}`} src={pic} />
        </div>
    )
}

export default EmptyPage
