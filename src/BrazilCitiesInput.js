import React, { useState } from "react";
import BCP, { strategies } from "brazil-cities-predictor";

export default function BrazilCitiesInput() {
    const [inputValue, setInputValue] = useState('')
    const [suggestions, setSuggestions] = useState([]);

    return (
        <>
            <input autoComplete={'off'} type={'text'}
                value={inputValue}
                onInput={(e) => {
                    setInputValue(e.target.value)
                    setSuggestions(
                        e.target.value.trim() !== '' 
                        ? new BCP(strategies.relativeDistance).predict(e.target.value.trim())
                            .filter(x => x.relativeDistance > 0.4)
                            .map(x => x.city.name + ' - ' + x.city.state)
                        : []
                    )
                }
            }/>

            {
                suggestions.map(e => 
                    <a href={'javascript:void(0)'}>
                        <p onClick={() => {
                                    setInputValue(e)
                                    setSuggestions([])
                                }
                            }>
                            {e}
                        </p>
                    </a>)
            }
        </>
    )
}