import React, {useState} from "react"
import api from "../api"
import "bootstrap/dist/css/bootstrap.css"

const Users = () => {
    // console.log(api.users.fetchAll())
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(user => user._id !== userId))
    }

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

    const renderCounter = () => {
        const phrase = users.length > 0
            ? `${users.length} ${renderPhrase(users.length, ['человек', 'человека', 'человек'])} ${renderPhrase(users.length, ['тусанет', 'тусанут', 'тусанут'])} с тобой сегодня`
            : 'Никто с тобой не тусанет'
        const color = users.length > 0 ? 'primary' : 'danger'
        return <h2><span className={`badge bg-${color}`}>{phrase}</span></h2>
    }

    const renderTable = () => {
        if (users.length > 0)
            return (
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">x</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderUsers()}
                    </tbody>
                </table>
            )
        return ''
    }

    const renderUserQualities = (user) => {
        return user.qualities.map(el => {
            return <span key={el._id} className={`badge bg-${el.color}`}>{el.name}</span>
        })
    }

    const renderUsers = () => {
        if (users.length === 0)
            return <tr></tr>
        return users.map(user => (
            <tr key={user._id}>
                <td>{user.name}</td>
                <td>{renderUserQualities(user)}</td>
                <td>{user.profession.name}</td>
                <td>{user.rate}</td>
                <td>{user.rate}/5</td>
                <td>
                    <button type="button" className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(user._id)}>delete
                    </button>
                </td>
            </tr>)
        )
    }

    return (
        <>
            {renderCounter()}
            {renderTable()}
        </>
    )

}
export default Users