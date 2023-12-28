
import PropTypes from 'prop-types';
function Dice({value, isHeld, heldDice}) {
  const styles = {
    backgroundColor: isHeld ? '#59e390' : 'white',
  }
  const dots = Array.from({length : value },(_, index) => (
  <div className='dot' key={index}></div>))
  return (
    <div className="face" style={styles} onClick={heldDice} >
      {dots}
    </div>
  )
}

export default Dice
Dice.propTypes = {
    value: PropTypes.number.isRequired,
    isHeld: PropTypes.bool.isRequired,
   heldDice: PropTypes.func.isRequired,
}