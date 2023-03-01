import React, { useState } from 'react'
import PropTypes from 'prop-types'

const SelectField = ({label, name, value, error, onChange, options, defaultOption}) => {
    const arOptions = !Array.isArray(options) && typeof options === 'object' ?
        Object.keys(options).map(key => ({name: options[key].name, value: options[key].value})) :
        options

    const handleChange = ({target}) => {
        onChange({name: target.name, value: target.value})
    }

    const getInputClasses = () => {
        const classes = ['form-control']
        if (error)
            classes.push('is-invalid')

        return classes.join(' ')
    }
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <select
                className={getInputClasses()}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option disabled value="">{defaultOption}</option>
                {arOptions.map((opt, i) => <option key={`op-${i}`} value={opt.value}>{opt.name}</option>)}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}
SelectField.defaultProps = {
    options: [],
    defaultOption: 'Choose your destiny...',
}
SelectField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.objectOf(PropTypes.object)]),
    defaultOption: PropTypes.string,
}

export default SelectField
