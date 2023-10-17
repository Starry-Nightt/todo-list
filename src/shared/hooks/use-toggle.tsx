import  { useState } from 'react'

function useToggle(defaultValue: boolean) {
    const [value, setValue] = useState(defaultValue)

    const toggleValue = () => {
        setValue(!defaultValue)
    }

    return {value, toggleValue}
}

export default useToggle