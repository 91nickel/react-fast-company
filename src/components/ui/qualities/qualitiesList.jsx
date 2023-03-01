import React from 'react'
import PropTypes from 'prop-types'
import Quality from './qualitie'

const QualitiesList = ({qualities}) => {
    return <>{
        qualities.map((quality, i) => (
            <Quality key={`quality_${i}`} {...quality} />
        ))
    }</>
}

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
}

export default QualitiesList
