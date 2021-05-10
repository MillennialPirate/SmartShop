import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title, onAdd, showAdd, onchangeStatus}) => {

    return (
        <header className="header"> 
            <h1>{title}</h1>
            <Button color={showAdd ? "red" : "green"} 
            text={showAdd ? "Close" : "Add"} onClick={onAdd} />
            <p className="link"><a href="#" onClick={onchangeStatus}>Go Back</a></p>
        </header>
    )
}

Header.defaultProps = {
    title: "Smart Shop"
}

Header.propTypes = {
    title: PropTypes.string,
}

export default Header
