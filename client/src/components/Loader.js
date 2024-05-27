import React, {useState, CSSProperties} from 'react'
import RotateLoader from "react-spinners/RotateLoader";

function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#000");

  const override = {
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }

  return (
    <div>
        <div className="sweet-loading">
        <RotateLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={20}
        />
        </div>
    </div>
  )
}

export default Loader