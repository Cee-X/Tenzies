import Proptypes from 'prop-types'
function Button({onClick,isTenzie}) {
  return (
    <div className="Btn-roll-container">
      <button className="Btn-Roll" onClick={onClick}>{isTenzie ? "New Game" : "Roll"}</button>
    </div>
  )
}

Button.propTypes = {
  onClick: Proptypes.func.isRequired,
  isTenzie: Proptypes.bool.isRequired,
}

export default Button
