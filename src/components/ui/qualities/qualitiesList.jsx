import React from 'react'
import PropTypes from 'prop-types'
import Quality from './qualitie'
import { useQuality } from 'hooks/useQuality'

const QualitiesList = ({qualities}) => {
    const {isLoading, getQualities} = useQuality()
    const list = getQualities(qualities)

    if (!isLoading) {
        return <>{
            list.map((quality, i) => (
                <Quality key={`quality_${i}`} {...quality} />
            ))
        }</>
    }
    return 'Loading...'
}

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
}

export default QualitiesList
