import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

const MultiSelectField = ({label, name, value, error, options, onChange}) => {
    const arOptions = !Array.isArray(options) && typeof options === 'object' ?
        Object.keys(options).map(key => ({label: options[key].name, value: options[key]._id})) :
        options
    const handleChange = (value) => {
        onChange({name: name, value: value})
    }
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                className="basic-multi-select"
                classNamePrefix="select"
                name={name}
                options={arOptions}
                onChange={handleChange}
            />
        </div>
    )
}
MultiSelectField.defaultProps = {
    options: [],
}
MultiSelectField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.array,
    error: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.objectOf(PropTypes.object)]),
}

export default MultiSelectField
