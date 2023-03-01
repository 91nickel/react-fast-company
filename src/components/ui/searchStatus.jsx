import React from 'react'
import PropTypes from 'prop-types'

const SearchStatus = ({ value }) => {
    const renderPhrase = (
        number,
        textForms = ['человек', 'человека', 'человек']
    ) => {
        number = Math.abs(number) % 100
        const n1 = number % 10
        if (number > 10 && number < 20) return textForms[2]
        if (n1 > 1 && n1 < 5) return textForms[1]
        if (n1 === 1) return textForms[0]
        return textForms[2]
    }

    let phrase
    if (value > 0) {
        phrase = [
            value,
            renderPhrase(value, ['человек', 'человека', 'человек']),
            renderPhrase(value, ['тусанет', 'тусанут', 'тусанут']),
            'с тобой сегодня'
        ].join(' ')
    } else {
        phrase = 'Никто с тобой не тусанет'
    }
    const color = value > 0 ? 'primary' : 'danger'

    return (
        <h2>
            <span className={`badge bg-${color}`}>{phrase}</span>
        </h2>
    )
}

SearchStatus.propTypes = {
    value: PropTypes.number.isRequired
}

export default SearchStatus
