import React from 'react';

const Counter = (props) => {

    const renderPhrase = (number, text_forms = ['человек', 'человека', 'человек']) => {
        number = Math.abs(number) % 100;
        const n1 = number % 10;
        if (number > 10 && number < 20) {
            return text_forms[2];
        }
        if (n1 > 1 && n1 < 5) {
            return text_forms[1];
        }
        if (n1 === 1) {
            return text_forms[0];
        }
        return text_forms[2];
    }

    const phrase = props.value > 0
        ? `${props.value} ${renderPhrase(props.value, ['человек', 'человека', 'человек'])} ${renderPhrase(props.value, ['тусанет', 'тусанут', 'тусанут'])} с тобой сегодня`
        : 'Никто с тобой не тусанет'
    const color = props.value > 0 ? 'primary' : 'danger'

    return <h2><span className={`badge bg-${color}`}>{phrase}</span></h2>
}
export default Counter